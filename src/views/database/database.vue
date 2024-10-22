<template>
  <div id="database" class="w-full flex-col">
    <h1 class="text-4xl mt-24">Farms Around Me</h1>
    <div id="list" class="text-bg_primary bg-main_primary hideout-bg w-full flex-col pb-20 mt-6">
      <div
        id="filter"
        class="flex-row md:flex mt-8 justify-between w-5/6 lg:w-2/3 px-2 py-2 border-2 rounded-sm"
      >
        <div class="location flex-col md:flex-row">
          <div id="icon">
            <svg
              viewBox="0 0 512 512"
              class="svg-md mx-1 svg-dark"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.8 282.5h46c12 91 83.6 162.7 174.7 174.8v45.9c0 4.8 4 8.8 8.8 8.8h35.4c4.8 0 8.8-4 8.8-8.8v-46c91-12 162.7-83.6 174.8-174.7h45.9c4.8 0 8.8-4 8.8-8.8v-35.4c0-4.8-4-8.8-8.8-8.8h-46c-12-91-83.6-162.7-174.7-174.8V8.8c0-4.8-4-8.8-8.8-8.8h-35.4c-4.8 0-8.8 4-8.8 8.8v46c-91 12-162.7 83.6-174.8 174.7H8.8c-4.8 0-8.8 4-8.8 8.8v35.4c0 4.8 4 8.8 8.8 8.8zM256 105.9a150 150 0 110 300.2 150 150 0 010-300.2zm0 0"
              />
              <path d="M326.6 256a70.6 70.6 0 11-141.2 0 70.6 70.6 0 01141.2 0zm0 0" />
            </svg>
          </div>
          <div id="filter_location" class="px-2">My Location:</div>
          <div id="location" class="px-4">
            <input
              type="text"
              placeholder="Location"
              v-model="location"
              @change="locUpdated = true, southernHemisphereMSG = false"
              class="bg-main_primary w-64 border-b-2 md:w-76 xl:w-90 cursor-pointer text-bg_primary px-2"
            />
          </div>
          <p
            class="px-4"
            v-if="southernHemisphereMSG"
          >Please enter a location in the southern hemisphere.</p>
          <button
            v-if="locUpdated == true"
            @click="getGeoCode(location), locUpdated = false"
            class="px-4 py-1 rounded-sm bg-main_focus hover:bg-main_focus_active mt-2 mb-2 md:my-0 text-light"
          >Accept</button>
          <!-- <SmallMap :active="true" /> -->
        </div>
        <div class="sortby mt-4 md:mt-0 flex-col md:flex-row">
          <div class="icon">
            <svg
              class="svg-md mx-1 svg-dark"
              viewBox="-5 0 394 394"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M367.8 0H16.6c-6.2 0-12 3.4-14.8 9a16.7 16.7 0 001.3 17.4l128.7 181.3.2.1c4.6 6.4 7.2 14 7.2 21.9v147.8a16.4 16.4 0 0022.9 15.2l72.3-27.6c6.5-2 10.8-8 10.8-15.4v-120c0-7.9 2.5-15.5 7.2-21.9l.1-.1L381.2 26.4A16.7 16.7 0 00382.5 9c-2.8-5.6-8.5-9-14.7-9zm0 0"
              />
            </svg>
          </div>
          <div id="filter_sortby" class="px-4">Filter:</div>
          <div id="sortBy" class="px-4 cursor-pointer">
            <TheFilterComponent />
          </div>
        </div>
      </div>
      <div class="container flex-col md:w-3/4 w-full">
        <p class="mt-4 text-lg text-bg_secondary">{{getNumberItems}}</p>
        <ListItem
          class="mt-4"
          v-for="item in list_item.slice(page*10,(page+1)*10)"
          v-bind:key="item.id"
          v-bind:item="item"
        />
        <div id="navigate" class="flex justify-center">
          <button
            :class="buttonInactive('dec')"
            @click="handlePageClick('dec')"
            class="text-center text-2xl mr-2 mt-4 hover:bg-main_focus_active rounded-sm text-light py-2 px-8 w-40 rounded cursor-pointer"
          >Previous</button>
          <button
            :class="buttonInactive('inc')"
            @click="handlePageClick('inc')"
            class="text-center text-2xl ml-2 mt-4 hover:bg-main_focus_active rounded-sm text-light py-2 px-8 w-40 rounded cursor-pointer"
          >Next</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListItem from "../../components/ListItem";
import TheFilterComponent from "../../components/TheFilterComponent";
//import SmallMap from "../../components/SmallMap";
import data_functions from "../../data/data_functions";
import farm_functions from "../../data/farm_functions";
import store from "../../store";
export default {
  components: {
    ListItem,
    TheFilterComponent
  },
  data() {
    return {
      location: store.state.profile.data.Location,
      locUpdated: false,
      southernHemisphereMSG: false,
      showFilter: true,
      page: 0
    };
  },
  mounted() {
    store.commit("updateFarmsToShow", store.state.farms.data);
  },
  computed: {
    getNumberItems() {
      return store.state.farms.active.length > 0
        ? store.state.farms.active.length + " Farms found."
        : "No Farms found.";
    },
    list_item() {
      return farm_functions.sortFarmsByDistance(store.state.farms.active);
    }
  },
  methods: {
    getGeoCode(adress) {
      data_functions.get_geoCodeOpenCage(adress).then(geoCode => {
        var data = {
          Location: this.location,
          Geo: geoCode
        };
        if (geoCode[1] > 0) {
          this.southernHemisphereMSG = true;
          this.location = store.state.profile.data.Location;
        } else {
          store.commit("updateProfile", data);
        }
      });
    },
    buttonInactive(dir) {
      switch (dir) {
        case "inc":
          return (this.page + 1) * 10 >= store.state.farms.active.length
            ? "bg-main_focus_active"
            : "bg-main_focus";
          break;
        case "dec":
          return this.page == 0 ? "bg-main_focus_active" : "bg-main_focus";
          break;
      }
    },
    handlePageClick(dir) {
      switch (dir) {
        case "inc":
          (this.page + 1) * 10 < store.state.farms.active.length
            ? this.page++
            : "";
          break;
        case "dec":
          this.page != 0 ? this.page-- : "";
          break;
      }
    }
  }
};
</script>