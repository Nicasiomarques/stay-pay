interface PriceBreakdownProps {
  items: {
    label: string;
    amount: number;
  }[];
  total: number;
}

export default function PriceBreakdown({ items, total }: PriceBreakdownProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span className="text-gray-600">{item.label}</span>
          <span className="text-gray-900">${item.amount}</span>
        </div>
      ))}
      <div className="pt-3 border-t border-gray-200 flex justify-between">
        <span className="text-gray-900">Total</span>
        <span className="text-gray-900">${total}</span>
      </div>
    </div>
  );
}
