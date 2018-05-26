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
                isShowDetail: false
            }
        },

        components: {
            'cartDetail': cartDetail
        },

        mounted(){
            eventBus.$on('test', () => {
                this.isShowDetail = false;
            });
            eventBus.$on('closeDimmer', () => {
                this.isShowDetail = false;
            });
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
            openCartDetail() {
                if (! this.selectedFoods.length) {
                    return;
                }
                this.isShowDetail = ! this.isShowDetail;
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
        z-index: 20;
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

</style>
