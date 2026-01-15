<script>
    import { useItemState } from "$lib/states/itemState.svelte.js";

    const itemState = useItemState();

    const { categoryId } = $props();

    let name = $state("");
    let planned = 0;

    const add = (e) => {
      e.preventDefault();
      itemState.addItem(name, categoryId, planned);
      name = "";
    };
</script>

<form class="flex flex-col gap-2 sm:flex-row" onsubmit="{add}">
    <input
      class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      placeholder="Uusi rivi (esim. Sähkö)"
      bind:value={name}
    />
    <button class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300" type="submit">
      Lisää
    </button>
</form>
