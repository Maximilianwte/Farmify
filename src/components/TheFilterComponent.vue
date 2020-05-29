<template>
    <div class="Dropdown">
        <p @click="handleShowFilter()">{{getActiveText}}</p>
        <div v-if="showOptionsHandler" class="absolute z-20">
            <div id="options" class="border-2 selection-list text-dark bg-light">
                <li class="">
                    <ul @click="handleSelect('No Filter')"
                        class="py-2 px-2 hover:bg-main_secondary flex justify-between items-center">
                        <p>No Filter</p>
                    </ul>
                </li>
                <li v-if="this.LocationFilter">
                    <ul class="pt-4 px-2 text-bg_secondary">Location filters</ul>
                    <ul v-for="item in options.location" :key="item"
                        class="py-2 px-2 hover:bg-main_secondary flex justify-between items-center"
                        @click="handleSelect(item)">
                        <div :class="getBackground(item)" class="checkbox ml-2 mr-4 h-3 w-3 border-2"></div>
                        <p>{{item}}</p>
                    </ul>
                </li>
                <li>
                    <ul class="pt-4 px-2">Farm filters</ul>
                    <ul v-for="item in options.farm" :key="item"
                        class="py-2 px-2 hover:bg-main_secondary flex justify-between items-center"
                        @click="handleSelect(item)">
                        <div :class="getBackground(item)" class="checkbox ml-2 mr-4 h-3 w-3 border-2"></div>
                        <p>{{item}}</p>
                    </ul>
                </li>
            </div>
            <div class="container flex justify-center w-full">
                <button @click="handleShowFilter()"
                    class="px-8 mt-1 py-2 rounded-sm text-light bg-main_focus hover:bg-main_focus_active">Close</button>
            </div>
        </div>
    </div>
</template>
<script>
    import store from "../store";
    import farm_functions from "../data/farm_functions";

    export default {
        props: ['LocationFilter', 'Type'],
        data() {
            return {
                options: {
                    location: ["Less than 200km from me", "In my State"],
                    farm: ["Easy Apply Enabled", "Farms with Website", "Animal free work (V)", "Animal related work",
                        "Vineyards"
                    ]
                },
                activeOptions: [],
                showFilter: false
            }
        },
        computed: {
            showOptionsHandler() {
                return this.showFilter;
            },
            getActiveText() {
                if (this.activeOptions.length == 0) {
                    return 'No Filter Selected';
                } else if (this.activeOptions.length == 1) {
                    return 'One Filter Selected';
                } else {
                    return this.activeOptions.length + ' Filters selected'
                }
            }
        },
        methods: {
            getBackground(item) {
                return this.activeOptions.includes(item) ? 'bg-dark' : ''
            },
            handleSelect(item) {
                if (item == 'No Filter') {
                    this.activeOptions = []
                } else {
                    if (this.activeOptions.includes(item)) {
                        this.activeOptions.splice(this.activeOptions.indexOf(item), 1);
                    } else {
                        this.activeOptions.push(item)
                    }
                }
                this.handleFilter();
            },
            handleFilter() {
                var farms_to_show = store.state.farms.data;

                if (this.activeOptions.length == 0) {
                    farms_to_show = farms_to_show.map(farm => farm.id);
                    store.commit("updateFarmIDSToShow", farms_to_show);
                } else {
                    if (this.Type == "Map") {
                        for (var index in this.activeOptions) {
                            farms_to_show = farm_functions.filterFarms2(farms_to_show, this.activeOptions[index])
                        }
                        store.commit("updateFarmIDSToShow", farms_to_show);
                    } else {
                        for (var index in this.activeOptions) {
                            farms_to_show = farm_functions.filterFarms(farms_to_show, this.activeOptions[index])
                        }
                        store.commit("updateFarmsToShow", farms_to_show);
                    }
                }
            },
            handleShowFilter() {
                this.showFilter == false ? this.showFilter = true : this.showFilter = false;
            }
        }
    }
</script>