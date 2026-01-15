<script>
    let { monthLabel, planned, spent, remaining } = $props();
</script>

<div class="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm">
  <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-100/70 blur-2xl"></div>
  <div class="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <div class="text-md font-semibold uppercase tracking-[0.2em] text-indigo-600">Budjetti</div>
      <h1 class="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{monthLabel}</h1>
      <div class="text-sm text-slate-500">Prototyyppi · paikallinen</div>
    </div>
    
    <!-- Remaining budget -->
    <div class="rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-right shadow-sm">
      <div class="text-sm font-medium text-slate-500">Jäljellä</div>
      <div class="text-2xl font-semibold text-slate-900">€{remaining}</div>
      <div class="mt-1 text-xs text-slate-500">
        Budjetoitu €{planned} · Käytetty €{spent}
      </div>
    </div>
  </div>
</div>
