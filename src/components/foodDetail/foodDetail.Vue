<template>
    <transition name="fade">
        <div class="detail-wrapper" ref="foodDetail">
            <div>
                <div class="avatar-wrapper">
                    <img :src="selectFood.image" width="100%" height="100%"/>
                </div>
                <div class="back">
                    <i class="icon-arrow_lift" @click="back()"></i>
                </div>
                <div class="food-info">
                    <div class="name">{{selectFood.name}}</div>
                    <div class="info">
                        <span class="count">月售{{selectFood.sellCount}}份</span>
                        <span class="rating">好评率{{selectFood.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="current-price">￥{{selectFood.price}}</span>
                        <span class="old-price" v-if="selectFood.oldPrice">￥{{selectFood.oldPrice}}</span>
                    </div>
                    <div class="addToCart blue" v-if="!selectFood.count" @click="addToCart($event)">加入购物车</div>
                    <div class="cartControl" v-if="selectFood.count">
                        <cartControl :food="selectFood" ref="cartControl"></cartControl>
                    </div>
                </div>
                <div class="line-box"></div>
                <div class="desc-wrapper">
                    <h5>商品介绍</h5>
                    <div class="description">{{selectFood.info}}</div>
                </div>
                <div class="line-box"></div>
                <div class="ratings">
                    <h3>商品评价</h3>
                    <div class="ratings-tabs">
                        <span class="total" @click="filter('ALL')" :class="{'great-active':selectTab == 'ALL'}">全部<b
                            class="ratings-number">{{allRatings.length}}</b></span>
                        <span class="recommend" @click="filter('RECOMMEND')"
                              :class="{'great-active':selectTab == 'RECOMMEND'}">推荐<b
                            class="ratings-number">{{recommendNumber}}</b></span>
                        <span class="bad" @click="filter('BAD')" :class="{'bad-active':selectTab == 'BAD'}">吐槽<b
                            class="ratings-number">{{badNumber}}</b></span>
                    </div>
                </div>
                <div class="notEmpty" @click="filterContent()">
                    <i class="icon-check_circle" :class="{'selected':showHasContent}"></i>
                    <span>只看有内容的评价</span>
                </div>
                <div class="evaluate">
                    <div class="evaluate-item" v-for="item in selectRatings">
                        <div class="rateTime">{{formateTime(item.rateTime)}}</div>
                        <div class="">
                            <i class="icon-thumb_up" v-if="item.rateType == 0"></i>
                            <i class="icon-thumb_down" v-if="item.rateType == 1"></i>
                            <span class="text">{{item.text}}</span>
                        </div>
                        <div class="userInfo">
                            <span>{{item.username}}</span>
                            <span class="user-avatar">
                               <img :src="item.avatar" width="100%" height="100%"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>

</template>
<script type="text/ecmascript-6">
    import cartControl from 'components/cartControl/cartControl.vue'
    import betterScroll from 'better-scroll'
    import eventBus from 'common/js/eventBus.vue'
    import common from 'common/js/common'
    export default {
        props     : ['selectFood'],
        data(){
            return {
                allRatings      : [],           //存所有评价的数组
                badRatings      : [],           //存吐槽评价的数组
                recommendRatings: [],           //存推荐评价的数组
                selectRatings   : [],           //存当前展示的评价的数组
                selectTab       : 'ALL',        //当前选择评价类型
                showHasContent  : false         //评价是否有内容
            }
        },
        components: {
            cartControl
        },
        computed  : {
            recommendNumber() {
                this.selectFood.ratings.forEach((item) => {
                    if (item.rateType == 0) {
                        this.recommendRatings.push(item)
                    }
                });
                return this.recommendRatings.length;
            },
            badNumber() {
                this.selectFood.ratings.forEach((item) => {
                    if (item.rateType == 1) {
                        this.badRatings.push(item)
                    }
                });
                return this.badRatings.length;
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.scroll = new betterScroll(this.$refs.foodDetail, {
                    click: true
                });
                this.allRatings = this.selectFood.ratings;
                this.selectRatings = this.allRatings;
            })
        },
        methods   : {
            formateTime(time) {
                return common.formateTime(time);
            },

            filterContent() {
                this.showHasContent = ! this.showHasContent;
                if (this.showHasContent) {
                    this.commonFilterFun();
                } else {
                    this.filter(this.selectTab);
                }
            },

            commonFilterFun(){
                let arr = [];
                this.selectRatings.forEach((item) => {
                    if (item.text != '') {
                        arr.push(item);
                    }
                });
                this.selectRatings = arr;
            },

            filter(type) {
                this.selectTab = type;
                if (type == 'ALL') {
                    this.selectRatings = this.allRatings;
                } else if (type == 'BAD') {
                    this.selectRatings = this.badRatings;
                } else {
                    this.selectRatings = this.recommendRatings;
                }
                if (this.showHasContent) {
                    this.commonFilterFun();
                }
            },

            addToCart(event) {
                this.selectFood.count ++;
            },

            showFoodDetail() {
                this.isShowFoodDetail = true;
            },

            back() {
                eventBus.$emit('back');
            }
        }
    }
</script>
<style scoped lang="less">
    .detail-wrapper {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 100;
        overflow: hidden;
        transform: translate3d(0, 0, 0);
        transition: all 0.3s linear;
        &.fade-enter-active, &.fade-leave-active {
            transition: all .5s;
            transform: translate3d(0, 0, 0);
        }
        &.fade-enter, &.fade-leave-to {
            transform: translate3d(100%, 0, 0);
        }
        .avatar-wrapper {
            height: 750px;
            width: 100%;
        }
        .back {
            position: absolute;
            left: 40px;
            top: 70px;
            .icon-arrow_lift {
                color: #fff;
                font-size: 28px;
            }
        }
        .food-info {
            position: relative;
            padding: 36px;
            .name {
                margin-bottom: 16px;
                font-size: 28px;
                font-weight: 700;
                color: rgb(7, 17, 27);
                line-height: 18px;
            }
            .info {
                font-size: 20px;
                color: rgb(147, 153, 159);
                line-height: 20px;
                margin-bottom: 36px;
                .rating {
                    margin-left: 24px;
                }
            }
            .current-price {
                font-size: 28px;
                font-weight: 700;
                color: rgb(240, 20, 20);
            }
            .old-price {
                font-size: 20px;
                text-decoration: line-through;
                color: rgb(147, 153, 159);
            }
            .addToCart {
                font-size: 20px;
                text-align: center;
                color: white;
                border-radius: 48px;
                background: rgb(0, 140, 215);
            }
            .cartControl, .addToCart {
                position: absolute;
                right: 36px;
                bottom: 36px;
                width: 148px;
                height: 48px;
                line-height: 48px;
            }
        }

        .desc-wrapper {
            padding: 36px;
            h3 {
                margin-bottom: 12px;
            }
            .description {
                padding: 0 16px;
                font-size: 24px;
                font-weight: 200;
                color: rgb(77, 85, 93);
                line-height: 48px;
            }
        }
        .ratings {
            h3 {
                padding: 36px 36px 0 36px;
            }
            .ratings-tabs {
                margin: 36px 36px 0 36px;
                padding-bottom: 36px;
                font-size: 0;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                span {
                    display: inline-block;
                    padding: 24px 16px;
                    color: rgb(77, 85, 93);
                    font-size: 24px;
                    margin-right: 16px;
                    .ratings-number {
                        font-size: 16px;
                        margin-left: 10px;
                        line-height: 1;
                    }
                    &.total, &.recommend {
                        background: rgb(193, 231, 247);
                    }
                    &.great-active {
                        background: rgb(0, 160, 220);
                        color: white;
                    }
                    &.bad {
                        background: rgba(77, 85, 93, 0.2);
                    }
                    &.bad-active {
                        background: rgb(77, 85, 93);
                        color: white;
                    }
                }
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
        .evaluate {
            margin: 0 36px;
            padding-bottom: 100px;
            .evaluate-item {
                position: relative;
                padding: 32px 0;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            }
            .rateTime {
                margin-bottom: 12px;
                font-size: 20px;
                line-height: 24px;
                color: rgb(147, 153, 159);
            }
            .icon-thumb_up, .icon-thumb_down {
                font-size: 24px;
                line-height: 48px;
            }
            .icon-thumb_up {
                color: rgb(0, 160, 220);
            }
            .icon-thumb_down {
                color: rgb(147, 153, 159);
            }
            .text {
                margin-left: 8px;
            }
            .userInfo {
                position: absolute;
                right: 0;
                top: 36px;
                color: rgb(147, 153, 159);
                .user-avatar {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    vertical-align: top;
                    img {
                        border-radius: 50%
                    }
                }
            }

        }

    }
</style>