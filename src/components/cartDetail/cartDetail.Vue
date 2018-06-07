<template>
    <transition name="fade">
        <div class="cart-detail-wrapper" @click="closeDimmer()">
            <div class="cart-detail">
                <div class="header">
                    <span class="title">购物车</span>
                    <span class="empty clear-fix" @click="setEmpty()">清空</span>
                </div>
                <div ref="listWrapper" class="listWrapper" @click="stopProp($event)">
                    <ul class="foods-list">
                        <li class="food-item" v-for="item in selectedFoods">
                            <span class="food-name">{{item.name}}</span>
                            <span class="food-price">￥{{item.price * item.count}}</span>
                            <span class="food-count">
                                <cartControl :food="item"></cartControl>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>

</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import cartControl from 'components/cartControl/cartControl.vue'
    import eventBus from 'common/js/eventBus.vue'
    export default {
        props: ['selectedFoods'],
        data(){
            return {}
        },

        mounted(){
            this.$nextTick(() => {
                this.listScroll = new BScroll(this.$refs.listWrapper, {
                    click: true
                });
            });
        },

        components: {
            'cartControl': cartControl,
        },

        methods: {
            stopProp(e){
                e.stopPropagation();
            },

            setEmpty() {
                eventBus.$emit('setEmpty', '11111');
            },

            closeDimmer() {
                eventBus.$emit('closeDimmer', '11111');
            }
        }

    }
</script>
<style scoped lang="less">
    .cart-detail-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.6);
        backdrop-filter: blur(10px);
        z-index: 150;
        transition: all ease 0.4s;
        &.fade-enter-active, &.fade-leave-active {
            transition: opacity .4s;
            .cart-detail {
                transform: translate(0, 0, 0);
            }
        }
        &.fade-enter, &.fade-leave-to {
            opacity: 0;
            .cart-detail {
                transform: translate(0, 180px);
            }
        }
        .cart-detail {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 611px;
            background: white;
            transition: all ease 0.4s;
            .header {
                height: 80px;
                line-height: 80px;
                padding: 0 36px;
                background: #f3f5f7;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .empty {
                    float: right;
                }
            }
            .listWrapper {
                height: 415px;
                overflow: hidden;
            }
            .foods-list {
                margin: 0 36px;
                .food-item {
                    position: relative;
                    height: 96px;
                    line-height: 96px;
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                    display: flex;
                    font-size: 0;
                    .food-name {
                        display: inline-block;
                        flex: 1;
                        font-size: 28px;
                        color: rgb(7, 17, 27);
                    }
                    .food-price {
                        display: inline-block;
                        flex: 0 0 120px;
                        width: 120px;
                        padding: 0 24px 0 36px;
                        box-sizing: border-box;
                        color: rgb(240, 20, 20);
                        font-weight: 700;
                        font-size: 28px;
                    }
                    .food-count {
                        display: inline-block;
                        flex: 0 0 150px;
                        width: 150px;
                        padding-top: 24px;
                    }
                }
            }
        }
    }
</style>