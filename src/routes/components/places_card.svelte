<script lang="ts">
	export let placeName: String;
	export let placeLat: Number;
	export let placeLong: Number;
</script>

<div class="card-compact card w-96 bg-base-100 shadow-xl">
	<figure>
		<img class="w-96 object-cover" src="http://placeimg.com/640/480/nature" alt="nature images" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">
			{placeName}
			<div class="badge badge-secondary inline">NEW</div>
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
			<button class="btn-primary btn-xs rounded-lg"><a href="/">Zobacz więcej</a> </button>

			<div class="tooltip" data-tip="link do google maps">
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
</div>
