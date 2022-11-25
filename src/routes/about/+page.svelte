<script lang="ts">
	import Heading from '$lib/components/UI/Heading.svelte';

	import ExternalLink from '$lib/components/UI/ExternalLink.svelte';
	import Pill from '$lib/components/UI/Pill.svelte';
</script>

<Heading>about</Heading>

<div class="pt-0 md:max-w-[70vw] prose-xl lg:prose-2xl ">
	<h3 class="text-2xl">Jason Thompson | Web Development | Design | Copmuter Graphics</h3>
	<p>
		I'm a web developer with particular interest in computer graphics. In my work I build and design
		component-driven interfaces, where I especially like working on more playful / gamified web
		experiences that might diverge from tested UX patterns. In a more general sense, I enjoy
		exploring how systems and humans interact in sometimes unexpected ways.
	</p>
	<p>
		While I mostly focus on client-side interfaces, interactively visualizing different data sources
		or even building physical devices in the realm of IoT Design are also things I'm interested in.
	</p>
	<!-- I mainly use modern JavaScript in my work. On the user-facing side I prefer using JavaScript frameworks
	like<strong>ReactJS</strong> or <strong>Svelte</strong> with CSS preprocessors or Tailwind CSS.
	For more interactive experiences I use WebGL through <strong>Three.js</strong>, sometimes writing
	my own shaders in <strong>GLSL</strong>. When designing a user interface myself, that process
	mostly takes place in <strong>Figma</strong> before building it out. On the backend I usually like
	to implement solutions in a <strong>Node.js</strong> environment. For IoT projects I like using
	the
	<strong>Arduino</strong>
	platform or <strong>Raspberry Pi</strong>. -->

	<h2 class="mt-0 mb-4 !text-2xl font-medium">Tech I Like To Use:</h2>
	<div class="w-full flex flex-wrap gap-2 mt-2 mb-4 uppercase font-bold">
		<ExternalLink classes="not-italic" ariaLabel="react" href="https://reactjs.org/">
			<Pill>React</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="svelte" href="https://svelte.dev/">
			<Pill>Svelte</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="threejs" href="https://threejs.org/">
			<Pill>THREE.JS</Pill>
		</ExternalLink>
		<Pill>GLSL</Pill>
		<Pill>Typescript</Pill>
		<ExternalLink classes="not-italic" ariaLabel="nodejs" href="https://nodejs.org/">
			<Pill>Node.js</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="figma" href="https://www.figma.com/">
			<Pill>Figma</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="arduino" href="https://www.arduino.cc/">
			<Pill>Arduino</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="prisma" href="https://www.prisma.io/">
			<Pill>Prisma</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="webpack" href="https://webpack.js.org/">
			<Pill>Webpack</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="postgres" href="https://www.postgresql.org/">
			<Pill>postgresql</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="raspberry" href="https://www.raspberrypi.com/">
			<Pill>Raspberry Pi</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="sympy" href="https://www.sympy.org/en/index.html">
			<Pill>SymPy</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="jupyter" href="https://jupyter.org/">
			<Pill>Jupyter notebook</Pill>
		</ExternalLink>
	</div>
</div>
