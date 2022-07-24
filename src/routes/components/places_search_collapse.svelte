<svelte:options accessors />

<script lang="ts">
	import {
		searchCriteria,
		searchParamsObj,
		searchParamsObjDef,
		countriesArr,
		citiesArr,
		citiesInput
	} from '../stores';

	import { countryInput } from '../stores';
	import { fly, crossfade, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	// export let Countries: JSON;
	export let gotCountries: boolean;
	export let gotCities: boolean;
	export let categories: any;
	export let getPlacesFunc = () => {};
	// arr countries
	let newArr: Array<any>;
	//arr cities
	let newArrCities: Array<any> = $citiesArr;
	let countryCities: Array<any>;
	//false = country true = city
	let cntrCity: boolean = false;

	let CriteriaModal: boolean;
	function closeCriteria() {
		if (CriteriaModal == true) {
			CriteriaModal = false;
		} else {
			CriteriaModal = true;
		}
	}

	function applyCriteria(id: any) {
		$searchParamsObj.lang = $searchCriteria[id].lang;
		$searchParamsObj.lat = $searchCriteria[id].lat;
		$searchParamsObj.score = $searchCriteria[id].score;
		$searchParamsObj.limit = $searchCriteria[id].limit;
		$searchParamsObj.radius = $searchCriteria[id].radius;
		$searchParamsObj.cat = $searchCriteria[id].categories;
		$searchParamsObj.choosenCountry = $searchCriteria[id].country;
	}

	function resetCriteria() {
		$searchParamsObj = $searchParamsObjDef;
	}

	$: {
		newArrCities = countryCities.filter(
			(e) => e.name.toLowerCase().indexOf($citiesInput.toLowerCase()) + 1
		);
	}

	$: {
		newArrCities = $citiesArr.filter((e) =>
			e.country.includes($searchParamsObj.choosenCountryCode)
		);
		countryCities = newArrCities;
	}

	$: {
		newArr = $countriesArr;
		newArr = $countriesArr.filter(
			(e) => e.name.toLowerCase().indexOf($countryInput.toLowerCase()) + 1
		);
	}

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	function citiesCntr() {
		if (cntrCity == false) {
			cntrCity = true;
		} else {
			cntrCity = false;
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
		class="collapse-content z-10 grid grid-cols-3 items-center justify-center justify-items-center gap-2 lg:gap-8 xl:gap-14"
	>
		<div class="flex flex-col items-center">
			<label for="xs">Popularność: {$searchParamsObj.score}</label>
			<input
				id="xs"
				bind:value={$searchParamsObj.score}
				type="range"
				min="1"
				max="3"
				class="range range-xs"
			/>
		</div>
		<div class="flex flex-col items-center">
			<label for="xs">Wyniki: {$searchParamsObj.limit}</label>
			<input
				id="xs"
				bind:value={$searchParamsObj.limit}
				type="range"
				min="1"
				max="30"
				class="range range-xs"
			/>
		</div>
		<div class="flex flex-col items-center">
			<label for="xs">Zasięg: {Math.round($searchParamsObj.radius / 1000)} km</label>
			<input
				id="xs"
				bind:value={$searchParamsObj.radius}
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
				<div class="modal-box relative  h-80 overflow-hidden">
					<label for="my-modal-3" class="btn btn-circle btn-sm absolute right-3 top-3">✕</label>

					<!-- Countries -->
					{#if !cntrCity}
						<h3 out:fade in:fade class="mb-3 text-center text-lg font-bold">Wybierz państwo</h3>
						<!-- content here -->

						<!-- start of countries content -->
						<div out:fade in:fade class="flex flex-col items-center">
							<input
								bind:value={$countryInput}
								type="text"
								placeholder="Szukaj państwa"
								class="input input-bordered input-sm mb-4 w-full max-w-xs"
							/>
							<div class="grid grid-cols-3 items-center text-center align-middle">
								{#if gotCountries}
									{#each newArr as country (country.id)}
										<p
											in:receive={{ key: country.id }}
											out:send={{ key: country.id }}
											on:click={() => {
												$searchParamsObj.lat = country.lat;
												$searchParamsObj.lang = country.lang;
												$searchParamsObj.choosenCountry = country.name;
												$searchParamsObj.choosenCountryCode = country.code;
												citiesCntr();
											}}
											href=""
											class="m-2 cursor-pointer text-xs"
										>
											{country.name}
										</p>
									{/each}
								{:else}
									<p>Loading your data</p>
								{/if}
							</div>
						</div>
						<!-- Cities -->
					{:else}
						<div class="absolute top-2 left-3">
							<button on:click={citiesCntr} class="btn btn-secondary btn-xs">powrót</button>
						</div>
						<h3 out:fade in:fade class="mb-3 text-center text-lg font-bold">Wybierz miasto</h3>
						<div out:fade in:fade class="flex flex-col items-center">
							<input
								bind:value={$citiesInput}
								type="text"
								placeholder="Szukaj miasta"
								class="input input-bordered input-sm mb-4 w-full max-w-xs"
							/>
							<div class="grid grid-cols-3 items-center text-center align-middle">
								{#if gotCities}
									{#each newArrCities as city}
										<p
											on:click={() => {
												$searchParamsObj.lat = city.lat;
												$searchParamsObj.lang = city.lng;
												$searchParamsObj.choosenCity = city.name;
											}}
											href=""
											class="m-2 cursor-pointer text-xs"
										>
											{city.name}
										</p>
									{/each}
								{:else}
									<p>Loading your data</p>
								{/if}
							</div>
						</div>
					{/if}
					<!-- end of cities -->
					<!-- end of countries content -->
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
									bind:group={$searchParamsObj.cat}
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
					{#each $searchCriteria as item, id}
						<div
							on:click={closeCriteria}
							class="delay-50 hover:scale-115 m-4 cursor-pointer rounded-lg shadow-md  transition duration-200 ease-in-out hover:translate-y-1  hover:bg-slate-100 hover:shadow-2xl"
						>
							<div on:click={() => applyCriteria(item.id)}>
								<p class="m-2">Country: {item.country}</p>
								<p class="m-2">radius: {item.radius}</p>
								<p class="m-2">score: {item.score}</p>
								<p class="m-2">categories: {item.categories}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<button on:click={() => resetCriteria()} class="btn btn-outline btn-warning">Reset</button>
	</div>
</div>
