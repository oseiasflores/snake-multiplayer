import { wifi } from '@nativescript/core';

export interface WiFiNetwork {
  ssid: string;
  signalStrength: number;
  security: string;
  channel: number;
  frequency: number;
}

export async function scanNetworks(): Promise<WiFiNetwork[]> {
  try {
    const wifiManager = wifi.getWifiManager();
    
    // Request necessary permissions
    await wifi.requestPermissions();
    
    // Start scan
    const scanResults = await wifiManager.startScan();
    
    return scanResults.map(result => ({
      ssid: result.SSID,
      signalStrength: result.level,
      security: getSecurityType(result.capabilities),
      channel: calculateChannel(result.frequency),
      frequency: result.frequency > 5000 ? 5 : 2.4
    }));
  } catch (error) {
    console.error('WiFi scan error:', error);
    throw error;
  }
}

function getSecurityType(capabilities: string): string {
  if (capabilities.includes('WPA3')) return 'WPA3';
  if (capabilities.includes('WPA2')) return 'WPA2';
  if (capabilities.includes('WPA')) return 'WPA';
  return 'Open';
}

function calculateChannel(frequency: number): number {
  if (frequency >= 2412 && frequency <= 2484) {
    return Math.floor((frequency - 2412) / 5) + 1;
  } else if (frequency >= 5170 && frequency <= 5825) {
    return Math.floor((frequency - 5170) / 5) + 34;
  }
  return 0;
}