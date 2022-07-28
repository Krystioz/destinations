<script lang="ts">
	import { choosenId, choosenSpecificPlace, apiKey } from '../stores';
	import Spinner from './loading_spinner.svelte';
	export let placeName: String;
	export let placeLat: Number;
	export let placeLong: Number;
	export let placeId: string;
	let specificPlace: Promise<any>;
	// export let placeCat: Array<any>;

	function openSpecificInfo() {
		$choosenId = placeId;

		specificPlace = fetchSpecificPlace();
		$choosenSpecificPlace = specificPlace;
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
			<div class="modal modal-bottom sm:modal-middle">
				<div class="modal-box">
					{#await specificPlace}
						<Spinner />
						<!-- specificPlace is pending -->
					{:then place}
						<div class="grid grid-cols-2">
							<img
								class="w-96 object-cover"
								src="http://placeimg.com/640/480/nature"
								alt="nature images"
							/>
							<h1>hello hello heeeelllooo !!!!</h1>
							{console.log($choosenSpecificPlace)}
							<p>{$choosenSpecificPlace.name}</p>
							<p />
						</div>
						<!-- specificPlace was fulfilled -->
					{:catch error}
						<h1>{error.message}</h1>
						<!-- specificPlace was rejected -->
					{/await}
					<div class="ml-auto">
						<label for="my-modal-6" class="btn">Yay!</label>
					</div>
				</div>
			</div>

			<div class="tooltip" data-tip="link do google maps">
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
</div>
