<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="tab">
            <router-link class='tab-item' to="/goods">商品</router-link>
            <router-link class='tab-item' to="/ratings">评价</router-link>
            <router-link class='tab-item' to="/seller">商家</router-link>
        </div>
        <router-view :seller="seller"></router-view>
    </div>
</template>

<script type='text/ecmascript-6'>
    import data from './../data.json'

    import header from 'components/header/header.vue'
    const ERR_NUM = 0;
    export default {
        data () {
            return {
                seller: {}
            }
        },
        mounted () {
            //            console.log(data);
            //            this.seller = data.seller;
            this.$http.get('/api/seller').then((response) => {
                response = response.body;
                if (response.errno === ERR_NUM) {
                    this.seller = response.data;
                }
            }, (response) => {
                console.log(response)
            })
        },
        components: {
            'v-header': header,
        },
        methods   : {},
        name      : 'App'
    }
</script>

<style scoped lang="less">
    @import "common/less/common";

    #app {
        .tab {
            clear: both;
            display: flex;
            width: 100%;
            background: white;
            .mixify(rgba(7, 17, 27, 0.2));
            z-index: 100;
            .tab-item {
                flex: 1;
                text-align: center;
                height: 80px;
                line-height: 80px;
                font-size: 28px;
                color: rgb(77, 85, 93);
            }
            .active {
                color: rgb(240, 20, 20);
            }
        }
    }
</style>
