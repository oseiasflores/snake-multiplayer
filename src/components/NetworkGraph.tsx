import React from 'react';
import { WiFiNetwork } from '../types/network';
import { BarChart } from 'lucide-react';

interface NetworkGraphProps {
  networks: WiFiNetwork[];
}

export function NetworkGraph({ networks }: NetworkGraphProps) {
  const calculateScore = (network: WiFiNetwork): number => {
    const signalScore = Math.min(Math.max(100 + network.signalStrength, 0), 100);
    const securityScore = 
      network.security === 'WPA3' ? 100 :
      network.security === 'WPA2' ? 80 :
      network.security === 'WPA' ? 60 : 0;
    
    return (signalScore * 0.7) + (securityScore * 0.3);
  };

  const sortedNetworks = [...networks].sort((a, b) => calculateScore(b) - calculateScore(a));

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-gray-700">
        <BarChart className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Network Quality Ranking</h2>
      </div>
      <div className="space-y-4">
        {sortedNetworks.map((network) => {
          const score = calculateScore(network);
          return (
            <div key={network.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{network.ssid}</span>
                <span className="text-gray-600">{Math.round(score)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}