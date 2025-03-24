import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Coin } from '../types';

interface CoinCardProps {
  coin: Coin;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  const priceChangeIsPositive = coin.price_change_percentage_24h > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <img src={coin.image} alt={coin.name} className="w-12 h-12" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{coin.name}</h3>
          <p className="text-gray-500 uppercase">{coin.symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">${coin.current_price.toLocaleString()}</p>
          <div className={`flex items-center justify-end ${priceChangeIsPositive ? 'text-green-500' : 'text-red-500'}`}>
            {priceChangeIsPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1">{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%</span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Market Cap Rank</span>
          <span className="font-medium">#{coin.market_cap_rank}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-500">Market Cap</span>
          <span className="font-medium">${coin.market_cap.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;