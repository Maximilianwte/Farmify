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
        <l-icon :icon-anchor="[30, 40 * 1.15]" :options="{ permanent: true, interactive: true }" >
          <!-- For old behavior move the @click back to l-marker -->
          <div style="width: 60px; height: 50px"
            class="icon front flex cursor-pointer justify-around relative bg-bg_primary rounded-sm px-4 py-0"
            v-if="activeMarker != item.id" id="activeBox">
            <div class="arrow-down-small mt-12 ml-1 absolute"></div>
            <div class="crop-icon mt-1">
              <FarmIconHandler v-bind:key="item.id" v-bind:item="item" :alt="item.category" :title="item.category" />
            </div>
          </div>
          <div style="width: 340px; height: 225px"
            class="bigIcon cursor-pointer text-main_primary front relative bg-bg_primary rounded-sm px-4 py-0"
            v-if="activeMarker == item.id" id="activeBox">
            <div class="crop-icon absolute top-0 right-0 mr-4 mt-2">
              <FarmIconHandler v-bind:key="item.id" v-bind:item="item" :alt="item.category" :title="item.category" />
            </div>
            <div class="textBox absolute w-5/6 h-full">
              <p class="text-xl w-64 px-2 pt-2">{{item.name}}</p>
              <p class="text-sm px-2">{{item.adress}}</p>
              <div class="saveFarm ml-2 mt-2">
                <svg alt="Save Farm" title="Save Farm" :style="getFill(item.id)" @click="handleSavedFarm(item.id)"
                  class="svg-mds cursor-pointer" viewBox="0 -10 512 511" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M114.6 491.1A27.1 27.1 0 0188 458l33-145.1-111.8-98a27.2 27.2 0 0115.4-47.6l147.8-13.4L231 17a27.2 27.2 0 0150 0l58.4 136.8 147.8 13.4a27.2 27.2 0 0115.5 47.6l-111.7 98 33 145a27.2 27.2 0 01-40.6 29.4L256 411.1l-127.5 76.2a27.3 27.3 0 01-14 3.8zM256 378.3c4.8 0 9.6 1.3 14 3.8l120.2 72-31-137c-2.3-9.7 1-19.9 8.6-26.5l105.4-92.5-139.5-12.7c-10-.9-18.7-7.2-22.6-16.5L256 40l-55.2 129a27.1 27.1 0 01-22.5 16.5L38.7 198l105.5 92.5a27.2 27.2 0 018.6 26.5l-31 137L242 382c4.3-2.5 9.1-3.8 14-3.8zm-84.6-221.9zm169.1 0zm0 0" />
                </svg>
              </div>
            </div>
            <div class="below w-full flex items-center justify-end absolute bottom-0 right-0 mr-4 mb-4 cursor-pointer">
              <div v-if="item.phone != undefined" id="call" title="Phone" alt="Phone" class="cursor-pointer px-1">
                <a v-bind:href="'tel:' + item.phone">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M437 75A256 256 0 1075 437 256 256 0 00437 75zm-49.3 281.6l-13 12.8a68.3 68.3 0 01-64.4 18.5 226.8 226.8 0 01-66-29.6c-18.7-12-36.1-26-51.9-41.9a306.7 306.7 0 01-38.8-47 239 239 0 01-29.2-59.1 68.3 68.3 0 0117-69.7l15.3-15.2c4.2-4.3 11-4.3 15.3 0l48 48c4.2 4.2 4.2 11 0 15.3l-28.2 28.2a23 23 0 00-2.4 29.8 329.3 329.3 0 0078.1 76.7 23.1 23.1 0 0029.5-2.6l27.3-27.6c4.2-4.3 11-4.3 15.3 0l48 48c4.3 4.3 4.3 11.2.1 15.4z" />
                  </svg>
                </a>
              </div>
              <div v-if="item.website != undefined" id="website" title="Website" alt="Website"
                class="cursor-pointer px-1">
                <a v-bind:href="item.website">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124">
                    <path
                      d="M46 77.8a39.5 39.5 0 0113.5-3.3v-10H44a60 60 0 002 13.3zM47.6 41.4a34.5 34.5 0 0011.8 3v-17c-5.7 1.7-9.7 8.4-11.8 14zM59.5 96.5V79.6a34.5 34.5 0 00-12 3c2.2 5.6 6.2 12.3 12 14zM44 59.5h15.4v-10A39.8 39.8 0 0146 46.2a60 60 0 00-2 13.3zM39 64.5H27.2a34.6 34.6 0 008.2 20 40.5 40.5 0 016-4.4A64.5 64.5 0 0139 64.6zM48 30a34.7 34.7 0 00-9 5.8 36 36 0 004.1 3A38.1 38.1 0 0148 30zM41.4 43.9a40.5 40.5 0 01-6-4.5 34.6 34.6 0 00-8.2 20H39A64.5 64.5 0 0141.4 44zM85 35.8a34.5 34.5 0 00-9-5.8 37.8 37.8 0 015 8.9 36 36 0 004-3.1zM39 88.2a34.7 34.7 0 009 5.8 38.1 38.1 0 01-5-8.9 36 36 0 00-4 3.1zM80 64.5H64.5v10A39.5 39.5 0 0178 77.8a60 60 0 002-13.3zM82.6 43.9A64.5 64.5 0 0185 59.5h11.8a34.6 34.6 0 00-8.2-20 40.5 40.5 0 01-6 4.4zM64.5 27.5v16.9a34.5 34.5 0 0012-3c-2.2-5.6-6.2-12.3-12-14z" />
                    <path d="M62 0a62 62 0 1062 62A62 62 0 0062 0zm28.3 90.3a40 40 0 110-56.6 40 40 0 010 56.6z" />
                    <path
                      d="M82.6 80.2a40.5 40.5 0 016 4.4 34.6 34.6 0 008.2-20H85a64.5 64.5 0 01-2.4 15.6zM76 94a34.5 34.5 0 009-5.8 36 36 0 00-4.1-3A38.1 38.1 0 0176 94zM64.5 79.6v17c5.8-1.7 9.8-8.4 12-14a34.5 34.5 0 00-12-3zM78 46.2a39.8 39.8 0 01-13.5 3.3v10H80a60 60 0 00-2-13.3z" />
                  </svg>
                </a>
              </div>
              <div v-if="item.email != undefined" id="mail" title="Email" alt="Email" class="cursor-pointer px-1">
                <a :href="'mailto:' + item.email">
                  <svg viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg">
                    <path d="M314.4 144H133.6l90.4 77.5zm0 0" />
                    <path d="M224 240a8 8 0 01-5.2-2L120 153.5V304h208V153.4L229.2 238a8 8 0 01-5.2 1.9zm0 0" />
                    <path
                      d="M224 0a224 224 0 100 448 224 224 0 000-448zm120 312a8 8 0 01-8 8H112a8 8 0 01-8-8V136a8 8 0 018-8h224a8 8 0 018 8zm0 0" />
                  </svg>
                </a>
              </div>
              <div v-if="item.email != undefined" id="easyContact">
                <button
                  class="bg-main_primary cursor-pointer hover:bg-main_secondary text-bg_primary rounded-sm text-lg px-4 py-2 ml-2 mr-2">Easy
                  Apply</button>
              </div>
            </div>
            <div class="arrow-down mt-56 ml-32 absolute"></div>
          </div>
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
      },
      tryClick() {
        console.log("work man!")
      }
    }
  }
</script>