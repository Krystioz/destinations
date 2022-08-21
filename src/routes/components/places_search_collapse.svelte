<svelte:options accessors />

<script lang="ts">
	import {
		searchCriteria,
		searchParamsObj,
		searchParamsObjDef,
		countriesArr,
		citiesArr,
		citiesInput,
		searchCatObj
	} from '../stores';
	import { countryInput } from '../stores';
	import { fly, crossfade, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import Spinner from './loading_spinner.svelte';
	import CatCollapse from './category_collapse.svelte';
	import Map from './google_map.svelte';

	export let gotCountries: boolean;
	export let gotCities: boolean;

	export let getPlacesFunc = () => {};
	let newArr: Array<any>;
	let newArrCities: Array<any> = $citiesArr;
	let countryCities: Array<any>;
	let cntrCity: boolean = false;
	let CriteriaModal: boolean;
	let CountriesModal: boolean;

	type obj = {
		[key: string]: any; // 👈️ variable key
	};

	function closeCriteria() {
		if (CriteriaModal == true) {
			CriteriaModal = false;
		} else {
			CriteriaModal = true;
		}
	}

	function closeCounries() {
		if (CountriesModal == true) {
			CountriesModal = false;
		} else {
			CountriesModal = true;
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
		newArrCities = $citiesArr.filter((e: obj) =>
			e.country.includes($searchParamsObj.choosenCountryCode)
		);
		countryCities = newArrCities;
	}

	$: {
		newArr = $countriesArr;
		newArr = $countriesArr.filter(
			(e: obj) => e.name.toLowerCase().indexOf($countryInput.toLowerCase()) + 1
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
			fetchCities();
		} else {
			cntrCity = false;
			gotCities = false;
		}
	}

	async function fetchCities() {
		const params = new URLSearchParams({ country: $searchParamsObj.choosenCountryCode });
		try {
			await fetch(`/Cities?${params}`, { method: 'GET' })
				.then((response) => response.json())
				.then((data) => {
					$citiesArr = data.query;

					gotCities = true;
				});
		} catch (err) {
			console.log(err);
		}
	}

	// 	async function fetchPlace() {
	// 	const params = new URLSearchParams({ xid: $choosenId });
	// 	try {
	// 		await fetch(`/Place?${params}`, {
	// 			method: 'GET'
	// 		})
	// 			.then((res) => res.json())
	// 			.then((as) => (placeFetched = as))
	// 			.then((check) => checkIfPlaceIs(check));
	// 	} catch (err: any) {
	// 		console.log(err.message);
	// 	}
	// }
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
			<input
				on:click={closeCounries}
				checked={CountriesModal}
				type="checkbox"
				id="my-modal-3"
				class="modal-toggle"
			/>
			<div class="modal">
				<div class="modal-box relative  h-80 overflow-hidden">
					<label for="my-modal-3" class="btn btn-circle btn-sm absolute right-3 top-3">✕</label>

					<!-- Countries -->
					{#if !cntrCity}
						<h3 in:fade class="mb-3 text-center text-lg font-bold">Wybierz państwo</h3>
						<!-- content here -->

						<!-- start of countries content -->
						<div in:fade class="flex flex-col items-center">
							<input
								bind:value={$countryInput}
								type="text"
								placeholder="Szukaj państwa"
								class="input input-bordered input-sm mb-4 w-full max-w-xs"
							/>
							<div class="grid grid-cols-3 items-center text-center align-middle">
								{#if gotCountries}
									{#each newArr.slice(0, 40) as country (country.id)}
										<p
											in:receive={{ key: country.id }}
											animate:flip={{ duration: 450 }}
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
									<div class="col-start-2 flex">
										<Spinner />
									</div>
								{/if}
							</div>
						</div>
						<!-- Cities -->
					{:else}
						<div class="absolute top-2 left-3">
							<button on:click={citiesCntr} class="btn btn-secondary btn-xs">powrót</button>
						</div>
						<h3 in:fade class="mb-3 text-center text-lg font-bold">Wybierz miasto</h3>
						<div in:fade class="flex flex-col items-center">
							<input
								bind:value={$citiesInput}
								type="text"
								placeholder="Szukaj miasta"
								class="input input-bordered input-sm mb-4 w-full max-w-xs"
							/>
							<div class="grid grid-cols-5 items-center text-center align-middle">
								{#if gotCities}
									{#each newArrCities.slice(0, 30) as city (city)}
										<p
											in:receive={{ key: city.id }}
											animate:flip={{ duration: 450 }}
											on:click={() => {
												$searchParamsObj.lat = city.lat;
												$searchParamsObj.lang = city.lng;
												$searchParamsObj.choosenCity = city.name;
												closeCounries();
											}}
											href=""
											class="m-2 cursor-pointer text-xs"
										>
											{city.name}
										</p>
									{/each}
								{:else}
									<div class="col-start-3">
										<Spinner />
									</div>
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
				<div class="prose modal-box relative flex max-w-xl flex-col items-center px-24">
					<label for="my-modal-4" class="btn btn-circle btn-sm absolute right-2 top-2">✕</label>
					<h3 class="text-center text-lg font-bold">Wybierz Kategorie</h3>
					<div class="form-control">
						{#each Object.keys($searchCatObj) as obj, i}
							<!-- content here -->
							<CatCollapse catHead={obj} catPar={Object.values($searchCatObj)[i]} />
						{/each}
						<!-- {#each categories as category}
							<label class="label cursor-pointer">
								<span class="label-text">{category}</span>
								<input
									bind:group={$searchParamsObj.cat}
									value={category}
									type="checkbox"
									class="checkbox-info checkbox"
								/>
							</label>
						{/each} -->
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
							<div on:click={() => applyCriteria(id)}>
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
		<!-- google maps modal -->
		<div>
			<label
				for="my-modal-8"
				class="modal-button btn mx-2 w-24  transition delay-150 duration-200 ease-in-out hover:translate-y-1 hover:scale-105"
				>Mapa</label
			>
			<!-- Put this part before </body> tag -->
			<input type="checkbox" id="my-modal-8" class="modal-toggle" />
			<div class="modal">
				<div class="prose modal-box relative flex h-1/2 max-w-3xl flex-col items-center px-24">
					<label for="my-modal-8" class="btn btn-circle btn-sm absolute right-2 top-2">✕</label>
					<Map />
					<h3 class="text-center text-lg font-bold">Wybierz punkt na mapie</h3>
					<div class="form-control" />
				</div>
			</div>
		</div>
		<!-- Google maps modal -->
	</div>
</div>
