<script lang="ts">
	export let text: string;

	import ScrollDown from './ScrollDown.svelte';
</script>

<section class="w-full h-[70vh] md:h-screen relative">
	<div class="titleWrapper text-4xl md:text-6xl lg:text-8xl 2xl:text-9xl uppercase max-w-full">
		<span>{text}</span>
	</div>

	<ScrollDown />
</section>
