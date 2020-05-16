<template>
    <div id="payment"></div>
</template>
<script>
    import store from "../../store";
    export default {
        data() {
            return {

            }
        },
        mounted() {
            if (store.state.signupPageCode != 2) {
                this.$router.push({
                    name: 'signup',
                    params: {
                        page: 0
                    }
                });
            }
        }
    }
</script>