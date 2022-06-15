<template>
    <div class="home">
        <transition name="fade">
            <p id="back-top" v-if="backTopFlag" @click="scollTo(0)">
                <rocket-outlined />
            </p>
        </transition>
    </div>
</template>

<script>
    import { RocketOutlined } from '@ant-design/icons-vue';
    export default {
        name: "home",
        components: {
            RocketOutlined,
        },
        data() {
            return {
                offsetTop: 0,
                offsetHeight: 0,
                scrollTop: 0,
                opacity: 0,
                timer: null,
                speed: 0.2,
                backTopFlag: false
            };
        },
        mounted() {
            window.addEventListener('scroll', this.getScroll);
            this.$nextTick(() => {
                // 吸顶元素到top的距离
                this.offsetTop = header.offsetTop;
                // 元素自身的高度
                this.offsetHeight = header.offsetHeight;

                // 监听滚动条
                window.addEventListener("scroll", this.handleScroll);
            });
        },
        unmounted() {
            window.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener('scroll', this.getScroll);
        },
        watch: {
            'scrollTop': {
                handler(value) {
                    if (value > 100 && this.backTopFlag === false) {
                        this.backTopFlag = true
                    } else if (value <= 100 && this.backTopFlag === true) {
                        this.backTopFlag = false
                    }
                }
            }
        },
        methods: {
            handleScroll() {
                // 得到页面滚动的距离，兼容写法
                let scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                // 判断页面滚动的距离是否大于吸顶元素的位置
                this.headerFixed = scrollTop > this.offsetTop - this.offsetHeight;
            },
            // top
            // 每次屏幕滚动时为scrollTop赋新值
            getScroll() {
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            },
            // 实现平滑滚动到固定位置
            scollTo(offset) {
                window.scrollTo({top: offset, behavior: 'smooth'})
            },
        }
    };
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    .issFixed {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        z-index: 4;
    }

    .header-bg {
        font-size: 30px;
        background-color: yellowgreen;
    }

    #back-top span {
        cursor: pointer;
        height: 50px;
        margin: -125px 0 0;
        overflow: hidden;
        padding: 0;
        position: fixed;
        right: 50px;
        bottom: 50px;
        width: 50px;
        z-index: 11;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 1);
        border-radius: 50%;
        display: flex;
        opacity: 0.8;
        justify-content: center;
        align-items: center;
        /*background: url('../assets/about/rocket.png') no-repeat;*/
    }

    #back-top:hover span {
        opacity: 1;
    }

    .el-icon-arrow-up {
        color: cornflowerblue;
        font-size: 40px;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 1s;
    }

    .fade-leave-to {
        opacity: 0;
    }

    .fade-leave-active {
        transition: opacity 1s;
    }



</style>
