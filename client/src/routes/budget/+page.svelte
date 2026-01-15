<script>
    import CategoryList from "$lib/components/budget/CategoryList.svelte";
    import BudgetOverview from "$lib/components/budget/BudgetOverview.svelte";
    import ItemDrawer from "$lib/components/budget/ItemDrawer.svelte";
    import ItemPanel from "$lib/components/budget/ItemPanel.svelte";
    import { useItemState } from "$lib/states/itemState.svelte.js";
    import { useTransactionState } from "$lib/states/transactionState.svelte.js";

    const itemState = useItemState();
    const txState = useTransactionState();

    let planned = $derived(itemState.totalPlanned.toFixed(2));
    let spent = $derived(txState.totalSpent.toFixed(2));
    let remaining = $derived((planned - spent).toFixed(2));

    let monthLabel = new Date().toLocaleString("fi-FI", { month: "long", year: "numeric" }).toUpperCase();
</script>

<div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50">
    <div class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-6">
            <div class="flex flex-col gap-8">
                <BudgetOverview {monthLabel} {planned} {spent} {remaining}/>

                <CategoryList />
            </div>

            <aside class="hidden lg:block lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
                <ItemPanel />
            </aside>
        </div>
    </div>
</div>

<ItemDrawer />
