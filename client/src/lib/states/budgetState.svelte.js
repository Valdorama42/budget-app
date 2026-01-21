import { browser } from "$app/environment";

const storageKey = "budget-app:categories";

const defaultCategories = [
  { id: "c1", name: "Ruoka" },
  { id: "c2", name: "Asuminen" },
  { id: "c3", name: "Liikkuminen" },
  { id: "c4", name: "Vakuutukset" },
  { id: "c5", name: "Harrastukset" },
  { id: "c6", name: "Terveys" },
  { id: "c7", name: "Tilaukset" },
  { id: "c8", name: "Koti" },
  { id: "c9", name: "Säästöt" }
];

let initialCategories = defaultCategories;

if (browser && localStorage.getItem(storageKey) != null) {
  try {
    initialCategories = JSON.parse(localStorage.getItem(storageKey));
  } catch {
    initialCategories = defaultCategories;
  }
}

let categories = $state(initialCategories);

const saveCategories = () => {
  localStorage.setItem(storageKey, JSON.stringify(categories));
};

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
      saveCategories();
    },

    removeCategory: (id) => {
      categories = categories.filter(c => c.id !== id);
      saveCategories();
    },
    
    categoryName: (id) => categories.find(c => c.id === id)?.name || "Tuntematon",
  };
};
  
export { useBudgetState };
  
