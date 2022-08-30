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
  default: () => _layout
});
module.exports = __toCommonJS(stdin_exports);
var import_index_c35078eb = require("../../immutable/chunks/index-c35078eb.js");
var import_header_svelte = __toESM(require("./components/header.svelte.js"));
var import_footer_svelte = __toESM(require("./components/footer.svelte.js"));
var import_theme_change = require("theme-change");
var app = "";
const _layout = (0, import_index_c35078eb.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex h-screen flex-col justify-between"}">${(0, import_index_c35078eb.v)(import_header_svelte.default, "Header").$$render($$result, {}, {}, {})}
	${slots.default ? slots.default({}) : ``}
	${(0, import_index_c35078eb.v)(import_footer_svelte.default, "Footer").$$render($$result, {}, {}, {})}
</div>`;
});
