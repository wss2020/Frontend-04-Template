import {wx} from '../原文档'
import {BaseOptions} from "./0.baseOpions";

export declare namespace wss {

    interface CanvasAction {
        method: string;
        data: CanvasAction[] | Array<number | string>;
    }

    type LineCapType = "butt" | "round" | "square";
    type LineJoinType = "bevel" | "round" | "miter";

    interface CanvasGradient {
        addColorStop(index: number, color: string): void;
    }

    /**
     * context只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。
     * context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>。
     */
    interface CanvasContext {
        /**
         * 填充颜色。用法同 CanvasContext.setFillStyle。
         *  @version 1.9.90
         */
        fillStyle: string;
        /**
         * 边框颜色。用法同 CanvasContext.setFillStyle。
         * @version 1.9.90
         */
        strokeStyle: string;
        /**
         * 阴影相对于形状在水平方向的偏移
         * @version 1.9.90
         */
        shadowOffsetX: number;
        /**
         * 阴影的颜色
         * @version 1.9.90
         */
        shadowColor: number;
        /**
         * 阴影的模糊级别
         * @version 1.9.90
         */
        shadowBlur: number;
        /**
         * 线条的宽度。用法同 CanvasContext.setLineWidth
         * @version 1.9.90
         */
        lineWidth: number;
        /**
         * 线条的端点样式。用法同 CanvasContext.setLineCap
         * @version 1.9.90
         */
        lineCap: number;
        /**
         * 线条的交点样式。用法同 CanvasContext.setLineJoin
         * @version 1.9.90
         */
        lineJoin: number;
        /**
         * 最大斜接长度。用法同 CanvasContext.setMiterLimit
         * @version 1.9.90
         */
        miterLimit: number;
        /**
         * 虚线偏移量，初始值为0
         * @version 1.9.90
         */
        lineDashOffset: number;
        /**
         * 当前字体样式的属性。符合 CSS font 语法 的 DOMString 字符串，
         * 至少需要提供字体大小和字体族名。默认值为 10px sans-serif
         * @version 1.9.90
         */
        font: string;
        /**
         * 全局画笔透明度。范围 0-1，0 表示完全透明，1 表示完全不透明。
         */
        globalAlpha: number;
        /**
         * 在绘制新形状时应用的合成操作的类型。目前安卓版本只适用于 fill 填充块的合成，
         * 用于 stroke 线段的合成效果都是 source-over。
         * 目前支持的操作有
         * + 安卓：xor, source-over, source-atop, destination-out, lighter, overlay, darken, lighten, hard-light
         * + iOS：xor, source-over, source-atop, destination-over, destination-out, lighter, multiply, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, saturation, luminosity
         * @version 1.9.90
         */
        globalCompositeOperation: string;


        /** 获取当前context上存储的绘图动作(不推荐使用) */
        getActions(): CanvasAction[];

        /** 清空当前的存储绘图动作(不推荐使用) */
        clearActions(): void;

        /**
         * 对横纵坐标进行缩放
         * 在调用scale方法后，之后创建的路径其横纵坐标会被缩放。
         * 多次调用scale，倍数会相乘。
         *
         * @param scaleWidth 横坐标缩放的倍数
         * @param scaleHeight 纵坐标轴缩放的倍数
         */
        scale(scaleWidth: number, scaleHeight?: number): void;

        /**
         * 对坐标轴进行顺时针旋转
         * 以原点为中心，原点可以用 translate方法修改。
         * 顺时针旋转当前坐标轴。多次调用rotate，旋转的角度会叠加。
         *
         * @param rotate 旋转角度，以弧度计。
         */
        rotate(rotate: number): void;

        /**
         * 对坐标原点进行缩放
         * 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。
         *
         * @param x 水平坐标平移量
         * @param y 竖直坐标平移量
         */
        translate(x: number, y: number): void;

        /**
         * 保存当前的绘图上下文。
         */
        save(): void;

        /**
         * 恢复之前保存的绘图上下文。
         */
        restore(): void;

        /**
         * 在给定的矩形区域内，清除画布上的像素
         * 清除画布上在该矩形区域内的内容。
         *
         * @param x 矩形区域左上角的x坐标
         * @param y 矩形区域左上角的y坐标
         * @param width 矩形区域的宽度
         * @param height 矩形区域的高度
         */
        clearRect(x: number, y: number, width: number, height: number): void;

        /**
         * 从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画
         * 布上的其他区域）。可以在使用 clip 方法前通过使用 save 方法对当前画布区域进行保存，并在以后的任意时间通过
         * restore方法对其进行恢复。
         * @version 1.6.0
         */
        clip(): void;

        /**
         * 在画布上绘制被填充的文本
         *
         * @param text 在画布上输出的文本
         * @param x 绘制文本的左上角x坐标位置
         * @param y 绘制文本的左上角y坐标位置
         * @param maxWidth 需要绘制的最大宽度，可选
         */
        fillText(text: string, x: number, y: number, maxWidth?: number): void;

        /**
         * 给定的 (x, y) 位置绘制文本描边的方法
         * @param text 要绘制的文本
         * @param x 文本起始点的 x 轴坐标
         * @param y 文本起始点的 y 轴坐标
         * @param maxWidth 需要绘制的最大宽度，可选
         * @version 1.9.90
         */
        strokeText(text: string, x: number, y: number, maxWidth?: number): void;

        /**
         * 测量文本尺寸信息。目前仅返回文本宽度。同步接口。
         * @param text 要测量的文本
         * @version 1.9.90
         */
        measureText(text: string): TextMetrics;

        /**
         * 用于设置文字的对齐
         */
        setTextAlign(align: "left" | "center" | "right"): void;

        /**
         * 设置文字的竖直对齐
         * @param textBaseline 有效值"top","bottom","middle","normal"
         * @version 1.4.0
         */
        setTextBaseline(textBaseline: "top" | "bottom" | "middle" | "normal"): void;

        /**
         * 绘制图像，图像保持原始尺寸。
         * @param imageResource 所要绘制的图片资源, 通过chooseImage得到一个文件路径或者一个项目目录内的图片
         * @param dx            源图像的矩形选择框的左上角 X 坐标
         * @param dy            源图像的矩形选择框的左上角 Y 坐标
         */
        drawImage(imageResource: string, dx: number, dy: number): void;

        /**
         * 绘制图像，图像保持原始尺寸。
         * @param imageResource 所要绘制的图片资源, 通过chooseImage得到一个文件路径或者一个项目目录内的图片
         * @param dx            源图像的矩形选择框的左上角 X 坐标
         * @param dy            源图像的矩形选择框的左上角 Y 坐标
         * @param dWidth        源图像的矩形选择框的高度
         * @param dHeight       源图像的矩形选择框的高度
         */
        drawImage(
            imageResource: string,
            dx: number,
            dy: number,
            dWidth: number,
            dHeight: number
        ): void;

        /**
         * 绘制图像，图像保持原始尺寸。
         * @param imageResource 所要绘制的图片资源, 通过chooseImage得到一个文件路径或者一个项目目录内的图片
         * @param sx            图像的左上角在目标canvas上 X 轴的位置
         * @param sy            图像的左上角在目标canvas上 Y 轴的位置
         * @param sWidth        在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
         * @param sHeight       在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
         * @param dx            源图像的矩形选择框的左上角 X 坐标
         * @param dy            源图像的矩形选择框的左上角 Y 坐标
         * @param dWidth        源图像的矩形选择框的高度
         * @param dHeight       源图像的矩形选择框的高度
         * @version 1.9.0
         */
        drawImage(
            imageResource: string,
            sx: number,
            sy: number,
            sWidth: number,
            sHeight: number,
            dx: number,
            dy: number,
            dWidth: number,
            dHeight: number
        ): void;

        /**
         * 设置全局画笔透明度。
         * @param alpha 0~1  透明度，0 表示完全透明，1 表示完全不透明
         */
        setGlobalAlpha(alpha: number): void;

        /**
         * 使用矩阵重新设置（覆盖）当前变换的方法
         * @param scaleX 水平缩放
         * @param scaleY 垂直缩放
         * @param skewX 水平倾斜
         * @param skewY 垂直倾斜
         * @param translateX 水平移动
         * @param translateY 垂直移动
         * @version 1.9.90
         */
        setTransform(
            scaleX: number,
            scaleY: number,
            skewX: number,
            skewY: number,
            translateX: number,
            translateY: number
        ): void

        /**
         * 使用矩阵多次叠加当前变换的方法
         * @param scaleX 水平缩放
         * @param scaleY 垂直缩放
         * @param skewX 水平倾斜
         * @param skewY 垂直倾斜
         * @param translateX 水平移动
         * @param translateY 垂直移动
         * @version 1.9.90
         */
        transform(
            scaleX: number,
            scaleY: number,
            skewX: number,
            skewY: number,
            translateX: number,
            translateY: number
        ): void;

        /**
         * 对当前路径进行填充
         */
        fill(): void;

        /**
         * 对当前路径进行描边
         */
        stroke(): void;

        /**
         * 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。
         * Tip: 在最开始的时候相当于调用了一次 beginPath()。
         * Tip: 同一个路径内的多次setFillStyle、setStrokeStyle、setLineWidth等设置，
         * 以最后一次设置为准。
         */
        beginPath(): void;

        /**
         * 关闭一个路径
         * Tip: 关闭路径会连接起点和终点。
         * Tip: 如果关闭路径后没有调用 fill() 或者 stroke() 并开启了新的路径，那之前的路径将不会被渲染。
         */
        closePath(): void;

        /**
         * 把路径移动到画布中的指定点，但不创建线条。
         *
         * @param x 目标位置的x坐标
         * @param y 目标位置的y坐标
         */
        moveTo(x: number, y: number): void;

        /**
         * 在当前位置添加一个新点，然后在画布中创建从该点到最后指定点的路径。
         *
         * @param x 目标位置的x坐标
         * @param y 目标位置的y坐标
         */
        lineTo(x: number, y: number): void;

        /**
         * 添加一个矩形路径到当前路径。
         *
         * @param x 矩形路径左上角的x坐标
         * @param y 矩形路径左上角的y坐标
         * @param width 矩形路径的宽度
         * @param height 矩形路径的高度
         */
        rect(x: number, y: number, width: number, height: number): void;

        /**
         * 填充一个矩形。
         * Tip: 用 setFillStyle() 设置矩形的填充色，如果没设置默认是黑色。
         * @param x 矩形路径左上角的x坐标
         * @param y 矩形路径左上角的y坐标
         * @param width 矩形路径的宽度
         * @param height 矩形路径的高度
         *
         */
        fillRect(x: number, y: number, width: number, height: number): void;

        /**
         * 画一个矩形(非填充)。
         * Tip: 用 setFillStroke() 设置矩形线条的颜色，如果没设置默认是黑色。
         * @param x 矩形路径左上角的x坐标
         * @param y 矩形路径左上角的y坐标
         * @param width 矩形路径的宽度
         * @param height 矩形路径的高度
         *
         */
        strokeRect(x: number, y: number, width: number, height: number): void;

        /**
         * 添加一个弧形路径到当前路径，顺时针绘制。
         *
         * @param x 圆的x坐标
         * @param y 圆的y坐标
         * @param radius 圆的半径
         * @param startAngle 起始弧度，单位弧度（在3点钟方向）
         * @param endAngle 终止弧度
         * @param counterclockwise 指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
         */
        arc(
            x: number,
            y: number,
            radius: number,
            startAngle: number,
            endAngle: number,
            counterclockwise?: boolean
        ): void;

        /**
         * 根据控制点和半径绘制圆弧路径，顺时针绘制。
         *
         * @param x1 第一个控制点的 x 轴坐标
         * @param y1 第一个控制点的 y 轴坐标
         * @param x2 第二个控制点的 x 轴坐标
         * @param y2 第二个控制点的 y 轴坐标
         * @param radius 圆的半径
         * @version 1.9.90
         */
        arcTo(
            x1: number,
            y1: number,
            x2: number,
            y2: number,
            radius: number
        ): void;

        /**
         * 创建二次方贝塞尔曲线
         *
         * @param cpx 贝塞尔控制点的x坐标
         * @param cpy 贝塞尔控制点的y坐标
         * @param x 结束点的x坐标
         * @param y 结束点的y坐标
         */
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;

        /**
         * 创建三次方贝塞尔曲线
         *
         * @param cp1x 第一个贝塞尔控制点的 x 坐标
         * @param cp1y 第一个贝塞尔控制点的 y 坐标
         * @param cp2x 第二个贝塞尔控制点的 x 坐标
         * @param cp2y 第二个贝塞尔控制点的 y 坐标
         * @param x 结束点的x坐标
         * @param y 结束点的y坐标
         */
        bezierCurveTo(
            cp1x: number,
            cp1y: number,
            cp2x: number,
            cp2y: number,
            x: number,
            y: number
        ): void;

        /**
         * 设置填充样式
         *
         * @param color 设置为填充样式的颜色。'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
         */
        setFillStyle(color: string): void;

        /**
         * 设置线条样式
         *
         * @param color 设置为填充样式的颜色。'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
         */
        setStrokeStyle(color: string): void;

        /**
         * 设置阴影
         *
         * @param offsetX 阴影相对于形状在水平方向的偏移
         * @param offsetY 阴影相对于形状在竖直方向的偏移
         * @param blur 阴影的模糊级别，数值越大越模糊 0~100
         * @param color 阴影的颜色。 'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
         */
        setShadow(
            offsetX: number,
            offsetY: number,
            blur: number,
            color: string
        ): void;

        /**
         * 创建一个线性的渐变颜色。
         * Tip: 需要使用 addColorStop() 来指定渐变点，至少要两个。
         * @param x0 起点的x坐标
         * @param y0 起点的y坐标
         * @param x1 终点的x坐标
         * @param y1 终点的y坐标
         */
        createLinearGradient(
            x0: number,
            y0: number,
            x1: number,
            y1: number
        ): CanvasGradient;

        /**
         * 对指定的图像创建模式的方法，可在指定的方向上重复元图像
         * @param image 重复的图像源，仅支持包内路径和临时路径
         * @param repetition 有效值"repeat", "repeat-x", "repeat-y", "no-repeat"
         *    + repeat: 水平竖直方向都重复
         *    + repeat-x: 水平方向重复
         *    + repeat-y: 竖直方向重复
         *    + no-repeat: 不重复
         * @version 1.9.90
         */
        createPattern(
            image: string,
            repetition: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"
        ): string;

        /**
         * 创建一个颜色的渐变点。
         * Tip: 小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染。
         * Tip: 需要使用 addColorStop() 来指定渐变点，至少要两个。
         * @param stop (0-1)  表示渐变点在起点和终点中的位置
         * @param color 渐变点的颜色
         *
         */
        addColorStop(stop: number, color: string): void;

        /**
         * 创建一个圆形的渐变颜色。
         *
         * @param x 圆心的x坐标
         * @param y 圆心的y坐标
         * @param r 圆的半径
         *
         */
        createCircularGradient(x: number, y: number, r: number): void;

        /**
         * 设置字体大小
         *
         * @param fontSize 字体的字号
         */
        setFontSize(fontSize: number): void;

        /**
         * 设置线条端点的样式
         *
         * @param lineCap 线条的结束端点样式。 'butt'、'round'、'square'
         */
        setLineCap(lineCap: LineCapType): void;

        /**
         * 设置虚线样式。
         * @param pattern 一组描述交替绘制线段和间距（坐标空间单位）长度的数字
         * @param offset 虚线偏移量
         */
        setLineDash(pattern: Array<number>, offset: number): void;

        /**
         * 设置两线相交处的样式
         *  @param lineJoin 两条线相交时，所创建的拐角类型
         */
        setLineJoin(lineJoin: LineJoinType): void;

        /**
         * 设置线条宽度
         *
         * @param lineWidth 线条的宽度
         */
        setLineWidth(lineWidth: number): void;

        /**
         * 设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。
         * 当 setLineJoin为 miter 时才有效。
         * 超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示
         *
         * @param miterLimit 最大斜接长度
         */
        setMiterLimit(miterLimit: number): void;

        /**
         * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
         * Tip: 绘图上下文需要由 wx.createCanvasContext(canvasId) 来创建。
         * @param [reserve] 非必填。本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false
         * @param [callback] 非必填。绘制完成后执行的回调函数
         */
        draw(reserve?: boolean, callback?: () => void): void;
    }

    /**
     * 创建并返回绘图上下文context对象。
     * context只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，
     * 一个context生成画布的绘制动作数组可以应用于多个<canvas/>
     * @deprecated
     * @see wx.createCanvasContext
     */
    function createContext(): CanvasContext;

    /**
     * 创建 canvas 的绘图上下文 CanvasContext 对象
     * @param canvasId 要获取上下文的 <canvas> 组件 canvas-id 属性
     * @param thisObj 在自定义组件下，当前组件实例的this，表示在这个自定义组件下查找拥有 canvas-id 的 <canvas/> ，如果省略则不在任何自定义组件内查找
     */
    function createCanvasContext(canvasId: string, thisObj: object): CanvasContext;

    interface DrawCanvasOptions {
        /** 画布标识，传入 <canvas/> 的 cavas-id */
        canvasId: number | string;
        /**
         * 绘图动作数组，由 wx.createContext 创建的 context，
         * 调用 getActions 方法导出绘图动作数组。
         */
        actions: CanvasAction[];
    }

    /**
     * 绘制画布
     */
    function drawCanvas(options: DrawCanvasOptions): void;

    interface CanvasToTempFilePathOptions extends BaseOptions {
        /**
         * 画布标识，传入 <canvas/> 的 cavas-id
         */
        canvasId: string;
    }

    /**
     * 把当前画布的内容导出生成图片，并返回文件路径
     */
    function canvasToTempFilePath(options: CanvasToTempFilePathOptions): void;

    interface CanvasImageDataOptions extends BaseOptions {
        /** 画布标识，传入 <canvas /> 的 canvas-id  */
        canvasId: string;
        /** 将要被提取的图像数据矩形区域的左上角 x 坐标 */
        x: number;
        /** 将要被提取的图像数据矩形区域的左上角 y 坐标 */
        y: number;
        /** 将要被提取的图像数据矩形区域的宽度 */
        width: number;
        /** 将要被提取的图像数据矩形区域的高度 */
        height: number;
    }

    /**
     * 返回一个数组，用来描述 canvas 区域隐含的像素数据
     * @version 1.9.0
     */
    function canvasGetImageData(options: CanvasImageDataOptions): void;

    /**
     * 将像素数据绘制到画布的方法
     * @version 1.9.0
     */
    function canvasPutImageData(options: CanvasImageDataOptions): void;

}
