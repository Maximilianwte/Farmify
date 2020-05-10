<template>
    <div :class="[getHidden, getType]" :style="getMargin"
        class="tooltip absolute text-center text-lg bg-main_secondary text-bg_primary">
        <h4>{{getText}}</h4>
        <div class="arrow-downSignupAlert mt-2 ml-12 absolute"></div>
    </div>
</template>
<script>
    export default {
        props: ['type', 'active', 'info'],
        data() {
            return {
                topMargin: -100,
                leftMargin: 20,
            }
        },
        computed: {
            getText() {
                switch (this.info) {
                    case 'signup': return "To use this feature you should signup"
                    case 'save': return "Your saved farms get stored in the database after login"
                }
            },
            getHidden() {
                if (this.active != false) {
                    return 'block'
                } else {
                    return 'hidden'
                }
            },
            getMargin() {
                if (this.info == 'save') {
                    return 'margin-left: -65px; margin-top: -155px'
                }
                else if (this.type == 'round') {
                    return 'margin-left: -50px; margin-top: -130px'
                } else if (this.type == 'square') {
                    return 'margin-left: -50px; margin-top: -130px'
                }
            },
            getType() {
                if (this.type == 'round') {
                    return 'w-40 rounded-full px-4 py-2'
                }
                else if (this.type == 'square') {
                    return 'w-40 rounded-sm px-4 py-2'
                }
            }
        }
    }
</script>