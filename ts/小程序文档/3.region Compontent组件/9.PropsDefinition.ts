import {wx} from "../原文档";

type RecordPropsDefinition<T> = { [K in keyof T]: PropValidator<T[K]> };

type PropValidator<T> = PropOptions<T> | Prop<T> | Array<Prop<T>>;

type ArrayPropsDefinition<T> = Array<keyof T>;

type PropsDefinition<T> = ArrayPropsDefinition<T> | RecordPropsDefinition<T>;

type Prop<T> = (() => T) | { new(...args: any[]): T & object };

interface PropOptions<T = any> {
    type?: Prop<T> | Array<Prop<T>>;
    value?: T | null | (() => object);
    // bug : 对于 type 为 Object 或 Array 的属性，如果通过该组件自身的 this.setData
    // 来改变属性值的一个子字段，则依旧会触发属性 observer ，且 observer 接收到的 newVal 是变化的那个子字段的值，
    // oldVal 为空， changedPath 包含子字段的字段名相关信息。
    observer?(value: T, old: T, changedPath: string): void;
}

type DefaultProps = object | Record<string, any>;

// CombinedInstance models the `this`, i.e. instance type for (user defined) component
type CombinedInstance<Instance extends wx.Component<Data, Props>,
    Data,
    Methods,
    Props> = Methods & Instance;
