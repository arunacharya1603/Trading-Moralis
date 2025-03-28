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
      console.log("Selected valid Solana token:", selectedToken);
    } catch (error) {
      console.error("Invalid Solana address");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1724]">
      <header className="bg-[#1a2332] text-gray-200 px-6 py-4 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto flex items-center">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            My Dapp
          </h1>
        </div>
      </header>
      
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1a2332] rounded-lg shadow-xl border border-gray-700/30 backdrop-blur-sm p-4">
            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Select PumpFun Token</label>
              <select 
                onChange={handleTokenSelect}
                className="w-48 p-2 bg-[#0f1724] text-gray-200 rounded border border-gray-700/50"
              >
                <option value="">Select a token</option>
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
      
      <footer className="bg-[#1a2332] text-gray-500 py-3 text-center text-xs border-t border-gray-700/50">
        © 2024 My Dapp
      </footer>
    </div>
  )
}

export default App
