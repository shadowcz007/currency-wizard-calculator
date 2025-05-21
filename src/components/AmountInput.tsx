
import React from "react";
import { Input } from "@/components/ui/input";
import { currencies } from "@/lib/currencyService";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  currencyCode: string;
  label: string;
  disabled?: boolean;
  isResult?: boolean;
}

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  currencyCode,
  label,
  disabled = false,
  isResult = false
}) => {
  // 获取对应货币的符号
  const currencySymbol = currencies.find(c => c.code === currencyCode)?.symbol || '';

  // 处理数值变更，仅允许数字和小数点
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // 正则表达式匹配数字和一个小数点
    if (inputValue === '' || /^[0-9]+\.?[0-9]*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500">{currencySymbol}</span>
        </div>
        <Input
          type="text"
          value={value}
          onChange={isResult ? undefined : handleChange}
          disabled={disabled || isResult}
          className={`pl-8 ${isResult ? 'bg-gray-50' : ''}`}
          placeholder="0.00"
        />
      </div>
    </div>
  );
};

export default AmountInput;
