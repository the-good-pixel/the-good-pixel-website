<script lang="ts">
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';
	import TerrainBackground from '$lib/components/TerrainBackground.svelte';

	// Team member data
	const teamMembers: Record<string, {
		name: string;
		nameChinese: string;
		title: string;
		titleChinese: string;
		phone?: string;
		email: string;
	}> = {
		anthony: {
			name: 'Anthony Chiu',
			nameChinese: '趙境元',
			title: 'Software Engineer',
			titleChinese: '軟件工程師',
			phone: '(+852) 9336-1176',
			email: 'info@goodpixel.ai'
		},
		darren: {
			name: 'Darren Chiu',
			nameChinese: '趙善弘',
			title: 'Product Manager',
			titleChinese: '產品經理',
			phone: '(+852) 9673-3928',
			email: 'info@goodpixel.ai'
		},
		anson: {
			name: 'Anson Cheng',
			nameChinese: '鄭志輝',
			title: 'Project Manager',
			titleChinese: '項目經理',
			phone: '(+852) 6703 0557',
			email: 'info@goodpixel.ai'
		}
	};

	$: id = $page.params.id;
	$: member = teamMembers[id];

	// Language switcher state
	let language: 'en' | 'zh' = 'en';

	// Throw error if member not found
	$: if (!member) {
		throw error(404, 'Team member not found');
	}
</script>

<svelte:head>
	<title>{member?.name} - {member?.title} | GoodPixel.AI</title>
	<meta name="description" content="{member?.name}, {member?.title} at GoodPixel.AI - Industry-Driven AI Solutions" />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<style>
	/* Mobile: vertical card (portrait) - maintain same aspect ratio as desktop (1.75:1) but rotated */
	/* Aspect ratio: 875/500 = 1.75, so for vertical: height/width = 1.75 */
	/* Using viewport width minus padding (100vw - 3rem) */
	@media (max-width: 767px) {
		.card-container {
			width: calc(100vw - 3rem);
			max-width: 500px;
			aspect-ratio: 0.5714; /* 500/875 = inverted aspect ratio for vertical */
		}

		.card-container .logo {
			height: 2rem; /* h-8 */
		}
		.card-container .name {
			font-size: 1.875rem; /* text-3xl */
		}
		.card-container .title {
			font-size: 0.875rem; /* text-sm */
			padding: 0.5rem 1rem;
			border-width: 3px;
		}
		.card-container .contact-icon {
			width: 2rem;
			height: 2rem;
		}
		.card-container .contact-text {
			font-size: 0.875rem; /* text-sm */
		}
		.card-container .tagline {
			font-size: 0.875rem; /* text-sm */
		}
		.card-container .content-padding {
			padding: 2rem; /* p-8 */
		}
		.card-container .contact-spacing {
			gap: 0.5rem; /* space-y-2 */
		}
	}

	/* Desktop: horizontal card (landscape) */
	@media (min-width: 768px) {
		.card-container {
			width: 875px;
			height: 500px;
		}
	}
</style>

<div class="min-h-screen flex flex-col items-center justify-center bg-neo-white p-6 gap-6">
	<!-- Language Switcher -->
	<div class="flex gap-2">
		<button
			on:click={() => language = 'en'}
			class="px-6 py-3 font-bold border-4 border-neo-black transition-all {language === 'en' ? 'bg-neo-yellow' : 'bg-gray-200 text-gray-500'}"
		>
			English
		</button>
		<button
			on:click={() => language = 'zh'}
			class="px-6 py-3 font-bold border-4 border-neo-black transition-all {language === 'zh' ? 'bg-neo-yellow' : 'bg-gray-200 text-gray-500'}"
		>
			中文
		</button>
	</div>

	<div class="card-wrapper">
		<!-- English Name Card -->
		{#if language === 'en'}
		<div class="card-container relative overflow-hidden card-brutal group hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-200" style="padding: 0 !important;">
		<div class="relative bg-white h-full w-full">
			<!-- Animated Terrain Background - bottom 50% (grayscale, no padding) -->
			<div class="absolute bottom-0 left-0 w-full overflow-hidden z-10" style="height: 50%;">
				<div class="relative w-full h-full bg-gray-100">
					<div class="absolute inset-0">
						<TerrainBackground topOffset={40} />
					</div>
					<div class="absolute inset-0 bg-white opacity-70"></div>
				</div>
			</div>

			<!-- Card Content -->
			<div class="relative z-20 h-full w-full p-12 content-padding flex flex-col justify-between">
			<!-- Top Section -->
			<div>
				<!-- Logo -->
				<div class="mb-6">
					<img
						src="/assets/img/the-good-pixel-logo.png"
						alt="The Good Pixel"
						class="h-12 w-auto logo"
					/>
				</div>

				<!-- Name and Title -->
				<div>
					<h1 class="text-4xl font-bold mb-3 leading-tight name">
						{member.name}
					</h1>
					<div class="inline-block bg-neo-black text-neo-white px-4 py-2 border-4 border-neo-black font-bold text-lg title">
						{member.title}
					</div>
					<!-- Tagline - Mobile only, stacked below title -->
					<div class="md:hidden mt-3">
						<p class="text-gray-700 font-bold text-xl tagline">
							Industry-Driven AI Solutions
						</p>
					</div>
				</div>
			</div>

			<!-- Bottom Section -->
			<div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
				<!-- Contact Info -->
				<div class="space-y-3 contact-spacing">
					{#if member.phone}
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 bg-neo-yellow border-2 border-neo-black flex items-center justify-center text-sm font-bold contact-icon">
							📞
						</div>
						<a href="tel:{member.phone.replace(/\s/g, '')}" class="hover:underline font-mono text-lg contact-text">
							{member.phone}
						</a>
					</div>
					{/if}
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 bg-neo-yellow border-2 border-neo-black flex items-center justify-center text-sm font-bold contact-icon">
							@
						</div>
						<a href="mailto:{member.email}" class="hover:underline font-mono text-lg contact-text">
							{member.email}
						</a>
					</div>
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 bg-neo-blue border-2 border-neo-black flex items-center justify-center text-lg font-bold contact-icon">
							🌐
						</div>
						<a href="https://goodpixel-fbfbe.web.app" target="_blank" rel="noopener" class="hover:underline font-mono text-lg contact-text">
							goodpixel.ai
						</a>
					</div>
				</div>

				<!-- Tagline - Desktop only, shown to the right -->
				<div class="hidden md:block text-right">
					<p class="text-gray-700 font-bold text-xl tagline">
						Industry-Driven AI Solutions
					</p>
				</div>
			</div>
			</div>
		</div>
	</div>
	{/if}

	<!-- Chinese Name Card -->
	{#if language === 'zh'}
	<div class="card-container relative overflow-hidden card-brutal group hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-200" style="padding: 0 !important;">
		<div class="relative bg-white h-full w-full">
			<!-- Animated Terrain Background - bottom 50% (grayscale, no padding) -->
			<div class="absolute bottom-0 left-0 w-full overflow-hidden z-10" style="height: 50%;">
				<div class="relative w-full h-full bg-gray-100">
					<div class="absolute inset-0">
						<TerrainBackground topOffset={40} />
					</div>
					<div class="absolute inset-0 bg-white opacity-70"></div>
				</div>
			</div>

			<!-- Card Content -->
			<div class="relative z-20 h-full w-full p-12 content-padding flex flex-col justify-between">
			<!-- Top Section -->
			<div>
				<!-- Logo -->
				<div class="mb-6">
					<img
						src="/assets/img/the-good-pixel-logo.png"
						alt="The Good Pixel"
						class="h-12 w-auto logo"
					/>
				</div>

				<!-- Name and Title in Chinese -->
				<div>
					<h1 class="text-4xl font-bold mb-3 leading-tight name">
						{member.nameChinese}
					</h1>
					<div class="inline-block bg-neo-black text-neo-white px-4 py-2 border-4 border-neo-black font-bold text-lg title">
						{member.titleChinese}
					</div>
					<!-- Tagline - Mobile only, stacked below title -->
					<div class="md:hidden mt-3">
						<p class="text-gray-700 font-bold text-xl tagline">
							行業驅動的AI解決方案
						</p>
					</div>
				</div>
			</div>

			<!-- Bottom Section -->
			<div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
				<!-- Contact Info -->
				<div class="space-y-3 contact-spacing">
					{#if member.phone}
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 bg-neo-yellow border-2 border-neo-black flex items-center justify-center text-sm font-bold contact-icon">
							📞
						</div>
						<a href="tel:{member.phone.replace(/\s/g, '')}" class="hover:underline font-mono text-lg contact-text">
							{member.phone}
						</a>
					</div>
					{/if}
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 bg-neo-yellow border-2 border-neo-black flex items-center justify-center text-sm font-bold contact-icon">
							@
						</div>
						<a href="mailto:{member.email}" class="hover:underline font-mono text-lg contact-text">
							{member.email}
						</a>
					</div>
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 bg-neo-blue border-2 border-neo-black flex items-center justify-center text-lg font-bold contact-icon">
							🌐
						</div>
						<a href="https://goodpixel-fbfbe.web.app" target="_blank" rel="noopener" class="hover:underline font-mono text-lg contact-text">
							goodpixel.ai
						</a>
					</div>
				</div>

				<!-- Tagline in Chinese - Desktop only, shown to the right -->
				<div class="hidden md:block text-right">
					<p class="text-gray-700 font-bold text-xl tagline">
						行業驅動的AI解決方案
					</p>
				</div>
			</div>
			</div>
		</div>
	</div>
	{/if}
	</div>
</div>
