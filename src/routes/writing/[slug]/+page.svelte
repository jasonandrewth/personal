<!-- src/routes/[slug]/+page.svelte -->
<script lang="ts">
	interface PostData {
		content: any;
		title: string;
		date: string;
		published: boolean;
	}

	export let data: PostData;

	const dater = new Date(data.date)?.toLocaleString('en-GB', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});
</script>

<article>
	<header class="mb-16">
		<h1 class="text-3xl md:text-4xl tracking-wide text-center uppercase mb-4">{data.title}</h1>

		<p class="text-xl text-red text-center italic">Published: {dater}</p>
	</header>

	<section class="prose-xl lg:prose-xl dark:prose-invert">
		<svelte:component this={data.content} />
	</section>
</article>
