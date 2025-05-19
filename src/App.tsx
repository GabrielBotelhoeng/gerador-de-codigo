import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

function App() {
  const [codes, setCodes] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(10);

  const generateCodes = () => {
    const newCodes: string[] = [];
    const usedCodes = new Set();

    while (newCodes.length < quantity) {
      // Generate a 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Only add if it's not a duplicate
      if (!usedCodes.has(code)) {
        usedCodes.add(code);
        newCodes.push(code);
      }
    }

    setCodes(newCodes);
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      alert('Código copiado!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Gerador de Códigos</h1>
          
          <div className="flex gap-4 mb-6">
            <input
              type="number"
              min="1"
              max="1000"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
              className="px-4 py-2 border rounded-lg w-32"
              placeholder="Quantidade"
            />
            <button
              onClick={generateCodes}
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <RefreshCw size={20} />
              Gerar Códigos
            </button>
          </div>

          <div className="space-y-3">
            {codes.map((code, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <span className="text-lg font-mono">{code}</span>
                <button
                  onClick={() => copyToClipboard(code)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Copy size={20} />
                  Copiar código
                </button>
              </div>
            ))}
          </div>

          {codes.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              Clique em "Gerar Códigos" para começar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;