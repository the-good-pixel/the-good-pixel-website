<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let animationId: number;

	// Terrain parameters
	const TARGET_CELL_SIZE = 30; // Target size for each cell in pixels
	let COLS = 80;
	let ROWS = 50;
	let scl = 20; // Scale of each terrain cell
	let w: number;
	let h: number;

	let terrain: number[][] = [];
	let flying = 0; // Offset for animation

	// Simple Perlin noise implementation
	class PerlinNoise {
		private permutation: number[];

		constructor() {
			// Initialize permutation table
			const p: number[] = [];
			for (let i = 0; i < 256; i++) {
				p[i] = Math.floor(Math.random() * 256);
			}
			this.permutation = [...p, ...p];
		}

		private fade(t: number): number {
			return t * t * t * (t * (t * 6 - 15) + 10);
		}

		private lerp(t: number, a: number, b: number): number {
			return a + t * (b - a);
		}

		private grad(hash: number, x: number, y: number): number {
			const h = hash & 3;
			const u = h < 2 ? x : y;
			const v = h < 2 ? y : x;
			return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
		}

		noise(x: number, y: number): number {
			const X = Math.floor(x) & 255;
			const Y = Math.floor(y) & 255;

			x -= Math.floor(x);
			y -= Math.floor(y);

			const u = this.fade(x);
			const v = this.fade(y);

			const a = this.permutation[X] + Y;
			const b = this.permutation[X + 1] + Y;

			return this.lerp(
				v,
				this.lerp(u, this.grad(this.permutation[a], x, y), this.grad(this.permutation[b], x - 1, y)),
				this.lerp(u, this.grad(this.permutation[a + 1], x, y - 1), this.grad(this.permutation[b + 1], x - 1, y - 1))
			);
		}
	}

	const perlin = new PerlinNoise();

	function initializeTerrain() {
		terrain = [];
		for (let y = 0; y < ROWS; y++) {
			terrain[y] = [];
			for (let x = 0; x < COLS; x++) {
				terrain[y][x] = 0;
			}
		}
	}

	function updateTerrain() {
		flying -= 0.02; // Speed of terrain movement (slower)
		let yoff = flying;

		for (let y = 0; y < ROWS; y++) {
			let xoff = 0;
			for (let x = 0; x < COLS; x++) {
				terrain[y][x] = perlin.noise(xoff, yoff) * 100;
				xoff += 0.1;
			}
			yoff += 0.1;
		}
	}

	function render() {
		if (!ctx || !canvas) return;

		// Clear with semi-transparent background
		ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Save context state
		ctx.save();

		// Calculate scale to fill canvas completely
		const scaleX = canvas.width / (COLS - 1);
		const scaleY = canvas.height / (ROWS - 1);

		// Draw terrain starting from top-left, scaled to fill canvas
		ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
		ctx.lineWidth = 1;

		// Draw rows
		for (let y = 0; y < ROWS - 1; y++) {
			ctx.beginPath();
			for (let x = 0; x < COLS; x++) {
				const px = x * scaleX;
				const py = y * scaleY - terrain[y][x] * 0.5; // 3D height effect

				if (x === 0) {
					ctx.moveTo(px, py);
				} else {
					ctx.lineTo(px, py);
				}
			}
			ctx.stroke();
		}

		// Draw columns for grid effect
		for (let x = 0; x < COLS; x++) {
			ctx.beginPath();
			for (let y = 0; y < ROWS; y++) {
				const px = x * scaleX;
				const py = y * scaleY - terrain[y][x] * 0.5;

				if (y === 0) {
					ctx.moveTo(px, py);
				} else {
					ctx.lineTo(px, py);
				}
			}
			ctx.stroke();
		}

		ctx.restore();
	}

	function animate() {
		updateTerrain();
		render();
		animationId = requestAnimationFrame(animate);
	}

	function resizeCanvas() {
		if (!canvas) return;

		// Get the absolute positioned parent div
		const parent = canvas.parentElement;
		if (!parent) return;

		// The parent div has absolute inset-0, so it should fill the section
		const rect = parent.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;

		// Calculate responsive grid size based on canvas dimensions
		COLS = Math.floor(canvas.width / TARGET_CELL_SIZE);
		ROWS = Math.floor(canvas.height / TARGET_CELL_SIZE);

		// Ensure minimum grid size
		COLS = Math.max(COLS, 20);
		ROWS = Math.max(ROWS, 15);

		console.log('Canvas resized:', canvas.width, 'x', canvas.height, '- Grid:', COLS, 'x', ROWS);

		// Recalculate dimensions
		w = COLS * scl;
		h = ROWS * scl;

		initializeTerrain();
	}

	onMount(() => {
		if (canvas) {
			ctx = canvas.getContext('2d')!;
			resizeCanvas();

			window.addEventListener('resize', resizeCanvas);

			setTimeout(() => {
				animate();
			}, 100);

			return () => {
				window.removeEventListener('resize', resizeCanvas);
			};
		}
	});

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
	});
</script>

<canvas
	bind:this={canvas}
	class="absolute inset-0 w-full h-full"
	aria-hidden="true"
	style="opacity: 0.5;"
></canvas>
