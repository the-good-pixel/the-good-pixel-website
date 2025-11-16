<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>GoodPixel.AI</title>
	<meta name="description" content="GoodPixel.AI is a team of young professionals excelling in Software Development, Digital Marketing, Machine Learning, and Artificial Intelligence." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
</svelte:head>

{@render children()}
