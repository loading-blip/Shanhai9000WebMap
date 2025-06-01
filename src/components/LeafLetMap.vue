<script setup>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { onMounted,getCurrentInstance,createApp,inject} from 'vue';
import { pixtoMap } from '../Tools/unitConversion.js';
import { addmark,getImage} from '../Tools/markTools.js';
import markDescribe from './markDescribe.vue';
import '../assets/marker.scss'
const imageWidth = 38400;
const imageHeight = 12722;
const markWidth = 20;
const imageScale = 1.2;

//地图上所有标记信息，xy位置，描述等
let markdata = getCurrentInstance().appContext.config.globalProperties.$markdata;
//每个图标使用的图标映射表
let markImg = getCurrentInstance().appContext.config.globalProperties.$markImg;
//标记了已完成的图标
const markedMarkList = inject('markedMarkList')
//设置：默认显示的标记点小类
let defaultShowMarkerType = getCurrentInstance().appContext.config.globalProperties.$defaultShowMarkerType;


//重定向图标
let markImagesLink = {}
for (let key in markImg){
  markImagesLink[key] = new URL(`/mark/${markImg[key]}`.replace(/\/\//g, '/'), import.meta.url).href
}


onMounted(async ()=>{
  //预加载图片
  let markerTasks = [];
  for (let types in markdata) {
    for (let i in markdata[types]) {
      for (let j = 0; j < markdata[types][i].length; j++) {
        let data = markdata[types][i][j];
        let has_custom_image = Object.keys(data).includes('custom-image');
        let markName = has_custom_image ? data['custom-image'] : markImg[i];
        let imgUrl = new URL(`/mark/${markName}`.replace(/\/\//g, '/'), import.meta.url).href;
        markerTasks.push({
          types, i, j, data, has_custom_image, markName, imgUrl
        });
      }
    }
  }
  const imgLabels = await Promise.all(markerTasks.map(task => getImage(task.imgUrl)));

  // 用于保存所有 marker 及其元数据，方便后续缩放时重设 icon
  let allMarkers = [];

  const crs = L.CRS.Simple;
  crs.transformation = new L.Transformation(
    1,    // x scale系数
    0,    // x offset量
    1,    // y scale系数
    0     // y offset量
  )
  const map = L.map('map',{crs: crs,attributionControl: false,zoomControl: false});
  L.tileLayer('/maps/maps/{z}/{x}/{y}.png', {
        attribution: 'Local Map',
        noWrap: true,
        tileSize: 500,
        errorTileUrl: '',
        maxZoom: 7,
        minZoom: 0
      }).addTo(map);
  map.setView(pixtoMap([imageWidth/2,imageHeight/2]), 3)

  //开始渲染标记
  markerTasks.forEach((task, idx) => {
    const { types, i, j, data, has_custom_image, markName, imgUrl } = task;
    const imgLabel = imgLabels[idx];
    let iconSize = [markWidth, imgLabel.height * markWidth / imgLabel.width];
    let icon = new L.divIcon({
      className: 'custom-icon',
      iconSize: iconSize,
      iconAnchor: [iconSize[1] / 2, iconSize[0] / 2],
      popupAnchor: [(markWidth * imageScale - markWidth) / 2, -iconSize[1] / 2 * imageScale],
      html: `<img src="${imgLabel.src}" alt="${markName}" style="width:${markWidth * imageScale}px"/>`
    });

    let mark = addmark(
      [data['coordinates']['x'], data['coordinates']['y']],
      { icon }
    );
    let attr = {
      belong: data['belong'],
      coordinates: [data['coordinates']['x'], data['coordinates']['y']],
      description: data['description'],
      markURL: has_custom_image
        ? new URL(`/mark/${data['custom-image']}`.replace(/\/\//g, '/'), import.meta.url).href
        : markImagesLink[i],
      id: data['id']
    };
    if (types === 'explore') attr = { ...attr, content: data['content'] };
    if (types === 'enemy') attr = { ...attr, spoil: data['spoil'] };
    if (i === 'lockedChest') attr = { ...attr, ne_require: data['require'] };

    //渲染标记提示中的组件
    const markContainer = document.createElement('div');
    const innerApp = createApp(markDescribe, attr);
    innerApp.provide('markedMarkList', markedMarkList);
    innerApp.mount(markContainer);
    mark.bindPopup(markContainer, { closeButton: false, minWidth: 300, maxHeight: 400 });

    mark.addTo(map);
    mark._icon.classList.add(i);
    mark._icon.classList.add(data['belong'].split("-")[0] + "_area");
    mark._icon.id += ('mark_' + data['id']);

    const markAddedClass = [i, data['belong'].split("-")[0] + "_area"];
    const markIdList = mark._icon.id;

    //没在defaultShowMarkerType列表中的图标会被隐藏
    if (!defaultShowMarkerType.includes(i))
      mark._icon.style.display = "none";
    else
      mark._icon.style.display = "inline";
    //在markedMarkList列表中的图标会被降低透明度
    if (markedMarkList['id'].indexOf(data['id'])!==-1){
      mark._icon.style.opacity = 0.3;
    }
    allMarkers.push({
      mark,
      markName,
      imgLabel,
      markAddedClass,
      markIdList
    });
  });

  // 缩放时动态调整 marker 大小
  map.on('zoomend', function () {
    let zoom = map.getZoom();
    //fx = 1.1^x
    let scale = 1.1 ** zoom;
    allMarkers.forEach(({ mark, markName, imgLabel, markAddedClass, markIdList }) => {
      let iconSize = [markWidth, imgLabel.height * markWidth / imgLabel.width];
      let icon = new L.divIcon({
        className: 'custom-icon',
        iconSize: iconSize,
        iconAnchor: [iconSize[1] / 2, iconSize[0] / 2],
        popupAnchor: [(markWidth * scale - markWidth) / 2, -iconSize[1] / 2 * scale],
        html: `<img src="${imgLabel.src}" alt="${markName}" style="width:${markWidth * scale}px"/>`
      });
      mark.setIcon(icon);
      mark._icon.classList.add(...markAddedClass);
      mark._icon.id = markIdList;
    });
  });
  
  //四极定位
  // L.marker(pixtoMap([0,0])).addTo(map);
  // L.marker(pixtoMap([0,12722])).addTo(map);
  // L.marker(pixtoMap([38400,0])).addTo(map);
  // L.marker(pixtoMap([38400,12722])).addTo(map);
});
</script>

<template>
    <div id="map"></div>
</template>

<style lang="scss">
$out-offset: -2px;
$border-color: #a09255;
$border-size: 7px;
$background-color: #24282e90;
#map {
  width: 100%;
  height: 100%;
  
}
.leaflet-container {
  background-color: #212326; //#f3eae1
}
.leaflet-popup {
  border: none;
  .leaflet-popup-content-wrapper{
    border-radius: 0;
    color: white;
    background-color: $background-color;
    border: 3px solid $border-color;
  }
    
}

</style>
