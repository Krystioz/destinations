<script lang="ts">
	import { initializeApp } from 'firebase/app';
	import { getDatabase, ref, onValue, get } from 'firebase/database';
	import { fly } from 'svelte/transition';
	import PlaceCard from '../routes/components/places_card.svelte';
	import SearchCollapse from '../routes/components/places_search_collapse.svelte';

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
	let radius: number = 1;
	let categories: Array<any> = [
		'natural',
		'other',
		'religion',
		'historical',
		'sport',
		'architecture'
	];
	let cat: Array<any> = [];

	const countries = ref(db, '/Countries');
	let Countries: JSON;
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

	let promisePlaces: Promise<any>;

	function getPlaces(
		longitude: number,
		latitude: number,
		cat: string,
		rate: number,
		radius: number,
		limit: number
	) {
		promisePlaces = fetchPlaces(longitude, latitude, cat, rate, radius, limit);
		gotdata = true;
		console.log(promisePlaces);
		return promisePlaces;
	}
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

		
		<SearchCollapse
			getPlacesFunc={getPlaces(lang, lat, cat.join(), score, radius, limit)}
			{gotCountries}
			{lang}
			{lat}
			{score}
			{radius}
			{limit}
			{Countries}
			{categories}
			{cat}
		/>
				<!-- start of collapse -->
				<!-- 
		<div class="collapse bg-slate-50">
			<input class="px-0" type="checkbox" />
			<div
				class="collapse-title bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text px-0 text-center text-2xl font-extrabold text-transparent"
			>
				Rozwiń panel szukania
			</div>
			<div
				class="collapse-content flex flex-row flex-wrap items-center justify-between gap-5 lg:gap-24"
			>
				<div class="flex flex-col items-center">
					<label for="xs">Popularność: {score}</label>
					<input id="xs" bind:value={score} type="range" min="1" max="3" class="range range-xs" />
				</div>
				<div class="flex flex-col items-center">
					<label for="xs">Wyniki: {limit}</label>
					<input id="xs" bind:value={limit} type="range" min="1" max="6" class="range range-xs" />
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
				</div> -->

				<!-- <button
					on:click={() => getPlaces(lang, lat, cat.join(), score, radius, limit)}
					class="btn btn-success mx-2">szukaj</button
				>
				<div>
					<label for="my-modal-3" class="modal-button btn mx-2 w-24">Wybierz państwo</label>
				 Put this part before </body> tag -->
				<!-- <input type="checkbox" id="my-modal-3" class="modal-toggle" />
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
											console.log(lat, lang);
										}}
										href=""
										class="link m-2 text-xs"
									>
										{country.translations.pol.official}
									</p>
								{/each}
							{:else}
								<p>Loading your data</p>
							{/if}
						</div>
					</div>
				</div> -->

				<!-- <div>
					<label for="my-modal-4" class="modal-button btn mx-2 w-24">Kategorie</label>
				 Put this part before </body> tag -->
				<!-- <input type="checkbox" id="my-modal-4" class="modal-toggle" />
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
			</div>
		</div> -->

				<!-- end of collapse -->


	</div>

	{#if gotdata}
		{#await promisePlaces}
			<!-- <div class="text-center w-full flex flex-col items-center justify-middle mt-20">
				<h3>Loading your places</h3>
			</div> -->
		{:then places}
			<div in:fly out:fly class="flex w-auto mx-2 flex-row flex-wrap align-middle gap-4 mb-10">
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
