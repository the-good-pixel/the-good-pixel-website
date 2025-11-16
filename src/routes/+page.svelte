<script lang="ts">
	import BrutalButton from '$lib/components/BrutalButton.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
</script>

<svelte:head>
	<title>GoodPixel.AI - AI & Software Solutions</title>
</svelte:head>

<div class="min-h-screen font-sans">
	<!-- Header -->
	<header class="border-b-4 border-neo-black bg-neo-white sticky top-0 z-50">
		<nav class="container mx-auto px-6 py-4 flex items-center justify-between">
			<div class="flex items-center">
				<img
					src="/assets/img/the-good-pixel-logo.png"
					alt="The Good Pixel"
					class="h-12 w-auto border-4 border-neo-black"
				/>
			</div>
		</nav>
	</header>

	<!-- Hero Section -->
	<section class="bg-gradient-to-br from-neo-yellow via-neo-pink to-neo-blue border-b-4 border-neo-black">
		<div class="container mx-auto px-6 py-24 md:py-32">
			<div class="max-w-3xl">
				<div class="inline-block bg-neo-black text-neo-white px-4 py-2 mb-6 border-4 border-neo-black font-mono text-sm">
					GOODPIXEL.AI
				</div>
				<h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
					Empowering Your Business with Cutting-Edge AI and Software Solutions.
				</h1>
				<p class="text-xl md:text-2xl mb-8 text-gray-800">
					Transform your digital presence with our team of experts in Software Development, Machine Learning, and Artificial Intelligence.
				</p>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section class="py-24 bg-neo-white border-b-4 border-neo-black" id="about">
		<div class="container mx-auto px-6">
			<div class="grid md:grid-cols-2 gap-12 items-center">
				<div>
					<h2 class="text-4xl md:text-5xl font-bold mb-6">Who we are</h2>
					<div class="space-y-4 text-lg text-gray-700 leading-relaxed">
						<p>
							At the intersection of innovation and expertise, our dynamic team of young
							professionals excels in Software Development, Digital Marketing, Machine Learning, and
							Artificial Intelligence.
						</p>
						<p>
							We're driven by a passion for solving real-world challenges and dedicated to leveraging
							our diverse skill set to help you achieve your technological goals. Whether you're
							looking to transform your digital presence, streamline operations, or harness the power
							of AI, we're ready to turn your vision into reality.
						</p>
					</div>
				</div>
				<div class="relative">
					<img
						src="/assets/img/hands-laptop.png"
						alt="Team working"
						class="w-full border-4 border-neo-black shadow-brutal-xl"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Services Section -->
	<section class="py-24 bg-gradient-to-br from-neo-blue to-neo-green border-b-4 border-neo-black">
		<div class="container mx-auto px-6">
			<h2 class="text-4xl md:text-5xl font-bold mb-16 text-center">Our Services</h2>
			<div class="grid gap-8 max-w-5xl mx-auto">
				<ServiceCard
					title="Machine Learning / AI Model Feasibility Research"
					description="Our ML/AI Feasibility Research service helps you determine if artificial intelligence is the right solution for your business needs. We conduct a comprehensive analysis of your specific challenges, data assets, and operational environment to assess the potential impact and viability of ML/AI integration."
					icon="🎯"
					color="yellow"
				/>
				<ServiceCard
					title="Production Machine Learning / AI Model Development and Optimization"
					description="We transform AI potential into real-world performance with our end-to-end ML/AI Development and Optimization service. From custom model design and data preparation to deployment and ongoing maintenance, we cover every aspect of bringing powerful ML/AI solutions to life."
					icon="📊"
					color="pink"
				/>
				<ServiceCard
					title="Software Application Development"
					description="Our Software Application Development service brings your digital vision to life, creating custom applications tailored to your unique business needs. We specialize in developing robust, scalable, and user-friendly applications across various platforms, including web, mobile, and desktop environments."
					icon="💻"
					color="blue"
				/>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-neo-black text-neo-white py-12">
		<div class="container mx-auto px-6 text-center">
			<p class="text-sm">&copy; 2024 GoodPixel.AI. All Rights Reserved.</p>
		</div>
	</footer>
</div>
