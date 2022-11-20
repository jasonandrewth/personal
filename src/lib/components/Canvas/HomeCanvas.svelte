<script lang="ts">
	import * as THREE from 'three';

	import { onMount } from 'svelte';

	let canvas: HTMLDivElement;

	onMount(() => {
		/**
		 * Sizes
		 */
		const sizes = {
			width: canvas.offsetWidth,
			height: canvas.offsetHeight
		};

		const scene = new THREE.Scene();
		// Change Background Color
		// scene.background = new THREE.Color(0xff0000);
		// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		const material = new THREE.ShaderMaterial({
			transparent: true,
			uniforms: {
				uTime: { value: 0.0 }
			},
			//vertex shader
			vertexShader: /*glsl*/ `
			varying vec2 vUv;
            void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
      `,
			fragmentShader: /* glsl */ `
            precision mediump float;

// float uTime;
varying vec2 vUv;
uniform float uTime;

float n21(vec2 p) {
    return fract(sin(p.x * 100. + p.y * 6574.) * 5647. + uTime * 0.03);
}

float valueNoise(vec2 p) {
  //Make Grid
    vec2 localUv = fract(p * 1.0);
  //Cheap smoothstep
    localUv = localUv * localUv * (3. - 2. * localUv);
  //current GridCell
    vec2 id = floor(p * 1.0);

  //NoiseValues in Grid corners
    float bottomLeft = n21(id);
    float bottomRight = n21(id + vec2(1.0, 0.0));
    float topLeft = n21(id + vec2(0.0, 1.0));
    float topRight = n21(id + vec2(1.0));
  //Mix based on position in the cell represented by localUv
    float bottomMix = mix(bottomLeft, bottomRight, localUv.x);
    float topMix = mix(topLeft, topRight, localUv.x);

    return mix(bottomMix, topMix, localUv.y);
}

void main() {
    vec3 colour = vec3(0.5);

    float c = valueNoise(vUv * 2.);
    c += valueNoise(vUv * 4.) * .5;
    c += valueNoise(vUv * 8.) * .25;
    c += valueNoise(vUv * 16.) * .125;
    c += valueNoise(vUv * 32.) * .0625;

    c /= 2.;
    colour = vec3(c);
    colour = mix(vec3(0.), vec3(1.0, 0.0, 0.0), c);

    gl_FragColor = vec4(colour, 0.5);

    }
      `
		});

		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(sizes.width, sizes.height, true);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		//Mesh
		const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);

		quad.position.set(0, 0, 0);

		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		// camera.position.set(0, 0, 10);
		// camera.lookAt(quad.position);

		//Add to scene
		scene.add(quad);

		/**
		 * Animate
		 */
		const clock = new THREE.Clock();

		const animate = () => {
			const elapsedTime: number = clock.getElapsedTime();
			quad.material.uniforms.uTime.value = elapsedTime;
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};

		const resize = () => {
			// Update sizes
			sizes.width = canvas.offsetWidth;
			sizes.height = canvas.offsetHeight;
			// Update camera
			// camera.aspect = sizes.width / sizes.height;
			camera.updateProjectionMatrix();

			// Update renderer
			renderer.setSize(sizes.width, sizes.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		};

		window.addEventListener('resize', () => {
			resize();
		});

		/**
		 * Setup
		 */
		canvas.appendChild(renderer.domElement);

		resize();
		animate();

		return () => {
			console.log('canvas unmount');
			quad.geometry.dispose();
			material.dispose();
			canvas.removeChild(renderer.domElement);
		};
	});
</script>

<div class="absolute top-0 left-0 outline-none m-0 w-full h-full" bind:this={canvas} />
