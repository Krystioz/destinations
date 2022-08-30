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
  manifest: () => manifest
});
module.exports = __toCommonJS(stdin_exports);
const manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png", "service-worker.js"]),
  mimeTypes: { ".png": "image/png" },
  _: {
    entry: { "file": "immutable/start-582c110d.js", "imports": ["immutable/start-582c110d.js", "immutable/chunks/index-bb5af0df.js", "immutable/chunks/index-49e92d70.js"], "stylesheets": [] },
    nodes: [
      () => Promise.resolve().then(() => __toESM(require("./nodes/0.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/1.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/11.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/12.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/2.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/3.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/4.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/5.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/6.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/7.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/8.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/9.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/10.js")))
    ],
    routes: [
      {
        type: "page",
        id: "",
        pattern: /^\/$/,
        names: [],
        types: [],
        path: "/",
        shadow: null,
        a: [0, 2],
        b: [1]
      },
      {
        type: "endpoint",
        id: "stores",
        pattern: /^\/stores\/?$/,
        names: [],
        types: [],
        load: () => Promise.resolve().then(() => __toESM(require("./entries/endpoints/stores.ts.js")))
      },
      {
        type: "endpoint",
        id: "Place",
        pattern: /^\/Place\/?$/,
        names: [],
        types: [],
        load: () => Promise.resolve().then(() => __toESM(require("./entries/endpoints/Place/index.ts.js")))
      },
      {
        type: "endpoint",
        id: "Countries",
        pattern: /^\/Countries\/?$/,
        names: [],
        types: [],
        load: () => Promise.resolve().then(() => __toESM(require("./entries/endpoints/Countries/index.ts.js")))
      },
      {
        type: "endpoint",
        id: "Cities",
        pattern: /^\/Cities\/?$/,
        names: [],
        types: [],
        load: () => Promise.resolve().then(() => __toESM(require("./entries/endpoints/Cities/index.ts.js")))
      },
      {
        type: "page",
        id: "places",
        pattern: /^\/places\/?$/,
        names: [],
        types: [],
        path: "/places",
        shadow: null,
        a: [0, 3],
        b: [1]
      },
      {
        type: "page",
        id: "components/carusel",
        pattern: /^\/components\/carusel\/?$/,
        names: [],
        types: [],
        path: "/components/carusel",
        shadow: null,
        a: [0, 4],
        b: [1]
      },
      {
        type: "page",
        id: "components/category_collapse",
        pattern: /^\/components\/category_collapse\/?$/,
        names: [],
        types: [],
        path: "/components/category_collapse",
        shadow: null,
        a: [0, 5],
        b: [1]
      },
      {
        type: "page",
        id: "components/footer",
        pattern: /^\/components\/footer\/?$/,
        names: [],
        types: [],
        path: "/components/footer",
        shadow: null,
        a: [0, 6],
        b: [1]
      },
      {
        type: "page",
        id: "components/google_map",
        pattern: /^\/components\/google_map\/?$/,
        names: [],
        types: [],
        path: "/components/google_map",
        shadow: null,
        a: [0, 7],
        b: [1]
      },
      {
        type: "page",
        id: "components/header",
        pattern: /^\/components\/header\/?$/,
        names: [],
        types: [],
        path: "/components/header",
        shadow: null,
        a: [0, 8],
        b: [1]
      },
      {
        type: "page",
        id: "components/hero",
        pattern: /^\/components\/hero\/?$/,
        names: [],
        types: [],
        path: "/components/hero",
        shadow: null,
        a: [0, 9],
        b: [1]
      },
      {
        type: "page",
        id: "components/loading_spinner",
        pattern: /^\/components\/loading_spinner\/?$/,
        names: [],
        types: [],
        path: "/components/loading_spinner",
        shadow: null,
        a: [0, 10],
        b: [1]
      },
      {
        type: "page",
        id: "components/places_card",
        pattern: /^\/components\/places_card\/?$/,
        names: [],
        types: [],
        path: "/components/places_card",
        shadow: null,
        a: [0, 11],
        b: [1]
      },
      {
        type: "page",
        id: "components/places_search_collapse",
        pattern: /^\/components\/places_search_collapse\/?$/,
        names: [],
        types: [],
        path: "/components/places_search_collapse",
        shadow: null,
        a: [0, 12],
        b: [1]
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};
