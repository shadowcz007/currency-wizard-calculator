
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Currency, currencies } from "@/lib/currencyService";

interface CurrencyDropdownProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
  excludeCode?: string;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  excludeCode
}) => {
  // 过滤掉已在另一个下拉框中选择的货币
  const filteredCurrencies = currencies.filter(
    (currency) => !excludeCode || currency.code !== excludeCode
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Select
        disabled={disabled}
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="选择货币" />
        </SelectTrigger>
        <SelectContent>
          {filteredCurrencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              <div className="flex items-center">
                <span className="mr-2">{currency.symbol}</span>
                <span>{currency.code}</span>
                <span className="text-gray-500 ml-2">- {currency.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencyDropdown;
