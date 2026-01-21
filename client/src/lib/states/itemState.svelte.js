import { browser } from "$app/environment";

const storageKey = "budget-app:items";

const defaultItems = [
    { id: "i1", name: "Ruokakauppa", categoryId: "c1", planned: 240 },
    { id: "i2", name: "Ravintola", categoryId: "c1", planned: 90 },
    { id: "i9", name: "Kahvila", categoryId: "c1", planned: 25 },
    { id: "i3", name: "Vuokra", categoryId: "c2", planned: 720 },
    { id: "i4", name: "Sähkö", categoryId: "c2", planned: 110 },
    { id: "i10", name: "Vesi", categoryId: "c2", planned: 20 },
    { id: "i11", name: "Netti", categoryId: "c2", planned: 30 },
    { id: "i6", name: "Bussikortti", categoryId: "c3", planned: 60 },
    { id: "i12", name: "Polttoaine", categoryId: "c3", planned: 80 },
    { id: "i13", name: "Pysäköinti", categoryId: "c3", planned: 20 },
    { id: "i5", name: "Pyörävakuutus", categoryId: "c4", planned: 50 },
    { id: "i14", name: "Kotivakuutus", categoryId: "c4", planned: 18 },
    { id: "i15", name: "Matkavakuutus", categoryId: "c4", planned: 12 },
    { id: "i7", name: "Salijäsenyys", categoryId: "c5", planned: 50 },
    { id: "i8", name: "Musiikkikurssit", categoryId: "c5", planned: 25 },
    { id: "i16", name: "Kirjat", categoryId: "c5", planned: 20 },
    { id: "i17", name: "Elokuvat", categoryId: "c5", planned: 15 },
    { id: "i18", name: "Lääkkeet", categoryId: "c6", planned: 25 },
    { id: "i19", name: "Hammaslääkäri", categoryId: "c6", planned: 40 },
    { id: "i20", name: "Hyvinvointi", categoryId: "c6", planned: 30 },
    { id: "i21", name: "Spotify", categoryId: "c7", planned: 11.99 },
    { id: "i22", name: "Netflix", categoryId: "c7", planned: 15.99 },
    { id: "i23", name: "iCloud", categoryId: "c7", planned: 2.99 },
    { id: "i24", name: "Sanomalehti", categoryId: "c7", planned: 9.90 },
    { id: "i25", name: "Siivoustarvikkeet", categoryId: "c8", planned: 15 },
    { id: "i26", name: "Huoltotarvikkeet", categoryId: "c8", planned: 20 },
    { id: "i27", name: "Kodin sisustus", categoryId: "c8", planned: 40 },
    { id: "i28", name: "Säästöön", categoryId: "c9", planned: 150 },
    { id: "i29", name: "Hätärahasto", categoryId: "c9", planned: 50 }
  ];

let initialItems = defaultItems;

if (browser && localStorage.getItem(storageKey) != null) {
    try {
        initialItems = JSON.parse(localStorage.getItem(storageKey));
    } catch {
        initialItems = defaultItems;
    }
}

let items = $state(initialItems);

const saveItems = () => {
    localStorage.setItem(storageKey, JSON.stringify(items));
};

const useItemState = () => {
    return {
        get items() {
            return items;
        },
        get totalPlanned() {
            return items.reduce((sum, i) => sum + i.planned, 0);
        }, 
        
        addItem: (name, categoryId, planned) => {
            if (!name || !categoryId) return;
            items = [
                { id: crypto.randomUUID(), name, categoryId, planned: Number(planned) || 0 },
                ...items
            ];
            saveItems();
        },
    
        removeItem: (id) => {
            items = items.filter(i => i.id !== id);
            saveItems();
        },
    
        setPlanned: (id, value) => {
            items = items.map(i =>
                i.id === id ? { ...i, planned: Number(value) || 0 } : i
            );
            saveItems();
        },
        totalPlannedForCategory: (categoryId) => {
            return items
                .filter(i => i.categoryId === categoryId)
                .reduce((sum, i) => sum + i.planned, 0);
        },

        itemsForCategory: (categoryId) => {
            return items.filter(i => i.categoryId === categoryId);
        },
    };
};

export { useItemState };
