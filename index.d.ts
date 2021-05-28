export = stringify;

/**
 * Deterministic `JSON.stringify()`.
 * 
 * @returns A deterministic stringified string from the object `obj`.
 * 
 * @example
 * import stringify = require('fast-json-stable-stringify');
 * 
 * const obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
 * console.log(stringify(obj));
 * // -> {"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}
 */
declare function stringify(
  obj: any,
  options?: stringify.Options | stringify.Comparator
): string;

declare namespace stringify {
  interface Options {
    /**
     * You can supply a custom comparison function for object keys.
     * 
     * @example
     * // For example, to sort on the object key names in reverse order you could write:
     * 
     * import stringify = require('fast-json-stable-stringify');
     * 
     * const obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
     * const s = stringify(obj, (a, b) => {
     *     return a.key < b.key ? 1 : -1;
     * });
     * console.log(s);
     * // -> {"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}
     * 
     * @example
     * // Or if you wanted to sort on the object values in reverse order, you could write:
     * 
     * import stringify = require('fast-json-stable-stringify');
     * 
     * const obj = { d: 6, c: 5, b: [{z:3,y:2,x:1},9], a: 10 };
     * const s = stringify(obj, (a, b) => {
     *     return a.value < b.value ? 1 : -1;
     * });
     * console.log(s);
     * // -> {"d":6,"c":5,"b":[{"z":3,"y":2,"x":1},9],"a":10}
     */
    cmp?: Comparator;

    /**
     * Pass `true` to stringify circular property as `__cycle__` - the result will not be
     * a valid JSON string in this case.
     * 
     * TypeError will be thrown in case of circular object without this option.
     */
    cycles?: boolean;
  }

  type Comparator = (a: CompareDescriptor, b: CompareDescriptor) => number;

  interface CompareDescriptor {
    key: string;
    value: any;
  }
}
