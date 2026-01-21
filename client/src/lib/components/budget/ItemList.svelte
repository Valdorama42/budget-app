<script>
    import { useItemState } from "$lib/states/itemState.svelte.js";
    import { useSelectedItemState } from "$lib/states/selectedItemState.svelte.js";
    import { useTransactionState } from "$lib/states/transactionState.svelte.js";
  
    const itemState = useItemState();
    const selectionState = useSelectedItemState();
    const txState = useTransactionState();

    const { categoryId } = $props();

    const remove = (id) => {
      itemState.removeItem(id);
    };

    const spent = (id) => {
      return txState.totalSpentForItem(id);
    };

    const planned = (id) => {
      return itemState.items.find((item) => item.id === id)?.planned ?? 0;
    };

    const progress = (id) => {
      const plannedAmount = planned(id);
      if (plannedAmount === 0) return 0;
      return Math.min(spent(id) / plannedAmount, 1);
    };
  </script>
  
<div class="space-y-2">
  <ul class="divide-y divide-slate-200 rounded-xl border border-slate-200/70 bg-white">
    {#each itemState.itemsForCategory(categoryId) as item}
      <li class="px-2 pb-2 pt-2">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            class="flex min-w-0 flex-1 flex-col gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-indigo-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:flex-row sm:items-center sm:justify-between"
            onclick={() => selectionState.selectItem(item.id)}
          >
            <span class="min-w-0 truncate font-medium text-slate-800">{item.name}</span>
        
            <span class="flex items-center gap-2">
              <span class="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Suunn:
              </span>
              <input
                class="w-20 rounded-md border border-slate-200 bg-white px-2 py-1 text-right text-sm font-medium text-slate-700 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-24"
                type="number"
                step="0.01"
                inputmode="decimal"
                value={item.planned.toFixed(2)}
                aria-label="Suunniteltu summa"
                title="Suunniteltu summa"
                onclick={(e) => e.stopPropagation()}
                oninput={(e) => itemState.setPlanned(item.id, e.currentTarget.value)}
              />
            </span>
          </button>
        
          <button
            type="button"
            class="inline-flex self-start items-center justify-center rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50 sm:self-auto"
            onclick={() => remove(item.id)}
          >
            Poista
          </button>
        </div>
        <div class="mt-0.5 rounded-full bg-slate-100">
          <div
            class="h-0.5 rounded-full bg-indigo-400/70 transition-[width] duration-300"
            style={`width: ${progress(item.id) * 100}%`}
          ></div>
        </div>
      </li>
    {/each}
  </ul>
</div>
