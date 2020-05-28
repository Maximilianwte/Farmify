<template>
    <div id="sign" class="px-4 flex-col justify-around items-center text-xl">
        <div id="signin" class="w-full mt-40 mb-16 flex-col justify-around lg:w-4/5">
            <h1 class="text-3xl">Sign in</h1>
            <div class="oauth justify-around text-button_text w-5/6 md:w-96">
                <p class="text-center mt-8">{{soonMessage}}</p>
                <div class="oauthGoogle flex justify-around mt-2">
                    <button @click="showSoonMessage" style="background-color: white"
                        class="h-12 px-4 md:px-8 flex items-center hover:bg-main_secondary rounded-sm text-dark">
                        <div id="icon" class="pr-4">
                            <svg class="svg-md" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg"><path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/><path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/><path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/><path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"/></svg>
                        </div>
                        <p class="px-5">Sign In with Google</p>
                    </button>
                </div>
                <div class="oauthFacebook flex justify-around mt-4 mb-4 text-light">
                    <button @click="showSoonMessage" style="background-color: #3B5998"
                        class="h-12 px-2 md:px-6 flex items-center rounded-sm">
                        <div id="icon" class="pr-4">
                            <svg class="svg-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 266.9 266.9">
                                <path fill="#3C5A99"
                                    d="M248 262.3c8 0 14.3-6.4 14.3-14.2V18.8c0-7.8-6.4-14.2-14.2-14.2H18.8C11 4.6 4.6 11 4.6 18.8v229.3c0 7.8 6.4 14.2 14.2 14.2h229.3z" />
                                <path fill="#FFF"
                                    d="M182.4 262.3v-99.8H216l5-38.9h-38.5V98.8c0-11.3 3.1-19 19.3-19h20.6V45c-3.6-.4-15.8-1.5-30-1.5-29.7 0-50 18.1-50 51.4v28.7h-33.6v38.9h33.5v99.8h40.2z" />
                            </svg>
                        </div>
                        <p class="px-5">Sign In with Facebook</p>
                    </button>
                </div>
            </div>
            <div id="sendSignin" class="mt-4 w-5/6 text-dark md:w-90">
                <input type="email" placeholder="Email" v-model="input.email"
                    class="mb-6 w-full border-2 border-main_secondary px-2 py-2">
                <input type="password" placeholder="Password" v-model="input.password"
                    class="mb-6 w-full border-2 border-main_secondary px-2 py-2">
                <div @click="pushSendSignin"
                    class="button text-center bg-main_focus hover:bg-main_focus_active text-light py-2 px-8 lg:px-8 rounded mx-2 cursor-pointer">
                    <p>Signin</p>
                </div>
                <div id="forgot" class="text-sm flex-col mt-4 text-bg_secondary">
                    <router-link to="/forgot" class="button cursor-pointer">
                        Forgot Password</router-link>
                </div>
            </div>
        </div>
        <div id="signup" class="w-full mb-24 flex-col text-center justify-around">
            <h2>Haven't got an account yet? Sign up here:</h2>
            <router-link :to="{name: 'signup', params: { page: 0 }}"
                class="mt-8 button text-center border-4 border-main_focus hover:border-main_focus_active text-main_focus hover:text-main_focus_active py-2 px-12 lg:px-24 rounded mx-2 cursor-pointer">
                Signup</router-link>
        </div>
    </div>
</template>
<script>
    import store from "../../store";
    import data_functions from "../../data/data_functions";
    import cookie_functions from "../../data/cookie_functions";
    export default {
        data() {
            return {
                input: {
                    email: "Peter.Dinklage@mail.com",
                    password: "Peter10000"
                },
                soonMessage: ""
            }
        },
        computed: {
            soonMessageHandler() {
                return this.soonMessage;
            }
        },
        methods: {
            pushSendSignin() {
                var reqObject = {
                    Email: this.input.email,
                    Password: this.input.password
                }

                if (reqObject.Email.length > 5 && reqObject.Email.includes("@") && reqObject.Email.includes(".") &&
                    reqObject.Password.length > 7) {
                    data_functions.send_login(reqObject).then(profile => {
                        store.commit("updateProfile", profile);

                        if (store.state.cookies.accepted == true) {
                            cookie_functions.setCookie("email", reqObject.Email, 5);
                            cookie_functions.setCookie("password", reqObject.Password, 5);
                        }

                        this.$router.push({
                            path: '/'
                        });
                        store.commit("setAuth", true);
                    })
                }
            },
            showSoonMessage() {
                if (this.soonMessage == "") {
                    this.soonMessage = "Awesome. We are testing the feature right now. We'll release it very soon."
                } else {
                    this.soonMessage = "";
                }
            }
        }
    }
</script>