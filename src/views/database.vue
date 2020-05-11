<template>
    <div id="database" class="w-full flex-col">
        <h1 class="text-4xl mt-32">Farms Around Me</h1>
        <div id="list" class="text-bg_primary bg-main_primary w-full flex-col pb-20 mt-6">
            <div id="filter" class="flex-row md:flex mt-8 justify-between w-5/6 lg:w-2/3 px-2 py-2 border-2 rounded-sm">
                <div class="location flex-col md:flex-row">
                    <div id="icon">
                        <svg viewBox="0 0 512 512" class="svg-md mx-1 svg-dark" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.8 282.5h46c12 91 83.6 162.7 174.7 174.8v45.9c0 4.8 4 8.8 8.8 8.8h35.4c4.8 0 8.8-4 8.8-8.8v-46c91-12 162.7-83.6 174.8-174.7h45.9c4.8 0 8.8-4 8.8-8.8v-35.4c0-4.8-4-8.8-8.8-8.8h-46c-12-91-83.6-162.7-174.7-174.8V8.8c0-4.8-4-8.8-8.8-8.8h-35.4c-4.8 0-8.8 4-8.8 8.8v46c-91 12-162.7 83.6-174.8 174.7H8.8c-4.8 0-8.8 4-8.8 8.8v35.4c0 4.8 4 8.8 8.8 8.8zM256 105.9a150 150 0 110 300.2 150 150 0 010-300.2zm0 0" />
                            <path d="M326.6 256a70.6 70.6 0 11-141.2 0 70.6 70.6 0 01141.2 0zm0 0" />
                        </svg>
                    </div>
                    <div id="filter_location" class="px-2">My Location: </div>
                    <div id="location" class="px-4"> <input @change="getGeoCode(location)" type="text" placeholder="Location" v-model="location"
                            class="bg-main_primary w-64 border-b-2 md:w-90 cursor-pointer text-bg_primary px-2"></div>
                </div>
                <div class="sortby mt-4 md:mt-0 flex-col md:flex-row">
                    <div class="icon">
                        <svg class="svg-md mx-1 svg-dark" viewBox="-5 0 394 394" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M367.8 0H16.6c-6.2 0-12 3.4-14.8 9a16.7 16.7 0 001.3 17.4l128.7 181.3.2.1c4.6 6.4 7.2 14 7.2 21.9v147.8a16.4 16.4 0 0022.9 15.2l72.3-27.6c6.5-2 10.8-8 10.8-15.4v-120c0-7.9 2.5-15.5 7.2-21.9l.1-.1L381.2 26.4A16.7 16.7 0 00382.5 9c-2.8-5.6-8.5-9-14.7-9zm0 0" />
                        </svg>
                    </div>
                    <div id="filter_sortby" class="px-4">Filter:</div>
                    <div id="sortBy" class="px-4 cursor-pointer">
                        <!-- Is this working? How to put in the data from the child? -->
                        <Dropdown @selectOption="filterFarms()" v-bind:items="filter"/>
                    </div>
                </div>
            </div>
            <div class="container flex-col md:w-3/4 w-full">
                <ListItem class="mt-8" v-for="item in list_item" v-bind:key="item.id" v-bind:item="item" />
            </div>
        </div>
    </div>
</template>
<script>
    import ListItem from "../components/ListItem";
    import Dropdown from "../components/Dropdown";
    import data_functions from "../data/data_functions";
    import farm_functions from "../data/farm_functions";
    import store from "../store";
    export default {
        components: {
            ListItem,
            Dropdown
        },
        data() {
            return {
                list_item: store.state.farms.data,
                location: store.state.profile.data.location,
                filter: {
                    options: ["No Filter", "Below 200km", "Farm with Website", "Animal Free Work (V)"],
                }
            }
        },
        methods: {
            getGeoCode(adress) {
                data_functions.get_geoCodeOpenCage(adress).then(geoCode => {
                    store.commit("updateGeoCode", geoCode);
                });
            },
            filterFarms(farms, id) {

            }
        }
    }
</script>