<template>
  <div id="map" class="w-full flex-col">
    <div id="testButtonGroup">
    </div>
    <div id="header" class="hidden md:block text-4xl mt-24">
      <h1 class="mb-8">Map</h1>
    </div>
    <MapContainer class="w-full h-screen md:h-600px" />
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