<template>
  <v-touch @pinchIn="handlePinch('in')" @pinchOut="handlePinch('out')">
    <l-map id="mapView" @update:zoom="zoomUpdated" class="map theme_dark w-full h-128" :zoom="mapZoom" :minZoom=4
      :center="mapCenter" :options="{zoomControl: false}">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-control position="topleft">
        <div id="mobile" class="md:hidden rounded-sm flex bg-main_primary w-64">
          <button title="Menu" class="px-1 py-1" @click="pushMenu">
            <svg xmlns="http://www.w3.org/2000/svg" class="svg-lg svg-dark" viewBox="0 0 512 512">
              <path
                d="M176.8 0H59.2A59.3 59.3 0 000 59.2v117.6A59.3 59.3 0 0059.2 236h117.6a59.3 59.3 0 0059.2-59.2V59.2A59.3 59.3 0 00176.8 0zM196 176.8c0 10.6-8.6 19.2-19.2 19.2H59.2A19.2 19.2 0 0140 176.8V59.2C40 48.6 48.6 40 59.2 40h117.6c10.6 0 19.2 8.6 19.2 19.2v117.6zM452 0H336c-33 0-60 27-60 60v116c0 33 27 60 60 60h116c33 0 60-27 60-60V60c0-33-27-60-60-60zm20 176c0 11-9 20-20 20H336c-11 0-20-9-20-20V60c0-11 9-20 20-20h116c11 0 20 9 20 20v116zM176.8 276H59.2A59.3 59.3 0 000 335.2v117.6A59.3 59.3 0 0059.2 512h117.6a59.3 59.3 0 0059.2-59.2V335.2a59.3 59.3 0 00-59.2-59.2zM196 452.8c0 10.6-8.6 19.2-19.2 19.2H59.2A19.2 19.2 0 0140 452.8V335.2c0-10.6 8.6-19.2 19.2-19.2h117.6c10.6 0 19.2 8.6 19.2 19.2v117.6zM452 276H336c-33 0-60 27-60 60v116c0 33 27 60 60 60h116c33 0 60-27 60-60V336c0-33-27-60-60-60zm20 176c0 11-9 20-20 20H336c-11 0-20-9-20-20V336c0-11 9-20 20-20h116c11 0 20 9 20 20v116z" />
            </svg>
          </button>
          <div class="filter ml-4 text-bg_primary flex text-xl items-center">
            <div class="icon">
              <svg class="svg-md mx-1 svg-dark" viewBox="-5 0 394 394" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M367.8 0H16.6c-6.2 0-12 3.4-14.8 9a16.7 16.7 0 001.3 17.4l128.7 181.3.2.1c4.6 6.4 7.2 14 7.2 21.9v147.8a16.4 16.4 0 0022.9 15.2l72.3-27.6c6.5-2 10.8-8 10.8-15.4v-120c0-7.9 2.5-15.5 7.2-21.9l.1-.1L381.2 26.4A16.7 16.7 0 00382.5 9c-2.8-5.6-8.5-9-14.7-9zm0 0" />
              </svg>
            </div>
            <p>Filter:</p>
            <Dropdown class="ml-2 cursor-pointer" v-bind:items="filter" />
          </div>
        </div>
      </l-control>
      <!-- Group Markers -->
      <l-marker @click="setActiveGroup(item)" v-for="item in groupData" :key="item.id" :lat-lng="item.location">
        <l-icon :icon-anchor="[29,30]">
          <button :class="{'hidden': activeGroup == item.id}"
            class="group px-5 py-3 cursor-pointer rounded-full border-2 border-bg_primary text-xl text-bg_primary bg-blue hover:bg-blue_active">{{item.numberInGroup}}</button>
        </l-icon>
      </l-marker>
      <!-- Farm Markers -->
      <l-marker @click="setActiveMarker(item)" v-for="item in markerData" :key="item.id" :lat-lng="item.location">
        <l-icon :icon-anchor="[30, 40 * 1.15]" :options="{ permanent: true, interactive: true }">
          <div style="width: 60px; height: 50px"
            class="icon front flex cursor-pointer justify-around relative bg-bg_primary rounded-sm px-4 py-0"
            v-if="activeMarker != item.id" id="activeBox">
            <div class="arrow-down-small mt-12 ml-1 absolute"></div>
            <div class="crop-icon mt-1">
              <FarmIconHandler v-bind:key="item.id" v-bind:item="item" :alt="item.category" :title="item.category" />
            </div>
          </div>
          <l-popup @click="setActiveMarker(-1)" :options={closeButton:false}>
            <div class="crop-icon absolute top-0 right-0 mr-4 mt-2">
              <FarmIconHandler v-bind:key="item.id" v-bind:item="item" :alt="item.category" :title="item.category" />
            </div>
          </l-popup>
        </l-icon>
      </l-marker>
    </l-map>
  </v-touch>
</template>
<script>
  import farm_functions from "../data/farm_functions";
  import store from "../store";
  import FarmIconHandler from "../components/FarmIconHandler";
  import Dropdown from "../components/Dropdown";

  export default {
    components: {
      FarmIconHandler,
      Dropdown
    },
    data() {
      return {
        markerData: store.state.farms.data,
        mapZoom: 4.5,
        activeMarkerValue: 0,
        activeGroup: 0,
        mapCenter: [-24.77611, 134.75096],
        filter: ["None", "Animal Free (V)"]
      }
    },
    computed: {
      activeMarker() {
        return this.activeMarkerValue;
      },
      isActiveMarker(id) {
        if (this.activeMarkerValue == id) {
          return true;
        } else {
          return false;
        }
      },
      groupData() {
        return store.state.groups.data
      }
    },
    mounted() {
      this.markerData = farm_functions.renderMarkers()
    },
    methods: {
      zoomUpdated(zoom) {
        this.mapZoom = zoom;
      },
      setActiveGroup(item) {
        this.markerData = farm_functions.renderMarkers();
        if (this.activeGroup != item.id) {
          this.activeGroup = item.id;
          this.mapCenter = [item.location[0] + (90 / this.mapZoom ** 3), item.location[1]];
        } else {
          this.activeGroup = 0;
        }

        this.markerData = farm_functions.handleMarkersInGroup(this.markerData, item.id);
      },
      setActiveMarker(item) {
        if (this.activeMarkerValue != item.id) {
          this.activeMarkerValue = item.id;
          this.mapCenter = [item.location[0] + (90 / this.mapZoom ** 3), item.location[1]];
        } else {
          this.activeMarkerValue = 0;
        }
      },
      pushMenu() {
        if (this.$router.currentRoute.path == "/menu") {
          this.$router.go(-1);
        } else {
          this.$router.push({
            path: '/menu'
          });
        }
      },
      handlePinch(direction) {
        if (direction == "in") {
          this.mapZoom++;
        } else {
          this.mapZoom--;
        }
      },
      handleSavedFarm(id) {
        store.commit("handleSavedFarm", id)
      },
      getFill(id) {
        var savedFarms = store.state.profile.data.savedFarms;
        if (savedFarms.includes(id)) {
          return "fill: #cc6355"
        }
      }
    }
  }
</script>