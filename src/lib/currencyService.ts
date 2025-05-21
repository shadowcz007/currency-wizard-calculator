
// 定义货币类型和汇率数据接口
export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface ExchangeRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

// 货币数据列表
export const currencies: Currency[] = [
  { code: "USD", name: "美元", symbol: "$" },
  { code: "EUR", name: "欧元", symbol: "€" },
  { code: "JPY", name: "日元", symbol: "¥" },
  { code: "GBP", name: "英镑", symbol: "£" },
  { code: "AUD", name: "澳元", symbol: "A$" },
  { code: "CAD", name: "加元", symbol: "C$" },
  { code: "CHF", name: "瑞士法郎", symbol: "CHF" },
  { code: "CNY", name: "人民币", symbol: "¥" },
  { code: "HKD", name: "港元", symbol: "HK$" },
  { code: "NZD", name: "新西兰元", symbol: "NZ$" }
];

// 获取汇率数据
export const fetchExchangeRates = async (baseCurrency: string): Promise<ExchangeRates> => {
  try {
    const response = await fetch(`https://api.frankfurter.dev/latest?base=${baseCurrency}`);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

// 计算兑换金额
export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>
): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // 如果基础货币与 rates 中的基础货币相同
  if (rates[toCurrency]) {
    return amount * rates[toCurrency];
  }
  
  // 以防API返回数据中不包含目标货币
  return 0;
};
