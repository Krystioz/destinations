<script>
	import { time, elapsed } from './stores';
	import Hero from './components/hero.svelte';

	const formatter = new Intl.DateTimeFormat('en', {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit'
	});
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<div class="hero min-h-screen" style="background-image: url(http://placeimg.com/1000/1000/nature);">
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">Hello there</h1>
			<h1>The time is {formatter.format($time)}</h1>
			<h2>Time on this page : {$elapsed}</h2>
			<p class="mb-5">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
			<button class="btn btn-primary">Get Started</button>
		</div>
	</div>
</div>
