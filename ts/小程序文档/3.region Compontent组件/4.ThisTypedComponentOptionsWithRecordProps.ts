import {wx} from "../原文档";

type ThisTypedComponentOptionsWithRecordProps<V extends wx.Component<Data, Props>,
    Data,
    Methods,
    Props> = object &
    wx.ComponentOptions<V, Data | ((this: V) => Data), Methods, Props> &
    ThisType<wx.CombinedInstance<V, Data, Methods, Readonly<Props>>>;

type ExtendedComponent<Instance extends wx.Component<Data, Props>,
    Data,
    Methods,
    Props> = wx.CombinedInstance<Instance, Data, Methods, Props> & wx.Component<Data, Props>;
