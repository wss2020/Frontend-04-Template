// 配置相关
const SIZE = 100;
const GAP = 10;
const CELL_SIZE = 8;

// 填充颜色 0 空   1 墙   2 可到达  3 路径  4 目标
const FILL_COLORS = ['#DDD', '#000', 'darkseagreen', 'orange', '#f00'];

const map = (() => {
    const s = localStorage.getItem('savedMap');
    if (s) {
        return JSON.parse(s);
    }
    return new Array(SIZE ** 2).fill(0);
})();

const app = document.getElementById('app');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

function drawMap() {
    const w = CELL_SIZE * SIZE + GAP * 2;
    const h = w;
    canvas.width = w;
    canvas.height = h;

    // 清空
    ctx.clearRect(0, 0, w, h);
    app.appendChild(canvas);

    // 填充
    ctx.fillStyle = '#ddd';
    ctx.fillRect(GAP, GAP, w - GAP * 2, h - GAP * 2);

    // 划线 分隔为格子
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    for (let i = 0; i < SIZE + 1; i++) {
        // 竖线
        let x = CELL_SIZE * i + GAP;
        ctx.moveTo(x, GAP);
        ctx.lineTo(x, h - GAP);
        ctx.stroke();
        // ctx.fillText(i, x, GAP, 10);
        // 横线
        let y = CELL_SIZE * i + GAP;
        ctx.moveTo(GAP, y);
        ctx.lineTo(w - GAP, y);
        ctx.stroke();
        // ctx.fillText(GAP, y, i);
    }

    // 检查 map 还原点
    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            const index = y * SIZE + x;
            if (map[index]) {
                fillPoint([x, y], map[index]);
            }
        }
    }

    // 标记 中心点
    ctx.strokeStyle = '#ff0000';
    const mid = GAP + (SIZE / 2 - 1) * CELL_SIZE;
    ctx.strokeRect(mid, mid, CELL_SIZE, CELL_SIZE);
}

drawMap();

function fillPoint(point, type) {
    const [x, y] = point;
    const i = GAP + x * CELL_SIZE + 1;
    const j = GAP + y * CELL_SIZE + 1;

    ctx.fillStyle = FILL_COLORS[type];
    ctx.fillRect(i, j, CELL_SIZE - 2, CELL_SIZE - 2);
}

function fillAim(point) {
    fillPoint(point, 4);
    ctx.strokeStyle = '#f00';
    const [x, y] = point;
    const i = GAP + x * CELL_SIZE;
    const j = GAP + y * CELL_SIZE;
    ctx.strokeRect(i, j, CELL_SIZE, CELL_SIZE);
}

// fillPoint([0, 0], 1)
// fillPoint([0, 1], 1)
// fillPoint([0, 2], 1)

function initEvent() {
    let mousedown = false;
    let isInCreating = false;
    document.addEventListener('mousedown', function (e) {
        if (e.which == 2) {
            mousedown = false;
            return;
        }
        isInCreating = e.which !== 3;
        mousedown = true;
    });
    document.addEventListener('mouseup', function (e) {
        mousedown = false;
    });
    document.addEventListener('contextmenu', function (e) {
        // e.stopPropagation();
        e.preventDefault();
    });

    function calcPointFromEvent(e) {
        const { offsetX, offsetY } = e;
        const x = ((offsetX - GAP) / CELL_SIZE) >> 0;
        const y = ((offsetY - GAP) / CELL_SIZE) >> 0;

        if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return null;

        return [x, y];
    }

    canvas.addEventListener('mousemove', function (e) {
        if (!mousedown) return;

        const point = calcPointFromEvent(e);
        if (!point) return;
        const pointType = isInCreating ? 1 : 0;
        fillPoint(point, pointType);
        map[point[1] * SIZE + point[0]] = pointType;
    });

    // 点击也可以画
    canvas.addEventListener('click', function (e) {
        const point = calcPointFromEvent(e);
        if (!point) return;
        const pointType = 1;
        fillPoint(point, pointType);
        map[point[1] * SIZE + point[0]] = pointType;
    });
    canvas.addEventListener('contextmenu', function (e) {
        const point = calcPointFromEvent(e);
        if (!point) return;
        const pointType = 0;
        fillPoint(point, pointType);
        map[point[1] * SIZE + point[0]] = pointType;
    });

    window.saveMap = () => {
        localStorage.setItem('savedMap', JSON.stringify(map));
    };
    window.clearMap = () => {
        map.fill(0);
        saveMap();
        drawMap();
    };

    window.loadMap = function () {
        map.fill(0);

        // prettier-ignore
        [360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,453,454,455,456,457,458,459,460,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,549,550,551,552,553,595,596,597,598,599,648,649,748,749,849,850,851,951,952,1052,1053,1054,1154,1155,1255,1256,1257,1357,1358,1458,1459,1460,1560,1561,1634,1635,1636,1637,1638,1639,1640,1641,1642,1643,1644,1645,1646,1647,1648,1649,1650,1651,1652,1661,1662,1733,1734,1743,1744,1752,1753,1754,1755,1756,1762,1763,1832,1833,1844,1845,1856,1863,1864,1931,1932,1945,1956,1957,1964,1965,2030,2031,2045,2057,2065,2066,2130,2145,2146,2157,2166,2167,2229,2230,2246,2257,2267,2329,2346,2347,2357,2358,2367,2368,2428,2429,2447,2458,2468,2469,2528,2547,2558,2569,2627,2628,2647,2648,2658,2669,2670,2727,2748,2758,2770,2827,2848,2870,2871,2926,2927,2948,2971,3026,3048,3071,3126,3148,3149,3171,3172,3226,3249,3272,3326,3349,3372,3426,3449,3472,3525,3526,3549,3557,3558,3559,3560,3572,3625,3649,3655,3656,3657,3660,3672,3725,3749,3750,3753,3754,3755,3760,3761,3772,3825,3850,3851,3852,3853,3861,3872,3925,3950,3951,3961,3972,4025,4051,4061,4072,4125,4151,4161,4172,4225,4226,4251,4272,4326,4351,4372,4426,4451,4472,4526,4551,4571,4572,4626,4627,4651,4671,4727,4751,4771,4827,4851,4870,4871,4927,4928,4951,4970,5028,5029,5051,5069,5070,5129,5151,5168,5169,5229,5230,5251,5267,5268,5330,5331,5366,5367,5431,5432,5465,5466,5532,5533,5564,5565,5633,5634,5662,5663,5664,5734,5735,5736,5760,5761,5762,5836,5837,5857,5858,5859,5860,5937,5938,5939,5955,5956,5957,6039,6040,6041,6042,6043,6044,6051,6052,6053,6054,6055,6144,6145,6146,6147,6148,6149,6150,6151].forEach(i=>map[i] = 1);

        drawMap();
    };

    app.insertAdjacentHTML('afterbegin', `<button onclick="saveMap()">保存</button><button onclick="clearMap()">清空</button><button onclick="loadMap()">加载预设</button>`);
}
initEvent();

function sleep(t) {
    return new Promise(res => {
        setTimeout(res, t);
    });
}

class GetMinQueue {
    constructor(data = [], compare = (a, b) => a - b) {
        this.data = data;
        this.compare = compare;
    }

    take() {
        if (!this.data.length) return;

        let min = this.data[0];
        let minIndex = 0;
        let temp;
        for (let i = 1; i < this.data.length; i++) {
            temp = this.data[i];
            if (this.compare(temp, min) < 0) {
                min = temp;
                minIndex = i;
            }
        }

        // 将最后一个放到最小的位置 并删除最后一个即可
        this.data[minIndex] = this.data[this.data.length - 1];
        this.data.pop();
        return min;
    }
    give(item) {
        this.data.push(item);
    }
    get length() {
        return this.data.length;
    }
}

// 二叉堆 小顶堆
class BinaryHeap {
    constructor(data = [], compare = (a, b) => a - b) {
        this.data = data;
        this.compare = compare;
    }
    /**
     * 取堆顶元素
     */
    take() {
        if (!this.data.length) return;

        // 小顶堆 第一个元素必定是最小元素 直接给即可
        let min = this.data[0];

        this._doRemoveTop();

        return min;
    }
    /**
     * 新加入堆
     * @param {*} item
     */
    give(item) {
        // 直接放到最后再最堆进行调整
        this.data.push(item);

        // 需要上比较的 index
        let index = this.data.length - 1;
        let parentIndex = ((index - 1) / 2) >> 0;

        while (index > 0 && this.compare(item, this.data[parentIndex]) < 0) {
            // 移动
            this.data[index] = this.data[parentIndex];
            this.data[parentIndex] = item;
            index = parentIndex;
            parentIndex = ((index - 1) / 2) >> 0;
        }
    }
    /**
     * 调整指定索引堆的位置
     * @param {item} item
     */
    up(item) {
        // 实际和新元素入堆操作一致， 不同的是入堆需要从最后开始检查，此处只用从此节点开始检查即可

        // 定位在堆中的索引
        let index = -1;
        for (let i = 0; i < this.length; i++) {
            if (this.data[i][0] === item[0] && this.data[i][1] === item[1]) {
                index = i;
                break;
            }
        }
        if (index === -1) return;

        // let parentIndex = ((index - 1) / 2) >> 0;

        let parentIndex;

        // 尝试从 index 节点的子节点上开始更新堆 防止修改本身导致此节点和两个子节点构成的堆已经不是最小堆
        const leftIndex = 2 * index + 1;
        const rightIndex = leftIndex + 1;

        if (rightIndex < this.length || leftIndex < this.length) {
            parentIndex = index;
        } else {
            parentIndex = ((index - 1) / 2) >> 0;
        }

        while (index > 0 && this.compare(item, this.data[parentIndex]) < 0) {
            // 移动
            this.data[index] = this.data[parentIndex];
            this.data[parentIndex] = item;
            index = parentIndex;
            parentIndex = ((index - 1) / 2) >> 0;
        }
    }
    get length() {
        return this.data.length;
    }

    _doRemoveTop() {
        // 最后的直接移动到堆顶
        this.data[0] = this.data[this.length - 1];
        this.data.pop();

        const findMin = parentIndex => {
            let parent = this.data[parentIndex];

            let leftIndex = parentIndex * 2 + 1;
            let rightIndex = leftIndex + 1;

            // 没有左子节点
            if (leftIndex >= this.length) {
                return parentIndex;
            }
            // 仅有左节点 直接左节点和父节点即可
            if (rightIndex >= this.length) {
                if (this.compare(this.data[leftIndex], parent) < 0) {
                    return leftIndex;
                }
                return parentIndex;
            }

            // 三个节点都在的情况 取最小值
            const rightCompareLeft = this.compare(this.data[rightIndex], this.data[leftIndex]);
            // 左右节点相同 则取任意和父节点相比
            if (rightCompareLeft === 0) {
                if (this.compare(this.data[leftIndex], parent) < 0) {
                    return leftIndex;
                } else {
                    return parentIndex;
                }
            }

            if (rightCompareLeft < 0) {
                return rightIndex;
            } else {
                return leftIndex;
            }

            return parentIndex;
        };

        // 最小移走后 调整堆 使得其仍为小顶堆
        let parentIndex = 0;
        let minIndex = findMin(0);

        while (minIndex != parentIndex) {
            // 交换位置
            const temp = this.data[parentIndex];
            this.data[parentIndex] = this.data[minIndex];
            this.data[minIndex] = temp;
            // 继续检查
            parentIndex = minIndex;
            minIndex = findMin(parentIndex);
        }
    }
}

// var b = new BinaryHeap([1, 6, 2, 7, 9, 6, 4]);
// b.take();
// console.log(b.data);
// var b = new BinaryHeap([2, 6, 4, 7, 9, 6]);
// b.give(1);
// console.log(b.data);

async function findPath(start, end) {
    document.getElementById('cover').style.display = 'block';
    fillAim(end);
    const mapCopy = Object.create(map);

    const compare = (a, b) => {
        return (a[0] - end[0]) ** 2 + (a[1] - end[1]) ** 2 - ((b[0] - end[0]) ** 2 + (b[1] - end[1]) ** 2);
    };
    // 记录所有可走到的点
    const queue = document.getElementById('useBinaryHeap').checked ? new BinaryHeap([start], compare) : new GetMinQueue([start], compare);

    /**
     * 将点加入已经走过的集合
     * @param {Number} x x 坐标
     * @param {Number} y y 坐标
     * @param {Point} pre 前置点
     * @param {Number} g 距离
     */
    function insert(x, y, pre, g) {
        if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return;

        const currentPoint = [x, y];
        // 当前索引
        const index = y * SIZE + x;
        // 前置节点索引
        const [px, py] = pre;
        const preIndex = py * SIZE + px;
        let p_g = mapCopy[preIndex].g;

        // 已经有值 表示是墙 或 已经走过, 已经走过的情况下 再比较是否最优
        let cell = mapCopy[index];
        if (!cell) {
            // 没走过 可达 加入并继续
            fillPoint(currentPoint, 2);
            mapCopy[index] = {
                parent: pre,
                g: p_g + g
            };

            queue.give(currentPoint);
            return;
        }
        // 墙 不可达
        if (cell == 1) {
            return;
        }

        const current_g = mapCopy[index].g;
        if (p_g + g < current_g) {
            mapCopy[index].parent = pre;
            mapCopy[index].g = p_g + g;
            // 此处修改了数据 小顶堆中对应节点位置需要更新
            // 注意传引用 方便查询
            queue.up(currentPoint);
        }
    }
    // 起点距离为 0
    mapCopy[start[1] * SIZE + start[0]] = {
        g: 0
    };

    while (queue.length) {
        // 换用新的数据结构 取的时候拿距离目标点最近的 优化寻路查询
        const point = queue.take();
        const [x, y] = point;

        if (x === end[0] && y === end[1]) {
            // alert('可到达');
            let path = getPath(point);
            fillPoint(point, 3);
            let i = path.length - 1;
            while (i >= 0) {
                fillPoint(path[i--], 3);
            }
            await sleep(20);
            document.getElementById('cover').style.display = 'none';
            alert('路径已找到');
            return true;
        }
        await sleep(0);

        // 横着走 距离标为 10
        insert(x, y - 1, point, 10);
        insert(x + 1, y, point, 10);
        insert(x, y + 1, point, 10);
        insert(x - 1, y, point, 10);

        // 斜着走 距离标为 14 √2 = 1.414
        insert(x - 1, y - 1, point, 14);
        insert(x + 1, y - 1, point, 14);
        insert(x + 1, y + 1, point, 14);
        insert(x - 1, y + 1, point, 14);
    }

    function getPath(point) {
        let path = [];

        let [x, y] = point;
        while (x != start[0] || y != start[1]) {
            const index = y * SIZE + x;
            path.push(mapCopy[index].parent);
            [x, y] = mapCopy[index].parent;
        }
        // path.reverse();

        return path;
    }
    document.getElementById('cover').style.display = 'none';
    return false;
}

document.getElementById('go').onclick = function () {
    let s = document.getElementById('start').value;
    let e = document.getElementById('end').value;

    s = s
        .trim()
        .split(',')
        .map(_ => parseInt(_, 10));
    e = e
        .trim()
        .split(',')
        .map(_ => parseInt(_, 10));
    const [x1, y1] = s;
    const [x2, y2] = e;

    let start, end;
    if (x1 >= 0 && x1 < SIZE && y1 >= 0 && y1 < SIZE) {
        if (map[y1 * SIZE + x1] == 1) {
            return alert('起点在墙上');
        }
        start = [x1, y1];
    } else {
        return alert('起点不合法');
    }
    if (x2 >= 0 && x2 < SIZE && y2 >= 0 && y2 < SIZE) {
        if (map[y2 * SIZE + x2] == 1) {
            return alert('终点在墙上');
        }
        end = [x2, y2];
    } else {
        return alert('终点不合法');
    }
    drawMap();
    if (start && end) {
        if (document.getElementById('usePerfectPath').checked) {
            findPathPerfect(start, end);
        } else {
            findPath(start, end);
        }
    }
};

async function findPathPerfect(start, end) {
    document.getElementById('cover').style.display = 'block';
    fillAim(end);
    const mapCopy = Object.create(map);

    const distanceSquare = (a, b) => {
        return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
    };

    const compare = (a, b) => {
        // return (a[0] - end[0]) ** 2 + (a[1] - end[1]) ** 2 - ((b[0] - end[0]) ** 2 + (b[1] - end[1]) ** 2);
        // return distanceSquare(a, end) - distanceSquare(b, end);
        // 上面只比较的了到终点的距离估算 完成应比较整个 F
        const aIndex = a[1] * SIZE + a[0];
        const bIndex = b[1] * SIZE + b[0];
        return mapCopy[aIndex].f - mapCopy[bIndex].f;
    };
    // 记录所有可走到的点
    const queue = document.getElementById('useBinaryHeap').checked ? new BinaryHeap([start], compare) : new GetMinQueue([start], compare);

    /**
     * 将点加入已经走过的集合
     * @param {Number} x x 坐标
     * @param {Number} y y 坐标
     * @param {Point} pre 前置点
     * @param {Number} g 前置点到 当前 xy 的移动成本 距离
     */
    function insert(x, y, pre, g) {
        if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return;

        const currentPoint = [x, y];
        // 当前索引
        const index = y * SIZE + x;
        // 前置节点索引
        const [px, py] = pre;
        const preIndex = py * SIZE + px;
        let p_g = mapCopy[preIndex].g;

        // 已经有值 表示是墙 或 已经走过, 已经走过的情况下 再比较是否最优
        let cell = mapCopy[index];

        // 墙 不可达
        if (cell == 1) {
            return;
        }

        const h = Math.sqrt(distanceSquare(currentPoint, end));

        if (!cell) {
            // 没走过 可达 加入并继续
            fillPoint(currentPoint, 2);
            mapCopy[index] = {
                parent: pre,
                g: p_g + g, // 起点到现在的移动距离
                h: h, // 当前点到终点的距离估值
                f: h + p_g + g
            };

            queue.give(currentPoint);
            return;
        }

        const current_g = mapCopy[index].g;
        if (p_g + g < current_g) {
            mapCopy[index].parent = pre;
            mapCopy[index].g = p_g + g;
            mapCopy[index].h = h;
            mapCopy[index].f = mapCopy[index].g + h;
            // 此处修改了数据 小顶堆中对应节点位置需要更新
            queue.up(currentPoint);
        }
    }
    let g = 0; // 移动成本
    let h = Math.sqrt(distanceSquare(start, end)); // 估算距离
    let f = g + h; // 总花费
    mapCopy[start[1] * SIZE + start[0]] = { g, h, f };

    while (queue.length) {
        // 换用新的数据结构 取的时候拿距离目标点最近的 优化寻路查询
        const point = queue.take();
        const [x, y] = point;

        if (x === end[0] && y === end[1]) {
            // alert('可到达');
            let path = getPath(point);
            fillPoint(point, 3);
            let i = path.length - 1;
            while (i >= 0) {
                fillPoint(path[i--], 3);
            }
            await sleep(20);
            document.getElementById('cover').style.display = 'none';
            alert('路径已找到');
            return true;
        }
        await sleep(0);

        // 横着走 距离标为 1
        insert(x, y - 1, point, 1);
        insert(x + 1, y, point, 1);
        insert(x, y + 1, point, 1);
        insert(x - 1, y, point, 1);

        // 斜着走 距离标为 1.4 √2 = 1.414
        insert(x - 1, y - 1, point, 1.4);
        insert(x + 1, y - 1, point, 1.4);
        insert(x + 1, y + 1, point, 1.4);
        insert(x - 1, y + 1, point, 1.4);
    }

    function getPath(point) {
        let path = [];

        let [x, y] = point;
        while (x != start[0] || y != start[1]) {
            const index = y * SIZE + x;
            path.push(mapCopy[index].parent);
            [x, y] = mapCopy[index].parent;
        }
        // path.reverse();

        return path;
    }
    document.getElementById('cover').style.display = 'none';
    return false;
}
