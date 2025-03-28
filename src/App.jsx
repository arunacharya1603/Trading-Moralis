import { useState } from 'react';
import './App.css'
import { Moralis } from './components/MoralisProvider'

function App() {
  const [selectedToken, setSelectedToken] = useState('');
  const solanaTokens = [
    { 
      address: "iEY1yWnZ5fPTNSSNrQ1qdK3KcpKXdeMJeSavYr7some", 
      symbol: "FUN", 
      name: "PumpFun Token" 
    },
    { 
      address: "DDQUyaW34zU1iK2rg4UPHTwUoFcQTic9j1MdRqtsome", 
      symbol: "FUNUP", 
      name: "PumpFun UP" 
    },
    { 
      address: "KXWXABsvCSrknBcVFhwnUQbrR6d7iZWK58TsYm9some", 
      symbol: "FUNDN", 
      name: "PumpFun DOWN" 
    },
    { 
      address: "FNTiApkCRrczcYiy2bZSqzJCq9FN3XYxkAQScQhDNUKh", 
      symbol: "FUNDN", 
      name: "PumpFun DOWN" 
    },
    { 
      address: "xy3inpitiZjje8Ki2PZkJN53Mw51fz1PV5B6XGosome", 
      symbol: "FUNDN", 
      name: "PumpFun DOWN" 
    },
    { 
      address: "S6pgkV55LWmE94fTbFTi57SB2M8VhRNqbepziXgsome", 
      symbol: "FUNDN", 
      name: "PumpFun DOWN" 
    },
    { 
      address: "R2t9jUxGN5Hf1rNPZ6721gVuDmhzo6ofnS4Mnnpsome", 
      symbol: "FUNDN", 
      name: "PumpFun DOWN" 
    },
    // Add more PumpFun tokens as needed
  ];

  const handleTokenSelect = (event) => {
    const selectedToken = event.target.value;
    setSelectedToken(selectedToken);
    try {
      // Validate Solana address
    } catch (error) {
      console.error("Invalid Solana address");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f1724] to-[#1a2332]">
      <header className="bg-[#1a2332]/80 backdrop-blur-md text-gray-200 px-4 sm:px-6 py-4 border-b border-gray-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            My Dapp
          </h1>
        </div>
      </header>
      
      <main className="flex-1 p-0 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-[#1a2332]/80 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/30 px-2 sm:p-6 pt-8 sm:pt-10">
            <div className="mb-6">
              <label className="block text-gray-200 text-lg font-medium mb-3">Select PumpFun Token</label>
              <select 
                onChange={handleTokenSelect}
                className="w-full sm:w-64 p-3 bg-[#0f1724] text-gray-200 rounded-lg border border-gray-700/50 
                           hover:border-blue-400/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 
                           transition-all duration-200 outline-none cursor-pointer"
              >
                <option value="">Choose a token</option>
                {solanaTokens.map((token) => (
                  <option key={token.address} value={token.address}>
                    {token.symbol} - {token.name}
                  </option>
                ))}
              </select>
            </div>
            <Moralis tokenAddress={selectedToken} />
          </div>
        </div>
      </main>
      
      <footer className="bg-[#1a2332]/80 backdrop-blur-md text-gray-400 py-4 text-sm border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto text-center">
          © 2024 My Dapp • All rights reserved
        </div>
      </footer>
    </div>
  )
}

export default App
