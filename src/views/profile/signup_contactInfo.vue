<template>
    <div id="signup" class="mt-12 w-full flex-col text-center">
        <h2>Sign up</h2>
        <div id="contact" class="mt-16 lg:w-1/2 py-2 flex-col justify-around text-2xl text-center mb-24">
            <div class="oauth justify-around w-5/6 md:w-96">
                <p class="text-center mt-8">{{soonMessage}}</p>
                <div class="oauthGoogle flex justify-around mt-2">
                    <button @click="showSoonMessage" style="background-color: white"
                        class="h-12 px-2 md:px-6 flex items-center hover:bg-main_secondary rounded-sm text-bg_primary">
                        <div id="icon" class="pr-4">
                            <svg class="svg-lg" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 46 46">
                                <defs>
                                    <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox"
                                        id="a">
                                        <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
                                        <feGaussianBlur stdDeviation=".5" in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1" />
                                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.168 0"
                                            in="shadowBlurOuter1" result="shadowMatrixOuter1" />
                                        <feOffset in="SourceAlpha" result="shadowOffsetOuter2" />
                                        <feGaussianBlur stdDeviation=".5" in="shadowOffsetOuter2"
                                            result="shadowBlurOuter2" />
                                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.084 0"
                                            in="shadowBlurOuter2" result="shadowMatrixOuter2" />
                                        <feMerge>
                                            <feMergeNode in="shadowMatrixOuter1" />
                                            <feMergeNode in="shadowMatrixOuter2" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    <rect id="b" x="0" y="0" width="40" height="40" rx="2" />
                                </defs>
                                <g fill="none" fill-rule="evenodd">
                                    <g transform="translate(3 3)" filter="url(#a)">
                                        <use fill="#FFF" xlink:href="#b" />
                                        <use xlink:href="#b" />
                                        <use xlink:href="#b" />
                                        <use xlink:href="#b" />
                                    </g>
                                    <path
                                        d="M31.6 23.2l-.1-1.8H23v3.4h4.8C27.6 26 27 27 26 27.6v2.2h3a8.8 8.8 0 002.6-6.6z"
                                        fill="#4285F4" />
                                    <path d="M23 32c2.4 0 4.5-.8 6-2.2l-3-2.2a5.4 5.4 0 01-8-2.9h-3V27a9 9 0 008 5z"
                                        fill="#34A853" />
                                    <path d="M18 24.7a5.4 5.4 0 010-3.4V19h-3a9 9 0 000 8l3-2.3z" fill="#FBBC05" />
                                    <path
                                        d="M23 17.6c1.3 0 2.5.4 3.4 1.3l2.6-2.6A9 9 0 0015 19l3 2.4a5.4 5.4 0 015-3.7z"
                                        fill="#EA4335" />
                                    <path d="M14 14h18v18H14V14z" />
                                </g>
                            </svg>

                        </div>
                        <p class="px-5">Sign In with Google</p>
                    </button>
                </div>
                <div class="oauthFacebook flex justify-around mt-4 mb-4">
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
            <div id="sendSignup" class="mt-4 px-12 px-24 text-2xl flex-col items-center">
                <input type="text" placeholder="Name" v-model="input.name"
                    class="mb-6 w-90 border-2 border-main_secondary text-bg_primary px-2 py-2">
                <input type="text" placeholder="Family Name" v-model="input.familyname"
                    class="mb-6 w-90 border-2 border-main_secondary text-bg_primary px-2 py-2">
                <input type="email" placeholder="Email" v-model="input.email"
                    class="mb-6 w-90 border-2 border-main_secondary text-bg_primary px-2 py-2">
                <input type="text" placeholder="Country" v-model="input.country"
                    class="mb-6 w-90 border-2 border-main_secondary text-bg_primary px-2 py-2">

                <input type="password" @change="checkPasswords" placeholder="Password" v-model="input.password"
                    class="mb-6 mt-8 w-90 border-2 border-main_secondary text-bg_primary px-2 py-2">
                <input @change="checkPasswords" type="password" placeholder="Confirm Password"
                    v-model="input.confirmPassword"
                    class="w-90 border-2 border-main_secondary text-bg_primary px-2 py-2">
                <p class="mt-4 text-xl">{{checkPasswordsText}}</p>
                <button @click="getNextPage()"
                    class="button mb-8 mt-10 bg-main_focus hover:bg-main_focus_active text-main_primary py-2 px-8 lg:px-8 rounded mx-2 cursor-pointer">Next</button>
            </div>
        </div>
    </div>
</template>
<script>
    import store from "../../store";
    import data_functions from "../../data/data_functions";
    export default {
        data() {
            return {
                input: {
                    name: "Peter",
                    familyname: "Dinklage",
                    email: "Peter.Dinklage@mail.com",
                    country: "USA",
                    activationCode: "",
                    password: "Peter1000",
                    confirmPassword: "Peter1000"
                },
                checkPasswordsText: "",
                soonMessage: ""
            }
        },
        computed: {
            soonMessageHandler() {
                return this.soonMessage;
            }
        },
        methods: {
            getNextPage() {
                if (this.input.email.length > 5 && this.input.email.includes("@") && this.input.email.includes(".") &&
                    this.input.password.length > 7 && this.input.name.length > 3) {
                    var profileObject = {
                        Name: this.input.name,
                        FamilyName: this.input.familyname,
                        Country: this.input.country,
                        Email: this.input.email,
                        Password: this.input.password
                    }
                    store.commit("updateProfile", profileObject);
                    store.commit("pushSignUpPageCode", 1);
                    this.$router.push({
                        name: 'signup',
                        params: {
                            page: 1
                        }
                    });
                }
            },
            sendRequest() {
                var profileObject = {
                    Name: this.input.name,
                    FamilyName: this.input.familyname,
                    Country: this.input.country,
                    Email: this.input.email,
                    Password: this.input.password
                }
                data_functions.create_user(profileObject);
            },
            checkPasswords() {
                if (this.input.password.length > 0 && this.input.password.length < 8) {
                    this.checkPasswordsText = "Password must be at least 8 characters long."
                } else {
                    if (this.input.password != this.input.confirmPassowrd) {
                        this.checkPasswordsText = "Both passwords must be the same."
                    } else {
                        this.checkPasswordsText = ""
                    }
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