import { readable, derived, writable } from 'svelte/store';
export const countryInput = writable('');
export const citiesInput = writable('');
export const choosenId = writable('');
export const countriesArr = writable([]);
export const citiesArr = writable([]);
export const selectedCountryCode = writable('');
export const choosenSpecificPlace = writable({
	kinds: '',
	name: '',
	wikipedia_extracts: { html: '' },
	wikipedia: '',
	preview: { source: '' },
	image: ''
});

export const searchParamsObj = writable({
	lat: 0,
	lang: 0,
	score: 1,
	limit: 3,
	radius: 1000,
	cat: [''],
	choosenCountry: '',
	choosenCity: '',
	choosenCountryCode: ''
});

export const searchParamsObjDef = writable({
	lat: 0,
	lang: 0,
	score: 1,
	limit: 3,
	radius: 1000,
	cat: [''],
	choosenCountry: '',
	choosenCity: '',
	choosenCountryCode: ''
});

export const searchCriteria = writable([
	{
		id: 0,
		lat: -21.23333333,
		lang: -159.76666666,
		score: 1,
		categories: ['natural'],
		country: 'Wyspy Cooka',
		radius: 9055,
		limit: 3
	}
]);

export const searchCatObj = readable({
	architecture: ['bridges', 'historic_architecture', 'lighthouses', 'skyscrapers', 'towers'],
	cultural: ['museums', 'theatres_and_entertainments', 'urban_environment'],
	historic: [
		'archaeology',
		'burial_places',
		'fortifications',
		'historical_places',
		'monuments_and_memorials'
	],
	industrial_facilities: [
		'abandoned_mineshafts',
		'abandoned_railway_stations',
		'dams',
		'factories',
		'mills',
		'mineshafts',
		'mints',
		'other_buildings',
		'power_stations',
		'railway_stations'
	],
	natural: [
		'beaches',
		'geological_formations',
		'glaciers',
		'islands',
		'natural_springs',
		'nature_reserves',
		'water'
	],
	other: ['sundials', 'historic_object', 'tourist_object', 'view_points'],
	religion: [
		'buddhist_temples',
		'cathedrals',
		'churches',
		'egyptian_temples',
		'hindu_temples',
		'monasteries',
		'mosques',
		'other_temples',
		'synagogues'
	]
});

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

const start: any = new Date();

export const elapsed = derived(time, ($time: any) => Math.round(($time - start) / 1000));
