<script lang="ts">
  import type { ParseConfig } from 'papaparse';
  import Papa from 'papaparse';
  import { onMount } from 'svelte';
  import type { ParseStepResult } from 'papaparse';
  
  interface Shop {
    スポット名: string;
    // 他のフィールドがある場合はここに追加
  }

  let shops: Shop[] = [];

  onMount(async () => {
    const res = await fetch('https://example.com/data.csv');
    const csvText = await res.text();
    Papa.parse(csvText, {
      header: true,
      complete: (results: ParseStepResult<Shop>) => {
        shops = results.data;
      }
    } as ParseConfig<Shop>);
  });
</script>

{#if shops.length > 0}
  <ul>
    {#each shops as shop}
      <li>{shop['スポット名']}</li>
    {/each}
  </ul>
{/if}
