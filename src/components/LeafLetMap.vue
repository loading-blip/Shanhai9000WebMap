<script setup>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { onMounted,getCurrentInstance,createApp } from 'vue';
import { pixtoMap } from '../Tools/unitConversion.js';
import { addmark,getImageSize } from '../Tools/markTools.js';
import markDescribe from './markDescribe.vue';
import '../assets/marker.scss'
const imageWidth = 38400;
const imageHeight = 12722;
const markWidth = 40;
const imageScale = 1.2;

//地图上显示的所有不重复图标名称 such as:['vue.svg','chest.png']
let setMark = getCurrentInstance().appContext.config.globalProperties.$setMark;
//地图上所有标记信息，xy位置，描述等
let markdata = getCurrentInstance().appContext.config.globalProperties.$markdata;
//每个图标使用的图标映射表
let markImg = getCurrentInstance().appContext.config.globalProperties.$markImg;

//将会使用的img列表
let iconList = {}




onMounted(async ()=>{

  // https://leafletjs.cn/reference.html#divicon
  for (let i in setMark) {
    let url = new URL(`../assets/mark/${setMark[i]}`, import.meta.url).href
    const imgSize = await getImageSize(url);
    const iconSize = [markWidth, imgSize[1] * markWidth / imgSize[0]];
    iconList[setMark[i]] = new L.divIcon({
      className: 'custom-icon',
      iconSize: iconSize,
      iconAnchor: [iconSize[1] / 2, iconSize[0] / 2],
      popupAnchor: [(markWidth * imageScale-markWidth)/2, -iconSize[1] / 2*imageScale],
      html: `<img src="${url}" alt="${setMark[i]}" id="${setMark[i]}" style="width:${markWidth * imageScale}px"/>`
    });
  }


  const crs = L.CRS.Simple;
  crs.transformation = new L.Transformation(
    1,    // x scale系数
    0,    // x offset量
    1,    // y scale系数
    0     // y offset量
  )
  const map = L.map('map',{crs: crs,attributionControl: false,zoomControl: false});
  L.tileLayer('./src/assets/maps/maps/{z}/{x}/{y}.png', {
        attribution: 'Local Map',
        noWrap: true,
        tileSize: 500,
        errorTileUrl: '',
        maxZoom: 7,
        minZoom: 0
      }).addTo(map);
  // map.attributionControl.setPrefix('');
  map.setView(pixtoMap([imageWidth/2,imageHeight/2]), 3)
  //开始渲染标记
  for (let types in markdata){
      for (let i in markdata[types]){
      //每个类型中的mark
      for (let j=0;j<markdata[types][i].length;j++){
        //若为true:使用自定义图标
        let has_custom_image = Object.keys(markdata[types][i][j]).indexOf('custom-image') !== -1;
        let mark = addmark(
          [
            markdata[types][i][j]['coordinates']['x'],
            markdata[types][i][j]['coordinates']['y']
          ],
          //处理自定义图标
          {'icon': has_custom_image ?iconList[markdata[types][i][j]['custom-image']]:iconList[markImg[i]]},
        );
        let attr = {
            belong: markdata[types][i][j]['belong'],
            coordinates: [markdata[types][i][j]['coordinates']['x'], markdata[types][i][j]['coordinates']['y']],
            description: markdata[types][i][j]['description'],
            markURL: new URL(`../assets/mark/${has_custom_image ?markdata[types][i][j]['custom-image']:markImg[i]}`, import.meta.url).href,
        }
        if(types === 'explore'){
          attr = { ...attr, content:markdata[types][i][j]['content']}
        }
        if(types === 'enemy'){
          attr = { ...attr, spoil:markdata[types][i][j]['spoil']}
        }
        if(i === 'lockedChest'){
          attr = { ...attr, ne_require: markdata[types][i][j]['require']}
        }
        //渲染标记提示中的组件
        const markContainer = document.createElement('div');
        createApp(markDescribe, attr).mount(markContainer);
        mark.bindPopup(
          markContainer,{closeButton:false,minWidth: 300, maxHeight:400 }
        )
        mark.addTo(map);
        mark._icon.classList.add(i);
        mark._icon.classList.add(markdata[types][i][j]['belong'].split("-")[0]+"_area");
      }
    }
  }

  //四极定位
  // L.marker(pixtoMap([0,0])).addTo(map);
  // L.marker(pixtoMap([0,12722])).addTo(map);
  // L.marker(pixtoMap([38400,0])).addTo(map);
  // L.marker(pixtoMap([38400,12722])).addTo(map);
})
</script>

<template>
    <div id="map"></div>
</template>

<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
  
}
.leaflet-container {
  background-color: #f3eae1;
}

</style>
