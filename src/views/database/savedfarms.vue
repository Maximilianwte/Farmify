<template>
    <div id="savedfarms" class="text-2xl flex-col">
        <h4 class="mt-24 text-3xl">Your Saved Farms</h4>
        <div class="container mt-8 w-full px-4 md:w-2/3">
            <div id="header" class="cursor-pointer text-bg_primary flex border-b-2 border-bg_primary">
                <div id="mysaved" @click="handleSelectTab(0)"
                    :class="{'bg-main_primary': activeTab == 0, 'bg-main_secondary': activeTab != 0}"
                    class="w-1/2 flex-col justify-around border-r-2 rounded-tl-sm">
                    <h6 class="py-4">
                        My Saved Farms</h6>
                </div>
                <div id="mygroup" @click="handleSelectTab(1)"
                    :class="{'bg-main_primary': activeTab == 1, 'bg-main_secondary': activeTab != 1}"
                    class="w-1/2 flex-col justify-around rounded-tr-sm">
                    <h6 class="py-4">My Group Saved</h6>
                </div>
            </div>
            <div class="text-bg_primary bg-main_primary w-full flex-col pb-20 rounded-b-sm">
                <div id="myList" class="w-full flex-col" v-if="activeTab == 0">
                    <ListItem class="mt-8" v-for="savedFarmID in storedFarms.slice(page*10,(page+1)*10)"
                        v-bind:key="savedFarmID" v-bind:item="getFarm('id', savedFarmID)" />
                    <div id="navigate" class="flex justify-center">
                        <button :class="buttonInactive('dec')" @click="handlePageClick('dec')"
                            class="text-center text-2xl mt-4 hover:bg-main_focus_active rounded-l-sm text-light py-2 px-8 w-40 rounded cursor-pointer">Previous</button>
                        <button :class="buttonInactive('inc')" @click="handlePageClick('inc')"
                            class="text-center text-2xl mt-4 hover:bg-main_focus_active rounded-r-sm text-light py-2 px-8 w-40 rounded cursor-pointer">Next</button>
                    </div>
                </div>
                <div id="myList" class="w-full flex-col" v-else>
                    <!-- <ListItem class="mt-8" v-for="savedFarmID in storedFarms" v-bind:key="savedFarmID"
                        v-bind:item="getFarm('id', savedFarmID)" /> -->
                    <h5 class="mt-12">This feature is coming soon.</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import store from "../../store";
    import farm_functions from "../../data/farm_functions";
    import ListItem from "../../components/ListItem";

    export default {
        components: {
            ListItem
        },
        data() {
            return {
                activeTab: 0,
                page: 0,
                storedFarms: store.state.profile.data.SavedFarms,
                all_farms: store.state.farms.data
            }
        },
        computed: {},
        methods: {
            handleSelectTab(id) {
                if (id == 0) {
                    this.activeTab = 0;
                } else {
                    this.activeTab = 1;
                }
            },
            getFarm(id, value) {
                return farm_functions.findFarm(id, value)
            },
            buttonInactive(dir) {
                switch (dir) {
                    case 'inc':
                        return (this.page + 1) * 10 >= store.state.farms.active.length ? 'bg-main_focus_active' :
                            'bg-main_focus';
                        break;
                    case 'dec':
                        return this.page == 0 ? 'bg-main_focus_active' : 'bg-main_focus'
                        break;
                }
            },
            handlePageClick(dir) {
                switch (dir) {
                    case 'inc':
                        (this.page + 1) * 10 < store.state.farms.active.length ? this.page++ : '';
                        break;
                    case 'dec':
                        this.page != 0 ? this.page-- : '';
                        break;
                }
            }
        }
    }
</script>