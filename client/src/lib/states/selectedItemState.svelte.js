let selectedItemId = $state(null);

const useSelectedItemState = () => {
  return {
    get selectedItemId() {
      return selectedItemId;
    },

    selectItem: (id) => {
      selectedItemId = id;
    },

    clearSelectedItem: () => {
      selectedItemId = null;
    }
  };
};

export { useSelectedItemState };
