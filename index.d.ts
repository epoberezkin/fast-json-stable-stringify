declare module 'fast-json-stable-stringify' {
  function stringify(obj: any, opts?: { cmp: (a: any, b: any) => number, cycles: boolean }): string;
  export = stringify;
}
