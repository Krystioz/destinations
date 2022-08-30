var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Routes
});
module.exports = __toCommonJS(stdin_exports);
var import_index_c35078eb = require("../../immutable/chunks/index-c35078eb.js");
var import_stores_ts = require("../endpoints/stores.ts.js");
const Routes = (0, import_index_c35078eb.c)(($$result, $$props, $$bindings, slots) => {
  let $time, $$unsubscribe_time;
  let $elapsed, $$unsubscribe_elapsed;
  $$unsubscribe_time = (0, import_index_c35078eb.b)(import_stores_ts.time, (value) => $time = value);
  $$unsubscribe_elapsed = (0, import_index_c35078eb.b)(import_stores_ts.elapsed, (value) => $elapsed = value);
  const formatter = new Intl.DateTimeFormat("en", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  });
  $$unsubscribe_time();
  $$unsubscribe_elapsed();
  return `${$$result.head += `${$$result.title = `<title>Destinations</title>`, ""}`, ""}

<div class="${"hero min-h-screen"}" style="${"background-image: url(http://placeimg.com/1000/1000/nature);"}"><div class="${"hero-overlay bg-opacity-60"}"></div>
	<div class="${"hero-content text-center text-neutral-content"}"><div class="${"max-w-md"}"><h1 class="${"mb-5 text-5xl font-bold"}">Witaj</h1>
			<h1>Aktualna godzina ${(0, import_index_c35078eb.e)(formatter.format($time))}</h1>
			<h2>Czas sp\u0119dzony na stronie: ${(0, import_index_c35078eb.e)($elapsed)}s</h2>

			<p class="${"mb-5 mt-5"}">Wspania\u0142e miejsca i niezapomniane przygody tylko czekaj\u0105 na odkrycie. Zag\u0142\u0105b si\u0119 w
				wyszukiwark\u0119 miejsc i odnajd\u017A sw\xF3j cel podr\xF3\u017Cy.
			</p>
			<button class="${"btn btn-primary"}"><a href="${"/places"}">Szukaj</a></button></div></div></div>`;
});
