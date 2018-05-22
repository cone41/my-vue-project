<template>
    <div class="star" :class="starSize">
        <span v-for="itemClass in itemClasses" class="items" track-by='$index' :class="itemClass"></span>
    </div>
</template>

<script type='text/ecmascript-6'>
	const LEN = 5;
	const CLS_ON = 'on';
	const CLS_OFF = 'off';
	const CLS_HALF = 'half';
	export default {
		props: ['size', 'score'],
		data () {
			return {}
		},
		computed: {
			starSize () {
				return 'star' + this.size
			},

			itemClasses () {
				let arrStar = [];
				let A = Math.floor(this.score * 2) / 2;
				let ISINTEGER = this.score % 1 >= 0.5;
				for (var i = 1; i <= Math.floor(A); i++) {
					arrStar.push(CLS_ON);
				}
				if (ISINTEGER) {
					arrStar.push(CLS_HALF);
				}
				while (arrStar.length < LEN) {
					arrStar.push(CLS_OFF);
				}
				return arrStar;

			}
		}

	}
</script>

<style scoped lang="less">
    .star48 {
        .items {
            width: 40px;
            height: 38px;
            display: inline-block;
            margin-right: 44px;
            &:last-child {
                margin-right: 0px;
            }
            &.on {
                background: url("star48_on@2x.png") no-repeat;
                background-size: cover;
            }
            &.off {
                background: url("star48_off@2x.png") no-repeat;
                background-size: cover;
            }
            &.half {
                background: url("star48_half@2x.png") no-repeat;
                background-size: cover;
            }
        }
    }
    .star36 {
        .items {
            width: 30px;
            height: 29px;
            display: inline-block;
            margin-right: 12px;
            &:last-child {
                margin-right: 0px;
            }
            &.on {
                background: url("star36_on@2x.png") no-repeat;
                background-size: cover;
            }
            &.off {
                background: url("star36_off@2x.png") no-repeat;
                background-size: cover;
            }
            &.half {
                background: url("star36_half@2x.png") no-repeat;
                background-size: cover;
            }
        }
    }
    .star24 {
        .items {
            width: 20px;
            height: 19px;
            display: inline-block;
            margin-right: 6px;
            &:last-child {
                margin-right: 0px;
            }
            &.on {
                background: url("star24_on@2x.png") no-repeat;
                background-size: cover;
            }
            &.off {
                background: url("star24_off@2x.png") no-repeat;
                background-size: cover;
            }
            &.half {
                background: url("star24_half@2x.png") no-repeat;
                background-size: cover;
            }
        }

    }

</style>