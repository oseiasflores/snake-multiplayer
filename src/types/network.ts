export interface WiFiNetwork {
  id: string;
  ssid: string;
  signalStrength: number;
  security: 'WPA3' | 'WPA2' | 'WPA' | 'Open';
  channel: number;
  frequency: 2.4 | 5;
  lastSeen: Date;
}