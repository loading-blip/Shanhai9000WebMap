<script setup>
import LeafletMap from './components/LeafLetMap.vue';
import ControlPannel from './components/controlPannel.vue';
</script>

<template>
  <LeafletMap />
  <ControlPannel />
</template>

<script>

</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  /* transform: translate(-50%, 0); */

}
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#control_pannel{
  margin: 100px 25% 0 25%;
}
</style>
