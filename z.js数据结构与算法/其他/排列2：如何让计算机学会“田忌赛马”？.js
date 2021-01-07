// 齐王 田忌 战马的出场顺序都随机
class Permutation {
    constructor() {
        // 设置齐王的马跑完所需时间
        this.q_horses_time = {"q1": 1.0, "q2": 2.0, "q3": 3.0}

        // 设置田忌的马跑完所需时间
        this.t_horses_time = {"t1": 1.5, "t2": 2.5, "t3": 3.5}

        // 保存 齐王 田忌 马匹的全排列
        this.q_results = [];
        this.t_results = [];
    }

    /**
     * @Description:    使用函数的递归（嵌套）调用，找出所有可能的马匹出战顺序
     * @param horses-目前还剩多少马没有出战，result-保存当前已经出战的马匹及顺序，all_results-保存所有的全排列
     * @return void
     */
    permutate(horses, result, all_results) {

        // 所有马匹都已经出战，判断哪方获胜，输出结果
        if (horses.length == 0) {
            all_results.push(result);
            return;
        }

        for (let i = 0; i < horses.length; i++) {
            // 从剩下的未出战马匹中，选择一匹，加入结果
            let new_result = result.slice();
            new_result.push(horses[i]);

            // 将已选择的马匹从未出战的列表中移出
            let rest_horses = horses.slice();
            rest_horses.splice(i, 1);

            // 递归调用，对于剩余的马匹继续生成排列
            this.permutate(rest_horses, new_result, all_results);
        }
    }

    compare(t, q) {
        let t_won_cnt = 0;
        for (let i = 0; i < t.length; i++) {
            console.log(this.t_horses_time[t[i]] + " " + this.q_horses_time[q[i]]);
            if (this.t_horses_time[t[i]] < this.q_horses_time[q[i]]) t_won_cnt++;
        }

        if (t_won_cnt > (t.length / 2)) console.log("田忌获胜！");
        else console.log("齐王获胜！");
        console.log();
    }

    main() {
        let t_horses = ["t1", "t2", "t3"];
        this.permutate(t_horses, [], this.t_results);

        let q_horses = ["q1", "q2", "q3"];
        this.permutate(q_horses, [], this.q_results);

        console.log(this.t_results);
        console.log(this.q_results);
        console.log();

        for (let i = 0; i < this.t_results.length; i++) {
            for (let j = 0; j < this.q_results.length; j++) {
                this.compare(this.t_results[i], this.q_results[j]);
            }
        }
    }
}


new Permutation().main();
