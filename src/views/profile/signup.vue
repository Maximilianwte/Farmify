<template>
    <div id="sign" class="px-4 flex-col justify-around text-3xl">
        <div id="process" class="mt-32 flex text-center">
            <div id="first" class="px-4 w-32 flex-col">
                <p class="px-6 py-2 rounded-full border-2">1</p>
                <h6 class="mt-2 px-3 text-xl">Signup</h6>
            </div>
            <div class="arrow mt-8 px-1 md:px-4">
                <svg class="svg-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
                    <path
                        d="M382.7 226.8l-219-219c-5-5-11.8-7.8-19-7.8s-14 2.8-19 7.9l-16.2 16a27 27 0 000 38.1L293.4 246l-184 184a26.8 26.8 0 000 38l16 16.2a26.9 26.9 0 0038 0L382.8 265c5-5 7.8-11.9 7.8-19 0-7.3-2.7-14.1-7.8-19.2z" />
                </svg>
            </div>
            <div id="second" class="px-4">
                <p class="px-6 py-2 rounded-full flex-col border-2">2</p>
                <h6 class="mt-2 text-xl">Payment</h6>
                <div class="container mt-2 w-49 flex justify-around">
                    <a href="#payment">
                        <svg class="svg-mds" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <circle cx="256" cy="378.5" r="25" />
                            <path
                                d="M256 0A255.9 255.9 0 000 256c0 141.5 114.5 256 256 256s256-114.5 256-256S397.5 0 256 0zm0 472c-119.4 0-216-96.6-216-216S136.6 40 256 40s216 96.6 216 216-96.6 216-216 216z" />
                            <path
                                d="M256 128.5a80 80 0 00-80 80 20 20 0 1040 0 40 40 0 1140 40c-11 0-20 9-20 20v50a20 20 0 1040 0V286a80.1 80.1 0 00-20-157.5z" />
                        </svg>
                    </a>
                </div>
            </div>
            <div class="arrow mt-8 px-1 md:px-4">
                <svg class="svg-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
                    <path
                        d="M382.7 226.8l-219-219c-5-5-11.8-7.8-19-7.8s-14 2.8-19 7.9l-16.2 16a27 27 0 000 38.1L293.4 246l-184 184a26.8 26.8 0 000 38l16 16.2a26.9 26.9 0 0038 0L382.8 265c5-5 7.8-11.9 7.8-19 0-7.3-2.7-14.1-7.8-19.2z" />
                </svg>
            </div>
            <div id="third" class="px-4">
                <p class="px-6 py-2 rounded-full flex-col border-2">3</p>
                <h6 class="mt-2 text-xl">Use</h6>
            </div>
        </div>

        <signup_contactInfo v-if="this.page == 0"/>
        <signup_groups v-if="this.page == 1"/>

        <div id="payment" class="text-center mb-24 flex-col">
            <h4>Payment</h4>
            <div class="container mt-8 text-xl w-full lg:w-5/6 flex-col items-start md:flex-row">
                <div class="left w-4/5 md:w-1/2 md:px-4 flex text-justify">
                    <div class="svg px-4 md:px-8 mt-2">
                        <svg class="svg-xl" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M456.8 0H338.4c-26 0-60.8 14.4-79.2 32.8l-243 243a54.8 54.8 0 00-16.2 39c0 14.8 5.7 28.7 16.1 39l142 142a54.8 54.8 0 0039 16.2c14.8 0 28.6-5.7 39-16.1l243.1-243a126.7 126.7 0 0032.8-79.3V55.2A55.2 55.2 0 00456.8 0zM482 173.6c0 18.1-11.2 45.2-24 58l-243 243c-4.8 4.8-11.1 7.4-17.9 7.4s-13-2.6-17.8-7.3l-142-142a25 25 0 01-7.3-17.8 25 25 0 017.3-17.8l243-243a97.4 97.4 0 0158-24.1h118.5A25.2 25.2 0 01482 55.2zm0 0" />
                            <path
                                d="M139.3 331.5c-5.4-5.5-4-13.4 4-21.6 9.6-9.5 16.6-7.8 20-11.4 4.2-4 .8-11-1.8-13.7-7.5-7.5-24 5.8-30.7 12.5-13 13-21.8 33.4-4.9 50.3 27 27 58.2-14.7 75.2 2.3 6.8 6.8 4 15.8-2.8 22.6-11.6 11.6-23.4 6-28 10.6-3.6 3.5-1.8 11.2 1.4 14.4 6.6 6.6 25.4 2.7 40.3-12.2 15.7-15.6 18.7-35.4 2.4-51.6-29.4-29.5-61 11.9-75-2.2zm0 0M298.1 282.6l-93.4-49.5c-4.4-2.4-10.2.2-14.5 4.6-4.2 4.2-6.8 10-4.4 14.4l49.5 93.4c.3.5.7 1.1 1 1.3 3.6 3.7 11.4.8 15.4-3.1 2.5-2.5 3.6-5.3 2-8L243 316.3l26-26 19.5 10.8c2.7 1.5 5.4.4 8-2 3.9-4 6.6-12 3.1-15.5-.3-.4-.8-.6-1.4-1zm-63.7 19l-25-44.7 44.8 25zm0 0M343 226.4l-27.7 27.7-65.6-65.5c-3.2-3.2-8.3-.8-11.9 2.8-3.7 3.8-6 8.8-2.8 12l73.8 73.8c3 3 7.8 1.5 11.1-1.8l36-36c3-3 1.2-7.8-2-11-3.3-3.2-8-5-10.9-2zm0 0M402.4 167L370.3 199l-22.9-22.8 17.3-17.3c3.2-3.1 1.6-7.7-1-10.3-3-3-7.6-4.2-10.6-1.2l-17.3 17.2-22.7-22.7 32.2-32.2c3-3 1.6-7.7-2-11.2-3-3-7.8-4.9-11-1.7L292 137.3c-3.3 3.3-5 8.1-1.8 11.2l73.7 73.7c3 3 7.8 1.5 11.1-1.8l40.5-40.5c3.2-3.1 1.3-8-1.7-11-3.5-3.5-8.3-4.9-11.3-2zm0 0M417.5 80.4a15.1 15.1 0 00-15 15 15 15 0 0015 15 15 15 0 0015-15 15 15 0 00-15-15zm0 0" />
                        </svg>
                    </div>
                    <h4 class="">We want to keep things simple! We're charging you a low membership fee of 19.99 $AUD to
                        cover our
                        database costs and finding all the relevant data.</h4>
                </div>
                <div class="right w-4/5 md:w-1/2 md:px-4 mt-8 md:mt-0 flex text-justify">
                    <div class="svg px-4 md:px-8 mt-2">
                        <svg class="svg-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508 508">
                            <path
                                d="M49.2 225.5h81.9v16.4H49.2zM49.2 274.7h122.9v16.4H49.2zM49.2 323.9h295v16.4h-295zM49.2 373h49.2v16.4H49.2zM131.1 373h49.2v16.4h-49.2zM213.1 373h49.2v16.4h-49.2zM336 217.3c-6 0-11.5 1.7-16.3 4.5a32.7 32.7 0 00-49.3 28.3 32.8 32.8 0 0049.3 28.3 32.8 32.8 0 1016.3-61.1zm-28.6 48.6a16.5 16.5 0 01-20.6-15.8 16.5 16.5 0 0120.6-15.8 32.4 32.4 0 000 31.6zm28.6.6c-9 0-16.4-7.4-16.4-16.4 0-9 7.4-16.4 16.4-16.4s16.4 7.4 16.4 16.4c0 9-7.4 16.4-16.4 16.4z" />
                            <path
                                d="M490.9 179.4L147.1 70.8c-2.4-.8-21.6-7.1-30.8 16L88 176.3H24.6A24.7 24.7 0 000 200.9v213c0 13.7 11 24.7 24.6 24.7h360.6c8.6 0 16.1-4.4 20.5-11.1 0 0 11.1 3 13.6 3 10.8 0 20.2-6.8 23.4-17.1l64.2-203.2c2-6.2 3.4-25.6-16-30.8zM122 123l168.9 53.3H182l-69.9-22.1L122 123zm-14.8 46.9l20.5 6.5h-22.5l2-6.5zm286.2 244h-.1c0 4.6-3.7 8.3-8.2 8.3H24.6a8.2 8.2 0 01-8.2-8.2V200.9c0-4.5 3.7-8.2 8.2-8.2h360.6c4.5 0 8.2 3.7 8.2 8.2v213zm33.7-5.4a8.3 8.3 0 01-10.3 5.3l-7.1-2.2V265.5l56.9 18-39.5 125zm44.4-140.7l-61.8-19.5v-34.4l71.7 22.6-9.9 31.3zm19.8-62.5l-4.9 15.6-77.1-24.3a24.6 24.6 0 00-24.1-20.2h-39.9l-218.4-69 4.9-15.6c1.3-4.2 6-6.7 10.3-5.3L485.9 195c6.9 1.8 6 8.2 5.4 10.3z" />
                        </svg>
                    </div>
                    <h4 class="">Our supported payment methods right now are Credit Card & Paypal. We try to add new
                        methods soon.</h4>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import data_functions from "../../data/data_functions";
    import signup_contactInfo from "./signup_contactInfo";
    import signup_groups from "./signup_groups";
    export default {
        props: ['page'],
        components: {
            signup_contactInfo,
            signup_groups
        },
        data() {
            return {
                activePage: this.page,
            }
        },
        computed: {
            soonMessageHandler() {
                return this.soonMessage;
            }
        }
    }
</script>