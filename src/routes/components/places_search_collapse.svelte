<svelte:options accessors />

<script lang="ts">
	import { loop_guard } from 'svelte/internal';
	import { fly } from 'svelte/transition';
	export let lang: number;
	export let lat: number;
	export let score: number;
	export let radius: number = 1000;
	export let limit: number;
	export let cat: Array<any>;
	export let criteria: Array<any>;
	export let countryChoosen: string;

	export let Countries: JSON;
	export let gotCountries: boolean;
	export let categories: any;
	export let getPlacesFunc = () => {};
	export let applyCriteria = () => {};
	export let i: number;
	let CriteriaModal: boolean;
	function closeCriteria() {
		console.log(criteria);
		if (CriteriaModal == true) {
			CriteriaModal = false;
		} else {
			CriteriaModal = true;
		}
	}
</script>

<div
	class="collapse z-10 mx-1 rounded transition delay-150 duration-300 ease-in-out hover:shadow-lg"
>
	<input class="px-0" type="checkbox" />
	<div class="collapse-title px-0  text-center text-2xl font-extrabold hover:bg-slate-400">
		Rozwiń panel szukania
	</div>
	<div
		class="collapse-content z-10 flex flex-row flex-wrap items-center justify-between gap-2 lg:gap-8 xl:gap-14"
	>
		<div class="flex flex-col items-center">
			<label for="xs">Popularność: {score}</label>
			<input id="xs" bind:value={score} type="range" min="1" max="3" class="range range-xs" />
		</div>
		<div class="flex flex-col items-center">
			<label for="xs">Wyniki: {limit}</label>
			<input id="xs" bind:value={limit} type="range" min="1" max="30" class="range range-xs" />
		</div>
		<div class="flex flex-col items-center">
			<label for="xs">Zasięg: {radius}m</label>
			<input
				id="xs"
				bind:value={radius}
				type="range"
				min="1000"
				max="20000"
				class="range range-xs"
			/>
		</div>

		<button
			on:click={getPlacesFunc}
			class="btn btn-success mx-2 transition delay-150 duration-200  ease-in-out hover:translate-y-1 hover:scale-105"
			>szukaj</button
		>
		<div>
			<label
				for="my-modal-3"
				class="modal-button btn mx-2 w-24  transition delay-150 duration-200 ease-in-out hover:translate-y-1 hover:scale-105"
				>Wybierz państwo</label
			>
			<!-- Put this part before </body> tag -->
			<input type="checkbox" id="my-modal-3" class="modal-toggle" />
			<div class="modal">
				<div class="modal-box relative h-80">
					<label for="my-modal-3" class="btn btn-circle btn-sm absolute right-2 top-2">✕</label>
					<h3 class="text-lg font-bold">Wybierz państwo</h3>
					{#if gotCountries}
						{#each Object.values(Countries) as country}
							<p
								on:click={() => {
									lat = country.latlng[0];
									lang = country.latlng[1];
									countryChoosen = country.translations.pol.common;
									console.log(lat, lang);
								}}
								href=""
								class="link m-2 text-xs"
							>
								{country.translations.pol.common}
							</p>
						{/each}
					{:else}
						<p>Loading your data</p>
					{/if}
				</div>
			</div>
		</div>

		<div>
			<label
				for="my-modal-4"
				class="modal-button btn mx-2 w-24  transition delay-150 duration-200 ease-in-out hover:translate-y-1 hover:scale-105"
				>Kategorie</label
			>
			<!-- Put this part before </body> tag -->
			<input type="checkbox" id="my-modal-4" class="modal-toggle" />
			<div class="modal">
				<div class="modal-box relative h-80 px-24">
					<label for="my-modal-4" class="btn btn-circle btn-sm absolute right-2 top-2">✕</label>
					<h3 class="text-lg font-bold">Wybierz Kategorie</h3>
					<div class="form-control">
						{#each categories as category}
							<label class="label cursor-pointer">
								<span class="label-text">{category}</span>
								<input
									bind:group={cat}
									value={category}
									type="checkbox"
									class="checkbox-info checkbox"
								/>
							</label>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- SEARCH CRITERIA BUTTON -->
		<label
			for="my-modal-5"
			class="modal-button btn mx-auto transition  delay-150 duration-200 ease-in-out hover:translate-y-1 hover:scale-105"
			>Search criteria</label
		>

		<!-- Put this part before </body> tag -->
		<input
			on:click={closeCriteria}
			checked={CriteriaModal}
			type="checkbox"
			id="my-modal-5"
			class="modal-toggle"
		/>
		<div class="modal">
			<div class="modal-box relative">
				<label for="my-modal-5" class="btn btn-circle  btn-sm absolute right-2 top-2">✕</label>
				<h3 class="text-center text-lg font-bold">Previous search criteria</h3>
				<div class="mt-2 grid grid-cols-2 gap-3">
					<!-- content here -->
					{#key i}
						{#each criteria as item (item.id)}
							<div
								on:click={closeCriteria}
								class="delay-50 m-4 cursor-pointer rounded-lg shadow-md transition  duration-200 ease-in-out hover:translate-y-1 hover:scale-125 hover:border-2 hover:shadow-2xl"
							>
								<div on:click={() => applyCriteria(item.id)}>
									<p class="m-2">Country: {item.country}</p>
									<p class="m-2">radius: {item.radius}</p>
									<p class="m-2">score: {item.score}</p>
									<p class="m-2">categories: {item.categories}</p>
								</div>
							</div>
						{/each}
					{/key}
				</div>
			</div>
		</div>
	</div>
</div>
