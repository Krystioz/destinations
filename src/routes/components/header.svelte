<script lang="ts">
	import { attribute_to_object, each } from 'svelte/internal';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { onMount } from 'svelte';
	// @ts-ignore
	import { themeChange } from 'theme-change';

	let hideSelector: boolean = false;
	let selectedTheme = '';
	let testTheme = 'emerald';

	let themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter'
	];

	afterUpdate(() => {
		themeChange(false);
	});

	function checkDropdownStatus() {
		if (hideSelector == true) {
			hideSelector = false;
		} else {
			hideSelector = true;
		}
	}
</script>

<header>
	<div class="navbar relative bg-base-200 shadow-md">
		<div class="navbar-start">
			<div class="dropdown">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16"
						/></svg
					>
				</label>
				<ul
					tabindex="0"
					class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
				>
					<li><a href="/places">Places</a></li>
					<li tabindex="0">
						<!-- svelte-ignore a11y-missing-attribute -->
						<a class="justify-between">
							Parent
							<svg
								class="fill-current"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg
							>
						</a>
						<ul class="z-10 bg-white p-2">
							<li class="z-10"><a href="/">Submenu 1</a></li>
							<li><a href="/">Submenu 2</a></li>
						</ul>
					</li>
					<li><a href="/">Item 3</a></li>
				</ul>
			</div>
			<a href="/" class="btn btn-ghost text-xl normal-case">Destinations</a>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal z-10 p-0">
				<li><a href="/places">Places</a></li>
				<li tabindex="0">
					<!-- svelte-ignore a11y-missing-attribute -->
					<a>
						Parent
						<svg
							class="fill-current"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
						>
					</a>
					<ul class="bg-white p-2">
						<li><a href="/">Submenu 1</a></li>
						<li><a href="/">Submenu 2</a></li>
					</ul>
				</li>
				<li><a href="/">Item 3</a></li>
			</ul>
		</div>
		<div class="navbar-end">
			<!-- This example requires Tailwind CSS v2.0+ -->
			<div class="relative z-10 inline-block text-left">
				<div>
					<div class="indicator">
						<span
							data-tip="change theme"
							class="badge indicator-item tooltip tooltip-left badge-secondary"
							>?</span
						>
						<button
							on:click={checkDropdownStatus}
							type="button"
							class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
							id="menu-button"
							aria-expanded="true"
							aria-haspopup="true"
						>
							Motywy
							<!-- Heroicon name: solid/chevron-down -->
							<svg
								class="-mr-1 ml-2 h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>

				{#if hideSelector}<div
						transition:scale={{ duration: 300, opacity: 0.5 }}
						class="absolute right-0 mt-2 h-64 w-56 origin-top-right divide-y divide-gray-100 overflow-auto rounded-md bg-white pb-0 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="menu-button"
						tabindex="-1"
					>
						{#each themes as theme, i}
							<div class="py-1" role="none">
								<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
								<button
									data-set-theme={themes[i]}
									data-act-class="ACTIVECLASS"
									class="block px-4 py-2 text-sm text-gray-700"
									tabindex="-1"
									id="menu-item-0">{theme}</button
								>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</header>
