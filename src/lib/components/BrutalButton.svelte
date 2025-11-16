<script lang="ts">
	let {
		children,
		href = '',
		variant = 'yellow',
		class: className = '',
		onclick
	}: {
		children: any;
		href?: string;
		variant?: 'yellow' | 'pink' | 'blue' | 'green' | 'red';
		class?: string;
		onclick?: () => void;
	} = $props();

	const variantClasses = {
		yellow: 'bg-neo-yellow text-neo-black',
		pink: 'bg-neo-pink text-neo-white',
		blue: 'bg-neo-blue text-neo-black',
		green: 'bg-neo-green text-neo-black',
		red: 'bg-neo-red text-neo-white'
	};
</script>

{#if href}
	<a
		{href}
		class="inline-block px-6 py-3 font-bold border-4 border-neo-black shadow-brutal transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 active:shadow-none {variantClasses[variant]} {className}"
	>
		{@render children()}
	</a>
{:else}
	<button
		{onclick}
		class="px-6 py-3 font-bold border-4 border-neo-black shadow-brutal transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 active:shadow-none {variantClasses[variant]} {className}"
	>
		{@render children()}
	</button>
{/if}
