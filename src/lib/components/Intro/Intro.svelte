<script lang="ts">
	import DeviceDetector from 'svelte-device-detector';

	import Canvas from '$lib/components/Canvas/HomeCanvas.svelte';

	import ScrollDown from './ScrollDown.svelte';

	export let text: string;
	let hovered = false;
</script>

<DeviceDetector showInDevice="desktop">
	<section class="absolute cursor-crosshair top-0 left-0 w-screen h-screen">
		<Canvas {hovered} />
	</section>
</DeviceDetector>

<section class="cursor-crosshair w-full h-[70vh] md:h-screen relative">
	<div class="titleWrapper text-4xl md:text-6xl lg:text-8xl 2xl:text-9xl uppercase max-w-full">
		<span class=" md:hidden">{text}</span>
	</div>

	<ScrollDown bind:hovered />
</section>
