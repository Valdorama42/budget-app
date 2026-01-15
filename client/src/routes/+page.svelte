<svelte:head>
    <title>Budget Planner</title>
</svelte:head>

<div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50">
    <div class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-10">
            <section class="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-sm">
                <div class="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-indigo-100/70 blur-3xl"></div>
                <div class="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-slate-100/70 blur-3xl"></div>

                <div class="relative flex flex-col gap-6">
                    <p class="text-xs uppercase tracking-[0.3em] text-indigo-600">Budget Planner</p>
                    <h1 class="text-3xl font-semibold text-slate-900 sm:text-4xl">
                        A calm, focused space for monthly budgeting.
                    </h1>
                    <p class="max-w-2xl text-base text-slate-600">
                        This project is a SvelteKit + Tailwind CSS prototype that highlights clarity and fast edits.
                        Track planned spending, log transactions, and see what remains in a single view.
                    </p>
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <a
                            href="/budget"
                            class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        >
                            Go to your budget
                        </a>
                        <div class="text-sm text-slate-500">
                            Demo data lives in local state for this prototype.
                        </div>
                    </div>
                </div>
            </section>

            <section class="grid gap-6 lg:grid-cols-3">
                <div class="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
                    <p class="text-xs uppercase tracking-wide text-slate-500">Overview</p>
                    <h2 class="mt-2 text-lg font-semibold text-slate-900">Monthly snapshot</h2>
                    <p class="mt-2 text-sm text-slate-600">
                        See planned, spent, and remaining totals update as you edit items.
                    </p>
                </div>
                <div class="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
                    <p class="text-xs uppercase tracking-wide text-slate-500">Categories</p>
                    <h2 class="mt-2 text-lg font-semibold text-slate-900">Clear breakdowns</h2>
                    <p class="mt-2 text-sm text-slate-600">
                        Group expenses by category and manage line items without leaving the page.
                    </p>
                </div>
                <div class="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
                    <p class="text-xs uppercase tracking-wide text-slate-500">Tracking</p>
                    <h2 class="mt-2 text-lg font-semibold text-slate-900">Transaction detail</h2>
                    <p class="mt-2 text-sm text-slate-600">
                        Log spending per item and see progress bars adjust instantly.
                    </p>
                </div>
            </section>

            <section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div class="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
                    <h3 class="text-lg font-semibold text-slate-900">Why this project</h3>
                    <p class="mt-2 text-sm text-slate-600">
                        Built as a portfolio piece to show product thinking, UI polish, and clean state handling.
                    </p>
                    <ul class="mt-4 space-y-2 text-sm text-slate-600">
                        <li class="flex items-start gap-2">
                            <span class="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                            Responsive layout with clear hierarchy
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                            Fast, local state for a smooth demo
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                            Focus on readability and calm visual rhythm
                        </li>
                    </ul>
                </div>
                <div class="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-6 shadow-sm">
                    <p class="text-xs uppercase tracking-wide text-slate-500">Stack</p>
                    <h3 class="mt-2 text-lg font-semibold text-slate-900">SvelteKit + Tailwind</h3>
                    <div class="mt-3 space-y-2 text-sm text-slate-600">
                        <div class="rounded-lg bg-white px-3 py-2 shadow-sm">Svelte 5</div>
                        <div class="rounded-lg bg-white px-3 py-2 shadow-sm">Tailwind CSS v4</div>
                        <div class="rounded-lg bg-white px-3 py-2 shadow-sm">Vite</div>
                        <div class="rounded-lg bg-white px-3 py-2 shadow-sm">Local state stores</div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>
