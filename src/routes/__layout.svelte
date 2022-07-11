<script>
	import '../app.css';
	import Header from './components/header.svelte';
	import Footer from './components/footer.svelte';
</script>

<header><Header /></header>

<slot />
<Footer />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		min-height: 100vh;
		position: relative;
	}
	:global(footer) {
		margin-top: auto;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
