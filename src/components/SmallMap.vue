<template>
    <div v-if="this.active" id="smallMap" class="absolute rounded-sm border-2 py-1 bg-main_primary"
        style="z-index: 50">
        <h4 class="ml-2 text-xl">Your Location:</h4>
        <vl-map style="width: 400px; height: 300px;" :load-tiles-while-animating="false" :load-tiles-while-interacting="false"
            :logo="false" data-projection="EPSG:4326" class="h-full bg-main_primary">
            <vl-view :zoom.sync="zoom" :center.sync="getCenter" :enable-rotation="false" />

            <vl-overlay :position="getCenter" style="margin-left: -20px; margin-top: -30px">
                <svg class="svg-dark svg-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M256 0A185.6 185.6 0 0070.6 185.4c0 127 166 313.2 173 321a16.7 16.7 0 0024.8 0c7-7.8 173-194 173-321A185.6 185.6 0 00256 0zm0 278.7a93.4 93.4 0 010-186.6 93.4 93.4 0 010 186.6z" />
                </svg>
            </vl-overlay>

            <vl-layer-tile id="osm">
                <vl-source-osm></vl-source-osm>
            </vl-layer-tile>
        </vl-map>
        <div class="container flex text-xl justify-center mt-1">
            <button @click="applyLocation()" class="px-4 py-2 rounded-sm bg-main_focus hover:bg-main_focus_active text-main_primary">Apply</button>
        </div>
    </div>
</template>
<script>
    import store from "../store";
    export default {
        props: ['active'],
        data() {
            return {
                zoom: 4
            }
        },
        computed: {
            getCenter() {
                /* Implement that marker can be dragged and geo is changed. */
                return store.state.profile.data.geoCode
            }
        },
        methods: {
            applyLocation() {
                store.commit("updateGeoCode", /* value here */);
                this.active = false;
            }
        }
    }
</script>