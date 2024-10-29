import React from 'react';
import { WiFiNetwork } from '../types/network';
import { Signal, Lock, LockKeyhole, ShieldAlert } from 'lucide-react';

interface NetworkListProps {
  networks: WiFiNetwork[];
}

export function NetworkList({ networks }: NetworkListProps) {
  const getSignalIcon = (strength: number) => {
    if (strength >= -50) return <Signal className="w-5 h-5 text-green-600" />;
    if (strength >= -70) return <Signal className="w-5 h-5 text-yellow-600" />;
    return <Signal className="w-5 h-5 text-red-600" />;
  };

  const getSecurityIcon = (security: WiFiNetwork['security']) => {
    switch (security) {
      case 'WPA3':
        return <LockKeyhole className="w-5 h-5 text-green-600" />;
      case 'WPA2':
        return <Lock className="w-5 h-5 text-blue-600" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {networks.map((network) => (
        <div
          key={network.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getSignalIcon(network.signalStrength)}
              <div>
                <h3 className="font-semibold text-gray-900">{network.ssid}</h3>
                <p className="text-sm text-gray-600">
                  {network.frequency}GHz - Ch {network.channel}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {getSecurityIcon(network.security)}
              <span className="text-sm font-mono text-gray-700">
                {network.signalStrength} dBm
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}