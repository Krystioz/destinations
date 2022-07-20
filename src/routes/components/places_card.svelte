<script lang="ts">
	export let placeName: String;
	export let placeLat: Number;
	export let placeLong: Number;
</script>

<div class="card card-compact w-96 bg-base-100 shadow-xl">
	<figure>
		<img class="w-96 object-fill" src="http://placeimg.com/640/480/any" alt="nature images" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{placeName}</h2>
		{#if placeName == ''}
			<p>Brak opisu</p>
		{:else}
			<p>{placeName}</p>
		{/if}

		<div class="card-actions justify-end">
			<button class="btn-primary btn-xs rounded-lg">Zobacz więcej</button>
			<button class="btn-primary btn-xs rounded-lg text-center"
				><a
					class="p-3"
					target="blank"
					href="https://www.google.com/maps/search/?api=1&query={placeLat},{placeLong}"
					>Google maps</a
				>
			</button>
		</div>
	</div>
</div>
