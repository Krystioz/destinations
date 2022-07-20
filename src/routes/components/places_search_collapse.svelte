<script lang="ts">
	export let lang: number;
	export let lat: number;
	export let score: number;
	export let radius: number;
	export let limit: number;
	export let Countries: JSON;
	export let categories: any;
	export let cat: Array<any>;
	export let gotCountries: boolean;
	export let getPlacesFunc: any;
</script>

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
		</div>

		<button on:click={() => getPlacesFunc} class="btn btn-success mx-2">szukaj</button>
		<div>
			<label for="my-modal-3" class="modal-button btn mx-2 w-24">Wybierz państwo</label>
			<!-- Put this part before </body> tag -->
			<input type="checkbox" id="my-modal-3" class="modal-toggle" />
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
		</div>

		<div>
			<label for="my-modal-4" class="modal-button btn mx-2 w-24">Kategorie</label>
			<!-- Put this part before </body> tag -->
			<input type="checkbox" id="my-modal-4" class="modal-toggle" />
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
</div>
