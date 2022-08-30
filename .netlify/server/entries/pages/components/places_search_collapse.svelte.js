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
  default: () => Places_search_collapse
});
module.exports = __toCommonJS(stdin_exports);
var import_index_c35078eb = require("../../../immutable/chunks/index-c35078eb.js");
var import_stores_ts = require("../../endpoints/stores.ts.js");
var import_loading_spinner_svelte = __toESM(require("./loading_spinner.svelte.js"));
var import_category_collapse_svelte = __toESM(require("./category_collapse.svelte.js"));
var import_google_map_svelte = __toESM(require("./google_map.svelte.js"));
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function crossfade(_a) {
  var { fallback } = _a, defaults = __rest(_a, ["fallback"]);
  const to_receive = /* @__PURE__ */ new Map();
  const to_send = /* @__PURE__ */ new Map();
  function crossfade2(from, node, params) {
    const { delay = 0, duration = (d2) => Math.sqrt(d2) * 30, easing = cubicOut } = (0, import_index_c35078eb.h)((0, import_index_c35078eb.h)({}, defaults), params);
    const to = node.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const dw = from.width / to.width;
    const dh = from.height / to.height;
    const d = Math.sqrt(dx * dx + dy * dy);
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    const opacity = +style.opacity;
    return {
      delay,
      duration: (0, import_index_c35078eb.i)(duration) ? duration(d) : duration,
      easing,
      css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
    };
  }
  function transition(items, counterparts, intro) {
    return (node, params) => {
      items.set(params.key, {
        rect: node.getBoundingClientRect()
      });
      return () => {
        if (counterparts.has(params.key)) {
          const { rect } = counterparts.get(params.key);
          counterparts.delete(params.key);
          return crossfade2(rect, node, params);
        }
        items.delete(params.key);
        return fallback && fallback(node, params, intro);
      };
    };
  }
  return [
    transition(to_send, to_receive, false),
    transition(to_receive, to_send, true)
  ];
}
const Places_search_collapse = (0, import_index_c35078eb.c)(($$result, $$props, $$bindings, slots) => {
  let $citiesArr, $$unsubscribe_citiesArr;
  let $searchParamsObj, $$unsubscribe_searchParamsObj;
  let $countryInput, $$unsubscribe_countryInput;
  let $countriesArr, $$unsubscribe_countriesArr;
  let $citiesInput, $$unsubscribe_citiesInput;
  let $$unsubscribe_searchParamsObjDef;
  let $searchCriteria, $$unsubscribe_searchCriteria;
  let $searchCatObj, $$unsubscribe_searchCatObj;
  $$unsubscribe_citiesArr = (0, import_index_c35078eb.b)(import_stores_ts.citiesArr, (value) => $citiesArr = value);
  $$unsubscribe_searchParamsObj = (0, import_index_c35078eb.b)(import_stores_ts.searchParamsObj, (value) => $searchParamsObj = value);
  $$unsubscribe_countryInput = (0, import_index_c35078eb.b)(import_stores_ts.countryInput, (value) => $countryInput = value);
  $$unsubscribe_countriesArr = (0, import_index_c35078eb.b)(import_stores_ts.countriesArr, (value) => $countriesArr = value);
  $$unsubscribe_citiesInput = (0, import_index_c35078eb.b)(import_stores_ts.citiesInput, (value) => $citiesInput = value);
  $$unsubscribe_searchParamsObjDef = (0, import_index_c35078eb.b)(import_stores_ts.searchParamsObjDef, (value) => value);
  $$unsubscribe_searchCriteria = (0, import_index_c35078eb.b)(import_stores_ts.searchCriteria, (value) => $searchCriteria = value);
  $$unsubscribe_searchCatObj = (0, import_index_c35078eb.b)(import_stores_ts.searchCatObj, (value) => $searchCatObj = value);
  let { gotCountries } = $$props;
  let { gotCities } = $$props;
  let { getPlacesFunc = () => {
  } } = $$props;
  let newArr;
  let newArrCities = $citiesArr;
  let countryCities;
  crossfade({
    duration: (d) => Math.sqrt(d * 200),
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;
      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
      };
    }
  });
  if ($$props.gotCountries === void 0 && $$bindings.gotCountries && gotCountries !== void 0)
    $$bindings.gotCountries(gotCountries);
  if ($$props.gotCities === void 0 && $$bindings.gotCities && gotCities !== void 0)
    $$bindings.gotCities(gotCities);
  if ($$props.getPlacesFunc === void 0 && $$bindings.getPlacesFunc && getPlacesFunc !== void 0)
    $$bindings.getPlacesFunc(getPlacesFunc);
  {
    {
      newArrCities = $citiesArr.filter((e) => e.country.includes($searchParamsObj.choosenCountryCode));
      countryCities = newArrCities;
    }
  }
  {
    {
      newArrCities = countryCities.filter((e) => e.name.toLowerCase().indexOf($citiesInput.toLowerCase()) + 1);
    }
  }
  {
    {
      newArr = $countriesArr;
      newArr = $countriesArr.filter((e) => e.name.toLowerCase().indexOf($countryInput.toLowerCase()) + 1);
    }
  }
  $$unsubscribe_citiesArr();
  $$unsubscribe_searchParamsObj();
  $$unsubscribe_countryInput();
  $$unsubscribe_countriesArr();
  $$unsubscribe_citiesInput();
  $$unsubscribe_searchParamsObjDef();
  $$unsubscribe_searchCriteria();
  $$unsubscribe_searchCatObj();
  return `



<div class="${"collapse z-10 mx-1 rounded transition delay-150 duration-300 ease-in-out hover:shadow-lg"}"><input class="${"px-0"}" type="${"checkbox"}">
	<div class="${"collapse-title px-0 text-center text-2xl font-extrabold hover:bg-slate-400"}">Rozwi\u0144 panel szukania
	</div>
	<div class="${"collapse-content z-10 grid grid-cols-3 items-center justify-center justify-items-center gap-2 lg:gap-8 xl:gap-14"}"><div class="${"flex flex-col items-center"}"><label for="${"xs"}">Popularno\u015B\u0107: ${(0, import_index_c35078eb.e)($searchParamsObj.score)}</label>
			<input id="${"xs"}" type="${"range"}" min="${"1"}" max="${"3"}" class="${"range range-xs"}"${(0, import_index_c35078eb.f)("value", $searchParamsObj.score, 0)}></div>
		<div class="${"flex flex-col items-center"}"><label for="${"xs"}">Wyniki: ${(0, import_index_c35078eb.e)($searchParamsObj.limit)}</label>
			<input id="${"xs"}" type="${"range"}" min="${"1"}" max="${"30"}" class="${"range range-xs"}"${(0, import_index_c35078eb.f)("value", $searchParamsObj.limit, 0)}></div>
		<div class="${"flex flex-col items-center"}"><label for="${"xs"}">Zasi\u0119g: ${(0, import_index_c35078eb.e)(Math.round($searchParamsObj.radius / 1e3))} km</label>
			<input id="${"xs"}" type="${"range"}" min="${"1000"}" max="${"20000"}" class="${"range range-xs"}"${(0, import_index_c35078eb.f)("value", $searchParamsObj.radius, 0)}></div>

		<button class="${"btn btn-success mx-2 transition delay-150 duration-200 ease-in-out hover:translate-y-1 hover:scale-105"}">szukaj</button>
		<div><label for="${"my-modal-3"}" class="${"modal-button btn mx-2 w-24 transition delay-150 duration-200 ease-in-out hover:translate-y-1 hover:scale-105"}">Wybierz pa\u0144stwo</label>

			
			<input ${""} type="${"checkbox"}" id="${"my-modal-3"}" class="${"modal-toggle"}">
			<div class="${"modal"}"><div class="${"modal-box relative h-80 overflow-hidden"}"><label for="${"my-modal-3"}" class="${"btn btn-circle btn-sm absolute right-3 top-3"}">\u2715</label>

					
					${`<h3 class="${"mb-3 text-center text-lg font-bold"}">Wybierz pa\u0144stwo</h3>
						

						
						<div class="${"flex flex-col items-center"}"><input type="${"text"}" placeholder="${"Szukaj pa\u0144stwa"}" class="${"input input-bordered input-sm mb-4 w-full max-w-xs"}"${(0, import_index_c35078eb.f)("value", $countryInput, 0)}>
							<div class="${"grid grid-cols-3 items-center text-center align-middle"}">${gotCountries ? `${(0, import_index_c35078eb.d)(newArr.slice(0, 40), (country) => {
    return `<p href="${""}" class="${"m-2 cursor-pointer text-xs"}">${(0, import_index_c35078eb.e)(country.name)}
										</p>`;
  })}` : `<div class="${"col-start-2 flex"}">${(0, import_index_c35078eb.v)(import_loading_spinner_svelte.default, "Spinner").$$render($$result, {}, {}, {})}</div>`}</div></div>
						`}
					
					</div></div></div>

		<div><label for="${"my-modal-4"}" class="${"modal-button btn mx-2 w-24 transition delay-150 duration-200 ease-in-out hover:translate-y-1 hover:scale-105"}">Kategorie</label>
			
			<input type="${"checkbox"}" id="${"my-modal-4"}" class="${"modal-toggle"}">
			<div class="${"modal"}"><div class="${"prose modal-box relative flex max-w-xl flex-col items-center px-24"}"><label for="${"my-modal-4"}" class="${"btn btn-circle btn-sm absolute right-2 top-2"}">\u2715</label>
					<h3 class="${"text-center text-lg font-bold"}">Wybierz Kategorie</h3>
					<div class="${"form-control"}">${(0, import_index_c35078eb.d)(Object.keys($searchCatObj), (obj, i) => {
    return `
							${(0, import_index_c35078eb.v)(import_category_collapse_svelte.default, "CatCollapse").$$render($$result, {
      catHead: obj,
      catPar: Object.values($searchCatObj)[i]
    }, {}, {})}`;
  })}
						</div></div></div></div>

		
		<label for="${"my-modal-5"}" class="${"modal-button btn mx-auto transition delay-150 duration-200 ease-in-out hover:translate-y-1 hover:scale-105"}">Search criteria</label>

		<input ${""} type="${"checkbox"}" id="${"my-modal-5"}" class="${"modal-toggle"}">
		<div class="${"modal"}"><div class="${"modal-box relative"}"><label for="${"my-modal-5"}" class="${"btn btn-circle btn-sm absolute right-2 top-2"}">\u2715</label>
				<h3 class="${"text-center text-lg font-bold"}">Previous search criteria</h3>
				<div class="${"mt-2 grid grid-cols-2 gap-3"}">${(0, import_index_c35078eb.d)($searchCriteria, (item, id) => {
    return `<div class="${"delay-50 hover:scale-115 m-4 cursor-pointer rounded-lg shadow-md transition duration-200 ease-in-out hover:translate-y-1 hover:bg-slate-100 hover:shadow-2xl"}"><div><p class="${"m-2"}">Country: ${(0, import_index_c35078eb.e)(item.country)}</p>
								<p class="${"m-2"}">radius: ${(0, import_index_c35078eb.e)(item.radius)}</p>
								<p class="${"m-2"}">score: ${(0, import_index_c35078eb.e)(item.score)}</p>
								<p class="${"m-2"}">categories: ${(0, import_index_c35078eb.e)(item.categories)}</p></div>
						</div>`;
  })}</div></div></div>
		<button class="${"btn btn-outline btn-warning"}">Reset</button>
		
		<div><label for="${"my-modal-8"}" class="${"modal-button btn mx-2 w-24 transition delay-150 duration-200 ease-in-out hover:translate-y-1 hover:scale-105"}">Mapa</label>
			
			<input type="${"checkbox"}" id="${"my-modal-8"}" class="${"modal-toggle"}">
			<div class="${"modal"}"><div class="${"prose modal-box relative flex h-1/2 max-w-3xl flex-col items-center px-24"}"><label for="${"my-modal-8"}" class="${"btn btn-circle btn-sm absolute right-2 top-2"}">\u2715</label>
					${(0, import_index_c35078eb.v)(import_google_map_svelte.default, "Map").$$render($$result, {}, {}, {})}
					<h3 class="${"text-center text-lg font-bold"}">Wybierz punkt na mapie</h3>
					<div class="${"form-control"}"></div></div></div></div>
		</div></div>`;
});
