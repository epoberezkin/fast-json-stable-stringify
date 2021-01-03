declare module "fast-json-stable-stringify" {
  interface KeyValue {
    key: string;
    value: any;
  }

  type ComparatorFunction = (a: KeyValue, b: KeyValue) => number;

  function stringify(
    obj: any,
    opts?:
      | {
          cmp?: ComparatorFunction;
          cycles?: boolean;
        }
      | ComparatorFunction
  ): string;

  export = stringify;
}
