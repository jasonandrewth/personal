<script lang="ts">
	// import SEO from '$lib/components/SEO/index.svelte';
	import Intro from '$lib/components/Intro/Intro.svelte';
	import ProjectGrid from '$lib/components/Projects/ProjectGrid.svelte';
	import ProjectCard from '$lib/components/Projects/ProjectCard.svelte';
	import Heading from '$lib/components/UI/Heading.svelte';

	//Import projects
	import projects from '$lib/data/projects.json';

	let text = 'Jason Thompson | Web Development | Creative Technology';
</script>

<!-- <DeviceDetector showInDevice="desktop">
	<section class="absolute top-0 left-0 w-screen h-screen">
		<Canvas />
	</section>
</DeviceDetector> -->
<Intro {text} />

{#if projects.length > 0}
	<ProjectGrid>
		{#each projects as { image, title, description, link, roles, tech }, index}
			<ProjectCard {title} img={image} {description} activeLink={link} {roles} {tech} />
		{/each}
	</ProjectGrid>
{/if}

<Heading>contact</Heading>

<section id="contact" class="w-full grid grid-cols-1 md:grid-cols-2 gap-1">
	<div class="pt-4 text-xl lg:text-2xl mb-2">
		<p>
			I'm a developer and designer focusing on future-oriented web experiences using next generation
			tools. My goal is to create long-term web solutions with a strong emphasis on visual identity.
		</p>
	</div>
</section>
