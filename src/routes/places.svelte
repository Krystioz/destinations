<script lang="ts">
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import { initializeApp } from 'firebase/app';
	import { getDatabase, ref, onValue, get } from 'firebase/database';
	import { getAnalytics, logEvent } from 'firebase/analytics';

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
	// const analytics = getAnalytics(app);
	const db = getDatabase(app);
	let gotdata = false;
	let score = 1;

	const countries = ref(db, '/Countries');
	onValue(countries, (snapshot) => {
		const data = snapshot.val();
	});

	let Countries: JSON;
	get(countries).then((snapshot) => {
		Countries = snapshot.val();
		gotdata = true;
	});

	// historical%2Cnature%2Cmonuments%2Czoos
	const fetchPlaces = async (
		longitude: number,
		latitude: number,
		categories: string,
		rate: number,
		radius: number,
		limit: number
	) => {
		var response = await fetch(
			`https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${longitude}&lat=${latitude}&limit=${limit}&rate=${rate}&kinds=${categories}&apikey=5ae2e3f221c38a28845f05b606b3b76d805d8dd89180dcbbbbcbdbf8`
		);

		var result = await response.json();
		return result;
	};

	let promisePlaces = fetchPlaces();

	function getPlaces() {
		promisePlaces = fetchPlaces();
		console.log(promisePlaces);
		return promisePlaces;
	}

	//  "xid": "W202593695",
	// "name": "Museu del Tabac",
	// "dist": 89.15736524,
	// "rate": 3,
	// "osm": "way/202593695",
	// "wikidata": "Q2912611",
	// "kinds": "cultural,museums,interesting_places,other_museums",
	// "point": {
	//   "lon": 1.4915251731872559,
	//   "lat": 42.46450424194336
	// //saving places to my db
	// N376290602
	// 	function writePlacesData(xid, cords,id,properties){
	// let c=""
	// 	}
</script>

<section class="mb-auto flex flex-col justify-between gap-1">
	<div
		class="flex w-full flex-col items-center bg-[url('http://placeimg.com/1000/600/nature')] text-center"
	>
		<div class="prose my-5">
			<h2 class="w-full">Welcome to the destination searcher !</h2>
			<h3 class="w-full">I hope you will have fun</h3>
		</div>
	</div>
	<div class="divider mt-0">Odkrywaj</div>
	<div class="flex flex-row justify-center align-middle">
		<div class="collapse bg-slate-50">
			<input class="px-0" type="checkbox" />
			<div
				class="collapse-title bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text px-0 text-center text-2xl text-xl font-extrabold font-medium text-transparent"
			>
				Rozwiń panel szukania
			</div>
			<div class="collapse-content gap-5 lg:gap-24 flex flex-row flex-wrap items-center justify-between">
				<div class="flex flex-col items-center">
					<label for="xs">Popularność: {score}</label>
					<input id="xs" bind:value={score} type="range" min="1" max="3" class="range range-xs" />
				</div>
				<!-- <select class="select mx-2 select-bordered select-sm w-44 max-w-xs">
					<option disabled selected>Państwa</option>
					{#if gotdata}
						{#each Object.values(Countries) as country}
							<option>{country.translations.pol.official}</option>
						{/each}
					{:else}
						<option>Loading your data</option>
					{/if}
				</select> -->
				<button on:click={getPlaces} class="btn btn-success mx-2">szukaj</button>
				<div>
					<label for="my-modal-3" class="modal-button btn mx-2 w-24">Wybierz państwo</label>
					<!-- Put this part before </body> tag -->
					<input type="checkbox" id="my-modal-3" class="modal-toggle" />
					<div class="modal">
						<div class="modal-box relative h-80">
							<label for="my-modal-3" class="btn btn-circle btn-sm absolute right-2 top-2">✕</label>
							<h3 class="text-lg font-bold">Wybierz państwo</h3>
							{#if gotdata}
								{#each Object.values(Countries) as country}
									<p href="" class="link m-2 text-xs">{country.translations.pol.official}</p>
								{/each}
							{:else}
								<p>Loading your data</p>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	{#await promisePlaces}
		<h3>Loading your places</h3>
	{:then places}
		<div class="flex w-auto mx-2 flex-row flex-wrap align-middle gap-4 mb-10">
			{#each places.features as place}
				<div class="card-compact card w-96 bg-base-100 shadow-xl">
					<figure>
						<img
							class="object-fill w-96"
							src="http://placeimg.com/640/480/any"
							alt="nature images"
						/>
					</figure>
					<div class="card-body">
						<h2 class="card-title">{place.id}</h2>
						{#if place.properties.name == ''}
							<p>Brak opisu</p>
						{:else}
							<p>{place.properties.name}</p>
						{/if}

						<div class="card-actions justify-end">
							<button class="btn-xs rounded-lg btn-primary">Zobacz więcej</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:catch Error}
		<h2 class="text-center">error loading data : {Error.message}</h2>
	{/await}
</section>
