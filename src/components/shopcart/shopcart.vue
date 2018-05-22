<template>
    <div class="bottom-carts">
        <div class="cart-left">
            <div class="cart-wrapper">
                <div class="cart">
                    <i class="icon-shopping_cart"></i>
                </div>
            </div>
            <div class="price">
                ￥{{price}}
            </div>
            <div class="delivery">另需配送费￥{{seller.deliveryPrice}}元</div>
        </div>
        <div class="cart-right">
            <div class="min-price">￥{{seller.minPrice}}起送</div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
	export default{
		props: ['seller'],
		data  () {
			return {
				price: 0
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
            background: rgba(109, 114, 119, 0.2);
            .min-price {
                height: 96px;
                line-height: 96px;
                font-size: 24px;
                color: rgba(109, 114, 119, 0.4);
                font-weight: 700;
                text-align: center;
            }
        }
    }

</style>
