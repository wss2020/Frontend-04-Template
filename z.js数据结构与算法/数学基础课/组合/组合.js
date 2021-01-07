// 使用递归从 3 个元素中选取 2 个元素的组合。
class Combination {

    /**
     * @Description:    使用函数的递归（嵌套）调用，找出所有可能的队伍组合
     * @param teams-目前还剩多少队伍没有参与组合，result-保存当前已经组合的队伍
     * @return void
     */
    combine(teams, result, m) {

        // 挑选完了m个元素，输出结果
        if (result.length == m) {
            console.log(result);
            return;
        }

        for (let i = 0; i < teams.length; i++) {
            // 从剩下的队伍中，选择一队，加入结果
            let newResult = result.slice();
            newResult.push(teams[i]);

            // 只考虑当前选择之后的所有队伍
            let rest_teams = teams.slice(i + 1, teams.length);

            // 递归调用，对于剩余的队伍继续生成组合
            this.combine(rest_teams, newResult, m);
        }

    }

    main() {
        let teams = ["t1", "t2", "t3"];
        this.combine(teams, [], 2);

        //let teams = ["t1", "t2", "t3", "t4"];
        //this.combine(teams, [], 3);
    }

}

new Combination().main();
