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
  choosenId: () => choosenId,
  choosenSpecificPlace: () => choosenSpecificPlace,
  citiesArr: () => citiesArr,
  citiesInput: () => citiesInput,
  countriesArr: () => countriesArr,
  countryInput: () => countryInput,
  elapsed: () => elapsed,
  searchCatObj: () => searchCatObj,
  searchCriteria: () => searchCriteria,
  searchParamsObj: () => searchParamsObj,
  searchParamsObjDef: () => searchParamsObjDef,
  selectedCountryCode: () => selectedCountryCode,
  time: () => time
});
module.exports = __toCommonJS(stdin_exports);
var import_index_c35078eb = require("../../immutable/chunks/index-c35078eb.js");
const subscriber_queue = [];
function readable(value, start3) {
  return {
    subscribe: writable(value, start3).subscribe
  };
}
function writable(value, start3 = import_index_c35078eb.n) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if ((0, import_index_c35078eb.a)(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = import_index_c35078eb.n) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start3(set) || import_index_c35078eb.n;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = import_index_c35078eb.n;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = (0, import_index_c35078eb.i)(result) ? result : import_index_c35078eb.n;
      }
    };
    const unsubscribers = stores_array.map((store, i) => (0, import_index_c35078eb.b)(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      (0, import_index_c35078eb.r)(unsubscribers);
      cleanup();
    };
  });
}
const countryInput = writable("");
const citiesInput = writable("");
const choosenId = writable("");
const countriesArr = writable([]);
const citiesArr = writable([]);
const selectedCountryCode = writable("");
const choosenSpecificPlace = writable({
  kinds: "",
  name: "",
  wikipedia_extracts: { html: "" },
  wikipedia: "",
  preview: { source: "" },
  image: ""
});
const searchParamsObj = writable({
  lat: 0,
  lang: 0,
  score: 1,
  limit: 3,
  radius: 1e3,
  cat: [""],
  choosenCountry: "",
  choosenCity: "",
  choosenCountryCode: ""
});
const searchParamsObjDef = writable({
  lat: 0,
  lang: 0,
  score: 1,
  limit: 3,
  radius: 1e3,
  cat: [""],
  choosenCountry: "",
  choosenCity: "",
  choosenCountryCode: ""
});
const searchCriteria = writable([
  {
    id: 0,
    lat: -21.23333333,
    lang: -159.76666666,
    score: 1,
    categories: ["natural"],
    country: "Wyspy Cooka",
    radius: 9055,
    limit: 3
  }
]);
const searchCatObj = readable({
  architecture: ["bridges", "historic_architecture", "lighthouses", "skyscrapers", "towers"],
  cultural: ["museums", "theatres_and_entertainments", "urban_environment"],
  historic: [
    "archaeology",
    "burial_places",
    "fortifications",
    "historical_places",
    "monuments_and_memorials"
  ],
  industrial_facilities: [
    "abandoned_mineshafts",
    "abandoned_railway_stations",
    "dams",
    "factories",
    "mills",
    "mineshafts",
    "mints",
    "other_buildings",
    "power_stations",
    "railway_stations"
  ],
  natural: [
    "beaches",
    "geological_formations",
    "glaciers",
    "islands",
    "natural_springs",
    "nature_reserves",
    "water"
  ],
  other: ["sundials", "historic_object", "tourist_object", "view_points"],
  religion: [
    "buddhist_temples",
    "cathedrals",
    "churches",
    "egyptian_temples",
    "hindu_temples",
    "monasteries",
    "mosques",
    "other_temples",
    "synagogues"
  ]
});
const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1e3);
  return function stop() {
    clearInterval(interval);
  };
});
const start2 = new Date();
const elapsed = derived(time, ($time) => Math.round(($time - start2) / 1e3));
