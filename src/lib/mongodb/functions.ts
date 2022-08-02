// export async function getCiti() {
// 	fetch('/Countries')
// 		.then((response) => response.json())
// 		.then((data) => {
// 			let dataCountries = data.querry;

// 			$countriesArr = dataCountries.map((el: any) => ({
// 				name: el.translations.pol.common,
// 				population: el.population,
// 				map_link: el.maps,
// 				lat: el.latlng[0],
// 				lang: el.latlng[1],
// 				capital: el.capital,
// 				code: el.altSpellings[0],
// 				id: i++
// 				// capital_latlng: [el.capitalInfo.latlng[0], el.capitalInfo.latlng[0]]
// 			}));
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});

// 	fetch('/Cities')
// 		.then((response) => response.json())
// 		.then((data) => ($citiesArr = data.querry))
// 		.catch((error) => {
// 			console.log(error);
// 		});
// 	gotCountries = true;
// 	gotCities = true;
// }
