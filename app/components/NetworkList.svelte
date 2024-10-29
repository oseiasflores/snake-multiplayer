<script lang="ts">
  import { type WiFiNetwork } from '../services/wifi.service';
  
  export let networks: WiFiNetwork[] = [];

  function getSignalIcon(strength: number): string {
    if (strength >= -50) return '📶';
    if (strength >= -60) return '📶';
    if (strength >= -70) return '📶';
    return '📶';
  }

  function getSecurityIcon(type: string): string {
    return type.includes('WPA3') ? '🔒' : 
           type.includes('WPA2') ? '🔐' : 
           type.includes('WPA') ? '🔓' : '⚠️';
  }
</script>

<scrollView>
  <stackLayout>
    {#each networks as network}
      <gridLayout columns="auto, *, auto, auto" class="network-item">
        <label col="0" text={getSignalIcon(network.signalStrength)} class="icon" />
        <stackLayout col="1">
          <label text={network.ssid} class="ssid" />
          <label text={`${network.frequency}GHz - Ch ${network.channel}`} class="details" />
        </stackLayout>
        <label col="2" text={getSecurityIcon(network.security)} class="icon" />
        <label col="3" text={`${network.signalStrength} dBm`} class="signal" />
      </gridLayout>
    {/each}
  </stackLayout>
</scrollView>

<style>
  .network-item {
    padding: 12;
    margin: 4 8;
    background-color: white;
    border-radius: 8;
  }

  .ssid {
    font-size: 16;
    font-weight: bold;
  }

  .details {
    font-size: 14;
    color: #666;
  }

  .icon {
    font-size: 20;
    margin: 0 8;
  }

  .signal {
    font-size: 14;
    color: #444;
  }
</style>