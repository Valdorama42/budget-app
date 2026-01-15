<script>
  import ItemPanelContent from "./ItemPanelContent.svelte";
  import { useSelectedItemState } from "$lib/states/selectedItemState.svelte.js";

  const selectionState = useSelectedItemState();

  const itemId = $derived(selectionState.selectedItemId);

  const clearSelection = () => {
    selectionState.clearSelectedItem();
  };
</script>

<div class="h-full overflow-y-auto rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
  <ItemPanelContent {itemId} onClose={clearSelection} />
</div>
