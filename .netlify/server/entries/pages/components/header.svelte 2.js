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
  default: () => Header
});
module.exports = __toCommonJS(stdin_exports);
var import_index_c35078eb = require("../../../immutable/chunks/index-c35078eb.js");
var import_theme_change = require("theme-change");
const Header = (0, import_index_c35078eb.c)(($$result, $$props, $$bindings, slots) => {
  return `<header><div class="${"navbar relative bg-base-200 shadow-md"}"><div class="${"navbar-start"}"><div class="${"dropdown"}">
				<label tabindex="${"0"}" class="${"btn btn-ghost lg:hidden"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-5 w-5"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M4 6h16M4 12h8m-8 6h16"}"></path></svg></label>
				<ul tabindex="${"0"}" class="${"dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"}"><li><a href="${"/places"}">Places</a></li>
					<li tabindex="${"0"}">
						<a class="${"justify-between"}">Parent
							<svg class="${"fill-current"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"24"}" height="${"24"}" viewBox="${"0 0 24 24"}"><path d="${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}"></path></svg></a>
						<ul class="${"z-10 bg-white p-2"}"><li class="${"z-10"}"><a href="${"/"}">Submenu 1</a></li>
							<li><a href="${"/"}">Submenu 2</a></li></ul></li>
					<li><a href="${"/"}">Home</a></li></ul></div>
			<h2 class="${""}"><a href="${"/"}" class="${"btn btn-ghost text-2xl normal-case"}">Destinations</a></h2>
			</div>
		<div class="${"navbar-center hidden lg:flex"}"><ul class="${"menu menu-horizontal z-10 p-0"}"><li><a href="${"/places"}">Places</a></li>
				<li tabindex="${"0"}">
					<a>Parent
						<svg class="${"fill-current"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"20"}" height="${"20"}" viewBox="${"0 0 24 24"}"><path d="${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}"></path></svg></a>
					<ul class="${"bg-white p-2"}"><li><a href="${"/"}">Submenu 1</a></li>
						<li><a href="${"/"}">Submenu 2</a></li></ul></li>
				<li><a href="${"/login"}">Login</a></li></ul></div>
		<div class="${"navbar-end"}">
			<div class="${"relative z-10 inline-block text-left"}"><div><div class="${"indicator"}"><span data-tip="${"change theme"}" class="${"badge indicator-item tooltip tooltip-left badge-secondary"}">?</span>
						<button type="${"button"}" class="${"inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"}" id="${"menu-button"}" aria-expanded="${"true"}" aria-haspopup="${"true"}">Motywy
							
							<svg class="${"-mr-1 ml-2 h-5 w-5"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}" aria-hidden="${"true"}"><path fill-rule="${"evenodd"}" d="${"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"}" clip-rule="${"evenodd"}"></path></svg></button></div></div>

				${``}</div></div></div></header>`;
});
