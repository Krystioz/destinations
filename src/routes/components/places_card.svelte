<script lang="ts">
	import { parse } from 'postcss';
	import { each } from 'svelte/internal';
	import { fly, crossfade, fade } from 'svelte/transition';

	import { choosenId, choosenSpecificPlace, apiKey } from '../stores';
	import Spinner from './loading_spinner.svelte';
	export let placeName: String;
	export let placeLat: Number;
	export let placeLong: Number;
	export let placeId: string;
	let chckSpec: boolean = false;

	async function fetchAddPlace() {
		try {
			await fetch('/Place', {
				method: 'POST',
				body: JSON.stringify({ 'id': 'asdasd', 'name': 'asdasd' }),
				headers: {
					'content-type': 'application/json'
				}
			}).then((res) => res.json()).then((as) => console.log(as));
		} catch (err: any) {
			console.log(err.message);
		}
	}

	function openSpecificInfo() {
		$choosenId = placeId;
		fetchSpecificPlace();
	}

	const fetchSpecificPlace = async () => {
		var info = await fetch(
			`https://api.opentripmap.com/0.1/en/places/xid/${$choosenId}?apikey=${$apiKey}`
		);

		var infoObj = await info.json();
		$choosenSpecificPlace = infoObj;
		// 	$choosenSpecificPlace.kinds = $choosenSpecificPlace.kinds
		// 		.split(',')
		// 		.map((el: string) => el.replace('_', ' '));
		// 	console.log($choosenSpecificPlace.kinds);
		// };
		$choosenSpecificPlace.kinds = infoObj.kinds.split(',');
		fetchAddPlace();
	};
</script>

<div class="card-compact card w-96 bg-base-100 shadow-xl">
	<figure>
		<img
			loading="lazy"
			class="w-96 object-cover"
			src="http://placeimg.com/640/480/nature"
			alt="nature images"
		/>
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

			<!-- SPECIFIC INFO MODAL OPEN -->
			<!-- Put this part before </body> tag -->
			<input bind:checked={chckSpec} type="checkbox" id="my-modal-6" class="modal-toggle" />
			<div class="modal modal-middle">
				<div class="modal-box max-w-6xl">
					<label for="my-modal-6" class="btn btn-circle btn-sm absolute right-2 top-2">✕</label>
					{#if chckSpec}
						{#await $choosenSpecificPlace}
							<Spinner />
							<!-- specificPlace is pending -->
						{:then place}
							<div class="grid grid-cols-4 auto-rows-auto gap-5">
								{#if place.preview}
									<img
										in:fade
										class="self-center hover:scale-105 rounded-lg
									 transition duration-200 ease-in-out col-span-2 row-span-3"
										src={place.preview.source}
										alt={place.name}
									/>
								{:else}
									<img
										class="self-center hover:scale-105 rounded-lg
									 transition duration-200 ease-in-out col-span-2 row-span-3"
										src="http://placeimg.com/780/500/nature"
										alt="nature images"
									/>
								{/if}

								<h1 class="text-center col-span-2 pb-0 text-xl text">{place.name}</h1>
								{#if place.wikipedia_extracts}
									<p in:fade class="col-span-2 text-right">{@html place.wikipedia_extracts.html}</p>
								{:else}
									<p class="col-span-2 text-center text-sm">Brak opisu !</p>
								{/if}
								<div
									class="grid content-end place-items-end gap-4 auto-cols-min grid-flow-col-dense mt-5"
								>
									{#if place.wikipedia}
										<button class="btn grid  btn-xs"
											><a class="text-xs" target="blank" href={place.wikipedia}>Wikipedia</a
											></button
										>
									{/if}

									{#if place.image}
										<button class="btn  btn-xs"
											><a class="text-xs" target="blank" href={place.image}>Image</a></button
										>
									{/if}
									<button class="btn btn-primary" on:click={fetchAddPlace} />
								</div>
								<div class="grid col-start-4 justify-items-end">
									<p class="text-left place-self-end mb-2">Tags:</p>

									<div class="flex flex-wrap gap-1 justify-end">
										{#each place.kinds as tag}
											<span class="badge badge-xs rounded">{tag.replaceAll('_', ' ')}</span>
										{/each}
									</div>
								</div>
							</div>
							<!-- specificPlace was fulfilled -->
						{:catch error}
							<h1>{error}</h1>
							<!-- specificPlace was rejected -->
						{/await}
					{/if}
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
