import {pixtoMap} from './unitConversion.js';
import L from 'leaflet';
/**
 * 
 * @param {list} xy 像素xy轴位置
 * @param {object} attr {标记元数据}
 */
export function addmark(xy,attr){
    const marker = L.marker(pixtoMap(xy), {
        icon: attr['icon'] || L.icon({
            iconUrl: attr['iconUrl'] || 'https://cdn.jsdelivr.net/gh/yangzhongzhu/yangzhongzhu.github.io@master/src/img/marker.png',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
            popupAnchor: [0, -10]
        })
    });
    return marker;
}