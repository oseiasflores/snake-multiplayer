<script lang="ts">
  import { onMount } from 'svelte';
  import { type WiFiNetwork } from '../services/wifi.service';
  
  export let networks: WiFiNetwork[] = [];

  let canvasView;
  
  $: if (canvasView && networks.length) {
    drawGraph();
  }

  function calculateScore(network: WiFiNetwork): number {
    const signalScore = Math.min(Math.max(100 + network.signalStrength, 0), 100);
    const securityScore = network.security.includes('WPA3') ? 100 :
                         network.security.includes('WPA2') ? 80 :
                         network.security.includes('WPA') ? 60 : 0;
    
    return (signalScore * 0.7) + (securityScore * 0.3);
  }

  function drawGraph() {
    // Implementation would use NativeScript Canvas API to draw
    // bar charts or network quality visualizations
  }

  onMount(() => {
    // Canvas initialization
  });
</script>

<scrollView>
  <stackLayout>
    <label text="Network Quality Ranking" class="title" />
    {#each networks.sort((a, b) => calculateScore(b) - calculateScore(a)) as network}
      <gridLayout rows="auto" columns="*, auto" class="graph-item">
        <stackLayout col="0">
          <label text={network.ssid} class="network-name" />
          <progressBar 
            value={calculateScore(network)} 
            maxValue={100} 
            class="progress"
          />
        </stackLayout>
        <label 
          col="1" 
          text={`${Math.round(calculateScore(network))}%`} 
          class="score"
        />
      </gridLayout>
    {/each}
  </stackLayout>
</scrollView>

<style>
  .title {
    font-size: 20;
    font-weight: bold;
    padding: 16;
    text-align: center;
  }

  .graph-item {
    padding: 12;
    margin: 4 8;
    background-color: white;
    border-radius: 8;
  }

  .network-name {
    font-size: 16;
    margin-bottom: 4;
  }

  .progress {
    height: 4;
  }

  .score {
    font-size: 16;
    font-weight: bold;
    margin-left: 8;
  }
</style>