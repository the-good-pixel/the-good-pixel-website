<script lang="ts">
	import BrutalCard from './BrutalCard.svelte';

	let {
		title,
		description,
		icon,
		color = 'yellow'
	}: {
		title: string;
		description: string;
		icon: string;
		color?: 'yellow' | 'pink' | 'blue' | 'green' | 'red';
	} = $props();

	const colorClasses = {
		yellow: 'bg-neo-yellow',
		pink: 'bg-neo-pink',
		blue: 'bg-neo-blue',
		green: 'bg-neo-green',
		red: 'bg-neo-red'
	};
</script>

<BrutalCard hover class="group">
	<div class="flex flex-col md:flex-row gap-6">
		<div
			class="flex-shrink-0 w-16 h-16 border-4 border-neo-black flex items-center justify-center text-4xl {colorClasses[color]}"
		>
			{icon}
		</div>
		<div class="flex-1">
			<h3 class="text-xl font-bold mb-3 group-hover:translate-x-1 transition-transform duration-200">
				{title}
			</h3>
			<p class="text-gray-700 leading-relaxed">{description}</p>
		</div>
	</div>
</BrutalCard>
