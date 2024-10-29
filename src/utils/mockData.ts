import { WiFiNetwork } from '../types/network';

export function generateMockNetworks(): WiFiNetwork[] {
  const networks: WiFiNetwork[] = [
    {
      id: '1',
      ssid: 'Home-Network-5G',
      signalStrength: -45,
      security: 'WPA3',
      channel: 36,
      frequency: 5,
      lastSeen: new Date()
    },
    {
      id: '2',
      ssid: 'Neighbor-WiFi',
      signalStrength: -65,
      security: 'WPA2',
      channel: 6,
      frequency: 2.4,
      lastSeen: new Date()
    },
    {
      id: '3',
      ssid: 'Coffee-Shop',
      signalStrength: -75,
      security: 'WPA2',
      channel: 11,
      frequency: 2.4,
      lastSeen: new Date()
    },
    {
      id: '4',
      ssid: 'Guest-Network',
      signalStrength: -55,
      security: 'WPA2',
      channel: 44,
      frequency: 5,
      lastSeen: new Date()
    },
    {
      id: '5',
      ssid: 'Public-WiFi',
      signalStrength: -85,
      security: 'Open',
      channel: 1,
      frequency: 2.4,
      lastSeen: new Date()
    }
  ];

  return networks;
}