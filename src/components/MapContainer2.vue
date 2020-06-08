<template>
  <div>
    <vl-map @click="activeMarkerValue = 0; setActiveGroup(0)" :load-tiles-while-animating="false"
      :load-tiles-while-interacting="true" data-projection="EPSG:4326" class="h-full bg-main_primary">
      <vl-view :zoom.sync="zoom" :min-zoom="3.5" :center.sync="center" :enable-rotation="false"
        :rotation.sync="rotation" />

      <!-- Mobile Menu -->
      <div id="mobile" title="Menu" style="z-index: 300"
        class="absolute w-full h-12 top-0 left-0 md:hidden text-bg_primary bg-main_primary">
        <div id="header" class="mt-1 ml-2">
          <router-link class="mr-4 flex items-center" to="/"><svg class="svg-lg svg-dark"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M363.6 262.3a10 10 0 0 0-6.1-6.6c-.6-.2-5.6-2-13.2-3.1a85 85 0 0 0 19.3-83.4 10 10 0 0 0-6.1-6.6 86 86 0 0 0-53.8.6 89.8 89.8 0 0 0 2.5-21.4 85 85 0 0 0-45.3-75.7 10 10 0 0 0-9-.3c-2 1-46 22-46 76 0 7.8 1 15 2.5 21.4a86 86 0 0 0-53.9-.6 10 10 0 0 0-6.1 6.6 85 85 0 0 0 19.3 83.4 71.1 71.1 0 0 0-13.2 3 10 10 0 0 0-6.1 6.7 85 85 0 0 0 21.4 85.5 83 83 0 0 0 76.1 23.9V437a10 10 0 0 0 20 0v-65.5a83 83 0 0 0 76.3-23.8 85 85 0 0 0 21.4-85.5zM246 340.5c-.2 4.5-.8 8.3-1.4 11a64.5 64.5 0 0 1-60.5-17.8 64.5 64.5 0 0 1-17.9-60.5 67 67 0 0 1 37.2 2.6c7.7 3 15.7 7.7 23.3 15.3a63.8 63.8 0 0 1 19.3 42.7v6.7zm0-93c-.2 4.4-.8 8.3-1.4 11a66.5 66.5 0 0 1-38-2.9 66 66 0 0 1-22.5-15 64.5 64.5 0 0 1-17.9-60.5c10.7-2.3 37.5-5 60.5 17.9l.4.4 2.6 2.9c12 13.5 15.8 27.9 16.3 39.4v6.7zm10.2-50.3a68 68 0 0 1-13.7-11.6 63.8 63.8 0 0 1-16.5-43.8A64.6 64.6 0 0 1 256 86.4a64.5 64.5 0 0 1 30.2 55.4 63.8 63.8 0 0 1-30.1 55.4zm9.9 47a63.3 63.3 0 0 1 19.9-46.6 64.5 64.5 0 0 1 60-17.5c2.5 11.5 4.9 37.8-17.9 60.5a66 66 0 0 1-26.8 16.6 66.4 66.4 0 0 1-33.7 1.3c-.7-3.3-1.5-8.2-1.5-14v-.3zm62 89.5a64.5 64.5 0 0 1-60.4 17.9 64.9 64.9 0 0 1 17.8-60.5 66 66 0 0 1 26.9-16.6c14.2-4.4 27-2.8 33.6-1.3 2.5 11.4 4.9 37.8-17.9 60.5z" />
              <path
                d="M309.4 5.6A254.3 254.3 0 0 0 75 75 254.3 254.3 0 0 0 0 256c0 57 19.2 112.6 54.1 157.4a37.7 37.7 0 0 0 5 47.4 37.8 37.8 0 0 0 53.8 0 37.7 37.7 0 0 0 0-53.7A37.7 37.7 0 0 0 69 400 236.3 236.3 0 0 1 305.2 25.2a10 10 0 1 0 4.2-19.6zm-236 415.6a18 18 0 0 1 25.4 0 17.9 17.9 0 0 1 0 25.5 18 18 0 0 1-25.5-25.5zM457.9 98.6a37.7 37.7 0 0 0-5-47.4 37.7 37.7 0 0 0-53.8 0 37.8 37.8 0 0 0 0 53.7A37.7 37.7 0 0 0 443 112a236.3 236.3 0 0 1-228.7 376.3 10 10 0 0 0-3.5 19.7A254.3 254.3 0 0 0 437 437a254.3 254.3 0 0 0 75-181c0-57-19.2-112.6-54.1-157.4zm-19.2-7.8a17.9 17.9 0 0 1-25.5 0 18 18 0 1 1 25.5 0zM168.1 475.1l-3.7 9.3 3.7-9.3a10 10 0 0 0-7.5 18.5l.3.2a10 10 0 0 0 7.2-18.7zM351.8 18.5h-.2a10 10 0 0 0-7.4 18.5h.1a10 10 0 0 0 13-5.4c2.1-5.2-.4-11-5.5-13z" />
            </svg>
            <h1 class="px-4 text-xl hover:text-main_secondary">Farmify</h1>
          </router-link>
        </div>
        <button @click="pushMenu" class="absolute top-0 right-0 mt-1 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="svg-lg svg-dark" viewBox="0 0 512 512">
            <path
              d="M176.8 0H59.2A59.3 59.3 0 000 59.2v117.6A59.3 59.3 0 0059.2 236h117.6a59.3 59.3 0 0059.2-59.2V59.2A59.3 59.3 0 00176.8 0zM196 176.8c0 10.6-8.6 19.2-19.2 19.2H59.2A19.2 19.2 0 0140 176.8V59.2C40 48.6 48.6 40 59.2 40h117.6c10.6 0 19.2 8.6 19.2 19.2v117.6zM452 0H336c-33 0-60 27-60 60v116c0 33 27 60 60 60h116c33 0 60-27 60-60V60c0-33-27-60-60-60zm20 176c0 11-9 20-20 20H336c-11 0-20-9-20-20V60c0-11 9-20 20-20h116c11 0 20 9 20 20v116zM176.8 276H59.2A59.3 59.3 0 000 335.2v117.6A59.3 59.3 0 0059.2 512h117.6a59.3 59.3 0 0059.2-59.2V335.2a59.3 59.3 0 00-59.2-59.2zM196 452.8c0 10.6-8.6 19.2-19.2 19.2H59.2A19.2 19.2 0 0140 452.8V335.2c0-10.6 8.6-19.2 19.2-19.2h117.6c10.6 0 19.2 8.6 19.2 19.2v117.6zM452 276H336c-33 0-60 27-60 60v116c0 33 27 60 60 60h116c33 0 60-27 60-60V336c0-33-27-60-60-60zm20 176c0 11-9 20-20 20H336c-11 0-20-9-20-20V336c0-11 9-20 20-20h116c11 0 20 9 20 20v116z" />
          </svg>
        </button>
      </div>

      <div
        class="sortby absolute top-0 border-2 border-main_secondary left-0 md:hidden mt-16 ml-4 md:mt-0 w-48 flex bg-main_primary px-2 py-2 rounded-sm text-bg_primary"
        style="z-index: 300">
        <div class="icon pl-2">
          <svg class="svg-md svg-dark" viewBox="-5 0 394 394" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M367.8 0H16.6c-6.2 0-12 3.4-14.8 9a16.7 16.7 0 001.3 17.4l128.7 181.3.2.1c4.6 6.4 7.2 14 7.2 21.9v147.8a16.4 16.4 0 0022.9 15.2l72.3-27.6c6.5-2 10.8-8 10.8-15.4v-120c0-7.9 2.5-15.5 7.2-21.9l.1-.1L381.2 26.4A16.7 16.7 0 00382.5 9c-2.8-5.6-8.5-9-14.7-9zm0 0" />
          </svg>
        </div>
        <div id="sortBy" class="px-2 ml-2 cursor-pointer">
          <TheFilterComponent :LocationFilter="false" :Type="'Map'" />
        </div>
      </div>

      <!-- Tablet & Desktop Menu -->
      <div id="menu" style="z-index: 100" title="Menu"
        class="hidden md:block absolute w-64 h-12 rounded-sm border-2 border-main_secondary top-0 right-0 mt-56 mr-6 text-dark bg-light">
        <div class="sortby mt-3 ml-2 w-64 flex">
          <div class="icon pl-2">
            <svg class="svg-md svg-darkColor" viewBox="-5 0 394 394" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M367.8 0H16.6c-6.2 0-12 3.4-14.8 9a16.7 16.7 0 001.3 17.4l128.7 181.3.2.1c4.6 6.4 7.2 14 7.2 21.9v147.8a16.4 16.4 0 0022.9 15.2l72.3-27.6c6.5-2 10.8-8 10.8-15.4v-120c0-7.9 2.5-15.5 7.2-21.9l.1-.1L381.2 26.4A16.7 16.7 0 00382.5 9c-2.8-5.6-8.5-9-14.7-9zm0 0" />
            </svg>
          </div>
          <div id="sortBy" class="ml-2 px-2 cursor-pointer">
            <TheFilterComponent :LocationFilter="false" :Type="'Map'" />
          </div>
        </div>
      </div>

      <div class="buttons absolute bottom-0 left-0 mb-12 ml-4 flex text-xl cursor-pointer" style="z-index: 300">
        <div @click="handleZoom('in')" id="zoomIn"
          class="px-4 py-2 bg-bg_primary hover:bg-bg_secondary text-main_primary rounded-l-sm">+</div>
        <div @click="handleZoom('out')" id="zoomIn"
          class="px-4 py-2 bg-bg_primary hover:bg-bg_secondary text-main_primary rounded-r-sm">-</div>
      </div>

      <!-- <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="_media/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc> -->

      <!-- Groups -->
      <vl-overlay v-for="item in groupData" :key="item.id" :id="item.id" :position="item.geoLocation">
        <button @click="setActiveGroup(item)" :class="{'hidden': activeGroup == item.id}"
          class="group px-5 py-2 cursor-pointer rounded-full border-2 border-bg_primary text-xl text-bg_primary bg-main_primary hover:bg-blue_active">{{getActiveNumberInGroup(item)}}</button>
      </vl-overlay>

      <!-- Small Marker items -->
      <vl-overlay v-for="item in markerData" :key="item.id" :id="item.id" :position="item.geoLocation"
        :offset="handleOffset(item.id)">
        <template v-if="getActiveMarker(item)">
          <div @click="setActiveMarker(item)" style="width: 60px; height: 50px"
            class="icon front flex cursor-pointer justify-around rounded-sm relative bg-bg_primary px-4 py-0"
            id="activeBox">
            <div class="arrow-down-small mt-12 ml-1 absolute"></div>
            <div class="crop-icon mt-1">
              <FarmIconHandler v-bind:key="item.id" v-bind:item="item" :alt="item.category" :title="item.category" />
            </div>
          </div>
        </template>
        <template class="relative" v-if="activeMarker == item.id">
          <!-- Full Maker Signed In -->
          <template v-if="auth == true">
            <div style="width: 340px; height: 225px; z-index: 200; top: 22px"
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
              <div
                class="below w-full flex items-center justify-end absolute bottom-0 right-0 mr-4 mb-4 cursor-pointer">
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
          </template>
          <!-- Full Marker Not Signed In -->
          <template v-else>
            <div style="width: 340px; height: 225px; z-index: 200; top: 22px"
              class="bigIcon cursor-pointer text-main_primary front relative bg-bg_primary rounded-sm px-4 py-0"
              v-if="activeMarker == item.id" id="activeBox">
              <div class="crop-icon absolute top-0 right-0 mr-4 mt-2">
                <FarmIconHandler v-bind:key="item.id" v-bind:item="item" :alt="item.category" :title="item.category" />
              </div>
              <div class="textBox absolute w-5/6 h-full">
                <p class="text-xl w-64 px-2 pt-2">A {{item.category}}</p>
                <div class="saveFarm ml-2 mt-2">
                  <svg alt="Save Farm" title="Save Farm" :style="getFill(item.id)" @click="handleSavedFarm(item.id)"
                    @mouseleave="handleActiveButton(0)" class="svg-mds cursor-pointer" viewBox="0 -10 512 511"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M114.6 491.1A27.1 27.1 0 0188 458l33-145.1-111.8-98a27.2 27.2 0 0115.4-47.6l147.8-13.4L231 17a27.2 27.2 0 0150 0l58.4 136.8 147.8 13.4a27.2 27.2 0 0115.5 47.6l-111.7 98 33 145a27.2 27.2 0 01-40.6 29.4L256 411.1l-127.5 76.2a27.3 27.3 0 01-14 3.8zM256 378.3c4.8 0 9.6 1.3 14 3.8l120.2 72-31-137c-2.3-9.7 1-19.9 8.6-26.5l105.4-92.5-139.5-12.7c-10-.9-18.7-7.2-22.6-16.5L256 40l-55.2 129a27.1 27.1 0 01-22.5 16.5L38.7 198l105.5 92.5a27.2 27.2 0 018.6 26.5l-31 137L242 382c4.3-2.5 9.1-3.8 14-3.8zm-84.6-221.9zm169.1 0zm0 0" />
                  </svg>
                  <Tooltip :info="'save'" :active="getActive(5)" :type="'square'" />
                </div>
              </div>
              <div
                class="below w-full flex items-center justify-end absolute bottom-0 right-0 mr-4 mb-4 cursor-pointer">
                <div @click="handleActiveButton(1)" @mouseleave="handleActiveButton(0)" v-if="item.phone != undefined"
                  id="call" title="Phone" alt="Phone" class="cursor-pointer px-1">
                  <svg class="svg-passive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M437 75A256 256 0 1075 437 256 256 0 00437 75zm-49.3 281.6l-13 12.8a68.3 68.3 0 01-64.4 18.5 226.8 226.8 0 01-66-29.6c-18.7-12-36.1-26-51.9-41.9a306.7 306.7 0 01-38.8-47 239 239 0 01-29.2-59.1 68.3 68.3 0 0117-69.7l15.3-15.2c4.2-4.3 11-4.3 15.3 0l48 48c4.2 4.2 4.2 11 0 15.3l-28.2 28.2a23 23 0 00-2.4 29.8 329.3 329.3 0 0078.1 76.7 23.1 23.1 0 0029.5-2.6l27.3-27.6c4.2-4.3 11-4.3 15.3 0l48 48c4.3 4.3 4.3 11.2.1 15.4z" />
                  </svg>
                  <Tooltip :info="'signup'" :active="getActive(1)" :type="'square'" />
                </div>
                <div @click="handleActiveButton(2)" @mouseleave="handleActiveButton(0)" v-if="item.website != undefined"
                  id="website" title="Website" alt="Website" class="cursor-pointer px-1">
                  <svg class="svg-passive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124">
                    <path
                      d="M46 77.8a39.5 39.5 0 0113.5-3.3v-10H44a60 60 0 002 13.3zM47.6 41.4a34.5 34.5 0 0011.8 3v-17c-5.7 1.7-9.7 8.4-11.8 14zM59.5 96.5V79.6a34.5 34.5 0 00-12 3c2.2 5.6 6.2 12.3 12 14zM44 59.5h15.4v-10A39.8 39.8 0 0146 46.2a60 60 0 00-2 13.3zM39 64.5H27.2a34.6 34.6 0 008.2 20 40.5 40.5 0 016-4.4A64.5 64.5 0 0139 64.6zM48 30a34.7 34.7 0 00-9 5.8 36 36 0 004.1 3A38.1 38.1 0 0148 30zM41.4 43.9a40.5 40.5 0 01-6-4.5 34.6 34.6 0 00-8.2 20H39A64.5 64.5 0 0141.4 44zM85 35.8a34.5 34.5 0 00-9-5.8 37.8 37.8 0 015 8.9 36 36 0 004-3.1zM39 88.2a34.7 34.7 0 009 5.8 38.1 38.1 0 01-5-8.9 36 36 0 00-4 3.1zM80 64.5H64.5v10A39.5 39.5 0 0178 77.8a60 60 0 002-13.3zM82.6 43.9A64.5 64.5 0 0185 59.5h11.8a34.6 34.6 0 00-8.2-20 40.5 40.5 0 01-6 4.4zM64.5 27.5v16.9a34.5 34.5 0 0012-3c-2.2-5.6-6.2-12.3-12-14z" />
                    <path d="M62 0a62 62 0 1062 62A62 62 0 0062 0zm28.3 90.3a40 40 0 110-56.6 40 40 0 010 56.6z" />
                    <path
                      d="M82.6 80.2a40.5 40.5 0 016 4.4 34.6 34.6 0 008.2-20H85a64.5 64.5 0 01-2.4 15.6zM76 94a34.5 34.5 0 009-5.8 36 36 0 00-4.1-3A38.1 38.1 0 0176 94zM64.5 79.6v17c5.8-1.7 9.8-8.4 12-14a34.5 34.5 0 00-12-3zM78 46.2a39.8 39.8 0 01-13.5 3.3v10H80a60 60 0 00-2-13.3z" />
                  </svg>
                  <Tooltip :info="'signup'" :active="getActive(2)" :type="'square'" />
                </div>
                <div @click="handleActiveButton(3)" @mouseleave="handleActiveButton(0)" v-if="item.email != undefined"
                  id="mail" title="Email" alt="Email" class="cursor-pointer px-1">
                  <svg class="svg-passive" viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg">
                    <path d="M314.4 144H133.6l90.4 77.5zm0 0" />
                    <path d="M224 240a8 8 0 01-5.2-2L120 153.5V304h208V153.4L229.2 238a8 8 0 01-5.2 1.9zm0 0" />
                    <path
                      d="M224 0a224 224 0 100 448 224 224 0 000-448zm120 312a8 8 0 01-8 8H112a8 8 0 01-8-8V136a8 8 0 018-8h224a8 8 0 018 8zm0 0" />
                  </svg>
                  <Tooltip :info="'signup'" :active="getActive(3)" :type="'square'" />
                </div>
                <div v-if="item.email != undefined" id="easyContact">
                  <button @click="handleActiveButton(4)" @mouseleave="handleActiveButton(0)"
                    class="bg-bg_secondary cursor-pointer hover:bg-main_secondary text-bg_primary rounded-sm text-lg px-4 py-2 ml-2 mr-2">Easy
                    Apply</button>
                  <Tooltip :info="'signup'" :active="getActive(4)" :type="'square'" />
                </div>
              </div>
              <div class="arrow-down mt-56 ml-32 absolute"></div>
            </div>
          </template>
        </template>
      </vl-overlay>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    </vl-map>
  </div>
</template>

<script>
  import farm_functions from "../data/farm_functions";
  import store from "../store";
  import FarmIconHandler from "../components/FarmIconHandler";
  import Tooltip from "../components/Tooltip";
  import TheFilterComponent from "../components/TheFilterComponent";

  export default {
    components: {
      FarmIconHandler,
      TheFilterComponent,
      Tooltip
    },
    data() {
      return {
        auth: store.state.auth,
        markerData: store.state.farms.active,
        zoom: 3.7,
        last_zoom: 0,
        center: [134.75096, -26.77611],
        last_center: [134.75096, -26.77611],
        boundaries: [
          [114, 155],
          [-52, -18]
        ],
        rotation: 0,
        geolocPosition: undefined,
        activeMarkerValue: 0,
        farms_in_groups: [],
        activeGroup: 0,
        activeButton: 0
      }
    },
    computed: {
      activeMarker() {
        return this.activeMarkerValue;
      },
    },
    mounted() {
      this.calculateBoundaries();
      this.calculateGroups();
    },
    watch: {
      zoom: function () {
        this.handleZoom();
      },
      center: function () {
        const step = 250 / (this.zoom ** 2);
        if (Math.abs(this.center[0] - this.last_center[0]) > step || Math.abs(this.center[1] - this.last_center[1]) >
          step) {
          this.calculateBoundaries();
          this.calculateGroups();
          this.last_center = this.center;
        }
      }
    },
    methods: {
      handleOffset(id) {
        if (id == this.activeMarkerValue) {
          return [-160, -270];
        } else {
          return [-30, -60];
        }
      },
      getActiveNumberInGroup(item) {
        return item.farmsIncluded.length;
      },
      setActiveGroup(item) {
        this.farms_in_groups = farm_functions.renderMarkers2(this.groupData, item.id);
        if (this.activeGroup != item.id) {
          this.activeGroup = item.id;
          //this.center = [item.location[0], item.location[1] + (400 / this.zoom ** 3)];
        } else {
          this.activeGroup = 0;
        }
      },
      setActiveMarker(item) {
        if (this.activeMarkerValue != item.id) {
          this.activeMarkerValue = item.id;
          //this.center = [item.location[0], item.location[1] + (400 / this.zoom ** 4)];
        } else {
          this.activeMarkerValue = 0;
        }
      },
      getActiveMarker(item) {
        if (this.activeMarker == item.id) {
          return false
        } else {
          if (this.farms_in_groups.includes(item.id)) {
            return false;
          } else {
            return this.calculateOnMap(item) ? true : false;
          }
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
      handleSavedFarm(id) {
        store.commit("handleSavedFarm", id);
        this.handleActiveButton(5);
      },
      getFill(id) {
        var savedFarms = store.state.profile.data.SavedFarms;
        if (savedFarms.includes(id)) {
          return "fill: #cc6355"
        }
      },
      handleZoom(id = null) {
        if (id != null) {
          if (id == "in") {
            this.zoom++;
          } else {
            if (Number(this.zoom) >= 4.5) {
              this.zoom--;
            }
          }
        }

        if (Math.abs(this.zoom - this.last_zoom) > 1.5) {
          this.last_zoom = this.zoom;
          this.calculateBoundaries();
          this.calculateGroups();
        }
      },
      calculateBoundaries() {
        this.boundaries = farm_functions.renderMapBoundaries(this.center, this.zoom);

      },
      calculateGroups() {
        this.groupData = farm_functions.groupFarms(this.markerData, this.boundaries, this.zoom);
        this.farms_in_groups = farm_functions.renderMarkers2(this.groupData);
      },
      calculateOnMap(item) {
        var location = item.geoLocation;
        var boundaries = this.boundaries;
        if (location[0] >= boundaries[0][0] && location[0] <= boundaries[0][1]) {
          return true;
        } else {
          return false;
        }
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