import { readable, derived, writable } from 'svelte/store';
export const countryInput = writable('');
export const citiesInput = writable('');
export const choosenId = writable('');
export const countriesArr = writable([]);
export const citiesArr = writable([]);
export const selectedCountryCode = writable('');
export const apiKey = readable('5ae2e3f221c38a28845f05b606b3b76d805d8dd89180dcbbbbcbdbf8');
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

