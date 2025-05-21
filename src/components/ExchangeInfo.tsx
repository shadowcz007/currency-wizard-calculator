
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ExchangeInfoProps {
  fromCurrency: string;
  toCurrency: string;
  rate?: number;
  lastUpdated?: string;
  isLoading: boolean;
}

const ExchangeInfo: React.FC<ExchangeInfoProps> = ({
  fromCurrency,
  toCurrency,
  rate,
  lastUpdated,
  isLoading
}) => {
  if (isLoading) {
    return (
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-4 px-4 pb-4">
          <div className="text-center text-gray-500">
            <p>正在获取最新汇率...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!rate) {
    return (
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-4 px-4 pb-4">
          <div className="text-center text-gray-500">
            <p>暂无汇率数据</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
      <CardContent className="pt-4 px-4 pb-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">当前汇率</p>
          <p className="text-lg font-semibold mt-1">
            1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
          </p>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-2">
              最后更新时间: {lastUpdated}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExchangeInfo;
