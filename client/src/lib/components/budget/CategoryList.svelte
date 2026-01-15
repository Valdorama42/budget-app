<script>
    import ItemList from "./ItemList.svelte";
    import AddItem from "./AddItem.svelte";
    import { useBudgetState } from "$lib/states/budgetState.svelte.js";
    import { useItemState } from "$lib/states/itemState.svelte.js";
    import { useTransactionState } from "$lib/states/transactionState.svelte.js";

    const budgetState = useBudgetState();
    const itemState = useItemState();
    const txState = useTransactionState();

    const remove = (id) => {
      budgetState.removeCategory(id);
    };

    const planned = (id) => {
        return itemState.totalPlannedForCategory(id);
    };

    const spentForCategory = (id) => {
        const items = itemState.itemsForCategory(id);

        return items.reduce((sum, item) => 
            sum + txState.totalSpentForItem(item.id), 0)
    };

</script>

<ul class="mx-auto w-full max-w-6xl space-y-6">
    {#each budgetState.categories as category}
        <li class="group relative rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm overflow-hidden transition hover:shadow-md">

            <div class="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-blue-500
                via-indigo-500 to-sky-500 opacity-70"></div>

            <div class="flex flex-col gap-5">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 class="text-xl font-semibold tracking-tight text-slate-900
                                   group-hover:text-indigo-600 transition-colors">
                            <a href={`/`}>
                                {category.name}
                            </a>
                        </h2>
                        <div class="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                            <span class="inline-flex items-center rounded-full bg-slate-100 px-2 py-1">
                                Suunniteltu: €{planned(category.id).toFixed(2)}
                            </span>
                            <span class="inline-flex items-center rounded-full bg-slate-100 px-2 py-1">
                                Käytetty: €{spentForCategory(category.id).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button
                        class="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50"
                        onclick={() => remove(category.id)}
                    >
                        Poista 🗑️
                    </button>
                </div>

                <div class="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-3">
                    <ItemList categoryId = {category.id} />
                </div>
                <div class="rounded-2xl border border-slate-200/70 bg-white p-3">
                    <AddItem categoryId = {category.id}/>
                </div>
            </div>
        </li>
    {/each}
</ul>
