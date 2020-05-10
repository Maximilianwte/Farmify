<template>
    <div id="Navigation">
        <div id="mobile" title="Menu" class="block z-20 md:hidden">
            <button @click="pushMenu">
                <svg xmlns="http://www.w3.org/2000/svg" class="svg-lg" viewBox="0 0 512 512">
                    <path
                        d="M176.8 0H59.2A59.3 59.3 0 000 59.2v117.6A59.3 59.3 0 0059.2 236h117.6a59.3 59.3 0 0059.2-59.2V59.2A59.3 59.3 0 00176.8 0zM196 176.8c0 10.6-8.6 19.2-19.2 19.2H59.2A19.2 19.2 0 0140 176.8V59.2C40 48.6 48.6 40 59.2 40h117.6c10.6 0 19.2 8.6 19.2 19.2v117.6zM452 0H336c-33 0-60 27-60 60v116c0 33 27 60 60 60h116c33 0 60-27 60-60V60c0-33-27-60-60-60zm20 176c0 11-9 20-20 20H336c-11 0-20-9-20-20V60c0-11 9-20 20-20h116c11 0 20 9 20 20v116zM176.8 276H59.2A59.3 59.3 0 000 335.2v117.6A59.3 59.3 0 0059.2 512h117.6a59.3 59.3 0 0059.2-59.2V335.2a59.3 59.3 0 00-59.2-59.2zM196 452.8c0 10.6-8.6 19.2-19.2 19.2H59.2A19.2 19.2 0 0140 452.8V335.2c0-10.6 8.6-19.2 19.2-19.2h117.6c10.6 0 19.2 8.6 19.2 19.2v117.6zM452 276H336c-33 0-60 27-60 60v116c0 33 27 60 60 60h116c33 0 60-27 60-60V336c0-33-27-60-60-60zm20 176c0 11-9 20-20 20H336c-11 0-20-9-20-20V336c0-11 9-20 20-20h116c11 0 20 9 20 20v116z" />
                </svg>
            </button>
        </div>
        <div id="desktop" class="hidden md:flex px-4 h-12 items-center cursor-pointer text-2xl">
            <router-link v-if="getAuth == true" to="/profile">
            <div id="Initials" v-if="profile.Name != ''"><h6 class="text-sm rounded-full border-2 w-12 h-12 flex-col justify-center mx-4">{{profile.Name[0] + profile.FamilyName[0]}}</h6></div>
            </router-link>
            <router-link to="/map">
                <h6 class="px-4">Map</h6>
            </router-link>
            <router-link to="/database">
                <h6 class="px-4">Database</h6>
            </router-link>
            <router-link to="/saved">
                <h6 class="px-4">Saved Farms</h6>
            </router-link>
            <router-link v-if="getAuth == false" to="/signin">
                <h6 class="px-2 border-2 rounded-sm ml-2 mr-6">Signin</h6>
            </router-link>
            <button v-if="getAuth == true" @click="tryLogout">
                <h6 class="px-4">Signout</h6>
            </button>
            <button class="svg" title="Dark Mode" v-on:click="toggleTheme"><svg data-name="Ebene 1" class="svg-sm"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226 226">
                    <circle cx="113" cy="113" r="113" />
                </svg>

            </button>
        </div>
    </div>
</template>
<script>
    import store from "../store";

    export default {
        data() {
            return {
                profile: store.state.profile.data
            }
        },
        methods: {
            toggleTheme() {
                store.commit("toggleTheme");
            },
            pushMenu() {
                if (this.$router.currentRoute.path == "/menu") {
                    this.$router.go(-1);
                }
                else {
                    this.$router.push({
                        path: '/menu'
                    });
                } 
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