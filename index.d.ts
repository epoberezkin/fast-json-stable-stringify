declare module 'fast-json-stable-stringify' {
    type CmpOperand<T, K extends keyof T> = {
        key: K,
        value: T[K],
    }

    type Options<T> = Partial<{
        cmp: <KA extends keyof T, KB extends keyof T>(a: CmpOperand<T, KA>, b: CmpOperand<T, KB>) => number,
        cycles: Boolean,
    }>

    function stringify<T extends object>(obj: T, opts?: Options<T>): string;
    export = stringify;
}
