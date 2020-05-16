<template>
    <div v-if="active" id="EasyApply"
        class="flex-col text-2xl absolute mt-24 px-12 bg-bg_primary border-2 border-main_primary rounded-sm ml-4 mr-4 md:mx-0 w-full md:w-128"
        style="z-index: 200">
        <div @click="active = false"
            class="close absolute top-0 right-0 mt-2 mr-2 pb-1 h-10 w-10 flex justify-center items-center bg-main_focus hover:bg-main_focus_active rounded-full">
            x</div>
        <h5 class="mt-12 text-3xl">Easy Apply</h5>
        <div class="icons flex mt-6 mb-4">
            <svg class="svg-xl px-2" viewBox="0 0 480.1 480.1" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M402 424.8v47.3a8 8 0 01-16 0v-47.3a66.5 66.5 0 00-66.5-66.6 49.1 49.1 0 01-42.3-23.7 8 8 0 1113.7-8.3c6 10 16.8 16 28.6 16 45.6 0 82.5 37 82.5 82.6zm-139.6-80.2a8 8 0 01-6 9.5c-21.1 4.6-42.6 0-59.6-11.6-16.9 18-39.2 15.7-36.2 15.7A66.5 66.5 0 0094 424.8v47.3a8 8 0 01-16 0v-47.3c0-45.6 37-82.6 82.6-82.6A33.4 33.4 0 00194 309v-2.1a107.2 107.2 0 01-60.9-92.7 32.6 32.6 0 01-25-31.6V141c-.5-20.2 2.5-71 39.6-106.8C193.5-10 266.9-7.1 320.8 18.8a8 8 0 011.7 13.4 108 108 0 0166.1 47.5c.8 1.2 2.2 3.2 1.8 6.3a8 8 0 01-2.2 5 52.2 52.2 0 00-15.2 37v54.5a8 8 0 01-16 0V128c0-16 5.5-31.3 15.6-43.5a92.4 92.4 0 00-66.4-39l-14-1.5c-8.2-.9-9.9-12.2-2.2-15.3l6.4-2.7C213-3 124 29.3 124 141v41.5c0 6.4 3.7 11.9 9 14.7v-51.9a56 56 0 0156-56h102a56 56 0 0156 56v65.5c0 69.6-68 122.4-137.1 102a49 49 0 01-4.2 16.4 60.6 60.6 0 0047.2 9.3 8 8 0 019.5 6.1zM240 301.2c50.2 0 91-40.8 91-91v-65c0-22-18-39.9-40-39.9H189c-22 0-40 18-40 40v64.9c0 50.2 40.9 91 91 91zM321 439h-24a8 8 0 000 16h24a8 8 0 000-16z" />
            </svg>
            <svg class="svg-xl px-2" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M402 424.7V472a8 8 0 01-16 0v-47.3a66.5 66.5 0 00-66.6-66.6 49.1 49.1 0 01-42.2-23.7 8 8 0 1113.7-8.3c6 10 16.8 16 28.5 16 45.7 0 82.6 37 82.6 82.6zm23.5-147c8-11.9 7.4-27.4-1.7-38.6l-15.4-18.9c-3.4-4.2-4.6-9.9-3-15.1l9-30a32.5 32.5 0 00-13-36.5l-18-12.1c-6-4-8.9-11.4-7-18.2a33 33 0 00-30.7-41.5l-8-.3a29 29 0 01-27.5-23.1l-.6-2.8a33.2 33.2 0 00-48.8-22A17.5 17.5 0 01240 16l-6.6-6.5a33.5 33.5 0 00-46.7 0L172 23.7c-2.5 2.5-5.7 4.1-9.3 4.7l-30.2 5a43 43 0 00-34.9 53.8l6 21.3c1.8 6.7-1 13.9-6.8 17.9l-18.3 12.3a32.2 32.2 0 00-13 36.1l9 30.4c1.6 5.2.5 10.7-3 15l-15.5 19a32 32 0 00-1.7 38.4l15 22.2c4 6 3.7 13.7-.8 19.3l-2.3 2.7a37 37 0 003 49.8 8 8 0 0011.2-11.4 21 21 0 01-1.7-28.3L81 329a32 32 0 001.7-38.2l-15-22.2c-4-6-3.7-13.8.9-19.3L84 230.2c6.8-8.3 9-19.4 5.9-29.6l-9.2-30.4c-2-6.8.6-14.1 6.7-18.2l18.3-12.4a32.3 32.3 0 0013.2-35.4l-5.9-21.3a27 27 0 0122.1-33.7l30.2-5a33 33 0 0017.9-9l14.6-14.3a17.4 17.4 0 0124.3 0l6.6 6.5a33.6 33.6 0 0039.8 5.2c10.3-5.8 23.1.1 25.3 11.2l.6 2.8A45 45 0 00337 82.4l8 .4a17 17 0 0116 21.2 32.6 32.6 0 0013.4 35.8l18 12a16.6 16.6 0 016.7 18.6l-9 30a32.5 32.5 0 006 30l15.2 18.8c4.7 5.7 5 13.6 1 19.6l-14.8 21.9a32.4 32.4 0 001.7 38.6c2.4 3 5 5.8 6.3 11.3a8 8 0 0015.6-3.4c-2-9.3-6.7-14.6-9.5-18-4.6-5.6-4.9-13.5-.8-19.6zm-81.8 106a179 179 0 01-160.2-31.2 49.3 49.3 0 0026.4-39.8A107 107 0 00347 211v-41.7a80 80 0 00-80-80h-27.4a67 67 0 00-62 38.6c-6 14.1-3.4 23.6-5.4 34.7-3.4 18.3-18.4 35.7-44.4 51.7a8 8 0 008.4 13.6c30-18.4 47.4-39.4 51.7-62.4 2.4-12.8-.2-20.4 4.5-31.3a51 51 0 0147.2-28.9H267a64 64 0 0164 64v40.9a91.1 91.1 0 01-173.8 37.7 8 8 0 10-14.6 6.6c10.6 23.3 29.1 41.6 51.4 52.2v2.2c0 18.4-15 33.3-33.4 33.3-45.7 0-82.6 37-82.6 82.6V472a8 8 0 0016 0v-47.3a66.5 66.5 0 0166.6-66.6c1.5 0 3 0 4.4-.2 49 42.8 115.6 60 183 41.3a8 8 0 00-4.3-15.4z" />
            </svg>
        </div>
        <p class="text-justify text-lg mt-4">Easy Apply makes it easier than taking a shit to apply for work. We send an
            personalized application with your information to the farm and make it look like it's hand written.</p>
        <div id="template" class="w-full md:w-4/5 mt-12 text-xl">
            <div id="templateheader" class="flex justify-between">
                <button @click="activeTemplate = 0" :class="getClass(0)"
                    class="text-bg_primary w-1/3 py-2 rounded-tl-sm">
                    Template 1
                </button>
                <button @click="activeTemplate = 1" :class="getClass(1)" class="text-bg_primary w-1/3 py-2">
                    Template 2
                </button>
                <button @click="activeTemplate = 2" :class="getClass(2)"
                    class="text-bg_primary w-1/3 py-2 rounded-tr-sm">
                    Template 3
                </button>
            </div>
            <div id="preview"
                class="bg-main_primary text-bg_primary px-2 py-2 text-lg with-line-breaks border-t-2 border-bg_primary rounded-b-sm">{{getText}}</div>
        </div>
        <button @click="active = !active"
            class="button mb-8 mt-10 bg-main_focus hover:bg-main_focus_active text-main_primary py-2 px-8 lg:px-8 rounded mx-2 cursor-pointer">Send</button>
    </div>
</template>
<script>
    import store from "../store";
    export default {
        props: ['active'],
        data() {
            return {
                activeTemplate: 0,
                profile: store.state.profile.data
            }
        },
        computed: {
            getText() {
                switch (this.activeTemplate) {
                    case 0:
                        return `Dear sir or madam,\nI am applying to work at your farm. My name is ${this.profile.Name} ${this.profile.FamilyName} and I am in Australia since ${this.profile.Joined}.`
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                }
            }
        },
        methods: {
            getClass(id) {
                return id == this.activeTemplate ? "bg-main_primary" : "bg-main_secondary";
            },

        }
    }
</script>