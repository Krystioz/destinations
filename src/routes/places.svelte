<script lang="ts">
	import { initializeApp } from 'firebase/app';
	import { getDatabase, ref, onValue, get, equalTo } from 'firebase/database';
	import { fly, fade } from 'svelte/transition';
	import PlaceCard from '../routes/components/places_card.svelte';
	import SearchCollapse from '../routes/components/places_search_collapse.svelte';
	import Spinner from '../routes/components/loading_spinner.svelte';

	const firebaseConfig = {
		apiKey: 'AIzaSyCsEUT-SULj3zJGSNxWGxnPCuOB8EXh4MQ',
		authDomain: 'destinations-17365.firebaseapp.com',
		projectId: 'destinations-17365',
		storageBucket: 'destinations-17365.appspot.com',
		messagingSenderId: '390176124792',
		appId: '1:390176124792:web:2ba76a77eeed208014a28d',
		measurementId: 'G-XT8Q3MCF6S',
		databaseURL: 'https://destinations-17365-default-rtdb.firebaseio.com'
	};

	const app = initializeApp(firebaseConfig);
	const db = getDatabase(app);
	let gotdata: boolean = false;
	let gotCountries: boolean = false;
	let score: number = 1;
	let lat: number;
	let lang: number;
	let limit: number = 1;
	let radius: number = 1000;
	let cat: Array<any> = [];
	const countries = ref(db, '/Countries');
	let Countries: JSON;
	let promisePlaces: Promise<any>;
	let categories: Array<any> = [
		'natural',
		'other',
		'religion',
		'historical',
		'sport',
		'architecture'
	];
	let showErr = false;
	let countryChoosen: string;
	let errMessage: string = '';
	let criteria: Array<any> = [
		{
			id: 0,
			lat: -21.23333333,
			lang: -159.76666666,
			score: 1,
			categories: ['natural'],
			country: 'Wyspy Cooka',
			radius: 9055,
			limit: 3
		}
	];
	get(countries).then((snapshot) => {
		Countries = snapshot.val();
		gotCountries = true;
	});
	let i: number = 0;

	// historical%2Cnature%2Cmonuments%2Czoos
	const fetchPlaces = async (
		longitude: number,
		latitude: number,
		cat: string,
		rate: number,
		radius: number,
		limit: number
	) => {
		var response = await fetch(
			`https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${longitude}&lat=${latitude}&limit=${limit}&rate=${rate}&kinds=${cat}&apikey=5ae2e3f221c38a28845f05b606b3b76d805d8dd89180dcbbbbcbdbf8`
		);

		var result = await response.json();
		return result;
	};

	function getPlaces(
		longitude: number,
		latitude: number,
		cat: string,
		rate: number,
		radius: number,
		limit: number
	) {
		if (lat == undefined || lang == undefined || cat == '') {
			showErr = true;
			errMessage = 'Please select all search criteria !';
			setTimeout(() => {
				showErr = false;
			}, 3000);
			return;
		}
		pushCriteria();
		promisePlaces = fetchPlaces(longitude, latitude, cat, rate, radius, limit);
		gotdata = true;
		return promisePlaces;
	}
	function applyCriteria(a: number) {
		let arr = criteria[a];
		console.log(a);
		score = arr.score;
		lat = arr.lat;
		lang = arr.lang;
		limit = arr.limit;
		radius = arr.radius;
		cat = arr.categories;
		countryChoosen = arr.country;
		console.log(lat, lang, limit, radius, score, cat);
	}
	function pushCriteria() {
		if (criteria.length >= 4) {
			criteria.shift();
		}
		criteria.push({
			id: i + 1,
			lat: lat,
			lang: lang,
			score: score,
			categories: cat,
			country: countryChoosen,
			radius: radius,
			limit: limit
		});
		i += 1;
		console.log(criteria);
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
		<SearchCollapse
			getPlacesFunc={() => getPlaces(lang, lat, cat.join(), score, radius, limit)}
			{applyCriteria}
			bind:lang
			bind:lat
			bind:score
			bind:radius
			bind:limit
			bind:cat
			bind:criteria
			bind:i
			bind:countryChoosen
			{Countries}
			{gotCountries}
			{categories}
		/>
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
					/>
				{/each}
			</div>
		{:catch Error}
			<h2 class="text-center">error loading data : {Error.message}</h2>
		{/await}
	{/if}
</section>
