export declare namespace wx {

    interface EventTarget {
        id: string;
        tagName: string;
        dataset: { [name: string]: string };
    }

    type TouchEventType =
        | "tap"
        | "touchstart"
        | "touchmove"
        | "touchcancel"
        | "touchend"
        | "touchforcechange";

    type TransitionEventType =
        | "transitionend"
        | "animationstart"
        | "animationiteration"
        | "animationend";

    type EventType =
        | "input"
        | "form"
        | "submit"
        | "scroll"
        | TouchEventType
        | TransitionEventType
        | "tap"
        | "longpress";

    interface BaseEvent<T extends string, Detail> {
        type: T;
        timeStamp: number;
        currentTarget: EventTarget;
        target: EventTarget;
        detail: Detail;
    }

    interface BuiltInEvent<T extends EventType, Detail>
        extends BaseEvent<T, Detail> {
    }

    interface CustomEvent<T extends string, Detail>
        extends BaseEvent<T, Detail> {
    }

    /**
     * 指定focus时的光标位置
     * @version 1.5.0
     */
    interface InputEvent
        extends BuiltInEvent<"input",
            {
                value: string;
                cursor: number;
            }> {
    }

    interface FormEvent
        extends BuiltInEvent<"form",
            {
                value: { [name: string]: string | boolean | number };
            }> {
    }

}
