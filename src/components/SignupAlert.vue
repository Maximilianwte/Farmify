<template>
    <div id="signupAlert" :style="['margin-left: ' + leftMargin + 'px', 'margin-top: ' + topMargin + 'px']"
        class="absolute w-40 text-center text-lg bg-main_secondary text-bg_primary rounded-sm px-4 py-2">
        <h4>To use this feature you should signup.</h4>
        <div class="arrow-downSignupAlert mt-2 ml-12 absolute"></div>
    </div>
</template>
<script>
    export default {
        props: ['type'],
        data() {
            return {
                topMargin: -100,
                leftMargin: 20
            }
        },
        mounted() {
            if (type == 'roundButton') {
                this.topMargin = -20;
                this.leftMargin = 0;
            }
            else if (type == 'easyApply') {
                this.topMargin = -84;
                this.leftMargin = -10;
            }
        }
    }
</script>