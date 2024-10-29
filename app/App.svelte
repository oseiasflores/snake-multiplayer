<script lang="ts">
  import { onMount } from 'svelte';
  import { wifi } from '@nativescript/core';
  import NetworkList from './components/NetworkList.svelte';
  import NetworkGraph from './components/NetworkGraph.svelte';
  import { scanNetworks, type WiFiNetwork } from './services/wifi.service';
  
  let networks: WiFiNetwork[] = [];
  let isScanning = false;
  let autoRefresh = false;
  let refreshInterval: number;

  async function performScan() {
    isScanning = true;
    try {
      networks = await scanNetworks();
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      isScanning = false;
    }
  }

  function toggleAutoRefresh() {
    autoRefresh = !autoRefresh;
    if (autoRefresh) {
      refreshInterval = setInterval(performScan, 10000);
    } else {
      clearInterval(refreshInterval);
    }
  }

  onMount(() => {
    performScan();
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  });
</script>

<page>
  <actionBar title="WiFi Scanner" class="action-bar">
    <actionItem 
      ios.position="right" 
      android.position="right" 
      on:tap={performScan}
      text={isScanning ? 'Scanning...' : 'Scan'}
      isEnabled={!isScanning}
    />
  </actionBar>

  <gridLayout rows="auto, *, auto" class="page">
    <stackLayout row="0" class="controls">
      <switch 
        checked={autoRefresh} 
        on:checkedChange={toggleAutoRefresh}
      />
      <label text="Auto Refresh" />
    </stackLayout>

    <tabView row="1" selectedIndex={0}>
      <tabViewItem title="List">
        <NetworkList {networks} />
      </tabViewItem>
      <tabViewItem title="Graph">
        <NetworkGraph {networks} />
      </tabViewItem>
    </tabView>
  </gridLayout>
</page>

<style>
  .controls {
    padding: 10;
    background-color: #f0f0f0;
  }
</style>