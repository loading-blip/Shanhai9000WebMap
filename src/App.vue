<script setup>
import { onMounted } from 'vue';
import LeafletMap from './components/LeafLetMap.vue';
import ControlPannel from './components/controlPannel.vue';
import {DivDraggable} from './tools/windowEvent.js';
import 'bootstrap/dist/css/bootstrap.css';

onMounted(() => {
  let versionBar = document.getElementById('versionBar');
  DivDraggable(versionBar);
});
</script>

<template>
  <LeafletMap />
  <ControlPannel />
    <div id="versionBar">
      <div class="close_btn" @click="closeVersionBar()">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 17.5 17.5">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>
      <p>Preview version 0.1-fix</p>
      <p>Map collection progress (1/26)</p>
      <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 1%"></div>
      </div>
    </div>
</template>

<script>
 export default {
  name: 'App',
  components: {
    LeafletMap,
    ControlPannel
  },
  methods: {
    closeVersionBar() {
      const versionBar = document.getElementById('versionBar');
      versionBar.style.display = 'none';
    }
  }
 }
</script>

<style lang="scss">
#app {
  width: 100%;  
  height: 100%;
  /* transform: translate(-50%, 0); */

}
#versionBar{
  z-index: 999;
  $border-color: #a09255;
  $border-size: 5px;
  position: absolute;
  left: 50%;
  top: 60%; 
  // bottom: 50px;
  // transform: translate(-50%,0);
  background: 
    linear-gradient(to bottom,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) left top no-repeat,
    linear-gradient(to right,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) left top no-repeat,
    linear-gradient(to bottom,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) right top no-repeat,
    linear-gradient(to left,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) right top no-repeat,
    linear-gradient(to top,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) left bottom no-repeat,
    linear-gradient(to right,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) left bottom no-repeat,
    linear-gradient(to top,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) right bottom no-repeat,
    linear-gradient(to left,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) right bottom no-repeat,
    linear-gradient(to right,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) left center no-repeat,
    linear-gradient(to left,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) right center no-repeat,
    linear-gradient(to top,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) bottom center no-repeat,
    linear-gradient(to bottom,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) top center no-repeat,
    #24282e;
  background-size: 2.5rem 1.5rem;
  color: #d6d6d6;
  padding: 20px;
  text-align: center;
  cursor: grab;
  .close_btn{
    position: absolute;
    left: 10px;
    top: 5px;
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
}
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f3eae1;
}
</style>
