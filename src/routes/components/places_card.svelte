<script lang="ts">
	import { parse } from 'postcss';

	import { choosenId, choosenSpecificPlace, apiKey } from '../stores';
	import Spinner from './loading_spinner.svelte';
	export let placeName: String;
	export let placeLat: Number;
	export let placeLong: Number;
	export let placeId: string;
	let specificPlace: object = {};
	// export let placeCat: Array<any>;

	function openSpecificInfo() {
		$choosenId = placeId;
		specificPlace = fetchSpecificPlace();
		console.log(
			'🚀 ~ file: places_card.svelte ~ line 16 ~ openSpecificInfo ~ specificPlace',
			specificPlace
		);
	}

	const fetchSpecificPlace = async () => {
		var info = await fetch(
			`https://api.opentripmap.com/0.1/en/places/xid/${$choosenId}?apikey=${$apiKey}`
		);

		var infoObj = await info.json();
		$choosenSpecificPlace = infoObj;
		return infoObj;
	};
</script>

<div class="card-compact card w-96 bg-base-100 shadow-xl">
	<figure>
		<img class="w-96 object-cover" src="http://placeimg.com/640/480/nature" alt="nature images" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">
			{placeName}
			<div class="grid grid-cols-1" />
		</h2>

		{#if placeName == ''}
			<p>Brak opisu</p>
		{:else}
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, facilis! Non fuga
				mollitia labore quaerat sequi porro dicta iste at illo consequatur atque iure tempore, sed
				optio, alias nulla velit.
			</p>
		{/if}

		<div class="card-actions justify-end">
			<!-- The button to open modal -->
			<label
				on:click={() => openSpecificInfo()}
				for="my-modal-6"
				class="btn-primary btn-xs rounded-md">more info</label
			>

			<!-- Put this part before </body> tag -->
			<input type="checkbox" id="my-modal-6" class="modal-toggle" />
			<div class="modal modal-middle">
				<div class="modal-box max-w-6xl">
					<label for="my-modal-6" class="btn btn-circle btn-sm absolute right-2 top-2">✕</label>
					{#await specificPlace}
						<Spinner />
						<!-- specificPlace is pending -->
					{:then place}
						<div class="grid grid-cols-6 grid-rows-2 prose">

							<img
								class=" w-96 row-start-1 row-end-2 row-span-2 col-span-3  rounded"
								src="http://placeimg.com/640/480/nature"
								alt="nature images"
							/>
							<h1>hello hello heeeelllooo !!!!</h1>
							

							<p>{$choosenSpecificPlace.name}</p>
						</div>
						<!-- specificPlace was fulfilled -->
					{:catch error}
						<h1>{error.message}</h1>
						<!-- specificPlace was rejected -->
					{/await}
				</div>
			</div>

			<button class="btn-primary btn-xs rounded-lg text-center"
				><a
					class=""
					target="blank"
					href="https://www.google.com/maps/search/?api=1&query={placeLat},{placeLong}"
					>Google maps</a
				>
			</button>
		</div>
	</div>
</div>
<!-- The button to open modal -->