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

	const countries = ref(db, '/Countries');
	onValue(countries, (snapshot) => {
		const data = snapshot.val();
	});

	let Countries;
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
		let promisePlaces = fetchPlaces();
		return promisePlaces;
		console.log(Countries);
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

<section class="mb-10 flex flex-col justify-between gap-1">
	<div class="prose mx-auto mt-12 flex flex-col items-center text-center">
		<h2>Welcome to the destination searcher !</h2>
		<h3>I hope you will have fun</h3>
	</div>
	<div class="divider">Look around</div>

	<nav class="mx-10 mb-8 flex flex-row items-center justify-center gap-9">
		<select class="select select-bordered select-sm w-44 max-w-xs">
			<option disabled selected>Państwa</option>
			{#if gotdata}
				{#each Object.values(Countries) as country}
					<option>{country.translations.pol.official}</option>
				{/each}
			{:else}
				<option>Loading your data</option>
			{/if}
		</select>
		<button on:click={getPlaces} class="btn btn-success">Search</button>
		<!-- The button to open modal -->
	</nav>


	<label for="my-modal-3" class="modal-button btn w-24">open modal</label>
	<!-- Put this part before </body> tag -->
	<input type="checkbox" id="my-modal-3" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box relative h-80">
			<label for="my-modal-3" class="btn btn-circle btn-sm absolute right-2 top-2">✕</label>
			<h3 class="text-lg font-bold">Wybierz państwo</h3>
			{#if gotdata}
				{#each Object.values(Countries) as country}
					<a class="text-xs link m-2">{country.translations.pol.official}</a>
				{/each}
			{:else}
				<p>Loading your data</p>
			{/if}
		</div>
	</div>

	<div class="collapse bg-slate-50">
  <input type="checkbox" /> 
  <div class="collapse-title text-xl font-medium">
    Click me to show/hide content
  </div>
  <div class="collapse-content"> 
    <p>tabindex="0" attribute is necessary to make the div focusable</p>
  </div>
</div>

	<!-- {#await promisePlaces}
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
	{/await} -->
</section>
