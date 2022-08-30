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
  default: () => Carusel
});
module.exports = __toCommonJS(stdin_exports);
var import_index_c35078eb = require("../../../immutable/chunks/index-c35078eb.js");
const Carusel = (0, import_index_c35078eb.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"carousel w-3/5 rounded"}"><div id="${"slide1"}" class="${"carousel-item relative w-full"}"><img src="${"https://placeimg.com/800/200/arch"}" class="${"w-full"}">
		<div class="${"absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"}"><a href="${"#slide4"}" class="${"btn btn-circle"}">\u276E</a>
			<a href="${"#slide2"}" class="${"btn btn-circle"}">\u276F</a></div></div>
	<div id="${"slide2"}" class="${"carousel-item relative w-full"}"><img src="${"https://placeimg.com/800/200/arch"}" class="${"w-full"}">
		<div class="${"absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"}"><a href="${"#slide1"}" class="${"btn btn-circle"}">\u276E</a>
			<a href="${"#slide3"}" class="${"btn btn-circle"}">\u276F</a></div></div>
	<div id="${"slide3"}" class="${"carousel-item relative w-full"}"><img src="${"https://placeimg.com/800/200/arch"}" class="${"w-full"}">
		<div class="${"absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"}"><a href="${"#slide2"}" class="${"btn btn-circle"}">\u276E</a>
			<a href="${"#slide4"}" class="${"btn btn-circle"}">\u276F</a></div></div>
	<div id="${"slide4"}" class="${"carousel-item relative w-full"}"><img src="${"https://placeimg.com/800/200/arch"}" class="${"w-full"}">
		<div class="${"absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"}"><a href="${"#slide3"}" class="${"btn btn-circle"}">\u276E</a>
			<a href="${"#slide1"}" class="${"btn btn-circle"}">\u276F</a></div></div></div>`;
});
