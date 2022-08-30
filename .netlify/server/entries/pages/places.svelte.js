var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Places
});
module.exports = __toCommonJS(stdin_exports);
var import_index_c35078eb = require("../../immutable/chunks/index-c35078eb.js");
var import_stores_ts = require("../endpoints/stores.ts.js");
var import_google_map_svelte = __toESM(require("./components/google_map.svelte.js"));
var import_places_card_svelte = __toESM(require("./components/places_card.svelte.js"));
var import_places_search_collapse_svelte = __toESM(require("./components/places_search_collapse.svelte.js"));
var import_loading_spinner_svelte = __toESM(require("./components/loading_spinner.svelte.js"));
var import_postcss = require("postcss");
var import_category_collapse_svelte = require("./components/category_collapse.svelte.js");
let gotCities = false;
const Places = (0, import_index_c35078eb.c)(($$result, $$props, $$bindings, slots) => {
  let $searchCriteria, $$unsubscribe_searchCriteria;
  let $searchParamsObj, $$unsubscribe_searchParamsObj;
  let $$unsubscribe_countriesArr;
  $$unsubscribe_searchCriteria = (0, import_index_c35078eb.b)(import_stores_ts.searchCriteria, (value) => $searchCriteria = value);
  $$unsubscribe_searchParamsObj = (0, import_index_c35078eb.b)(import_stores_ts.searchParamsObj, (value) => $searchParamsObj = value);
  $$unsubscribe_countriesArr = (0, import_index_c35078eb.b)(import_stores_ts.countriesArr, (value) => value);
  const OPENTRIPMAP_API = "5ae2e3f221c38a28845f05b606b3b76d805d8dd89180dcbbbbcbdbf8";
  let gotdata = false;
  let gotCountries = false;
  let promisePlaces;
  let showErr = false;
  let errMessage = "";
  let i = 0;
  const fetchPlaces = async () => {
    var response = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=${$searchParamsObj.radius}&lon=${$searchParamsObj.lang}&lat=${$searchParamsObj.lat}&limit=${$searchParamsObj.limit}&rate=${$searchParamsObj.score}&kinds=${$searchParamsObj.cat.join()}&apikey=${OPENTRIPMAP_API}`);
    var result = await response.json();
    return result;
  };
  function getPlaces() {
    if ($searchParamsObj.lat == void 0 || $searchParamsObj.cat == [""]) {
      showErr = true;
      errMessage = "Please select all search criteria !";
      setTimeout(() => {
        showErr = false;
      }, 3e3);
      return;
    }
    pushCriteria();
    promisePlaces = fetchPlaces();
    gotdata = true;
    return promisePlaces;
  }
  function pushCriteria() {
    let criteriaObj = $searchCriteria;
    if (criteriaObj.length >= 4) {
      criteriaObj.shift();
      (0, import_index_c35078eb.j)(import_stores_ts.searchCriteria, $searchCriteria = criteriaObj, $searchCriteria);
    }
    criteriaObj.push({
      id: i + 1,
      lat: $searchParamsObj.lat,
      lang: $searchParamsObj.lang,
      score: $searchParamsObj.score,
      categories: $searchParamsObj.cat,
      country: $searchParamsObj.choosenCountry,
      radius: $searchParamsObj.radius,
      limit: $searchParamsObj.limit
    });
    (0, import_index_c35078eb.j)(import_stores_ts.searchCriteria, $searchCriteria = criteriaObj, $searchCriteria);
    i += 1;
  }
  $$unsubscribe_searchCriteria();
  $$unsubscribe_searchParamsObj();
  $$unsubscribe_countriesArr();
  return `

<section class="${"mb-auto flex flex-col items-center justify-between gap-1"}"><div class="${"flex w-full flex-col items-center bg-[url('http://placeimg.com/1000/1000/nature')] text-center text-white"}"><div class="${"prose my-5"}"><h2 class="${"w-full text-white"}">Welcome to the destination searcher !</h2>
			<h3 class="${"w-full text-white"}">I hope you will have fun</h3></div></div>
	<div class="${"divider mt-12"}">Odkrywaj</div>
	<div class="${"z-10 flex flex-row justify-center align-middle"}">${(0, import_index_c35078eb.v)(import_places_search_collapse_svelte.default, "SearchCollapse").$$render($$result, {
    getPlacesFunc: () => getPlaces(),
    gotCountries,
    gotCities
  }, {}, {})}</div>
	${showErr ? `<div class="${"alert alert-error z-0 mt-2 w-3/4 shadow-lg"}"><div><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-6 w-6 flex-shrink-0 stroke-current"}" fill="${"none"}" viewBox="${"0 0 24 24"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"}"></path></svg>

				<span>${(0, import_index_c35078eb.e)(errMessage)}</span></div></div>` : ``}

	${gotdata ? `${function(__value) {
    if ((0, import_index_c35078eb.g)(__value)) {
      __value.then(null, import_index_c35078eb.n);
      return `
			${(0, import_index_c35078eb.v)(import_loading_spinner_svelte.default, "Spinner").$$render($$result, {}, {}, {})}
		`;
    }
    return function(places) {
      return `
			<div class="${"items-center grid mt-12 mx-2 mb-5 gap-4 justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}">${(0, import_index_c35078eb.d)(places.features, (place) => {
        return `${(0, import_index_c35078eb.v)(import_places_card_svelte.default, "PlaceCard").$$render($$result, {
          placeName: place.properties.name,
          placeLat: place.geometry.coordinates[1],
          placeLong: place.geometry.coordinates[0],
          placeId: place.properties.xid
        }, {}, {})}`;
      })}</div>
		`;
    }(__value);
  }(promisePlaces)}` : ``}</section>

${(0, import_index_c35078eb.v)(import_google_map_svelte.default, "Map").$$render($$result, {}, {}, {})}`;
});
