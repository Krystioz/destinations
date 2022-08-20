<script lang="ts">
	import { searchParamsObj } from '../stores';
	export let catHead: string;
	export let catPar: string[];
</script>

<div
	class="collapse my-2 max-w-md rounded-lg bg-slate-100 shadow-lg transition duration-200 ease-in-out hover:translate-y-1 hover:scale-105 hover:shadow-2xl"
>
	<input type="checkbox" class="peer" />
	<div class="collapse-title text-center">{catHead.replaceAll('_', ' ')}</div>
	<div class="collapse-content">
		{#each catPar as catgry}
			<label class="label cursor-pointer">
				<span class="label-text">{catgry.replaceAll('_', ' ')}</span>
				<input
					on:click={() => console.log($searchParamsObj.cat)}
					bind:group={$searchParamsObj.cat}
					value={catgry}
					type="checkbox"
					class="checkbox-info checkbox"
				/>
			</label>
		{/each}
	</div>
</div>
