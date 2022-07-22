<script lang="ts">
	import { initializeApp } from 'firebase/app';
	import { getDatabase, ref, onValue, get } from 'firebase/database';
	import { fly } from 'svelte/transition';
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

	get(countries).then((snapshot) => {
		Countries = snapshot.val();
		gotCountries = true;
	});

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
		console.log(longitude, latitude, cat, rate, radius, limit);
		promisePlaces = fetchPlaces(longitude, latitude, cat, rate, radius, limit);
		gotdata = true;
		console.log(promisePlaces);
		return promisePlaces;
	}
</script>

<!-- START OF HTML DOCCUMENT -->

<section class="mb-auto flex flex-col items-center justify-between gap-1">
	<div
		class="flex w-full text-white flex-col items-center bg-[url('http://placeimg.com/1000/1000/nature')] text-center"
	>
		<div class="prose my-5">
			<h2 class="w-full text-white">Welcome to the destination searcher !</h2>
			<h3 class="w-full text-white">I hope you will have fun</h3>
		</div>
	</div>
	<div class="divider mt-12">Odkrywaj</div>
	<div class="flex flex-row justify-center align-middle">
		<SearchCollapse
			getPlacesFunc={() => getPlaces(lang, lat, cat.join(), score, radius, limit)}
			bind:lang
			bind:lat
			bind:score
			bind:radius
			bind:limit
			bind:cat
			{Countries}
			{gotCountries}
			{categories}
		/>
	</div>

	{#if gotdata}
		{#await promisePlaces}
			<Spinner />
		{:then places}
			<div
				in:fly
				class="items-center grid mt-12 mb-5 gap-7 justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
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
