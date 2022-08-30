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
  default: () => Places_card
});
module.exports = __toCommonJS(stdin_exports);
var import_index_c35078eb = require("../../../immutable/chunks/index-c35078eb.js");
var import_postcss = require("postcss");
var import_stores_ts = require("../../endpoints/stores.ts.js");
var import_loading_spinner_svelte = __toESM(require("./loading_spinner.svelte.js"));
const Places_card = (0, import_index_c35078eb.c)(($$result, $$props, $$bindings, slots) => {
  let $choosenSpecificPlace, $$unsubscribe_choosenSpecificPlace;
  let $$unsubscribe_choosenId;
  $$unsubscribe_choosenSpecificPlace = (0, import_index_c35078eb.b)(import_stores_ts.choosenSpecificPlace, (value) => $choosenSpecificPlace = value);
  $$unsubscribe_choosenId = (0, import_index_c35078eb.b)(import_stores_ts.choosenId, (value) => value);
  let { placeName } = $$props;
  let { placeLat } = $$props;
  let { placeLong } = $$props;
  let { placeId } = $$props;
  let chckSpec = false;
  if ($$props.placeName === void 0 && $$bindings.placeName && placeName !== void 0)
    $$bindings.placeName(placeName);
  if ($$props.placeLat === void 0 && $$bindings.placeLat && placeLat !== void 0)
    $$bindings.placeLat(placeLat);
  if ($$props.placeLong === void 0 && $$bindings.placeLong && placeLong !== void 0)
    $$bindings.placeLong(placeLong);
  if ($$props.placeId === void 0 && $$bindings.placeId && placeId !== void 0)
    $$bindings.placeId(placeId);
  $$unsubscribe_choosenSpecificPlace();
  $$unsubscribe_choosenId();
  return `<div class="${"card-compact card w-96 bg-slate-100 transition-shadow hover:shadow-2xl"}">
	<div class="${"card-body"}"><h2 class="${"card-title"}">${(0, import_index_c35078eb.e)(placeName)}
			<div class="${"grid grid-cols-1"}"></div></h2>

		${placeName == "" ? `<p>Brak opisu</p>` : `<p></p>`}

		<div class="${"card-actions justify-end"}">
			<div class="${"flex flex-row items-center gap-4"}"><button class="${"btn-primary btn-xs rounded-md"}"><label for="${"my-modal-6"}" class="${""}">Discover</label></button>
				<button class="${"btn-primary btn-xs rounded-lg text-center"}"><a class="${"h-full"}" target="${"blank"}" href="${"https://www.google.com/maps/search/?api=1&query=" + (0, import_index_c35078eb.e)(placeLat, true) + "," + (0, import_index_c35078eb.e)(placeLong, true)}">Google maps</a></button></div>

			
			
			<input type="${"checkbox"}" id="${"my-modal-6"}" class="${"modal-toggle"}"${(0, import_index_c35078eb.f)("checked", chckSpec, 1)}>
			<div class="${"modal modal-middle"}"><div class="${["modal-box min-w-min ", $choosenSpecificPlace.preview ? "max-w-6xl" : ""].join(" ").trim()}"><label for="${"my-modal-6"}" class="${"btn btn-circle btn-sm absolute right-2 top-2"}">\u2715</label>

					${function(__value) {
    if ((0, import_index_c35078eb.g)(__value)) {
      __value.then(null, import_index_c35078eb.n);
      return `
						${(0, import_index_c35078eb.v)(import_loading_spinner_svelte.default, "Spinner").$$render($$result, {}, {}, {})}
						
					`;
    }
    return function(place) {
      return `
						${place.preview ? `<div class="${"grid auto-rows-auto auto-cols-auto gap-5"}"><img class="${"col-span-2 row-span-3 self-center rounded-lg transition duration-200 ease-in-out hover:scale-105"}"${(0, import_index_c35078eb.f)("src", place.preview.source, 0)}${(0, import_index_c35078eb.f)("alt", place.name, 0)}>

								<h1 class="${"text col-span-2 pb-0 text-center text-lg"}">${(0, import_index_c35078eb.e)(place.name)}</h1>
								${place.wikipedia_extracts ? `<p class="${"col-span-2 text-right"}"><!-- HTML_TAG_START -->${place.wikipedia_extracts.html}<!-- HTML_TAG_END --></p>` : `<p class="${"col-span-2 text-center text-sm"}">Brak opisu!</p>`}
								<div class="${"mt-5 grid auto-cols-min grid-flow-col-dense place-items-end content-end gap-4"}">${place.wikipedia ? `<button class="${"btn btn-xs grid"}"><a class="${"text-xs"}" target="${"blank"}"${(0, import_index_c35078eb.f)("href", place.wikipedia, 0)}>Wikipedia</a></button>` : ``}

									${place.image ? `<button class="${"btn btn-xs"}"><a class="${"text-xs"}" target="${"blank"}"${(0, import_index_c35078eb.f)("href", place.image, 0)}>Image</a></button>` : ``}</div>
								<div class="${"col-start-4 grid justify-items-end"}"><p class="${"mb-2 place-self-end text-left"}">Tags:</p>

									<div class="${"flex flex-wrap justify-end gap-1"}">${(0, import_index_c35078eb.d)(place.kinds, (tag) => {
        return `<span class="${"badge badge-xs rounded"}">${(0, import_index_c35078eb.e)(tag.replaceAll("_", " "))}</span>`;
      })}</div></div></div>` : `<div class="${"grid auto-rows-auto auto-cols-auto gap-5"}"><h1 class="${"text pb-0 text-center text-lg"}">${(0, import_index_c35078eb.e)(place.name)}</h1>
								${place.wikipedia_extracts ? `<p class="${"col-span-2 text-right"}"><!-- HTML_TAG_START -->${place.wikipedia_extracts.html}<!-- HTML_TAG_END --></p>` : `<p class="${"text-center text-sm"}">Brak opisu !</p>`}
								<div class="${"mt-5 grid auto-cols-min grid-flow-col-dense place-items-end content-end gap-4"}">${place.wikipedia ? `<button class="${"btn btn-xs grid"}"><a class="${"text-xs"}" target="${"blank"}"${(0, import_index_c35078eb.f)("href", place.wikipedia, 0)}>Wikipedia</a></button>` : ``}

									${place.image ? `<button class="${"btn btn-xs"}"><a class="${"text-xs"}" target="${"blank"}"${(0, import_index_c35078eb.f)("href", place.image, 0)}>Image</a></button>` : ``}</div>
								<div class="${"grid justify-items-end"}"><p class="${"mb-2 place-self-end text-left"}">Tags:</p>

									<div class="${"flex flex-wrap justify-end gap-1"}">${(0, import_index_c35078eb.d)(place.kinds, (tag) => {
        return `<span class="${"badge badge-xs rounded"}">${(0, import_index_c35078eb.e)(tag.replaceAll("_", " "))}</span>`;
      })}</div></div></div>`}

						
					`;
    }(__value);
  }($choosenSpecificPlace)}</div></div></div></div></div>
`;
});
