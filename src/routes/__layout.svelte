<script>
	import '../app.css';
	import Header from './components/header.svelte';
	import Footer from './components/footer.svelte';
</script>

<div class="flex h-screen flex-col justify-between">
	<Header />
	<slot />
	<Footer />
</div>

<style>

</style>
