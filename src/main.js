import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import explore_json from './assets/location/json/explore.json'
import enemy_json from './assets/location/json/enemy.json'
import mark_json from './assets/location/json/mark.json'
import 'bootstrap'
// python gdal2tiles,pyyaml
//
const markdata = {
    "explore": explore_json,
    "enemy": enemy_json,
};
//展平mark_json，去除顶级键，列出所有需要的标记
var markImg = {};
//地图上显示的所有不重复图标名称 such as:['vue.svg','chest.png']
var setMark = [];

//type 大类 [enemy,explore] subType 小类 [chest,enemy,explore] 详见yaml文件
for (let type in mark_json) {
    for(let subType in mark_json[type]) {
        markImg[subType] = mark_json[type][subType];
        //如果setMark中没有这个图标名称，则添加
        if (setMark.indexOf(mark_json[type][subType]) === -1) {
            setMark.push(mark_json[type][subType]);
        }
    }
}
for(let type in markdata){
    for (let subType in markdata[type]) {
        for (let item in markdata[type][subType]) {
            //坏了，是三维数据遍历 O(n^3)
            if (Object.keys(markdata[type][subType][item]).indexOf('custom-image') !== -1 ){
                markImg[markdata[type][subType][item]['id']] =markdata[type][subType][item]['custom-image'];
                //如果setMark中没有这个图标名称，则添加
                if(setMark.indexOf(markdata[type][subType][item]['custom-image']) === -1){
                    setMark.push(markdata[type][subType][item]['custom-image']);
                }
            }
        }
    }
}

console.log('marker json',mark_json)
console.log('All markers',markImg)
console.log('unique marker img',setMark)

const app = createApp(App)
app.config.globalProperties.$setMark = setMark
app.config.globalProperties.$markdata = markdata
app.config.globalProperties.$markImg = markImg
app.mount('#app')
