<template>
    <div class="food-control">
        <transition name="fade">
            <div class="food-decrease" @click="removeFoods()" v-show="food.count>0">
                <i class="inner icon-remove_circle_outline"></i>
            </div>
        </transition>
        <div class="food-count" v-show="food.count>0">{{food.count}}</div>
        <div class="food-add icon-add_circle" @click="addFoods()"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props  : ['food'],
        data() {
            return {}
        },
        methods: {
            addFoods() {
                this.food.count ++;
            },
            removeFoods() {
                this.food.count --;
            }
        }
    }
</script>
<style scoped lang="less">
    .food-control {
        font-size: 0;

        .food-decrease {
            display: inline-block;
            opacity: 1;
            transform: translate3D(0);
            .inner {
                transform: rotate(0);
            }
            &.fade-enter-active, &.fade-leave-active {
                transition: all ease 0.4s;
                transform: translate3D(0, 0, 0);
                .inner {
                    transition: all ease 0.4s;
                }
            }
            &.fade-enter, &.fade-leave-to {
                opacity: 0;
                transform: translate3D(45px, 0, 0);
                .inner {
                    transform: rotate(180deg);
                }
            }

        }
        .food-add, .icon-remove_circle_outline {
            display: inline-block;
            font-size: 48px;
            color: rgb(0, 160, 200);
            line-height: 48px;
        }
        .food-count {
            display: inline-block;
            width: 48px;
            line-height: 48px;
            font-size: 20px;
            vertical-align: top;
            text-align: center;
        }
    }
</style>