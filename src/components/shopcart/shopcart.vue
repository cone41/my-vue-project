<template>
    <div>
        <div class="bottom-carts">
            <div class="cart-left" @click="openCartDetail">
                <div class="cart-wrapper">
                    <div class="cart" :class="{blue:totalPrice>0}">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <div class="goods-number" v-if="goodsNumber>0">{{goodsNumber}}</div>
                </div>
                <div class="price" :class="{white:totalPrice>0}">
                    ￥{{totalPrice}}
                </div>
                <div class="delivery">另需配送费￥{{seller.deliveryPrice}}元</div>
            </div>
            <div class="cart-right">
                <div class="min-price" v-if="totalPrice == 0">￥{{seller.minPrice}}起送</div>
                <div class="min-price" v-if="totalPrice != 0 && totalPrice<seller.minPrice">
                    还差￥{{seller.minPrice - totalPrice}}起送
                </div>
                <div class="clear" v-if="totalPrice>=seller.minPrice">去结算</div>
            </div>
        </div>
        <div class="ball-container" v-for="ball in balls">
            <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop" name="drop">
                <div class="ball" v-show="ball.show">
                    <div class="inner inner-hook"></div>
                </div>
            </transition>
        </div>
        <cart-detail :selected-foods='selectedFoods' v-if="isShowDetail && selectedFoods.length"></cart-detail>
    </div>
</template>

<script type='text/ecmascript-6'>
    import eventBus from 'common/js/eventBus.vue'
    import cartDetail from 'components/cartDetail/cartDetail.vue'
    export default{
        props: ['seller', 'selectedFoods'],
        data  () {
            return {
                isShowDetail: false,
                balls       : [
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    }
                ],
                dropBalls   : []
            }
        },

        components: {
            'cartDetail': cartDetail
        },

        mounted(){
            eventBus.$on('setEmpty', this.closeDetail);
            eventBus.$on('closeDimmer', this.closeDetail);
            eventBus.$on('ball.add', this._drop);
        },

        beforeDestroy(){
            eventBus.$off('setEmpty', this.closeDetail);
            eventBus.$off('closeDimmer', this.closeDetail);
            eventBus.$off('ball.add', this._drop);
        },

        computed: {
            totalPrice(){
                let price = 0;
                this.selectedFoods.forEach((item) => {
                    price += item.price * item.count;
                });
                return price;
            },

            goodsNumber(){
                let number = 0;
                this.selectedFoods.forEach((item) => {
                    number += item.count;
                });
                return number;
            }
        },

        methods: {
            _drop(el){
                for (let i = 0; i < this.balls.length; i ++) {
                    let ball = this.balls[i];
                    if (! ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },

            beforeDrop(el){
                let count = this.balls.length;
                while (count --) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let DOMRect = ball.el.getBoundingClientRect();
                        let x = DOMRect.left - 32;
                        let y = - (window.innerHeight - DOMRect.top - 22);
                        $(el).css({
                            'display'        : '',
                            'transform'      : `translate3d(0,${y}px,0)`,
                            'webkitTransform': `translate3d(0,${y}px,0)`
                        });
                        let inner = $(el).find('.inner-hook');
                        $(inner).css({
                            'transform'      : `translate3d(${x}px,0,0)`,
                            'webkitTransform': `translate3d(${x}px,0,0)`
                        });
                    }
                }
            },

            dropping(el, done){
                let rf = el.offsetHeight;
                this.$nextTick(() => {
                    $(el).css({
                        'display'        : '',
                        'transform'      : 'translate3d(0,0,0)',
                        'webkitTransform': 'translate3d(0,0,0)'
                    });
                    let inner = $(el).find('.inner-hook');
                    $(inner).css({
                        'transform'      : 'translate3d(0,0,0)',
                        'webkitTransform': 'translate3d(0,0,0)'
                    });
                    $(el).on('transitionend', done);
                })

            },

            afterDrop(el){
                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                    $(el).css('display', 'none');

                }

            },

            openCartDetail() {
                if (! this.selectedFoods.length) {
                    return;
                }
                this.isShowDetail = ! this.isShowDetail;
            },

            closeDetail(){
                this.isShowDetail = false;
            }
        }
    }
</script>

<style scoped lang="less">
    .bottom-carts {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 96px;
        width: 100%;
        background: #141d27;
        display: flex;
        z-index: 200;
        .cart-left {
            flex: 1;
            font-size: 0;
            .cart-wrapper {
                display: inline-block;
                position: relative;
                left: 0;
                top: -26px;
                width: 100px;
                height: 100px;
                padding: 12px;
                margin: 0 24px;
                background: #141d27;
                border-radius: 50%;
                box-sizing: border-box;
                .cart {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: rgba(109, 114, 119, 0.2);
                    text-align: center;
                    .icon-shopping_cart {
                        height: 88px;
                        font-size: 48px;
                        color: rgba(255, 255, 255, 0.4);
                        line-height: 88px;
                    }
                    &.blue {
                        background: rgb(0, 140, 215);
                        .icon-shopping_cart {
                            color: white;
                        }
                    }
                }
                .goods-number {
                    position: absolute;
                    left: 54px;
                    top: 0;
                    width: 48px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    font-size: 18px;
                    background: red;
                    color: white;
                    border-radius: 30px;
                }
            }
            .price {
                display: inline-block;
                height: 48px;
                padding-right: 24px;
                font-size: 32px;
                color: rgba(255, 255, 255, 0.4);
                font-weight: 700;
                line-height: 48px;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                vertical-align: top;
                margin-top: 24px;
                &.white {
                    color: white;
                }
            }
            .delivery {
                display: inline-block;
                height: 96px;
                line-height: 96px;
                padding-left: 24px;
                font-size: 26px;
                color: rgba(255, 255, 255, 0.4);
                font-weight: 700;
                vertical-align: top;
            }
        }
        .cart-right {
            flex: 0 0 210px;
            width: 210px;
            .min-price, .clear {
                height: 96px;
                line-height: 96px;
                font-size: 24px;
                font-weight: 700;
                text-align: center;
            }
            .min-price {
                color: rgba(109, 114, 119, 0.4);
                background: rgba(109, 114, 119, 0.2);
            }
            .clear {
                color: white;
                background: rgb(64, 203, 77);
            }
        }
    }

    .ball-container {
        .ball {
            position: fixed;
            left: 64px;
            bottom: 44px;
            transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
            z-index: 200;
            .inner {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgb(0, 140, 215);
                transition: all 0.5s linear;
            }
        }
    }

</style>
