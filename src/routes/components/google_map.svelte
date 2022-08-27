<script lang="ts">
	import { searchParamsObj } from '../stores';
	import { onMount } from 'svelte';
	import { Loader } from '@googlemaps/js-api-loader';
	const GOOGLE_MAPS_API = import.meta.env.VITE_GOOGLE_MAPS_API;

	const loader = new Loader({
		apiKey: GOOGLE_MAPS_API,
		version: 'weekly',
		libraries: ['places']
	});

	let map: any;

	let myLatlng: any;

	onMount(async () => {
		await loader
			.load()
			.then((google) => {
				map = new google.maps.Map(document.getElementById('map'), {
					center: { lat: 49.397, lng: 20.644 },
					zoom: 1.5
				});
				let infoWindow = new google.maps.InfoWindow({
					content: 'Click the map to get Lat/Lng!',
					position: myLatlng
				});

				map.addListener('click', (mapsMouseEvent: any) => {
					// Close the current InfoWindow.
					infoWindow.close();

					// Create a new InfoWindow.
					infoWindow = new google.maps.InfoWindow({
						position: mapsMouseEvent.latLng
					});
					infoWindow.setContent('Punkt został zapisany!');
					myLatlng = mapsMouseEvent.latLng.toJSON();
					$searchParamsObj.lat = myLatlng.lat;
					$searchParamsObj.lang = myLatlng.lng;
					console.log(myLatlng);
					infoWindow.open(map);
				});
			})
			.catch((error) => {
				console.log(error);
			})
			.then(function () {
				// always executed
			});
	});

</script>

<div id="map" class="map mx-auto h-full w-full" />

<style>
	#map {
		position: relative !important;
	}
</style>
