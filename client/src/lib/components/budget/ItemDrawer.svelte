<script>
  import ItemPanelContent from "./ItemPanelContent.svelte";
  import { useSelectedItemState } from "$lib/states/selectedItemState.svelte.js";

  const selectionState = useSelectedItemState();

  const itemId = $derived(selectionState.selectedItemId);
  const open = $derived(Boolean(itemId));

  const closeDrawer = () => {
    selectionState.clearSelectedItem();
  };
</script>

{#if open}
  <div class="fixed inset-0 z-50 lg:hidden">
    <!-- backdrop -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onclick={closeDrawer}></div>

    <!-- panel -->
    <div class="absolute right-0 top-0 h-full w-full max-w-md rounded-l-3xl border-l border-slate-200 bg-white p-6 shadow-xl">
      <ItemPanelContent {itemId} onClose={closeDrawer} />
    </div>
  </div>
{/if}