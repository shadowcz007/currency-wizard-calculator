
import CurrencyConverter from "@/components/CurrencyConverter";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <CurrencyConverter />
      </div>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>数据来源：Frankfurter API</p>
        <p className="mt-1">© {new Date().getFullYear()} 货币汇率转换计算器</p>
      </footer>
    </div>
  );
};

export default Index;
