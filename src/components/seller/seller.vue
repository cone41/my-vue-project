<template>
    <div class="seller-wrapper" ref="sellerWrapper">
        <div>
            <div class="seller">
                <div class="seller-info">
                    <div class="name">{{seller.name}}</div>
                    <div class="stars">
                    <span>
                        <star :size='36' :score="seller.score"></star>
                    </span>
                        <span>{{seller.sellCount}}</span>
                        <span class="month-sell">月售{{seller.sellCount}}单</span>
                    </div>
                    <div class="love">
                        <div class="icon"><i class="icon-favorite"></i></div>
                        <div class="collect">收藏</div>
                    </div>
                </div>
                <div class="count-wrapper">
                    <div class="count">
                        <div class="title">起送价</div>
                        <div><span>{{seller.minPrice}}</span>元</div>
                    </div>
                    <div class="count">
                        <div class="title">商家配送费</div>
                        <div><span>{{seller.deliveryPrice}}</span>元</div>
                    </div>
                    <div class="count">
                        <div class="title">平均配送时间</div>
                        <div><span>{{seller.deliveryTime}}</span>分钟</div>
                    </div>
                </div>
                <div class="line-box"></div>
                <div class="desc">
                    <h3>公告与活动</h3>
                    <div class="bulletin">{{seller.bulletin}}</div>
                </div>
                <ul class="activity">
                    <li v-for="item in seller.supports">
                        <span class="icon" :class="imageMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
                <div class="line-box"></div>
                <div class="seller-pic">
                    <h3>商家实景</h3>
                    <div class="slider-wrapper" ref="picWrapper">
                        <div class="slider" ref="picsList">
                            <div class="slider-item" v-for="pic in seller.pics">
                                <img :src="pic" width="100%" height="100%"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line-box"></div>
                <div class="seller-message">
                    <h3>商家信息</h3>
                    <ul class="infos">
                        <li v-for="item in seller.infos">{{item}}</li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
    import star from 'components/star/star.vue'
    import betterScroll from 'better-scroll'
    export default{
        props: ['seller'],

        data() {
            return {
                imageMap: []
            }
        },

        watch: {
            'seller'(){
                this.initPicScroll();
            }
        },

        created () {
            this.imageMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },

        mounted(){
            this.$nextTick(() => {
                this.sellerScroll = new betterScroll(this.$refs.sellerWrapper, {
                    click: true
                })
            });
            this.initPicScroll();
        },

        components: {
            star
        },

        methods: {
            initPicScroll(){
                if (this.seller.pics) {
                    let picWidth = 120;
                    let margin = 6;
                    let width = (picWidth + margin) * this.seller.pics.length;
                    $(this.$refs.picsList).css('width', width+'px');
                    this.$nextTick(() => {
                        if (!this.picScroll){
                            this.picScroll = new betterScroll(this.$refs.picWrapper,{
                                scrollX:true,
                                eventPassthrough:'vertical'
                            })
                        } else {
                            this.picScroll.refresh();
                        }

                    })
                }

            }
        }

    }
</script>

<style scoped lang="less">
    .seller-wrapper {
        position: absolute;
        bottom: 0;
        top: 348px;
        width: 100%;
        overflow: hidden;
        .seller-info {
            margin: 0 36px;
            padding: 36px 0;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .name {
                font-size: 28px;
                color: rgb(7, 17, 27);
            }
            .stars {
                margin-top: 16px;
                font-size: 0;
                span {
                    display: inline-block;
                }
                .month-sell {
                    font-size: 20px;
                    color: rgb(77, 85, 93);
                    line-height: 36px;
                    margin-left: 24px;
                    vertical-align: top;
                }
            }
            .love {
                position: absolute;
                right: 36px;
                top: 36px;
                .icon {
                    margin-bottom: 8px;
                    i {
                        font-size: 48px;
                        color: rgb(240, 20, 20);
                        line-height: 48px;
                    }
                }
                .collect {
                    font-size: 20px;
                    color: rgb(77, 85, 93);
                }
            }
        }
        .count-wrapper {
            margin: 36px;
            display: flex;
            .count {
                flex: 1;
                text-align: center;
                .title {
                    font-size: 20px;
                    color: rgb(147, 153, 159);
                    margin-bottom: 12px;
                }
                span {
                    font-size: 48px;
                    color: rgb(7, 17, 27);
                    font-weight: 200;
                }
            }
        }
        .desc {
            margin: 0 36px;
            padding: 36px 0 32px 0;
            h3 {
                font-size: 28px;
                color: rgb(7, 17, 27);
                margin-bottom: 16px;
            }
            .bulletin {
                padding: 0 24px;
                font-size: 24px;
                font-weight: 200;
                color: rgb(240, 20, 20);
                line-height: 48px;
            }
        }
        .activity {
            margin: 0 36px;
            li {
                padding: 32px 24px;
                border-top: 1px solid rgba(7, 17, 27, 0.1);
                .icon {
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    vertical-align: top;
                    &.decrease {
                        background-image: url("../../components/seller/decrease_2@2x.png");
                    }
                    &.discount {
                        background-image: url("../../components/seller/discount_2@2x.png");
                    }
                    &.guarantee {
                        background-image: url("../../components/seller/guarantee_2@2x.png");
                    }
                    &.invoice {
                        background-image: url("../../components/seller/invoice_2@2x.png");
                    }
                    &.special {
                        background-image: url("../../components/seller/special_2@2x.png");
                    }
                }
                .text {
                    vertical-align: top;
                    line-height: 32px;
                    margin-left: 12px;
                    font-size: 24px;
                    font-weight: 200;
                    color: rgb(7, 17, 27);
                }

            }
        }
        .seller-pic, .seller-message {
            h3 {
                font-size: 28px;
                color: rgb(7, 17, 27);
                margin-bottom: 24px;
            }
        }
        .seller-pic {
            margin: 36px 0 36px 36px;
            .slider-wrapper {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                .slider {
                    font-size: 0;
                    .slider-item {
                        width: 240px;
                        height: 180px;
                        display: inline-block;
                        margin-right: 12px;
                    }
                }
            }
        }

        .seller-message {
            margin: 36px;
            .infos {
                li {
                    padding: 32px 24px;
                    border-top: 1px solid rgba(7, 17, 27, 0.1);
                    font-size: 24px;
                    line-height: 32px;
                    color: rgb(7, 17, 27);

                }
            }
        }

    }
</style>
