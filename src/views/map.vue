<template>
  <div id="map" class="w-full flex-col">
    <div id="testButtonGroup">
    </div>
    <div id="header" class="hidden md:block text-4xl mt-32">
      <h1 class="">Map</h1>
    </div>
    <MapContainer class="w-full h-screen md:h-600px md:mt-6" />
  </div>
</template>

<script>
  import MapContainer from "../components/MapContainer2"

  export default {
    name: 'Map',
    components: {
      MapContainer
    },
    methods: {

    }
  };
</script>