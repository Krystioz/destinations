<script lang="ts">
	import { searchParamsObj, countriesArr, searchCriteria, citiesArr } from './stores';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Map from './components/google_map.svelte';
	const OPENTRIPMAP_API = import.meta.env.VITE_OPENTRIPMAP_API;

	import PlaceCard from '../routes/components/places_card.svelte';
	import SearchCollapse from '../routes/components/places_search_collapse.svelte';
	import Spinner from '../routes/components/loading_spinner.svelte';

	let gotdata: boolean = false;
	let gotCountries: boolean = false;
	let gotCities: boolean = false;
	let promisePlaces: Promise<any>;
	let showErr = false;
	let errMessage: string = '';
	let i: number = 0;

	onMount(async () => {
		fetch('/Countries')
			.then((response) => response.json())
			.then((data) => {
				let dataCountries = data.query;

				$countriesArr = dataCountries.map((el: any) => ({
					name: el.translations.pol.common,
					population: el.population,
					map_link: el.maps,
					lat: el.latlng[0],
					lang: el.latlng[1],
					capital: el.capital,
					code: el.altSpellings[0],
					id: i++
				}));
				gotCountries = true;
			})
			.catch((error) => {
				console.log(error);
			});
	});

	const fetchPlaces = async () => {
		var response = await fetch(
			`https://api.opentripmap.com/0.1/en/places/radius?radius=${$searchParamsObj.radius}&lon=${
				$searchParamsObj.lang
			}&lat=${$searchParamsObj.lat}&limit=${$searchParamsObj.limit}&rate=${
				$searchParamsObj.score
			}&kinds=${$searchParamsObj.cat.join()}&apikey=${OPENTRIPMAP_API}`
		);

		var result = await response.json();
		return result;
	};

	function getPlaces() {
		if (
			$searchParamsObj.lat == undefined ||
			// $searchParamsObj.choosenCountry == '' ||
			$searchParamsObj.cat == ['']
		) {
			showErr = true;
			errMessage = 'Please select all search criteria !';
			setTimeout(() => {
				showErr = false;
			}, 3000);
			return;
		}
		pushCriteria();
		promisePlaces = fetchPlaces();
		gotdata = true;
		return promisePlaces;
	}

	function pushCriteria() {
		let criteriaObj = $searchCriteria;

		if (criteriaObj.length >= 4) {
			criteriaObj.shift();
			$searchCriteria = criteriaObj;
		}

		criteriaObj.push({
			id: i + 1,
			lat: $searchParamsObj.lat,
			lang: $searchParamsObj.lang,
			score: $searchParamsObj.score,
			categories: $searchParamsObj.cat,
			country: $searchParamsObj.choosenCountry,
			radius: $searchParamsObj.radius,
			limit: $searchParamsObj.limit
		});
		$searchCriteria = criteriaObj;
		i += 1;
	}
</script>

<!-- START OF HTML DOCCUMENT -->

<section class="mb-auto flex flex-col items-center justify-between gap-1">
	<div
		class="flex w-full flex-col items-center bg-[url('http://placeimg.com/1000/1000/nature')] text-center text-white"
	>
		<div class="prose my-5">
			<h2 class="w-full text-white">Welcome to the destination searcher !</h2>
			<h3 class="w-full text-white">I hope you will have fun</h3>
		</div>
	</div>
	<div class="divider mt-12">Odkrywaj</div>
	<div class="z-10 flex flex-row justify-center align-middle">
		<SearchCollapse getPlacesFunc={() => getPlaces()} {gotCountries} {gotCities} />
	</div>
	{#if showErr}
		<div
			out:fade
			in:fly={{ y: 200, duration: 1500 }}
			class="alert alert-error z-0 mt-2 w-3/4 shadow-lg"
		>
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 flex-shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>

				<span>{errMessage}</span>
			</div>
		</div>
	{/if}

	{#if gotdata}
		{#await promisePlaces}
			<Spinner />
		{:then places}
			<div
				in:fly={{ x: -200, duration: 1500 }}
				class="items-center grid mt-12 mx-2 mb-5 gap-4 justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
			>
				{#each places.features as place}
					<PlaceCard
						placeName={place.properties.name}
						placeLat={place.geometry.coordinates[1]}
						placeLong={place.geometry.coordinates[0]}
						placeId={place.properties.xid}
					/>
				{/each}
			</div>
		{:catch Error}
			<h2 class="text-center">error loading data : {Error.message}</h2>
		{/await}
	{/if}
</section>

<Map />
