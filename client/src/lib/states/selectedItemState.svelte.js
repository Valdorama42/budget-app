import { browser } from "$app/environment";

const storageKey = "budget-app:selectedItemId";
let initialSelectedItemId = null;

if (browser && localStorage.getItem(storageKey) != null) {
  try {
    initialSelectedItemId = JSON.parse(localStorage.getItem(storageKey));
  } catch {
    initialSelectedItemId = null;
  }
}

let selectedItemId = $state(initialSelectedItemId);

const saveSelectedItemId = () => {
  localStorage.setItem(storageKey, JSON.stringify(selectedItemId));
};

const useSelectedItemState = () => {
  return {
    get selectedItemId() {
      return selectedItemId;
    },

    selectItem: (id) => {
      selectedItemId = id;
      saveSelectedItemId();
    },

    clearSelectedItem: () => {
      selectedItemId = null;
      saveSelectedItemId();
    }
  };
};

export { useSelectedItemState };
