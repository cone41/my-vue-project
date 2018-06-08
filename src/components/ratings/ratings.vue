<template>
    <div class="ratings-wrapper" ref="ratingsWrapper">
        <div>
            <div class="ratings">
                <div class="left">
                    <div class="score">{{compositeScore}}</div>
                    <div class="mark">综合评分</div>
                    <div class="overtop">高于周边商家69.2%</div>
                </div>
                <div class="right">
                    <div class="attitude">
                        <span>服务态度</span>
                        <span>
                        <star :size='36' :score="compositeScore"></star>
                    </span>
                    </div>
                    <div class="good-score">
                        <span>商品评分</span>
                        <span>
                        <star :size='36' :score="compositeScore"></star>
                    </span>
                    </div>
                    <div class="arriveTime">
                        <span>送达时间</span>
                        <span>44分钟</span>
                    </div>
                </div>
            </div>
            <div class="line-box"></div>
            <div class="ratings-tab">
                <div class="all" :class="{'good':ratingType == 'ALL'}" @click="select('ALL')">
                    全部<span>{{ratings.length}}</span></div>
                <div class="pleased" :class="{'good':ratingType == 'PLEASED'}" @click="select('PLEASED')">满意<span>{{pleasedNum}}</span>
                </div>
                <div class="discontent" :class="{'bad':ratingType == 'DISCONTENT'}" @click="select('DISCONTENT')">
                    不满意<span>{{disContentNum}}</span>
                </div>
            </div>
            <div class="notEmpty" @click="filterContent()">
                <i class="icon-check_circle" :class="{'selected':showHasContent}"></i>
                <span>只看有内容的评价</span>
            </div>
            <div class="ratings-list">
                <div class="rating-item" v-for="item in selectRatings">
                    <div class="img-wrapper">
                        <img :src="item.avatar" width="100%" height="100%"/>
                    </div>
                    <div class="rating-info">
                        <div class="user">
                            <span>{{item.username}}</span>
                            <span class="time">{{formateTime(item.rateTime)}}</span>
                        </div>
                        <div class="star">
                        <span>
                            <star :size='24' :score="item.score"></star>
                        </span>
                            <span class="arrivedTime" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                        </div>
                        <div class="text">{{item.text}}</div>
                        <div class="recommend">
                            <i class="icon-thumb_up" v-if="item.recommend.length"
                               :class="{'icon-thumb_up':item.rateType == 0,'icon-thumb_down':item.rateType == 1}"></i>
                            <span class="recommend-item" v-for="food in item.recommend">{{food}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
    import data from './../../../data.json'
    import star from 'components/star/star.vue';
    import betterScroll from 'better-scroll'
    import common from 'common/js/common'
    const NUM = 0;
    export default{
        data() {
            return {
                ratings          : [],
                compositeScore   : 0,
                allRatings       : [],
                pleasedRatings   : [],
                discontentRatings: [],
                selectRatings    : [],
                showHasContent   : false,
                ratingType       : 'ALL'
            }
        },

        components: {
            star
        },

        mounted() {
            //            this.ratings = data.ratings;
            //            this.allRatings = this.ratings;
            //            this.selectRatings = this.ratings;
            //            this.ratings.forEach((item) => {
            //                this.compositeScore += item.score;
            //            });
            //            this.compositeScore = (this.compositeScore / this.ratings.length).toFixed(1);
            //            this.scroll = new betterScroll(this.$refs.ratingsWrapper, {
            //                click:true
            //            })
            this.$http.get('/api/ratings').then((data) => {
                if (data.data.errno == NUM) {
                    this.ratings = data.data.data;
                    this.allRatings = this.ratings;
                    this.selectRatings = this.ratings;
                    this.ratings.forEach((item) => {
                        this.compositeScore += item.score;
                    });
                    this.compositeScore = (this.compositeScore / this.ratings.length).toFixed(1);
                    this.scroll = new betterScroll(this.$refs.ratingsWrapper, {
                        click: true
                    })
                }
            })
        },

        computed: {
            //满意
            pleasedNum() {
                this.ratings.forEach((item) => {
                    if (item.rateType == 0) {
                        this.pleasedRatings.push(item);
                    }
                });
                return this.pleasedRatings.length
            },

            //不满意
            disContentNum(){
                this.ratings.forEach((item) => {
                    if (item.rateType == 1) {
                        this.discontentRatings.push(item);
                    }
                });
                return this.discontentRatings.length
            }
        },

        methods: {
            formateTime(time) {
                return common.formateTime(time);
            },

            filterContent(){
                this.showHasContent = ! this.showHasContent;
                this.select(this.ratingType);               //过滤数据
            },

            select(type) {
                this.ratingType = type;
                if (type == 'ALL') {
                    this.selectRatings = this.allRatings;
                } else if (type == 'PLEASED') {
                    this.selectRatings = this.pleasedRatings;
                } else {
                    this.selectRatings = this.discontentRatings;
                }
                //如果showHasContent为true则只展示有内容的评价，反之则全部展示
                if (this.showHasContent) {
                    this.commonFilter();
                }
            },

            commonFilter(){
                let arr = [];
                this.selectRatings.forEach((item) => {
                    if (item.text != '') {
                        arr.push(item);
                    }
                });
                this.selectRatings = arr;
            }
        }
    }
</script>

<style scoped lang="less">
    .ratings-wrapper {
        position: absolute;
        bottom: 0;
        top: 348px;
        width: 100%;
        overflow: hidden;
    }

    .ratings {
        width: 100%;
        display: flex;
        margin: 36px 48px 36px 0;
        .left {
            flex: 0 0 275px;
            width: 275px;
            border-right: 1px solid rgba(7, 17, 27, 0.2);
            text-align: center;
            .score {
                font-size: 48px;
                color: rgb(255, 153, 0);
                line-height: 56px;
            }
            .mark {
                padding: 12px 0 16px 0;
                font-size: 24px;
                color: rgb(7, 17, 27);
                line-height: 24px;
            }
            .overtop {
                font-size: 20px;
                color: rgb(147, 153, 159);
                padding-bottom: 12px;
            }

        }
        .right {
            flex: 1;
            margin: 0 48px;
            .attitude, .good-score, .arriveTime {
                span {
                    display: inline-block;
                    font-size: 24px;
                }
                span:first-child {
                    padding-right: 24px;
                    vertical-align: top;
                    color: rgb(7, 17, 27);
                    line-height: 36px;
                }
            }
            .attitude, .good-score {
                margin-bottom: 16px;
            }
            .arriveTime {
                span:last-child {
                    color: rgb(147, 153, 159);
                }
            }

        }
    }

    .line-box {
        height: 32px;
        width: 100%;
        background: #f3f5f7;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .ratings-tab {
        margin: 0 36px;
        padding: 36px 0;
        font-size: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        div {
            display: inline-block;
            padding: 16px 24px;
            font-size: 24px;
            color: rgb(77, 85, 93);
            margin-right: 16px;
            line-height: 32px;
            span {
                font-size: 16px;
                margin-left: 6px;
                vertical-align: middle
            }
            &.good {
                background: rgb(0, 160, 220);
                color: white;
            }
            &.bad {
                background: rgb(77, 85, 93);
                color: white;
            }
        }
        .all, .pleased {
            background: rgb(193, 231, 247);
        }
        .discontent {
            background: rgba(77, 85, 93, 0.2);
        }

    }

    .notEmpty {
        padding: 24px 36px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: rgb(147, 153, 159);
        i {
            font-size: 48px;
            line-height: 48px;
        }
        .selected {
            color: rgb(0, 160, 220);
        }
        span {
            font-size: 24px;
            line-height: 48px;
            vertical-align: top;
        }
    }

    .ratings-list {
        .rating-item {
            margin: 0 36px;
            padding: 36px 0;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            display: flex;
            position: relative;
            .img-wrapper {
                flex: 0 0 56px;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                img {
                    border-radius: 50%;
                }
            }
            .rating-info {
                margin-left: 24px;
                .user {
                    font-size: 20px;
                    color: rgb(7, 17, 27);
                    line-height: 24px;
                    .time {
                        position: absolute;
                        right: 0;
                        color: rgb(147, 153, 159);
                        font-size: 20px;
                        line-height: 24px;
                        font-weight: 200;
                    }
                }
                .star {
                    display: inline-block;
                    margin: 8px 0 12px 0;
                    .arrivedTime {
                        margin-left: 12px;
                        font-size: 20px;
                        font-weight: 200;
                        line-height: 24px;
                        color: rgb(147, 153, 159);
                    }
                }
                .text {
                    color: rgb(7, 17, 27);
                    font-size: 24px;
                    line-height: 36px;
                }
                .recommend {
                    margin-top: 16px;
                    .icon-thumb_up {
                        color: rgb(0, 160, 220);
                    }
                    .icon-thumb_down {
                        color: rgb(183, 187, 191);
                    }
                    .recommend-item {
                        display: inline-block;
                        padding: 0 12px;
                        margin-right: 16px;
                        margin-bottom: 10px;
                        border: 1px solid rgba(7, 17, 27, 0.1);
                        border-radius: 2px;
                        line-height: 32px;
                        color: rgb(147, 153, 159);
                        font-size: 18px;
                    }
                }

            }
        }
    }
</style>
