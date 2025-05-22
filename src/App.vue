<script setup>
import LeafletMap from './components/LeafLetMap.vue';
import ControlPannel from './components/controlPannel.vue';
import 'bootstrap/dist/css/bootstrap.css';
</script>

<template>
  <LeafletMap />
  <ControlPannel />
  <div id="versionBar">
    <p>Preview Version Ver 0.0.1.1-fix</p>
    <p>Map collection progress (0.99/26)</p>
    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 1%"></div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss">
#app {
  width: 100%;  
  height: 100vh;
  /* transform: translate(-50%, 0); */

}
#versionBar{
  position: absolute;
  left: 50%;
  bottom: 100px;
  transform: translate(-50%,0);
  img{
    vertical-align: middle;
  }
}
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#control_pannel{
  margin: 100px 25% 0 25%;
}
</style>
