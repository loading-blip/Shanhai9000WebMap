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
      <p>Preview version 0.0.2-fix</p>
      <p>Map collection progress (0.99/26)</p>
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
