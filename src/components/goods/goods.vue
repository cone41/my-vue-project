<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul class="menu">
                <li class="menu-item" v-for="(good,index) in goods" :class="{'current':currentIndex === index}"
                    @click="getTo(index,$event)">
                    <span class="name">
                        <span class="icon" v-if="good.type>0" :class="imageMap[good.type]"></span>{{good.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="goods-wrapper" ref="goodsWrapper">
            <div>
                <div class="goods-item" v-for="item in goods">
                    <div class="title">{{item.name}}</div>
                    <div class="item-info" v-for="food in item.foods" @click.stop="showFoodDetail(food)">
                        <div class="item-image">
                            <img :src="food.image" width="100%" height="100%"/>
                        </div>
                        <div class="item-detail">
                            <div class="name">{{food.name}}</div>
                            <div class="description">{{food.description}}</div>
                            <div class="sellCount">
                                <span>月售{{food.sellCount}}份</span>
                                <span class="rating">好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="cur-price">￥{{food.price}}</span>
                                <span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                            <div class="cart-control-wrapper">
                                <cartControl :food="food"></cartControl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <shopCart :seller="seller" :selected-foods="selectedFoods" ref="shopCart"></shopCart>
        <foodDetail ref="showDetail" :select-food="selectFood" v-if="isShowFoodDetail"></foodDetail>
    </div>
</template>

<script type='text/ecmascript-6'>
    import betterScroll from 'better-scroll'
    import shopCart from 'components/shopcart/shopcart.vue'
    import cartControl from 'components/cartControl/cartControl.vue'
    import foodDetail from 'components/foodDetail/foodDetail.vue'
    import eventBus from 'common/js/eventBus.vue'
    import data from './../../../data.json'

    const ERR_NUM = 0;
    export default {
        props: ['seller'],
        data () {
            return {
                goods           : [],
                scrollHeight    : [],
                scrollY         : 0,
                selectFood      : {},
                isShowFoodDetail: false
            }
        },

        components: {
            'shopCart'   : shopCart,
            'cartControl': cartControl,
            'foodDetail' : foodDetail
        },

        created () {
            this.imageMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.goods = data.goods;
            this.$nextTick(() => {
                this.initScroll();
                this.calculateHeight();
            })
            //            this.$http.get('/api/goods').then((data) => {
            //                data = data.body;
            //                if (data.errno == ERR_NUM) {
            //                    this.goods = data.data;
            //                    for (let i = 0; i < this.goods.length; i ++) {
            //                        let item = this.goods[i].foods;
            //                        for (let j = 0; j < item.length; j ++) {
            //                            this.$set(item[j], 'count', 0);
            //                        }
            //                    }
            //                    this.$nextTick(() => {
            //                        this.initScroll();
            //                        this.calculateHeight();
            //                    })
            //                }
            //            })
        },

        computed: {
            currentIndex() {
                for (let i = 0; i < this.scrollHeight.length; i ++) {
                    let height1 = this.scrollHeight[i];
                    let height2 = this.scrollHeight[i + 1];
                    if (! height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectedFoods(){
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    })
                });
                return foods;
            }
        },

        mounted(){
            eventBus.$on('setEmpty', () => {
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        food.count = 0;
                    })
                });
            });
            eventBus.$on('back', () => {
                this.isShowFoodDetail = false;
            })
        },
        methods: {
            showFoodDetail(food){
                this.selectFood = food;
                this.isShowFoodDetail = true;
            },
            getTo(index, event) {
                if (! event._constructed) {
                    return;
                }
                let foodsList = $(this.$refs.goodsWrapper).find('.goods-item');
                let el = foodsList[index];
                this.goodsScroll.scrollToElement(el, 300);
            },

            initScroll() {
                this.menuScroll = new betterScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.goodsScroll = new betterScroll(this.$refs.goodsWrapper, {
                    click    : true,
                    probeType: 3,
                });
                this.goodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                })
            },

            calculateHeight() {
                let doms = $(this.$refs.goodsWrapper).find('.goods-item');
                let height = 0;
                this.scrollHeight.push(height);
                for (let i = 0; i < doms.length; i ++) {
                    height += doms[i].clientHeight;
                    this.scrollHeight.push(height);
                }
            }
        }
    }
</script>
<style scoped lang="less">
    @import "../../common/less/common";

    .goods {
        display: flex;
        position: absolute;
        top: 348px;
        bottom: 90px;
        width: 100%;
        .menu-wrapper {
            flex: 0 0 160px;
            width: 160px;
            background: #f3f5f7;
            .menu {
                .menu-item {
                    padding: 0 24px;
                    display: table;
                    height: 108px;
                    line-height: 28px;
                    font-size: 24px;
                    font-weight: 200;
                    text-align: center;
                    &.current {
                        position: relative;
                        margin-top: -1px;
                        background: white;
                        font-weight: 700;

                    }

                    .icon {
                        display: inline-block;
                        width: 24px;
                        height: 24px;
                        background-size: cover;
                        background-repeat: no-repeat;
                        vertical-align: top;
                        margin-right: 4px;
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
                    .name {
                        width: 112px;
                        display: table-cell;
                        vertical-align: middle;
                        .mixify(rgba(7, 17, 27, 0.1));
                    }
                }
            }
        }
        .goods-wrapper {
            flex: 1;
            overflow: hidden;
            font-size: 0;
            .goods-item {
                .title {
                    height: 52px;
                    line-height: 52px;
                    width: 100%;
                    background: #f3f5f7;
                    border-left: 5px solid #d9dde1;
                    padding-left: 28px;
                    font-size: 24px;
                    color: rgb(147, 153, 159);
                }
                .item-info {
                    padding: 36px 0;
                    margin: 0 36px;
                    position: relative;
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                    .item-image {
                        width: 100px;
                        height: 100px;
                        display: inline-block;
                    }
                    .item-detail {
                        display: inline-block;
                        vertical-align: top;
                        margin-top: 4px;
                        margin-left: 20px;
                        .name {
                            font-size: 28px;
                            color: rgb(7, 17, 27);
                            line-height: 28px;
                        }
                        .description {
                            margin: 16px 0;
                            font-size: 20px;
                            color: rgb(147, 153, 159);
                            width: 350px;
                            line-height: 24px
                        }
                        .sellCount {
                            font-size: 20px;
                            color: rgb(147, 153, 159);
                            .rating {
                                padding-left: 24px;
                            }
                        }
                        .price {
                            .cur-price {
                                font-size: 28px;
                                color: red;
                                font-weight: 700;
                                line-height: 48px;
                            }
                            .old-price {
                                font-size: 20px;
                                color: rgb(147, 153, 159);
                                line-height: 48px;
                                margin-left: 16px;
                                text-decoration: line-through;
                                vertical-align: top;
                            }
                        }
                        .cart-control-wrapper {
                            position: absolute;
                            right: 0;
                            bottom: 36px;
                        }

                    }
                }

            }
        }

    }
</style>
