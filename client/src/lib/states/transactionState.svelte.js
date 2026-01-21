import { browser } from "$app/environment";

const storageKey = "budget-app:transactions";

const defaultTransactions = [
    { id: "t1", date: "2026-01-02", amount: 45.60, note: "K-Market", itemId: "i1" },
    { id: "t2", date: "2026-01-05", amount: 32.10, note: "Prisma", itemId: "i1" },
    { id: "t3", date: "2026-01-09", amount: 54.20, note: "Lidl", itemId: "i1" },
    { id: "t4", date: "2026-01-11", amount: 28.00, note: "Ravintola", itemId: "i2" },
    { id: "t5", date: "2026-01-20", amount: 6.20, note: "Kahvila", itemId: "i9" },
    { id: "t6", date: "2026-01-01", amount: 720.00, note: "Vuokra", itemId: "i3" },
    { id: "t7", date: "2026-01-03", amount: 68.50, note: "Sähkölasku", itemId: "i4" },
    { id: "t8", date: "2026-01-04", amount: 19.00, note: "Vesi", itemId: "i10" },
    { id: "t9", date: "2026-01-06", amount: 30.00, note: "Netti", itemId: "i11" },
    { id: "t10", date: "2026-01-02", amount: 60.00, note: "HSL", itemId: "i6" },
    { id: "t11", date: "2026-01-08", amount: 35.00, note: "Bensiini", itemId: "i12" },
    { id: "t12", date: "2026-01-19", amount: 22.00, note: "Bensiini", itemId: "i12" },
    { id: "t13", date: "2026-01-05", amount: 50.00, note: "Pyörävakuutus", itemId: "i5" },
    { id: "t14", date: "2026-01-05", amount: 18.00, note: "Kotivakuutus", itemId: "i14" },
    { id: "t15", date: "2026-01-05", amount: 12.00, note: "Matkavakuutus", itemId: "i15" },
    { id: "t16", date: "2026-01-07", amount: 50.00, note: "Salijäsenyys", itemId: "i7" },
    { id: "t17", date: "2026-01-12", amount: 25.00, note: "Musiikkikurssi", itemId: "i8" },
    { id: "t18", date: "2026-01-13", amount: 12.90, note: "Kirja", itemId: "i16" },
    { id: "t19", date: "2026-01-14", amount: 9.70, note: "Apteekki", itemId: "i18" },
    { id: "t20", date: "2026-01-15", amount: 35.00, note: "Hammaslääkäri", itemId: "i19" },
    { id: "t21", date: "2026-01-02", amount: 11.99, note: "Spotify", itemId: "i21" },
    { id: "t22", date: "2026-01-02", amount: 15.99, note: "Netflix", itemId: "i22" },
    { id: "t23", date: "2026-01-02", amount: 2.99, note: "iCloud", itemId: "i23" },
    { id: "t24", date: "2026-01-02", amount: 9.90, note: "Sanomalehti", itemId: "i24" },
    { id: "t25", date: "2026-01-09", amount: 8.50, note: "Pesuaineet", itemId: "i25" },
    { id: "t26", date: "2026-01-03", amount: 150.00, note: "Säästöön", itemId: "i28" }
  ];

let initialTransactions = defaultTransactions;

if (browser && localStorage.getItem(storageKey) != null) {
    try {
        initialTransactions = JSON.parse(localStorage.getItem(storageKey));
    } catch {
        initialTransactions = defaultTransactions;
    }
}

let transactions = $state(initialTransactions);

const saveTransactions = () => {
    localStorage.setItem(storageKey, JSON.stringify(transactions));
};

const useTransactionState = () => {
    return {
        get transactions() {
            return transactions;
        },
        get totalSpent() {
            return transactions.reduce((sum, t) => sum + t.amount, 0);
        },

        addTransaction: ({ date, amount, note, itemId }) => {
            if (!amount || !itemId) return;

            transactions = [
                {
                    id: crypto.randomUUID(),
                    date,
                    amount: Number(amount) || 0,
                    note: note || "",
                    itemId
                },
                ...transactions
            ];
            saveTransactions();
        },

        removeTransaction: (id) => {
            transactions = transactions.filter(t => t.id !== id);
            saveTransactions();
        },

        totalSpentForItem: (itemId) => {
            return transactions
                .filter(t => t.itemId === itemId)
                .reduce((sum, t) => sum + t.amount, 0);
        },

        transactionsForItem: (itemId) => {
            return transactions.filter(t => t.itemId === itemId);
        },
    };
};

export { useTransactionState };
