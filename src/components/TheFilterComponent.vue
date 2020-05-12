<template>
    <div class="Dropdown">
        <p @click="showOptions = true ? showOptions == false : false">{{getActiveText}}</p>
        <div v-if="showOptionsHandler" class="absolute z-20">
            <div id="options" class="border-2 selection-list bg-main_primary">
                <li class="">
                    <ul @click="handleSelect('No Filter')" :class="getBackground('No Filter')"
                        class="py-2 px-2 hover:bg-main_secondary">
                        No Filter
                    </ul>
                </li>
                <li>
                    <ul class="pt-4 px-2 text-bg_secondary">Location filters</ul>
                    <ul v-for="item in options.location" :key="item" class="py-2 px-2 hover:bg-main_secondary"
                        @click="handleSelect(item)" :class="getBackground(item)">
                        {{item}}
                    </ul>
                </li>
                <li>
                    <ul class="pt-4 px-2 text-bg_secondary">Farm filters</ul>
                    <ul v-for="item in options.farm" :key="item" class="py-2 px-2 hover:bg-main_secondary"
                        @click="handleSelect(item)" :class="getBackground(item)">
                        {{item}}
                    </ul>
                </li>
            </div>
            <div class="container flex justify-center w-full">
                <button @click="showOptions = false" class="px-8 mt-1 py-2 rounded-sm text-main_primary bg-main_focus hover:bg-main_focus_active">Close</button>
            </div>
        </div>
    </div>
</template>
<script>
    import store from "../store";
    import farm_functions from "../data/farm_functions";

    export default {
        data() {
            return {
                options: {
                    location: ["Less than 200km from me", "In my State"],
                    farm: ["Farms with Website", "Animal free work (V)", "Animal related work", "Vineyards"]
                },
                activeOptions: [],
                showOptions: false
            }
        },
        computed: {
            showOptionsHandler() {
                return this.showOptions;
            },
            getActiveText() {
                return this.activeOptions.length > 0 ? this.activeOptions.length + ' Filter selected' :
                    'No Filter Selected';
            }
        },
        methods: {
            getBackground(item) {
                return this.activeOptions.includes(item) ? 'bg-main_secondary' : ''
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
                for (var index in this.activeOptions) {
                    farms_to_show = farm_functions.filterFarms(farms_to_show, this.activeOptions[index])
                }
                store.commit("updateFarmsToShow", farms_to_show);
            }
        }
    }
</script>