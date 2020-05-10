<template>
    <div v-if="auth == false"
        class="list-item relative py-2 text-xl bg-bg_primary text-main_primary rounded-sm w-5/6 lg:w-128">
        <div class="crop-icon absolute top-0 right-0 mr-4 mt-2">
            <FarmIconHandler :alt="item.category" :title="item.category" v-bind:key="item.id" v-bind:item="item" />
        </div>
        <h1 class="px-4 w-64 py-1">A {{item.category}}</h1>
        <h6 class="px-4 text-base text-bg_secondary">{{getDistance()}} km from your location</h6>
        <div class="saveFarm ml-4 mt-3 md:absolute bottom-0 left-0 md:mb-2" style="z-index: 40">
            <svg @click="handleSavedFarm(item.id)" @mouseleave="handleActiveButton(0)" alt="Save Farm" title="Save Farm"
                :style="getFill(item.id)" style="z-index: 30" class="svg-mds cursor-pointer" viewBox="0 -10 512 511"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M114.6 491.1A27.1 27.1 0 0188 458l33-145.1-111.8-98a27.2 27.2 0 0115.4-47.6l147.8-13.4L231 17a27.2 27.2 0 0150 0l58.4 136.8 147.8 13.4a27.2 27.2 0 0115.5 47.6l-111.7 98 33 145a27.2 27.2 0 01-40.6 29.4L256 411.1l-127.5 76.2a27.3 27.3 0 01-14 3.8zM256 378.3c4.8 0 9.6 1.3 14 3.8l120.2 72-31-137c-2.3-9.7 1-19.9 8.6-26.5l105.4-92.5-139.5-12.7c-10-.9-18.7-7.2-22.6-16.5L256 40l-55.2 129a27.1 27.1 0 01-22.5 16.5L38.7 198l105.5 92.5a27.2 27.2 0 018.6 26.5l-31 137L242 382c4.3-2.5 9.1-3.8 14-3.8zm-84.6-221.9zm169.1 0zm0 0" />
            </svg>
            <Tooltip :info="'save'" :active="getActive(5)" :type="'square'" />
        </div>
        <div class="below w-full flex items-center justify-end mt-12 py-1 relative cursor-pointer">
            <div v-if="item.phone != undefined" id="call" title="Phone" alt="Phone" class="cursor-pointer px-1">
                <div @click="handleActiveButton(1)" @mouseleave="handleActiveButton(0)" class="button">
                    <svg class="svg-passive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M437 75A256 256 0 1075 437 256 256 0 00437 75zm-49.3 281.6l-13 12.8a68.3 68.3 0 01-64.4 18.5 226.8 226.8 0 01-66-29.6c-18.7-12-36.1-26-51.9-41.9a306.7 306.7 0 01-38.8-47 239 239 0 01-29.2-59.1 68.3 68.3 0 0117-69.7l15.3-15.2c4.2-4.3 11-4.3 15.3 0l48 48c4.2 4.2 4.2 11 0 15.3l-28.2 28.2a23 23 0 00-2.4 29.8 329.3 329.3 0 0078.1 76.7 23.1 23.1 0 0029.5-2.6l27.3-27.6c4.2-4.3 11-4.3 15.3 0l48 48c4.3 4.3 4.3 11.2.1 15.4z" />
                    </svg>
                </div>
                <Tooltip :info="'signup'" :active="getActive(1)" :type="'square'" />
            </div>
            <div v-if="item.website != undefined" id="website" title="Website" alt="Website"
                class="cursor-pointer relative px-1">
                <div @click="handleActiveButton(2)" @mouseleave="handleActiveButton(0)" class="button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-passive" viewBox="0 0 124 124">
                        <path
                            d="M46 77.8a39.5 39.5 0 0113.5-3.3v-10H44a60 60 0 002 13.3zM47.6 41.4a34.5 34.5 0 0011.8 3v-17c-5.7 1.7-9.7 8.4-11.8 14zM59.5 96.5V79.6a34.5 34.5 0 00-12 3c2.2 5.6 6.2 12.3 12 14zM44 59.5h15.4v-10A39.8 39.8 0 0146 46.2a60 60 0 00-2 13.3zM39 64.5H27.2a34.6 34.6 0 008.2 20 40.5 40.5 0 016-4.4A64.5 64.5 0 0139 64.6zM48 30a34.7 34.7 0 00-9 5.8 36 36 0 004.1 3A38.1 38.1 0 0148 30zM41.4 43.9a40.5 40.5 0 01-6-4.5 34.6 34.6 0 00-8.2 20H39A64.5 64.5 0 0141.4 44zM85 35.8a34.5 34.5 0 00-9-5.8 37.8 37.8 0 015 8.9 36 36 0 004-3.1zM39 88.2a34.7 34.7 0 009 5.8 38.1 38.1 0 01-5-8.9 36 36 0 00-4 3.1zM80 64.5H64.5v10A39.5 39.5 0 0178 77.8a60 60 0 002-13.3zM82.6 43.9A64.5 64.5 0 0185 59.5h11.8a34.6 34.6 0 00-8.2-20 40.5 40.5 0 01-6 4.4zM64.5 27.5v16.9a34.5 34.5 0 0012-3c-2.2-5.6-6.2-12.3-12-14z" />
                        <path d="M62 0a62 62 0 1062 62A62 62 0 0062 0zm28.3 90.3a40 40 0 110-56.6 40 40 0 010 56.6z" />
                        <path
                            d="M82.6 80.2a40.5 40.5 0 016 4.4 34.6 34.6 0 008.2-20H85a64.5 64.5 0 01-2.4 15.6zM76 94a34.5 34.5 0 009-5.8 36 36 0 00-4.1-3A38.1 38.1 0 0176 94zM64.5 79.6v17c5.8-1.7 9.8-8.4 12-14a34.5 34.5 0 00-12-3zM78 46.2a39.8 39.8 0 01-13.5 3.3v10H80a60 60 0 00-2-13.3z" />
                    </svg>
                </div>
                <Tooltip :info="'signup'" :active="getActive(2)" :type="'square'" />
            </div>
            <div v-if="item.email != undefined" id="mail" title="Email" alt="Email"
                class="cursor-pointer relative px-1">
                <div @click="handleActiveButton(3)" @mouseleave="handleActiveButton(0)" class="button">
                    <svg viewBox="0 0 448 448" class="svg-passive" xmlns="http://www.w3.org/2000/svg">
                        <path d="M314.4 144H133.6l90.4 77.5zm0 0" />
                        <path d="M224 240a8 8 0 01-5.2-2L120 153.5V304h208V153.4L229.2 238a8 8 0 01-5.2 1.9zm0 0" />
                        <path
                            d="M224 0a224 224 0 100 448 224 224 0 000-448zm120 312a8 8 0 01-8 8H112a8 8 0 01-8-8V136a8 8 0 018-8h224a8 8 0 018 8zm0 0" />
                    </svg>
                </div>
                <Tooltip :info="'signup'" :active="getActive(3)" :type="'square'" />
            </div>
            <div @click="handleActiveButton(4)" @mouseleave="handleActiveButton(0)" class="relative"
                v-if="item.email != undefined" id="easyContact">
                <button
                    class="bg-bg_secondary cursor-pointer text-bg_primary rounded-sm px-4 py-2 ml-2 mr-2">Easy
                    Apply</button>
                <Tooltip :info="'signup'" :active="getActive(4)" :type="'square'" />
            </div>
        </div>
    </div>
    <div v-else class="list-item relative py-2 text-xl bg-bg_primary text-main_primary rounded-sm w-5/6 lg:w-128">
        <div class="crop-icon absolute top-0 right-0 mr-4 mt-2">
            <FarmIconHandler :alt="item.category" :title="item.category" v-bind:key="item.id" v-bind:item="item" />
        </div>
        <h1 class="px-4 w-64 py-1">{{item.name}}</h1>
        <h2 class="px-4 py-1">{{item.adress}}</h2>
        <h6 class="px-4 text-base text-bg_secondary">{{getDistance()}} km from your location</h6>
        <div class="saveFarm ml-4 mt-3 md:absolute bottom-0 left-0 md:mb-2" style="z-index: 40">
            <svg @click="handleSavedFarm(item.id)" alt="Save Farm" title="Save Farm" :style="getFill(item.id)"
                style="z-index: 30" class="svg-mds cursor-pointer" viewBox="0 -10 512 511"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M114.6 491.1A27.1 27.1 0 0188 458l33-145.1-111.8-98a27.2 27.2 0 0115.4-47.6l147.8-13.4L231 17a27.2 27.2 0 0150 0l58.4 136.8 147.8 13.4a27.2 27.2 0 0115.5 47.6l-111.7 98 33 145a27.2 27.2 0 01-40.6 29.4L256 411.1l-127.5 76.2a27.3 27.3 0 01-14 3.8zM256 378.3c4.8 0 9.6 1.3 14 3.8l120.2 72-31-137c-2.3-9.7 1-19.9 8.6-26.5l105.4-92.5-139.5-12.7c-10-.9-18.7-7.2-22.6-16.5L256 40l-55.2 129a27.1 27.1 0 01-22.5 16.5L38.7 198l105.5 92.5a27.2 27.2 0 018.6 26.5l-31 137L242 382c4.3-2.5 9.1-3.8 14-3.8zm-84.6-221.9zm169.1 0zm0 0" />
            </svg>
        </div>
        <div class="below w-full flex items-center justify-end mt-12 py-1 relative cursor-pointer">

            <div v-if="item.phone != undefined" id="call" title="Phone" alt="Phone" class="cursor-pointer px-1">
                <div @click="handleButtonClick('phone')" class="button">
                    <a :href="'tel:' + item.phone">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M437 75A256 256 0 1075 437 256 256 0 00437 75zm-49.3 281.6l-13 12.8a68.3 68.3 0 01-64.4 18.5 226.8 226.8 0 01-66-29.6c-18.7-12-36.1-26-51.9-41.9a306.7 306.7 0 01-38.8-47 239 239 0 01-29.2-59.1 68.3 68.3 0 0117-69.7l15.3-15.2c4.2-4.3 11-4.3 15.3 0l48 48c4.2 4.2 4.2 11 0 15.3l-28.2 28.2a23 23 0 00-2.4 29.8 329.3 329.3 0 0078.1 76.7 23.1 23.1 0 0029.5-2.6l27.3-27.6c4.2-4.3 11-4.3 15.3 0l48 48c4.3 4.3 4.3 11.2.1 15.4z" />
                        </svg>
                    </a>
                </div>
            </div>
            <div v-if="item.website != undefined" id="website" title="Website" alt="Website"
                class="cursor-pointer relative px-1">
                <div @click="handleButtonClick('website')" class="button">
                    <a :href="'https://' + item.website">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124">
                            <path
                                d="M46 77.8a39.5 39.5 0 0113.5-3.3v-10H44a60 60 0 002 13.3zM47.6 41.4a34.5 34.5 0 0011.8 3v-17c-5.7 1.7-9.7 8.4-11.8 14zM59.5 96.5V79.6a34.5 34.5 0 00-12 3c2.2 5.6 6.2 12.3 12 14zM44 59.5h15.4v-10A39.8 39.8 0 0146 46.2a60 60 0 00-2 13.3zM39 64.5H27.2a34.6 34.6 0 008.2 20 40.5 40.5 0 016-4.4A64.5 64.5 0 0139 64.6zM48 30a34.7 34.7 0 00-9 5.8 36 36 0 004.1 3A38.1 38.1 0 0148 30zM41.4 43.9a40.5 40.5 0 01-6-4.5 34.6 34.6 0 00-8.2 20H39A64.5 64.5 0 0141.4 44zM85 35.8a34.5 34.5 0 00-9-5.8 37.8 37.8 0 015 8.9 36 36 0 004-3.1zM39 88.2a34.7 34.7 0 009 5.8 38.1 38.1 0 01-5-8.9 36 36 0 00-4 3.1zM80 64.5H64.5v10A39.5 39.5 0 0178 77.8a60 60 0 002-13.3zM82.6 43.9A64.5 64.5 0 0185 59.5h11.8a34.6 34.6 0 00-8.2-20 40.5 40.5 0 01-6 4.4zM64.5 27.5v16.9a34.5 34.5 0 0012-3c-2.2-5.6-6.2-12.3-12-14z" />
                            <path
                                d="M62 0a62 62 0 1062 62A62 62 0 0062 0zm28.3 90.3a40 40 0 110-56.6 40 40 0 010 56.6z" />
                            <path
                                d="M82.6 80.2a40.5 40.5 0 016 4.4 34.6 34.6 0 008.2-20H85a64.5 64.5 0 01-2.4 15.6zM76 94a34.5 34.5 0 009-5.8 36 36 0 00-4.1-3A38.1 38.1 0 0176 94zM64.5 79.6v17c5.8-1.7 9.8-8.4 12-14a34.5 34.5 0 00-12-3zM78 46.2a39.8 39.8 0 01-13.5 3.3v10H80a60 60 0 00-2-13.3z" />
                        </svg>
                    </a>
                </div>
            </div>
            <div v-if="item.email != undefined" id="mail" title="Email" alt="Email"
                class="cursor-pointer relative px-1">
                <div @click="handleButtonClick('mail')" class="button">
                    <a :href="'mailto:' + item.email">
                        <svg viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg">
                            <path d="M314.4 144H133.6l90.4 77.5zm0 0" />
                            <path d="M224 240a8 8 0 01-5.2-2L120 153.5V304h208V153.4L229.2 238a8 8 0 01-5.2 1.9zm0 0" />
                            <path
                                d="M224 0a224 224 0 100 448 224 224 0 000-448zm120 312a8 8 0 01-8 8H112a8 8 0 01-8-8V136a8 8 0 018-8h224a8 8 0 018 8zm0 0" />
                        </svg>
                    </a>
                </div>
            </div>
            <div @click="handleButtonClick('easyapply')" class="relative" v-if="item.email != undefined" id="easyContact">
                <button
                    class="bg-main_primary cursor-pointer hover:bg-main_secondary text-bg_primary rounded-sm px-4 py-2 ml-2 mr-2">Easy
                    Apply</button>
            </div>
        </div>
    </div>
</template>
<script>
    import FarmIconHandler from "../components/FarmIconHandler";
    import Tooltip from "../components/Tooltip";
    import store from "../store";
    import farm_functions from "../data/farm_functions";

    export default {
        props: ['item'],
        components: {
            FarmIconHandler,
            Tooltip
        },
        data() {
            return {
                auth: store.state.auth,
                activeButton: 0
            }
        },
        computed: {},
        methods: {
            getFill(id) {
                var savedFarms = store.state.profile.data.savedFarms;
                if (savedFarms.includes(id)) {
                    return "fill: #cc6355"
                }
            },
            handleSavedFarm(id) {
                store.commit("handleSavedFarm", id);
                this.handleActiveButton(5);
            },
            getDistance() {
                var distance = farm_functions.calculateDistance(store.state.profile.data.geoCode, this.item.location);
                return distance
            },
            handleActiveButton(id) {
                if (this.activeButton == id) {
                    this.activeButton = 0;
                } else {
                    this.activeButton = id;
                }
            },
            getActive(id) {
                return true ? id == this.activeButton : false;
            }
        }
    }
</script>