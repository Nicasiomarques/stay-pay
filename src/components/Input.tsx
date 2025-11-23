import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export default function Input({ label, icon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block mb-2 text-gray-700">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          className={`w-full px-4 py-3.5 ${icon ? 'pl-12' : ''} bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E64D2] focus:border-transparent transition-all ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
