<script lang="ts">
	let { children, class: className = '', hover = false } = $props();
</script>

<div
	class="card-brutal {className} {hover ? 'hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-200' : ''}"
>
	{@render children()}
</div>
