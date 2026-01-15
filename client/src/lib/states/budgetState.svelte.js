let categories = $state([
  { id: "c1", name: "Ruoka" },
  { id: "c2", name: "Asuminen" },
  { id: "c3", name: "Liikkuminen" },
  { id: "c4", name: "Vakuutukset" },
  { id: "c5", name: "Harrastukset" },
  { id: "c6", name: "Terveys" },
  { id: "c7", name: "Tilaukset" },
  { id: "c8", name: "Koti" },
  { id: "c9", name: "Säästöt" }
]);

const useBudgetState = () => {
  return {
    get categories() {
      return categories;
    }, 

    addCategory: (name) => {
      if (!name) return;
      categories = [
        { id: crypto.randomUUID(), name },
        ...categories
      ];
    },

    removeCategory: (id) => {
      categories = categories.filter(c => c.id !== id);
    },
    
    categoryName: (id) => categories.find(c => c.id === id)?.name || "Tuntematon",
  };
};
  
export { useBudgetState };
  
