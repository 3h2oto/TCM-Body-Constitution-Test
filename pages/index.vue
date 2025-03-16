<template>
    <div class="page">
        <div v-if="result.physical == ''">
            <div class="index" v-if="gender == null">
                <div class="title">
                    <div class="main-title">中医体质自测</div>
                    <div class="sub-title">
                        本测试来自《中医体质分类与判定》国家标准
                    </div>
                    <div class="sub-title">Made with ❤️ CXH@GDPU</div>
                </div>

                <div class="sex-box">
                    <div class="sex-box__title">请选择您的性别：</div>
                    <div class="sex">
                        <div class="btn male" @click="onSelectGender(0)">
                            <img src="../public/male.svg" alt="" srcset="" />
                            <div>男</div>
                        </div>
                        <div class="btn female" @click="onSelectGender(1)">
                            <img src="../public/female.svg" alt="" srcset="" />
                            <div>女</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content" v-if="gender != null">
                <div class="top">
                    <div class="top-title">
                        <div class="top-title__main-title">
                            <img
                                src="../public/logo.svg"
                                width="50"
                                height="50"
                                style="border-radius: 5px"
                            />
                            <div class="right">
                                <div class="top-title__main-title__text">
                                    中医体质自测
                                </div>
                                <div class="top-title__sub-title">
                                    本测试来自《中医体质分类与判定》国家标准
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="info">‼️ 请根据最近三个月的体验和感觉回答</div>
                </div>

                <ol class="quesitem" id="questionData">
                    <template v-for="(item, index) in questionDataList">
                        <li
                            v-if="true"
                            :key="item.id"
                            :id="`question_${index}`"
                        >
                            <p
                                id="problem"
                                :style="{
                                    color:
                                        index > 0
                                            ? questionDataList[index - 1]
                                                  .value == 0
                                                ? '#7e7e7e'
                                                : '#242421'
                                            : '#242421',
                                }"
                            >
                                {{ index + 1 }}. {{ item.questionText }}
                            </p>
                            <check-btn
                                v-if="
                                    index > 0
                                        ? questionDataList[index - 1].value
                                        : true
                                "
                                :index="index"
                                v-model:value="questionDataList[index].value"
                                @change="onChange(index)"
                            />
                        </li>
                    </template>
                    <div class="submit-btn" @click="onSubmit">查看结果</div>
                </ol>
            </div>
        </div>

        <div class="result" v-else>
            <div class="top" id="resultTop">
                <div class="center">时时测，身心康健</div>

                <div v-if="share" class="fenxiangtishi" @click="onCloseShare">
                    <img src="../public/logo.svg" class="fenxiangtishiimg" />
                    <span
                        class="fenxianghaoyou"
                        style="color: rgb(255, 255, 255)"
                        >分享给好友测一测</span
                    >
                </div>
            </div>
            <div class="my">
                <div class="label">你的体质</div>
                <div class="tizhi">{{ result.physical }}</div>
            </div>
            <div class="both" v-if="result.both.length > 0">
                <div class="title">兼有体质</div>
                <div class="value">{{ strFilter(result.both) }}</div>
            </div>

            <div class="tender" v-if="result.tenden.length > 0">
                <div class="title">倾向体质</div>
                <div class="value">{{ strFilter(result.tenden) }}</div>
            </div>

            <div id="echart"></div>

            <!-- <div class="score-result">
        <h5 class="title">得分：</h5>
        <ol class="list-group">
          <li class="list-group-item">平和质：{{ PingheScore }}分</li>
          <li class="list-group-item">气虚质：{{ QiXuScore }}分</li>
          <li class="list-group-item">阳虚质：{{ YangXuScore }}分</li>
          <li class="list-group-item">阴虚质：{{ YingXuScore }}分</li>
          <li class="list-group-item">痰湿质：{{ TanShiScore }}分</li>
          <li class="list-group-item">湿热质：{{ ShiReScore }}分</li>
          <li class="list-group-item">血瘀质：{{ XueYuScore }}分</li>
          <li class="list-group-item">气郁质：{{ QiYuScore }}分</li>
          <li class="list-group-item">特禀质：{{ TeBingScore }}分</li>
        </ol>
      </div> -->

            <div class="health-guide">
                <van-tabs v-model:active="active" type="card">
                    <van-tab
                        v-for="item in result.healthGuide"
                        :key="item.id"
                        :title="item.name"
                    >
                        <div class="health-guide__content">
                            <div class="row">
                                <label>🟡&nbsp; 常见表现：</label
                                >{{ item.changjianbiaoxian }}
                            </div>
                            <div class="row">
                                <label>🟡&nbsp; 形体特征：</label
                                >{{ item.xingtitezheng }}
                            </div>
                            <div class="row">
                                <label>🟡&nbsp; 精神特征：</label
                                >{{ item.jingshentezheng }}
                            </div>
                            <div class="row">
                                <label>🟡&nbsp; 心理特征：</label
                                >{{ item.xinlitezheng }}
                            </div>
                            <div class="row">
                                <label>🟡&nbsp; 发病倾向：</label
                                >{{ item.fabingqingxiang }}
                            </div>
                            <div class="row"><label>🟡 调养方式：</label></div>
                            <ul class="recuperation-method">
                                <li
                                    v-for="op in item.tiaoyangfangshi"
                                    :key="op"
                                >
                                    ✅&nbsp; {{ op }}
                                </li>
                            </ul>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>

            <!-- <div class="howto">
                <span></span>
                <div class="title">我是{{ result.physical }}，该怎么办？</div>
                <span></span>
            </div> -->

            <div class="retest" @click="onRetest">重新测试</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Toast } from "vant";
import * as echarts from "echarts";
import { QUESTION_LIST, RESULT_LIST, TYPE_PHYSIQUE_MAP } from "./data";

export default defineComponent({
    data() {
        return {
            share: true,
            questionDataList: [],

            PingheScore: 0,
            QiXuScore: 0,
            YangXuScore: 0,
            YingXuScore: 0,
            TanShiScore: 0,
            ShiReScore: 0,
            XueYuScore: 0,
            QiYuScore: 0,
            TeBingScore: 0,

            result: {
                isPinghe: null, // 是否平和
                physical: "", // 当前体质
                both: [], // 兼有体质（去掉最高分）
                tenden: [], // 体质倾向
                healthGuide: [], // 健康建议
            },
        };
    },
    methods: {
        onChange(index) {
            document.getElementById(`question_${index}`).scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
        },

        /**
         * 计算分数
         * @param type 体质类型：
         * 1: 平和质
         * 2: 气虚质
         * 3: 阳虚质
         * 4: 阴虚质
         * 5: 痰湿质
         * 6: 湿热质
         * 7: 血瘀质
         * 8: 气郁质
         * 9: 特禀质
         */
        calculateScore(type: Number) {
            const currentTypeList = this.questionDataList.filter(
                (i: any) =>
                    i.type.includes(type) &&
                    (i.gender != null ? i.gender === this.gender : true),
            );
            let totalScore = 0;
            for (const item of currentTypeList) {
                let _score = item.value;
                if (item.is_decrease) {
                    _score = 6 - item.value;
                }
                totalScore += _score;
            }
            const len = currentTypeList.length;
            const _score = ((totalScore - len) / (len * 4)) * 100;
            return _score.toFixed(1);
        },

        onCloseShare() {
            this.share = false;
        },

        onRetest() {
            location.reload();
        },

        onSubmit() {
            // 判断是否有空值
            const isNullIndex = this.questionDataList.findIndex(
                (i) => i.value == 0,
            );
            if (isNullIndex > 0) {
                document
                    .getElementById(`question_${isNullIndex}`)
                    .scrollIntoView({
                        block: "center",
                        behavior: "smooth",
                    });
                Toast(`请填写第${isNullIndex + 1}题`);
                return;
            }

            const PingheScore = this.calculateScore(1);
            const QiXuScore = this.calculateScore(2);
            const YangXuScore = this.calculateScore(3);
            const YingXuScore = this.calculateScore(4);
            const TanShiScore = this.calculateScore(5);
            const ShiReScore = this.calculateScore(6);
            const XueYuScore = this.calculateScore(7);
            const QiYuScore = this.calculateScore(8);
            const TeBingScore = this.calculateScore(9);

            // const PingheScore = 50.0;
            // const QiXuScore = 25.0;
            // const YangXuScore = 17.9;
            // const YingXuScore = 31.3;
            // const TanShiScore = 25.0;
            // const ShiReScore = 25.0;
            // const XueYuScore = 32.1;
            // const QiYuScore = 32.1;
            // const TeBingScore = 32.1;

            this.PingheScore = PingheScore;
            this.QiXuScore = QiXuScore;
            this.YangXuScore = YangXuScore;
            this.YingXuScore = YingXuScore;
            this.TanShiScore = TanShiScore;
            this.ShiReScore = ShiReScore;
            this.XueYuScore = XueYuScore;
            this.QiYuScore = QiYuScore;
            this.TeBingScore = TeBingScore;

            const scoreList = [
                { type: 1, value: PingheScore },
                { type: 2, value: QiXuScore },
                { type: 3, value: YangXuScore },
                { type: 4, value: YingXuScore },
                { type: 5, value: TanShiScore },
                { type: 6, value: ShiReScore },
                { type: 7, value: XueYuScore },
                { type: 8, value: QiYuScore },
                { type: 9, value: TeBingScore },
            ];

            console.log(`\n
1: 平和质 得分: ${PingheScore}\n
2: 气虚质 得分: ${QiXuScore}\n
3: 阳虚质 得分: ${YangXuScore}\n
4: 阴虚质 得分: ${YingXuScore}\n
5: 痰湿质 得分: ${TanShiScore}\n
6: 湿热质 得分: ${ShiReScore}\n
7: 血瘀质 得分: ${XueYuScore}\n
8: 气郁质 得分: ${QiYuScore}\n
9: 特禀质 得分: ${TeBingScore}\n
`);

            // 平和质判定标准：
            // 1. 除平和质外没有超过 40分的体质
            // 2. 平和质 >= 60分

            // 非平和质判定标准：
            // 1. 平和质 < 60分 或者 除平和质外有 >= 30 && < 40 分的体质

            // 体质判定标准：
            // 1. >= 40分 就属于这种体质（取最大值）
            // 2. >= 30 && < 40分 属于有这种体质的倾向 需要注意

            // 结果：
            // 1. 当前体质（分数最高的体质）
            // 2. 兼有体质（其他 >= 40分的体质）
            // 3. 体质倾向（>= 30 && < 40分的体质）

            const scoreList1 = []; // >= 40分的体质
            const scoreList2 = []; // >= 30 && < 40分的体质

            for (const item of scoreList) {
                if (item.type != 1) {
                    if (item.value >= 40) {
                        scoreList1.push(item);
                    }
                    if (item.value >= 30 && item.value < 40) {
                        scoreList2.push(item);
                    }
                }
            }

            console.log(scoreList1);
            console.log(scoreList2);

            // 结果
            const result = {
                isPinghe: null, // 是否平和
                physical: "", // 当前体质
                both: [], // 兼有体质（去掉最高分）
                tenden: [], // 体质倾向
                healthGuide: [], // 健康建议
            };

            if (PingheScore >= 60) {
                result.isPinghe = true;
                if (scoreList1.length == 0 && scoreList2.length == 0) {
                    result.physical = "平和质";
                }
                if (scoreList1.length > 0 || scoreList2.length > 0) {
                    result.physical = "基本平和质";
                }
                result.healthGuide.push(RESULT_LIST.find((i) => i.type === 1));
                for (const item of scoreList) {
                    if (item.type != 1) {
                        if (item.value >= 40) {
                            result.both.push(TYPE_PHYSIQUE_MAP[item.type]);
                            result.healthGuide.push(
                                RESULT_LIST.find((i) => i.type === item.type),
                            );
                        }
                        if (item.value >= 30 && item.value < 40) {
                            result.tenden.push(TYPE_PHYSIQUE_MAP[item.type]);
                            result.healthGuide.push(
                                RESULT_LIST.find((i) => i.type === item.type),
                            );
                        }
                    }
                }
            } else {
                // 非平和质
                result.isPinghe = false;

                if (scoreList1.length > 0) {
                    const _list = scoreList1.sort((a, b) => {
                        return b.value - a.value;
                    });

                    // 体质(最大值)
                    result.physical = TYPE_PHYSIQUE_MAP[_list[0].type];

                    // 兼有
                    result.both = _list
                        .filter((_item, index) => index > 0)
                        .map((i) => TYPE_PHYSIQUE_MAP[i.type]);

                    for (const item of scoreList1) {
                        // 健康指南
                        result.healthGuide.push(
                            RESULT_LIST.find((i) => i.type === item.type),
                        );
                    }

                    // 倾向
                    if (scoreList2.length > 0) {
                        result.tenden = scoreList2.map(
                            (i) => TYPE_PHYSIQUE_MAP[i.type],
                        );
                        for (const item of scoreList2) {
                            result.healthGuide.push(
                                RESULT_LIST.find((i) => i.type === item.type),
                            );
                        }
                    }
                } else {
                    const _list = scoreList2.sort((a, b) => {
                        return b.value - a.value;
                    });

                    // 体质(最大值)
                    result.physical = "倾向" + TYPE_PHYSIQUE_MAP[_list[0].type];

                    // 倾向
                    result.tenden = _list
                        .filter((_item, index) => index > 0)
                        .map((i) => TYPE_PHYSIQUE_MAP[i.type]);

                    for (const item of scoreList2) {
                        // 健康指南
                        result.healthGuide.push(
                            RESULT_LIST.find((i) => i.type === item.type),
                        );
                    }
                }
            }

            this.result = result;

            this.initChart();
        },

        initChart() {
            let {
                PingheScore, // 平和
                QiXuScore, // 气虚
                YangXuScore, // 阳虚
                YingXuScore, // 阴虚
                TanShiScore, // 痰湿质
                ShiReScore, // 湿热质
                XueYuScore, // 血瘀质
                QiYuScore, // 气郁质
                TeBingScore, // 特禀质
            } = this;

            let xAxisData =
                PingheScore >= 60
                    ? [
                          "平和",
                          "气虚",
                          "阳虚",
                          "阴虚",
                          "痰湿",
                          "湿热",
                          "血瘀",
                          "气郁",
                          "特禀",
                      ]
                    : [
                          "气虚",
                          "阳虚",
                          "阴虚",
                          "痰湿",
                          "湿热",
                          "血瘀",
                          "气郁",
                          "特禀",
                      ];
            let yAxisData =
                PingheScore >= 60
                    ? [
                          PingheScore,
                          QiXuScore,
                          YangXuScore,
                          YingXuScore,
                          TanShiScore,
                          ShiReScore,
                          XueYuScore,
                          QiYuScore,
                          TeBingScore,
                      ]
                    : [
                          QiXuScore,
                          YangXuScore,
                          YingXuScore,
                          TanShiScore,
                          ShiReScore,
                          XueYuScore,
                          QiYuScore,
                          TeBingScore,
                      ];
            this.$nextTick(() => {
                const chartDom = document.getElementById("echart");
                const myChart = echarts.init(chartDom);
                myChart.setOption({
                    grid: {
                        top: "3%",
                        left: "3%",
                        right: "9%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: {
                        type: "category",
                        data: xAxisData,
                    },
                    yAxis: {
                        type: "value",
                        show: false,
                        max: 100,
                    },
                    visualMap: {
                        show: false,
                        pieces: [
                            {
                                gt: 0,
                                lte: 40,
                                color: "#007aff",
                            },
                            {
                                gt: 40,
                                //中间部分颜色显示
                                color: "#ed6858",
                            },
                            {
                                gt: 100, //这儿设置基线上下颜色区分 基线上面为红色
                                color: "#ed6858",
                            },
                        ],
                    },
                    series: [
                        {
                            data: yAxisData,
                            type: "bar",
                            showBackground: true,
                            markLine: {
                                lineStyle: { type: "solid", width: 1 },
                                data: [{ type: "average", yAxis: 40 }],
                                label: {
                                    normal: {
                                        formatter: "判定", // 这儿设置安全基线
                                    },
                                },
                            },
                        },
                    ],
                });

                this.$nextTick(() => {
                    setTimeout(() => {
                        document.getElementById(`resultTop`).scrollIntoView({
                            block: "start",
                            behavior: "auto",
                        });
                    }, 300);
                });
            });
        },
    },

    setup(props, self) {
        // 性别
        const gender = ref(null);
        // 题库
        const questionDataList = ref(null);

        const onSelectGender = (value) => {
            gender.value = value;

            questionDataList.value = QUESTION_LIST.filter((i) =>
                i.gender != null ? i.gender === value : true,
            );
        };

        return {
            gender,
            onSelectGender,
            questionDataList,
            strFilter: computed(function () {
                return function (v: Array<string>) {
                    if (v && v.length > 0) {
                        return v.join("、");
                    }
                    return "";
                };
            }),
        };
    },
});
</script>

<style lang="css" scoped>
@import "./index.css";
@import "./content.css";
@import "./result.css";

.page {
    max-width: 400px;
    margin: 0 auto;
    position: relative;
    background: #a7d168;
}
</style>
