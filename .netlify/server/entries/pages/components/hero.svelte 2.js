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
  default: () => Hero
});
module.exports = __toCommonJS(stdin_exports);
var import_index_c35078eb = require("../../../immutable/chunks/index-c35078eb.js");
const Hero = (0, import_index_c35078eb.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"hero min-h-screen items-start bg-base-200"}"><div class="${"hero-content flex-col lg:flex-row"}"><img src="${"https://placeimg.com/1000/400/arch"}" class="${"w-full max-w-xl rounded-lg shadow-2xl"}" alt="${"nature"}">
		<div class="${"prose"}"><h1 class="${""}">Box Office News!</h1>

			<p class="${""}">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
			<button class="${"btn btn-primary"}">Get Started</button></div></div></div>`;
});
