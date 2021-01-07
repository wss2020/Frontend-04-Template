/**
 * 假设现在需要设计一个抽奖系统。需要依次从 10 个人中，抽取三等奖 3 名，二等奖 2 名和一等奖 1 名。
 * 请列出所有可能的组合，需要注意的每人最多只能被抽中 1 次。
 * */


/**
 从100人中选10人得3等奖，C(10, 3) = 240
 再从剩下90人中选3人的3等奖，C(7, 2) = 21
 再从剩下87人中选1人得1等奖， C(5, 1) = 5
 总共有大约有 240×21×5=25200  种可能性，

 当数据量比较小时，还是可以算的：
 * */



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
        let teams = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8","P9", "P10", ];
        this.combine(teams, [], 3);

        //let teams = ["t1", "t2", "t3", "t4"];
        //this.combine(teams, [], 3);
    }

}

new Combination().main();
