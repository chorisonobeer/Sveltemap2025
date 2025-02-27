<!-- Sveltemap2025/src/routes/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import Papa from 'papaparse';
    import config from '$lib/config.json';
  
    interface ShopData {
      緯度: string;
      経度: string;
      スポット名: string;
      カテゴリ: string;
    }
  
    let shopData: ShopData[] = [];
  
    onMount(async () => {
      const res = await fetch(config.data_url);
      const csvText = await res.text();
      Papa.parse(csvText, {
        header: true,
        complete: (results: { data: any[] }) => {
          // results.data に CSV の内容がオブジェクト配列として入る
          shopData = results.data.filter(row => row['緯度'] && row['経度'] && row['スポット名']);
        }
      });
    });
  </script>
  
  <h1>{config.title}</h1>
  <p>{config.description}</p>
  
  {#if shopData.length > 0}
    <h2>データが取得できました</h2>
    <ul>
      {#each shopData as shop}
        <li>{shop['スポット名']} - {shop['カテゴリ']}</li>
      {/each}
    </ul>
  {:else}
    <p>読み込み中…</p>
  {/if}
  