<template>
    <div id="mobileMenu" class="w-full h-screen text-main_primary bg-bg_primary">
        <div class="container text-4xl flex-col justify-around text-center w-full h-full">
            <div id="Navigation">
                <button v-on:click="toggleTheme" class="px-4 mb-4">Dark Mode</button>
                <router-link to="/">
                    <h6 class="px-4 mb-4">Home</h6>
                </router-link>
                <router-link class="mb-4" v-if="getAuth == true" to="/profile">
                    <h6 class="px-4 mb-4">Profile</h6>
                </router-link>
                <router-link to="/map">
                    <h6 class="px-4 mb-4">Map</h6>
                </router-link>
                <router-link to="/database">
                    <h6 class="px-4 mb-4">Database</h6>
                </router-link>
                <router-link to="/saved">
                    <h6 class="px-4 mb-4">Saved Farms</h6>
                </router-link>
                <router-link v-if="getAuth == false" to="/signin">
                    <h6 class="px-4 mb-4 border-2 rounded-sm">Signin</h6>
                </router-link>
                <button v-if="getAuth == true" @click="tryLogout">
                    <h6 class="px-4 mb-4">Signout</h6>
                </button>
            </div>
        </div>

    </div>
</template>
<script>
    import store from "../store";
    export default {
        name: "MobileMenue",
        data() {
            return {

            }
        },
        methods: {
            toggleTheme() {
                store.commit("toggleTheme");
            },
            tryLogin() {
                store.commit("setAuth", true);
            },
            tryLogout() {
                store.commit("setAuth", false);
            }
        },
        computed: {
            getAuth() {
                return store.state.auth
            }
        }
    }
</script>