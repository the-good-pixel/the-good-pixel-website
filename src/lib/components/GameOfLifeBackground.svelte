<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let animationId: number;

	// Game of Life parameters - scaled for full screen
	const CELL_SIZE = 20; // Larger cells for background
	let GRID_WIDTH: number;
	let GRID_HEIGHT: number;
	let grid: boolean[][];
	let nextGrid: boolean[][];

	function initializeGrid(width: number, height: number) {
		GRID_WIDTH = Math.ceil(width / CELL_SIZE);
		GRID_HEIGHT = Math.ceil(height / CELL_SIZE);

		grid = Array(GRID_HEIGHT)
			.fill(null)
			.map(() => Array(GRID_WIDTH).fill(false));
		nextGrid = Array(GRID_HEIGHT)
			.fill(null)
			.map(() => Array(GRID_WIDTH).fill(false));

		// Add gliders at random positions
		const numGliders = Math.floor(Math.random() * 2) + 1; // 1-2 gliders
		for (let i = 0; i < numGliders; i++) {
			const x = Math.floor(Math.random() * (GRID_WIDTH - 10));
			const y = Math.floor(Math.random() * (GRID_HEIGHT - 10));
			addGlider(x, y);
		}

		// Add random cells with lower density for cleaner start
		addRandomCells(0.08); // 8% random density
	}

	function addGlider(x: number, y: number) {
		if (x + 2 < GRID_WIDTH && y + 2 < GRID_HEIGHT) {
			grid[y][x + 1] = true;
			grid[y + 1][x + 2] = true;
			grid[y + 2][x] = true;
			grid[y + 2][x + 1] = true;
			grid[y + 2][x + 2] = true;
		}
	}

	function addBlinker(x: number, y: number) {
		if (x + 2 < GRID_WIDTH && y < GRID_HEIGHT) {
			grid[y][x] = true;
			grid[y][x + 1] = true;
			grid[y][x + 2] = true;
		}
	}

	function addRandomCells(density: number) {
		for (let y = 0; y < GRID_HEIGHT; y++) {
			for (let x = 0; x < GRID_WIDTH; x++) {
				if (Math.random() < density && !grid[y][x]) {
					grid[y][x] = true;
				}
			}
		}
	}

	function countNeighbors(x: number, y: number): number {
		let count = 0;
		for (let dy = -1; dy <= 1; dy++) {
			for (let dx = -1; dx <= 1; dx++) {
				if (dx === 0 && dy === 0) continue;
				const nx = x + dx;
				const ny = y + dy;
				if (nx >= 0 && nx < GRID_WIDTH && ny >= 0 && ny < GRID_HEIGHT) {
					if (grid[ny][nx]) count++;
				}
			}
		}
		return count;
	}

	function updateGrid() {
		for (let y = 0; y < GRID_HEIGHT; y++) {
			for (let x = 0; x < GRID_WIDTH; x++) {
				const neighbors = countNeighbors(x, y);
				const isAlive = grid[y][x];

				if (isAlive) {
					nextGrid[y][x] = neighbors === 2 || neighbors === 3;
				} else {
					nextGrid[y][x] = neighbors === 3;
				}
			}
		}

		[grid, nextGrid] = [nextGrid, grid];
	}

	function render() {
		if (!ctx || !canvas || !grid) return;

		// Apply fade opacity for everything
		ctx.globalAlpha = 1;

		// Clear with semi-transparent for trail effect
		ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Apply fade opacity only to cells
		ctx.globalAlpha = fadeOpacity;

		// Draw living cells with black color (very low opacity)
		ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
		for (let y = 0; y < GRID_HEIGHT; y++) {
			for (let x = 0; x < GRID_WIDTH; x++) {
				if (grid[y][x]) {
					ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2);
				}
			}
		}

		// Reset alpha
		ctx.globalAlpha = 1;
	}

	let frameCount = 0;
	const FRAME_DELAY = 8; // Update every 8 frames (~133ms at 60fps)

	function animate() {
		frameCount++;

		// Update grid if not fading out (allow updates during fade-in)
		if (frameCount % FRAME_DELAY === 0 && fadeDirection !== 'out') {
			updateGrid();
			generationCount++;
		}

		handleFadeTransition();

		// Always render (opacity controls visibility)
		render();

		animationId = requestAnimationFrame(animate);
	}

	let lastLivingCount = 0;
	let staticFrames = 0;
	let startTime = Date.now();
	const MAX_TIME_BEFORE_RESET = 10000; // 10 seconds
	let fadeOpacity = 0; // Start from 0 opacity
	let isFading = true; // Start in fading state
	let fadeDirection: 'out' | 'in' = 'in'; // Start with fade in
	let generationCount = 0;
	const MIN_GENERATIONS_BEFORE_RENDER = 1; // Skip first generation for cleaner start

	function checkAndReset() {
		if (!grid || !canvas || isFading) return;

		const livingCells = grid.flat().filter(Boolean).length;
		const elapsedTime = Date.now() - startTime;

		// Check if grid is static (same cell count for multiple checks)
		if (livingCells === lastLivingCount) {
			staticFrames++;
		} else {
			staticFrames = 0;
		}
		lastLivingCount = livingCells;

		// Reset if:
		// - Too few cells (died out)
		// - Too many cells (overpopulated)
		// - Static for too long (stuck in a loop)
		// - Hard time limit of 10 seconds reached
		if (livingCells < 10 || livingCells > GRID_WIDTH * GRID_HEIGHT * 0.6 || staticFrames > 3 || elapsedTime >= MAX_TIME_BEFORE_RESET) {
			console.log('Resetting Game of Life - living cells:', livingCells, 'static frames:', staticFrames, 'elapsed:', elapsedTime);
			// Start fade out
			isFading = true;
			fadeDirection = 'out';
		}
	}

	function handleFadeTransition() {
		if (!isFading) return;

		if (fadeDirection === 'out') {
			fadeOpacity -= 0.03;
			if (fadeOpacity <= 0) {
				fadeOpacity = 0;
				// Reset the grid data (cells will be reinitialized)
				staticFrames = 0;
				lastLivingCount = 0;
				generationCount = 0; // Reset generation counter
				startTime = Date.now();
				initializeGrid(canvas.width, canvas.height);
				// Switch to fade in direction
				fadeDirection = 'in';
			}
		} else {
			// Only fade in after minimum generations have passed
			if (generationCount >= MIN_GENERATIONS_BEFORE_RENDER) {
				fadeOpacity += 0.03;
				if (fadeOpacity >= 1) {
					fadeOpacity = 1;
					isFading = false;
				}
			}
		}
	}

	function resizeCanvas() {
		if (!canvas || !canvas.parentElement) return;
		const rect = canvas.parentElement.getBoundingClientRect();
		canvas.width = rect.width || window.innerWidth;
		canvas.height = rect.height || window.innerHeight;
		generationCount = 0; // Reset generation counter on resize
		initializeGrid(canvas.width, canvas.height);
		console.log('Canvas resized:', canvas.width, 'x', canvas.height);
	}

	onMount(() => {
		if (canvas) {
			ctx = canvas.getContext('2d')!;
			resizeCanvas();

			window.addEventListener('resize', resizeCanvas);

			render();
			setTimeout(() => {
				animate();
			}, 100);

			// Check for reset more frequently
			const resetInterval = setInterval(checkAndReset, 2000);

			return () => {
				window.removeEventListener('resize', resizeCanvas);
				clearInterval(resetInterval);
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
	style="opacity: 0.5; touch-action: none; pointer-events: none;"
></canvas>
