import { expectType } from "tsd";
import stringify = require("../index");

// test type exports
type CompareDescriptor = stringify.CompareDescriptor;
type Comparator = stringify.Comparator;
type Options = stringify.Options;

const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };

expectType<string>(stringify(obj));
expectType<string>(
  stringify(obj, (a, b) => {
    expectType<CompareDescriptor>(a);
    expectType<CompareDescriptor>(b);
    return a.key < b.key ? 1 : -1;
  })
);
expectType<string>(
  stringify(obj, {
    cmp(a, b) {
      expectType<CompareDescriptor>(a);
      expectType<CompareDescriptor>(b);
      return a.key < b.key ? 1 : -1;
    },
  })
);
expectType<string>(stringify(obj, { cycles: true }));
