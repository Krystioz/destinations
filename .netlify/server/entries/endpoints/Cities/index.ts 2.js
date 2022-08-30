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
  get: () => get
});
module.exports = __toCommonJS(stdin_exports);
var import_db_c4b1b6d2 = require("../../../immutable/chunks/db-c4b1b6d2.js");
var import_dotenv = require("dotenv");
var import_mongodb = require("mongodb");
async function get({ request }) {
  try {
    const url = new URL(request.url);
    const xid = url.searchParams.get("country");
    const query = await (0, import_db_c4b1b6d2.b)(xid);
    return {
      status: 200,
      body: {
        query
      }
    };
  } catch (err) {
    return {
      status: 500,
      body: {
        error: err.message
      }
    };
  }
}
