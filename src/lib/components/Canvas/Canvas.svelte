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
			side: THREE.DoubleSide,
			transparent: true,
			extensions: {
				derivatives: true
			},
			uniforms: {
				scale: { value: 0.9 },
				size: { value: 0.2 },
				time: { value: 0.0 },
				density: { value: 6.0 },
				bg: { value: new THREE.Color('#9ca3af') },
				yellow: { value: new THREE.Color('#000000') },
				orange: { value: new THREE.Color('#ff0000') }
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
            precision highp float;
    // #pragma glslify: noise = require(glsl-noise/simplex/3d);
    uniform float scale;
    uniform float size;
    uniform float density;
    uniform float time;
    uniform vec3 bg;
    uniform vec3 yellow;
    uniform vec3 orange;
    varying vec2 vUv;



	//NOISY HERE


	//
// Description : Array and textureless GLSL 2D/3D/4D simplex 
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20201014 (stegu)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
// 

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }




      float patternLine(float v) {
      float f = abs(fract(v) - .5);
      float df = fwidth(v) * density;
      return smoothstep(0., df, f);
    }
    float loopNoise (vec2 v, float t, float scale, float offset) {
      float duration = scale;
      float current = t * scale;
      return ((duration - current) * snoise(vec3(v, current + offset)) + current * snoise(vec3(v, current - duration + offset))) / duration;
    }
    vec3 gradient() {
      return mix(yellow, orange, vUv.x + vUv.y);
    }

	
    void main () {
      vec2 p = vUv * scale;
      float amp = 0.5;
      float v = 0.0;
      v += loopNoise(p, time, 0.8, 60.0) * amp;
      amp *= 0.5;
      p *= 2.0;
      v /= size;
      float t = patternLine(v);
      vec3 fragColor = mix(gradient(), bg, t);
      gl_FragColor = vec4(fragColor, 1.0);
    }
      `
		});

		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(sizes.width, sizes.height, true);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		//Mesh
		const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);

		quad.position.set(0, 0, 0);
		// Camera
		const fov = 45;
		// const fov = (180 * (2 * Math.atan(window.innerHeight / 2 / 800))) / Math.PI
		//const fov = 2*(180/Math.PI)*Math.atan(heightTool/(2*dist));
		// const aspect = width / height
		const aspect = sizes.width / sizes.height;
		const near = 1;
		const far = 100;
		const camera2 = new THREE.PerspectiveCamera(fov, aspect, near, far);

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
			quad.material.uniforms.time.value = Math.sin((2 * Math.PI * elapsedTime) / 100);
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
			// quad.dispose();
			material.dispose();
			canvas.removeChild(renderer.domElement);
		};
	});
</script>

<div class="absolute top-0 left-0 outline-none m-0 w-full h-full" bind:this={canvas} />
