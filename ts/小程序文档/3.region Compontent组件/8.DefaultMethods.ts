interface DefaultMethods<V> {
    [key: string]: (this: V, ...args: any[]) => any;
}
