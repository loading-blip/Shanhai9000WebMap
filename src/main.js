import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import explore_json from './assets/location/json/explore.json'
import mark_json from './assets/location/json/mark.json'
import 'bootstrap'
// python gdal2tiles,pyyaml
//
const markdata = {
    "explore": explore_json,
};
//展平mark_json，去除顶级键，列出所有需要的标记
var markImg = {};
var setMark = [];
for (let key in mark_json) {
    for(let key2 in mark_json[key]) {
        markImg[key2] = mark_json[key][key2];
        if (setMark.indexOf(mark_json[key][key2]) === -1) {
            setMark.push(mark_json[key][key2]);
        }
    }
}

const app = createApp(App)
app.config.globalProperties.$setMark = setMark
app.config.globalProperties.$markdata = markdata
app.config.globalProperties.$markImg = markImg
app.mount('#app')
