<script lang="ts">
	import { parse } from 'postcss';
	import { each } from 'svelte/internal';
	import { fly, crossfade, fade } from 'svelte/transition';

	import { choosenId, choosenSpecificPlace } from '../stores';
	import Spinner from './loading_spinner.svelte';
	const OPENTRIPMAP_API = import.meta.env.VITE_OPENTRIPMAP_API;
	export let placeName: String;
	export let placeLat: Number;
	export let placeLong: Number;
	export let placeId: string;
	let chckSpec: boolean = false;
	let placeFetched: any;

	function checkIfPlaceIs(result: any) {
		if (result.query == null || result.query == '') {
			fetchSpecificPlace();

			console.log('no place in the database');
		} else {
			$choosenSpecificPlace = result.query;

			// $choosenSpecificPlace.kinds = result.querry.kinds.split(',');
		}
	}

	async function fetchAddPlace() {
		try {
			await fetch('/Place', {
				method: 'POST',
				body: JSON.stringify($choosenSpecificPlace),
				headers: {
					'content-type': 'application/json'
				}
			}).then((res) => res.json());
		} catch (err: any) {
			console.log(err.message);
		}
	}

	async function fetchPlace() {
		const params = new URLSearchParams({ xid: $choosenId });

		try {
			await fetch(`/Place?${params}`, {
				method: 'GET'
			})
				.then((res) => res.json())
				.then((as) => (placeFetched = as))
				.then((check) => checkIfPlaceIs(check));
		} catch (err: any) {
			console.log(err.message);
		}
	}

	function openSpecificInfo() {
		$choosenId = placeId;
		fetchPlace();
	}

	const fetchSpecificPlace = async () => {
		var info = await fetch(
			`https://api.opentripmap.com/0.1/en/places/xid/${$choosenId}?apikey=${OPENTRIPMAP_API}`
		);
		var infoObj: any = await info.json();
		$choosenSpecificPlace = infoObj;
		$choosenSpecificPlace.kinds = infoObj.kinds.split(',');

		fetchAddPlace();
	};
</script>

<div class="card-compact card w-96 bg-slate-100  transition-shadow hover:shadow-2xl">
	<!-- <figure>
		<img
			loading="lazy"
			class="w-96 object-cover"
			src="http://placeimg.com/640/480/nature"
			alt="nature images"
		/>
	</figure> -->
	<div class="card-body">
		<h2 class="card-title">
			{placeName}
			<div class="grid grid-cols-1" />
		</h2>

		{#if placeName == ''}
			<p>Brak opisu</p>
		{:else}
			<p />
		{/if}

		<div class="card-actions justify-end">
			<!-- The button to open modal -->
			<div class="flex flex-row items-center gap-4">
				<button class="btn-primary btn-xs rounded-md">
					<label on:click={() => openSpecificInfo()} for="my-modal-6" class="">Discover</label>
				</button>
				<button class="btn-primary btn-xs rounded-lg text-center"
					><a
						class="h-full"
						target="blank"
						href="https://www.google.com/maps/search/?api=1&query={placeLat},{placeLong}"
						>Google maps</a
					>
				</button>
			</div>

			<!-- SPECIFIC INFO MODAL OPEN -->
			<!-- Put this part before </body> tag -->
			<input bind:checked={chckSpec} type="checkbox" id="my-modal-6" class="modal-toggle" />
			<div class="modal modal-middle">
				<div class:max-w-6xl={$choosenSpecificPlace.preview} class="modal-box min-w-min ">
					<label for="my-modal-6" class="btn btn-circle btn-sm absolute right-2 top-2">✕</label>

					{#await $choosenSpecificPlace}
						<Spinner />
						<!-- specificPlace is pending -->
					{:then place}
						{#if place.preview}
							<div class="grid auto-rows-auto auto-cols-auto gap-5">
								<img
									in:fade
									class="col-span-2 row-span-3 self-center
									 rounded-lg transition duration-200 ease-in-out hover:scale-105"
									src={place.preview.source}
									alt={place.name}
								/>

								<h1 class="text col-span-2 pb-0 text-center text-lg">{place.name}</h1>
								{#if place.wikipedia_extracts}
									<p in:fade class="col-span-2 text-right">{@html place.wikipedia_extracts.html}</p>
								{:else}
									<p class="col-span-2 text-center text-sm">Brak opisu!</p>
								{/if}
								<div
									class="mt-5 grid auto-cols-min grid-flow-col-dense place-items-end content-end gap-4"
								>
									{#if place.wikipedia}
										<button class="btn btn-xs  grid"
											><a class="text-xs" target="blank" href={place.wikipedia}>Wikipedia</a
											></button
										>
									{/if}

									{#if place.image}
										<button class="btn  btn-xs"
											><a class="text-xs" target="blank" href={place.image}>Image</a></button
										>
									{/if}
								</div>
								<div class="col-start-4 grid justify-items-end">
									<p class="mb-2 place-self-end text-left">Tags:</p>

									<div class="flex flex-wrap justify-end gap-1">
										{#each place.kinds as tag}
											<span class="badge badge-xs rounded">{tag.replaceAll('_', ' ')}</span>
										{/each}
									</div>
								</div>
							</div>
						{:else}
							<div class="grid auto-rows-auto auto-cols-auto gap-5">
								<h1 class="text pb-0 text-center text-lg">{place.name}</h1>
								{#if place.wikipedia_extracts}
									<p in:fade class="col-span-2 text-right">{@html place.wikipedia_extracts.html}</p>
								{:else}
									<p class=" text-center text-sm">Brak opisu !</p>
								{/if}
								<div
									class="mt-5 grid auto-cols-min grid-flow-col-dense place-items-end content-end gap-4"
								>
									{#if place.wikipedia}
										<button class="btn btn-xs  grid"
											><a class="text-xs" target="blank" href={place.wikipedia}>Wikipedia</a
											></button
										>
									{/if}

									{#if place.image}
										<button class="btn  btn-xs"
											><a class="text-xs" target="blank" href={place.image}>Image</a></button
										>
									{/if}
								</div>
								<div class=" grid justify-items-end">
									<p class="mb-2 place-self-end text-left">Tags:</p>

									<div class="flex flex-wrap justify-end gap-1">
										{#each place.kinds as tag}
											<span class="badge badge-xs rounded">{tag.replaceAll('_', ' ')}</span>
										{/each}
									</div>
								</div>
							</div>
						{/if}

						<!-- specificPlace was fulfilled -->
					{:catch error}
						<h1>{error}</h1>
						<!-- specificPlace was rejected -->
					{/await}
				</div>
			</div>
		</div>
	</div>
</div>
<!-- The button to open modal -->
