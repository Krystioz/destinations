<script lang="ts">
	import { time, elapsed } from './stores';

	const formatter = new Intl.DateTimeFormat('en', {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit'
	});
</script>

<svelte:head>
	<title>Destinations</title>
</svelte:head>

<div class="hero min-h-screen" style="background-image: url(http://placeimg.com/1000/1000/nature);">
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">Witaj</h1>
			<h1>Aktualna godzina {formatter.format($time)}</h1>
			<h2>Czas spędzony na stronie: {$elapsed}s</h2>

			<p class="mb-5 mt-5">
				Wspaniałe miejsca i niezapomniane przygody tylko czekają na odkrycie. Zagłąb się w
				wyszukiwarkę miejsc i odnajdź swój cel podróży.
			</p>
			<button class="btn btn-primary"><a href="/places">Szukaj</a></button>
		</div>
	</div>
</div>
