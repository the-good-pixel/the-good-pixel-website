<script lang="ts">
	import BrutalButton from '$lib/components/BrutalButton.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import GameOfLifeBackground from '$lib/components/GameOfLifeBackground.svelte';
	import TerrainBackground from '$lib/components/TerrainBackground.svelte';

	const currentYear = new Date().getFullYear();
</script>

<svelte:head>
	<title>GoodPixel.AI - AI & Software Solutions</title>
</svelte:head>

<div class="min-h-screen font-sans">
	<!-- Header -->
	<header class="border-b-4 border-neo-black bg-neo-white sticky top-0 z-50 h-20">
		<nav class="container mx-auto px-6 h-full flex items-center justify-between">
			<div class="flex items-center">
				<img
					src="/assets/img/the-good-pixel-logo.png"
					alt="The Good Pixel"
					class="h-8 md:h-12 w-auto"
				/>
			</div>
		</nav>
	</header>

	<!-- Hero Section -->
	<section class="relative bg-gradient-to-br from-neo-yellow to-neo-blue border-b-4 border-neo-black overflow-hidden min-h-[calc(100vh-5rem)] flex items-center">
		<div class="absolute inset-0 z-0">
			<GameOfLifeBackground />
		</div>
		<!-- Semi-transparent overlay for better text readability -->
		<div class="absolute inset-0 bg-white/30 z-10"></div>
		<div class="container mx-auto px-6 relative z-20">
			<div class="max-w-3xl">
				<div class="inline-block bg-neo-black text-neo-white px-4 py-2 mb-6 border-4 border-neo-black font-mono text-sm">
					GOODPIXEL.AI
				</div>
				<h1 class="text-4xl md:text-7xl font-bold mb-6 leading-tight">
					Industry-Driven AI, Software, and Hardware Solutions.
				</h1>
				<p class="text-xl md:text-2xl mb-8 text-gray-800">
					We build vertical AI and custom technology solutions tailored to your industry's unique challenges. From manufacturing automation to domain-specific intelligence systems.
				</p>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section class="py-24 bg-neo-white border-b-4 border-neo-black" id="about">
		<div class="container mx-auto px-6">
			<div class="max-w-4xl mx-auto">
				<h2 class="text-4xl md:text-5xl font-bold mb-6">Who we are</h2>
				<div class="space-y-4 text-lg text-gray-700 leading-relaxed">
					<p>
						We specialize in building <strong>vertical AI and industry-specific solutions</strong> that solve
						real problems in manufacturing, logistics, healthcare, and beyond. Our team combines deep
						technical expertise in Software Development, Machine Learning, AI, and Hardware Engineering
						with a focus on understanding your industry's unique challenges.
					</p>
					<p>
						Unlike generic technology providers, we develop solutions that speak your industry's language.
						From custom robotics for specialized manufacturing processes to AI systems trained on
						domain-specific data, we build technology that integrates seamlessly with your existing
						operations and delivers measurable results.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Services Section -->
	<section class="relative py-24 bg-gradient-to-br from-neo-blue to-neo-green border-b-4 border-neo-black overflow-hidden">
		<div class="absolute inset-0 z-0">
			<TerrainBackground />
		</div>
		<!-- Semi-transparent overlay for better text readability -->
		<div class="absolute inset-0 bg-white/30 z-10"></div>
		<div class="container mx-auto px-6 relative z-20">
			<h2 class="text-4xl md:text-5xl font-bold mb-16 text-center">Our Services</h2>
			<div class="grid gap-8 max-w-5xl mx-auto">
				<ServiceCard
					title="Vertical AI Feasibility & Strategy"
					description="We evaluate how AI can solve your industry-specific challenges. Through deep analysis of your domain's unique requirements, data landscape, and operational constraints, we develop tailored AI strategies that deliver ROI. Whether it's predictive maintenance in manufacturing or intelligent automation in logistics, we determine the right AI approach for your vertical."
					icon="🎯"
					color="yellow"
				/>
				<ServiceCard
					title="Industry-Specific AI Development"
					description="We build production-ready AI systems trained on your industry's data and optimized for your sector's requirements. From computer vision for quality inspection to predictive models for supply chain optimization, we develop domain-specific AI that understands your business context and delivers measurable operational improvements."
					icon="📊"
					color="green"
				/>
				<ServiceCard
					title="Custom Software for Your Industry"
					description="We develop industry-tailored software applications that integrate with your existing systems and workflows. From manufacturing execution systems (MES) to specialized logistics platforms, we build solutions that address your vertical's specific operational needs with intuitive interfaces designed for your team's daily use."
					icon="💻"
					color="blue"
				/>
				<ServiceCard
					title="Industry-Specific Hardware & Robotics"
					description="We engineer custom robotics and hardware solutions designed for your industry's unique physical processes. From automated inspection systems for specialized manufacturing to custom robotic solutions for warehouse operations, we build hardware that integrates with your specific production environment and quality standards."
					icon="🤖"
					color="red"
				/>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-neo-black text-neo-white py-12">
		<div class="container mx-auto px-6 text-center">
			<p class="text-sm">&copy; {currentYear} GoodPixel.AI. All Rights Reserved.</p>
		</div>
	</footer>
</div>
