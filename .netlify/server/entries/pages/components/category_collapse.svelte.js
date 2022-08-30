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
  default: () => Category_collapse
});
module.exports = __toCommonJS(stdin_exports);
var import_index_c35078eb = require("../../../immutable/chunks/index-c35078eb.js");
var import_stores_ts = require("../../endpoints/stores.ts.js");
const Category_collapse = (0, import_index_c35078eb.c)(($$result, $$props, $$bindings, slots) => {
  let $searchParamsObj, $$unsubscribe_searchParamsObj;
  $$unsubscribe_searchParamsObj = (0, import_index_c35078eb.b)(import_stores_ts.searchParamsObj, (value) => $searchParamsObj = value);
  let { catHead } = $$props;
  let { catPar } = $$props;
  if ($$props.catHead === void 0 && $$bindings.catHead && catHead !== void 0)
    $$bindings.catHead(catHead);
  if ($$props.catPar === void 0 && $$bindings.catPar && catPar !== void 0)
    $$bindings.catPar(catPar);
  $$unsubscribe_searchParamsObj();
  return `<div class="${"collapse my-2 max-w-md rounded-lg bg-slate-100 shadow-lg transition duration-200 ease-in-out hover:translate-y-1 hover:scale-105 hover:shadow-2xl"}"><input type="${"checkbox"}" class="${"peer"}">
	<div class="${"collapse-title text-center"}">${(0, import_index_c35078eb.e)(catHead.replaceAll("_", " "))}</div>
	<div class="${"collapse-content"}">${(0, import_index_c35078eb.d)(catPar, (catgry) => {
    return `<label class="${"label cursor-pointer"}"><span class="${"label-text"}">${(0, import_index_c35078eb.e)(catgry.replaceAll("_", " "))}</span>
				<input${(0, import_index_c35078eb.f)("value", catgry, 0)} type="${"checkbox"}" class="${"checkbox-info checkbox"}"${~$searchParamsObj.cat.indexOf(catgry) ? (0, import_index_c35078eb.f)("checked", true, 1) : ""}>
			</label>`;
  })}</div></div>`;
});
