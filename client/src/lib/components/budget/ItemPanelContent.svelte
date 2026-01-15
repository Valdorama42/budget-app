<script>
  import { useItemState } from "$lib/states/itemState.svelte.js";
  import { useTransactionState } from "$lib/states/transactionState.svelte.js";

  const itemState = useItemState();
  const txState = useTransactionState();

  const { itemId = null, onClose = () => {} } = $props();

  const item = $derived(itemId ? itemState.items.find((candidate) => candidate.id === itemId) : null);
  const transactions = $derived(itemId ? txState.transactionsForItem(itemId) : []);
  const totalSpent = $derived(itemId ? txState.totalSpentForItem(itemId) : 0);

  const todayIso = () => new Date().toLocaleDateString("sv-SE");
  let txDate = $state(todayIso());
  let txAmount = $state("");
  let txNote = $state("");

  const addTransaction = (event) => {
    event.preventDefault();
    if (!itemId) return;

    txState.addTransaction({
      date: txDate,
      amount: txAmount,
      note: txNote,
      itemId
    });

    txAmount = "";
    txNote = "";
    txDate = todayIso();
  };

  const removeTransaction = (id) => {
    txState.removeTransaction(id);
  };
</script>

<div>
  <div class="flex items-center justify-between">
    <div class="text-sm font-semibold uppercase tracking-wide text-indigo-600">Rivi</div>
    <button class="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-50" type="button" onclick={onClose}>
      Sulje
    </button>
  </div>

  {#if item}
    <div class="mt-6 space-y-5">
      <div>
        <div class="text-xs uppercase tracking-wide text-slate-500">Nimi</div>
        <div class="text-xl font-semibold text-slate-900">{item.name}</div>
      </div>

      <div class="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
        <div class="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
          <div class="text-xs text-slate-500">Suunniteltu</div>
          <div class="text-base font-semibold text-slate-900">€{item.planned.toFixed(2)}</div>
        </div>
        <div class="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
          <div class="text-xs text-slate-500">Käytetty</div>
          <div class="text-base font-semibold text-slate-900">€{totalSpent.toFixed(2)}</div>
        </div>
        <div class="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
          <div class="text-xs text-slate-500">Jäljellä</div>
          <div class="text-base font-semibold text-slate-900">€{(item.planned - totalSpent).toFixed(2)}</div>
        </div>
      </div>

      <form class="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3" onsubmit={addTransaction}>
        <div class="text-xs uppercase tracking-wide text-slate-500">Lisää tapahtuma</div>
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <input
            class="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            type="date"
            bind:value={txDate}
          />
          <input
            class="rounded-md border border-slate-200 bg-white px-2 py-1 text-right text-sm text-slate-700 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            type="number"
            step="0.01"
            placeholder="0.00"
            bind:value={txAmount}
          />
        </div>
        <input
          class="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          type="text"
          placeholder="Muistiinpano"
          bind:value={txNote}
        />
        <button class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300" type="submit">
          Lisää
        </button>
      </form>

      <div>
        <div class="text-xs uppercase tracking-wide text-slate-500">Tapahtumat</div>
        {#if transactions.length === 0}
          <div class="mt-2 text-sm text-slate-600">Ei tapahtumia tälle riville.</div>
        {:else}
          <ul class="mt-2 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {#each transactions as tx (tx.id)}
              <li class="p-3 text-sm">
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-slate-900">€{tx.amount.toFixed(2)}</span>
                  <span class="text-xs text-slate-500">{tx.date}</span>
                </div>
                {#if tx.note}
                  <div class="text-xs text-slate-600">{tx.note}</div>
                {/if}
                <button class="mt-2 inline-flex items-center justify-center rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50" onclick={() => removeTransaction(tx.id)}>
                  Poista
                </button>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  {:else}
    <div class="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4 text-sm text-slate-600">
      Valitse budjettirivi listasta.
    </div>
  {/if}
</div>
