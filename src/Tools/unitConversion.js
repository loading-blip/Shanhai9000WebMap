/**
 * 
 * @param {int} x 所在x轴位置
 * @param {int} y 所在y轴位置
 * @param {list} mapW 地图宽度范围 默认[0,300]
 * @param {list} mapH 地图高度范围 默认[0.6,100]
 * @param {list} imgWH 图片的宽高 默认[38400,12722]
 * @returns {object} return [y,x]返回一个对象，包含x和y的值
 */
export function pixtoMap(xy,mapW=[0,300],mapH=[0.6,100],imgWH=[38400,12722]) {
//y范围0.6-100
//x范围0-300
//图片x 38400
//图片y 12722


let lat = (xy[1] / imgWH[1]) * (mapH[1]-mapH[0]);
let lng = (xy[0] / imgWH[0]) * (mapW[1]-mapW[0]);
return [lat, lng];
}