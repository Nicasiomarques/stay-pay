export function QRCodeVoucher() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 w-full max-w-sm">
      <div className="flex justify-center mb-4">
        <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center">
          {/* QR Code Placeholder */}
          <svg viewBox="0 0 200 200" className="w-full h-full p-4">
            <rect x="0" y="0" width="200" height="200" fill="white" />
            <rect x="10" y="10" width="30" height="30" fill="black" />
            <rect x="50" y="10" width="10" height="10" fill="black" />
            <rect x="70" y="10" width="10" height="10" fill="black" />
            <rect x="90" y="10" width="30" height="30" fill="black" />
            <rect x="130" y="10" width="10" height="10" fill="black" />
            <rect x="160" y="10" width="30" height="30" fill="black" />

            <rect x="10" y="50" width="10" height="10" fill="black" />
            <rect x="30" y="50" width="10" height="10" fill="black" />
            <rect x="50" y="50" width="30" height="30" fill="black" />
            <rect x="90" y="50" width="10" height="10" fill="black" />
            <rect x="110" y="50" width="10" height="10" fill="black" />
            <rect x="160" y="50" width="10" height="10" fill="black" />
            <rect x="180" y="50" width="10" height="10" fill="black" />

            <rect x="10" y="90" width="30" height="30" fill="black" />
            <rect x="50" y="90" width="10" height="10" fill="black" />
            <rect x="70" y="90" width="30" height="30" fill="black" />
            <rect x="110" y="90" width="10" height="10" fill="black" />
            <rect x="130" y="90" width="30" height="30" fill="black" />
            <rect x="170" y="90" width="10" height="10" fill="black" />

            <rect x="10" y="130" width="10" height="10" fill="black" />
            <rect x="50" y="130" width="10" height="10" fill="black" />
            <rect x="70" y="130" width="10" height="10" fill="black" />
            <rect x="110" y="130" width="30" height="30" fill="black" />
            <rect x="160" y="130" width="10" height="10" fill="black" />
            <rect x="180" y="130" width="10" height="10" fill="black" />

            <rect x="10" y="160" width="30" height="30" fill="black" />
            <rect x="50" y="160" width="10" height="10" fill="black" />
            <rect x="70" y="160" width="30" height="30" fill="black" />
            <rect x="130" y="160" width="10" height="10" fill="black" />
            <rect x="160" y="160" width="30" height="30" fill="black" />
          </svg>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm">
        Show this QR code at check-in
      </p>
    </div>
  );
}
