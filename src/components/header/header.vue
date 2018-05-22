<template>
    <div class="header">
        <div class="seller-detail">
            <div class="left">
                <img :src="seller.avatar"/>
            </div>
            <div class="right">
                <div class="title">
                    <span class="brand"></span>
                    <span class="seller-name">{{seller.name}}</span>
                </div>
                <div class="info">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="supports" v-if="seller.supports">
                    <span class="icon" :class="imageMap[seller.supports[0].type]"></span>
                    <span>{{seller.supports[0].description}}</span>
                </div>

            </div>
            <div class="supports-number" v-if="seller.supports" @click="showDetail">
                <span>{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="seller-describe" @click="showDetail">
            <span class="icon"></span><span class="bulletin">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%"/>
        </div>

        <transition name="fade">
            <div class="dimmer" v-show="detailShow">
                <div class="dimmer-content-wrapper clear-fix">
                    <div class="dimmer-content">
                        <div class="name">{{seller.name}}</div>
                        <div class="score">
                            <star :size='48' :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <div class="sale">
                            <div v-for="item in seller.supports">
                                <span class='typeIcon' :class="imageMap[item.type]"></span>
                                <span class="description">{{item.description}}</span>
                            </div>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="dimmer-bulletin">{{seller.bulletin}}</div>
                    </div>
                </div>
                <div class="dimmer-close">
                    <i class="icon-close" @click="closeDetail"></i>
                </div>
            </div>
        </transition>

        <!--<div class="dimmer-background"></div>-->
    </div>
</template>

<script type='text/ecmascript-6'>
	import star from 'components/star/star.vue';
	export default{
		props: ['seller'],
		data () {
			return {
				imageMap: [],
				detailShow: false,
			}
		},
		mounted () {
		},
		components: {
			star: star
		},
		methods: {
			showDetail () {
				this.detailShow = true
			},

			closeDetail () {
				this.detailShow = false
			}
		},
		created () {
			this.imageMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		}
	}
</script>

<style scoped lang="less">
    .header {
        background: rgba(7, 17, 27, 0.5);
        position: relative;
        color: #fff;
        overflow: hidden;
        .seller-detail {
            padding: 48px 24px 36px 48px;
            display: flex;
            position: relative;
            .left {
                width: 128px;
                height: 128px;
                margin-right: 32px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                }
            }
            .right {
                font-size: 0;
                .title {
                    margin: 4px 0 16px 0;
                    /*display: flex;*/
                    .brand {
                        display: inline-block;
                        width: 60px;
                        height: 35px;
                        background-image: url("brand@2x.png");
                        background-size: cover;
                        background-repeat: no-repeat;
                        vertical-align: top
                    }
                    .seller-name {
                        margin-left: 12px;
                        font-size: 32px;
                        line-height: 36px;
                        font-weight: bold;
                    }
                }
                .info {
                    font-size: 24px;
                    font-weight: 200;
                    line-height: 24px;
                }
                .supports {
                    margin: 20px 0 4px 0;
                    font-size: 20px;
                    font-weight: 200;
                    line-height: 24px;
                    .icon {
                        display: inline-block;
                        width: 24px;
                        height: 24px;
                        background-size: cover;
                        background-repeat: no-repeat;
                        vertical-align: top;
                        margin-right: 8px;
                        &.decrease {
                            background-image: url("../../components/header/decrease_2@2x.png");
                        }
                        &.discount {
                            background-image: url("../../components/header/discount_2@2x.png");
                        }
                        &.guarantee {
                            background-image: url("../../components/header/guarantee_2@2x.png");
                        }
                        &.invoice {
                            background-image: url("../../components/header/invoice_2@2x.png");
                        }
                        &.special {
                            background-image: url("../../components/header/special_2@2x.png");
                        }
                    }
                }

            }
            .supports-number {
                position: absolute;
                right: 24px;
                bottom: 36px;
                height: 48px;
                line-height: 48px;
                padding: 0 16px;
                border-radius: 14px;
                background: rgba(0, 0, 0, 0.2);

            }
        }
        .seller-describe {
            height: 56px;
            line-height: 56px;
            width: 100%;
            padding: 0 24px;
            background-color: rgba(7, 17, 27, 0.2);

            .icon {
                display: inline-block;
                width: 44px;
                height: 24px;
                margin-top: 16px;
                background: url("bulletin@2x.png") center no-repeat;
                /*background-repeat: no-repeat;*/
                background-size: cover;
                vertical-align: top;

            }
            .bulletin {
                margin: 0 8px;
                display: inline-block;
                width: 80%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 20px;
                line-height: 56px;
                font-weight: 200;
            }
            i {
                display: inline-block;
                vertical-align: top;
                margin-top: 20px;
            }
        }
        .background {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            filter: blur(10px);
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
        .dimmer {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background: rgba(7, 17, 27, 0.9);
            z-index: 100;
            backdrop-filter: blur(10px);
            .dimmer-content-wrapper {
                min-height: 100%;
                width: 100%;
                .dimmer-content {
                    padding: 128px 72px 128px 72px;
                    .name {
                        text-align: center;
                        font-size: 32px;
                        font-weight: 700;
                        margin-bottom: 32px;
                    }
                    .score {
                        text-align: center;
                    }
                    .title {
                        display: flex;
                        margin-top: 56px;
                        .line {
                            flex: 1;
                            position: relative;
                            top: -12px;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                        }
                        .text {
                            font-size: 28px;
                            font-weight: 700;
                            padding: 0 24px;
                        }

                    }
                    .sale {
                        margin: 24px 0 56px 0;
                        > div {
                            margin-top: 24px;
                            margin-left: 24px;
                            .typeIcon {
                                display: inline-block;
                                width: 24px;
                                height: 24px;
                                background-size: cover;
                                margin-right: 12px;
                                &.decrease {
                                    background-image: url("../../components/header/decrease_1@2x.png");
                                }
                                &.discount {
                                    background-image: url("../../components/header/discount_1@2x.png");
                                }
                                &.guarantee {
                                    background-image: url("../../components/header/guarantee_1@2x.png");
                                }
                                &.invoice {
                                    background-image: url("../../components/header/invoice_1@2x.png");
                                }
                                &.special {
                                    background-image: url("../../components/header/special_1@2x.png");
                                }
                            }
                            .description {
                                font-size: 24px;
                                font-weight: 200;
                                color: #fff;
                                vertical-align: top
                            }
                        }
                    }
                    .dimmer-bulletin {
                        padding: 48px 24px 0 24px;
                        color: #fff;
                        font-size: 24px;
                        line-height: 48px;
                    }
                }
            }
            .dimmer-close {
                position: relative;
                width: 64px;
                height: 64px;
                margin: -128px auto 0 auto;
                clear: both;
                .icon-close {
                    font-size: 64px;
                }
            }
        }
    }

    .icon-keyboard_arrow_right {
        width: 24px;
        height: 24px;
        line-height: 24px;
        vertical-align: middle;
    }


</style>
