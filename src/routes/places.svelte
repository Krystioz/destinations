<script lang="ts">
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	const fetchPlaces = async () => {
		var response = await fetch(
			'https://api.opentripmap.com/0.1/en/places/radius?radius=100000&lon=21.012230&lat=52.229675&limit=12&apikey=5ae2e3f221c38a28845f05b606b3b76d805d8dd89180dcbbbbcbdbf8'
		);

		var result = await response.json();
		console.log(result);
		return result;
	};


	let promisePlaces = fetchPlaces();
	let mounted: boolean;

</script>

<section class=" m-auto mb-10 flex flex-col items-center justify-between gap-1">
	<div class=" prose mt-12 text-center">
		<h2>Welcome to the destination searcher !</h2>
		<h3>I hope you will have fun</h3>
	</div>
	<div class="divider">Look around</div>

	{#await promisePlaces}
		<h3>Loading your places</h3>
	{:then places}
			<div class="flex w-auto flex-row flex-wrap justify-center gap-4 mb-10">
				{#each places.features as place}
					<div class="card-compact card w-96 bg-base-100 shadow-xl">
						<figure>
							<img src="https://placeimg.com/600/400/nature" alt="nature images" />
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
