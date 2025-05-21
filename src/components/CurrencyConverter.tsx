
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowDown, ArrowUp } from "lucide-react";
import CurrencyDropdown from "./CurrencyDropdown";
import AmountInput from "./AmountInput";
import ExchangeInfo from "./ExchangeInfo";
import {
  fetchExchangeRates,
  convertCurrency,
  ExchangeRates,
} from "@/lib/currencyService";

const CurrencyConverter: React.FC = () => {
  // 状态管理
  const [fromCurrency, setFromCurrency] = useState("CNY");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 获取汇率数据
  const fetchRates = async (base: string) => {
    setIsLoading(true);
    try {
      const data = await fetchExchangeRates(base);
      setExchangeRates(data);
      // 如果有金额，重新计算转换结果
      if (amount) {
        calculateConversion(amount, base, base === fromCurrency ? toCurrency : fromCurrency, data.rates);
      }
    } catch (error) {
      toast({
        title: "获取汇率失败",
        description: "无法获取最新汇率数据，请稍后再试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 计算货币转换结果
  const calculateConversion = (
    value: string,
    from: string,
    to: string,
    rates?: Record<string, number>
  ) => {
    if (!value || value === "0" || !rates) {
      setConvertedAmount("");
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setConvertedAmount("");
      return;
    }

    const result = convertCurrency(numValue, from, to, rates);
    setConvertedAmount(result.toFixed(2));
  };

  // 处理金额变化
  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (exchangeRates) {
      calculateConversion(value, fromCurrency, toCurrency, exchangeRates.rates);
    }
  };

  // 处理源货币变化
  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value);
    fetchRates(value);
  };

  // 处理目标货币变化
  const handleToCurrencyChange = (value: string) => {
    setToCurrency(value);
    if (exchangeRates) {
      calculateConversion(amount, fromCurrency, value, exchangeRates.rates);
    }
  };

  // 交换货币
  const handleSwapCurrencies = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    
    if (amount) {
      setAmount(convertedAmount);
      setConvertedAmount(amount);
    }
    
    // 重新获取汇率数据
    fetchRates(toCurrency);
  };

  // 组件加载时获取默认汇率数据
  useEffect(() => {
    fetchRates(fromCurrency);
  }, []);

  // 获取当前汇率值
  const currentRate = exchangeRates?.rates[toCurrency] || 0;

  // 格式化最后更新时间
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-blue-200">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">
          货币汇率转换计算器
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <CurrencyDropdown
              label="从这种货币"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              excludeCode={toCurrency}
              disabled={isLoading}
            />

            <AmountInput
              label="金额"
              value={amount}
              onChange={handleAmountChange}
              currencyCode={fromCurrency}
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white shadow-md hover:bg-blue-50"
                onClick={handleSwapCurrencies}
                disabled={isLoading}
              >
                <ArrowUp className="h-4 w-4 text-blue-500" />
                <ArrowDown className="h-4 w-4 text-blue-500" />
              </Button>
            </div>
            <hr className="my-6 border-gray-200" />
          </div>

          <div className="flex flex-col space-y-4">
            <CurrencyDropdown
              label="转换为"
              value={toCurrency}
              onChange={handleToCurrencyChange}
              excludeCode={fromCurrency}
              disabled={isLoading}
            />

            <AmountInput
              label="转换结果"
              value={convertedAmount}
              onChange={() => {}}
              currencyCode={toCurrency}
              isResult={true}
              disabled={true}
            />
          </div>

          <ExchangeInfo
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            rate={currentRate}
            lastUpdated={formatDate(exchangeRates?.date)}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
