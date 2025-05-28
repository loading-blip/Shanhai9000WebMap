import { createApp,reactive } from 'vue'
// import './style.css'
import App from './App.vue'
import explore_json from './assets/location/json/explore.json'
import enemy_json from './assets/location/json/enemy.json'
import mark_json from './assets/location/json/mark.json'
import Yi_json from './assets/location/json/Yi.json'
import submittedItem_json from './assets/location/json/submittedItem.json'

import 'bootstrap'
// python gdal2tiles,pyyaml
//
const markdata = {
    "enemy": enemy_json,
    "explore": explore_json,
    "submittedItem": submittedItem_json,
    "Yi" :Yi_json,
};
//展平mark_json，去除顶级键，列出所有需要的标记
let markImg = {};
//地图上显示的所有不重复图标名称 such as:['vue.svg','chest.png']
let setMark = [];
//遍历每个种类id范围 [min1,typename1,min2,typename2，...]
let markIdRange = [];
//已标记标记点
let markedMarkList = reactive({})

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
//处理上述三个变量
for(let type in markdata){
    for (let subType in markdata[type]) {
        //获取最低的id放markIdRange里
        markIdRange.push(markdata[type][subType][0]['id'],subType)
        for (let item in markdata[type][subType]) {
            //坏了，是三维数据遍历 O(n^3)
            let markItem = markdata[type][subType][item]
            if (Object.keys(markItem).indexOf('custom-image') !== -1 ){
                markImg[markItem['id']] =markItem['custom-image'];
                //如果setMark中没有这个图标名称，则添加
                if(setMark.indexOf(markItem['custom-image']) === -1){
                    setMark.push(markItem['custom-image']);
                }
            }
        }
    }
}

console.log('marker json',mark_json)
console.log('All markers',markImg)
console.log('unique marker img',setMark)
console.log('marker id range',markIdRange)

const app = createApp(App)
app.config.globalProperties.$setMark = setMark
app.config.globalProperties.$markdata = markdata
app.config.globalProperties.$markImg = markImg
app.config.globalProperties.$markedMarkList = markedMarkList
app.config.globalProperties.$markIdRange = markIdRange


app.provide('markedMarkList', markedMarkList)

app.mount('#app')
