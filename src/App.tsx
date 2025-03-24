import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Loader2 } from 'lucide-react';
import { Coin } from './types';
import CoinCard from './components/CoinCard';

function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 50,
              page: 1,
              sparkline: false
            }
          }
        );
        setCoins(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cryptocurrency Tracker
          </h1>
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by coin name or symbol..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoins.map(coin => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;