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
/**
 * 
 * @param {String} url 标记图片
 * @returns {list} Image()
 */
export function getImage(url) {
    return new Promise(function (resolve, reject) {
        const image_icon =  new Image();
        image_icon.onload = function () {
            resolve(image_icon);
        };
        image_icon.onerror = function () {
            reject(new Error('error reading img file:'+ url));
        };
        image_icon.src = url;
    });
}


/**
 * 
 * @param {list} markdata 标记点位置
 * @param {number} id 标记点id
 * @returns {String} 标记点所在分类
 */
export function idToMarkType(markdata,id){

}

/**
 * 
 * @param {String} markType 标记点类型，即最小类
 * @param {object} markedMarkList 已标记标记点清单
 * @param {list} markIdRange 标记点id范围列表
 */
export function getHideMarkerQuantity(markType,markedMarkList,markIdRange){
    // markIdRange[n-1] 范围第一个id
    // markIdRange[n] id所在分类
    // markIdRange[n+1] 范围最后一个id+1，即类型最后一个id是markIdRange[n+1]-1
    let markTypeIndex = markIdRange.indexOf(markType)
    if (markTypeIndex===-1){
        throw new Error(`${markType} not in markIdRange`)
    }
    let count = 0;
    for(let i in markedMarkList)
    {
        i=parseInt(i);
        if (markIdRange[markTypeIndex-1]<=i && i<markIdRange[markTypeIndex+1]){
            count++;
        }
    }
    return count
}