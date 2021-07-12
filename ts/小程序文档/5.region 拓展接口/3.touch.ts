export declare namespace wx {

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
        extends BaseEvent<T, Detail> {}

    interface Touch {
        identifier: number;
        pageX: number;
        pageY: number;
        clientX: number;
        clientY: number;
    }

    interface TouchEvent<T extends TouchEventType>
        extends BuiltInEvent<T, { x: number; y: number; }> {
        touches: Touch[];
        changedTouches: Touch[];
    }

    interface TapEvent extends TouchEvent<"tap"> {
        // 手指触摸后马上离开
    }

    interface TouchStartEvent extends TouchEvent<"touchstart"> {
        // 手指触摸动作开始
    }

    interface TouchEndEvent extends TouchEvent<"touchend"> {
        // 手指触摸动作结束
    }

    interface TouchMoveEvent extends TouchEvent<"touchmove"> {
        // 手指触摸后移动
    }

    interface TouchCancelEvent extends TouchEvent<"touchcancel"> {
        // 手指触摸动作被打断，如来电提醒，弹窗
    }

    interface TouchForceChangeEvent extends TouchEvent<"touchforcechange"> {
        // 在支持 3D Touch 的 iPhone 设备，重按时会触发
    }

}
