<script setup>
import { onMounted,getCurrentInstance } from 'vue';
import mark_json from '../assets/location/json/mark.json'
import {ShowControlPanel} from '../Tools/windowEvent.js';

    //地图上所有标记信息，xy位置，描述等
    let markdata = getCurrentInstance().appContext.config.globalProperties.$markdata;

    //markdata处理成{'explore':['chest','lockedChest'],'enemy':[...]}
    //顺便获取每种标记的数量
    let marksType = {};
    let markerCount = {};
    for (let i in markdata){
        marksType[i] = Object.keys(markdata[i]);
        markerCount[i] = {};
        for(let j in markdata[i]){
            markerCount[i][j] = markdata[i][j].length;
        }
    }
    console.log("marker quantity",markerCount)
    //刷新url
    let marker_image = {}
    for (let i in mark_json){
        marker_image[i] = {}
        for(let j in mark_json[i]){
            marker_image[i][j] = new URL(`../assets/mark/${mark_json[i][j]}`, import.meta.url).href
        }
    }
    //将markerCount和marker_image合并成一个对象
    let marker_info = {}
    for (let i in markerCount){
        marker_info[i] ={}
        for(let j in markerCount[i]){
            marker_info[i][j] = [
                marker_image[i][j],
                markerCount[i][j]
            ]
        }
    }
    

onMounted(()=>{
    const pannelDiv = document.getElementById('control_pannel');
    const handleBar = document.getElementsByClassName('right')[0];
    const mask = document.getElementsByClassName('mask')[0];
    handleBar.addEventListener('click',()=>{
        ShowControlPanel(
            pannelDiv, 
            mask,
            pannelDiv.offsetLeft > 0?'show':'hide',
            pannelDiv.offsetWidth
        );
    })
    mask.addEventListener('click',()=>{
        ShowControlPanel(
            pannelDiv, 
            mask,
            'show',
            pannelDiv.offsetWidth
        );
    })

    //窗口大小调整响应改变元素位置
    window.addEventListener('resize', () => {
        if (pannelDiv.offsetLeft < 0)
        pannelDiv.style.left = `${-pannelDiv.offsetWidth}px`;
    })

    //初始化时隐藏
    setTimeout(()=>{
        pannelDiv.style.left = `${-pannelDiv.offsetWidth}px`;
    },500);
    
})
</script>

<script>
    export default {
        methods:{
            hiddenAndShowMark(className){
                
                let marks = document.getElementsByClassName(className);
                if (marks.length==0){return}
                for(let markIndex=0;markIndex<marks.length;markIndex++){  
                    marks[markIndex].style.display = marks[markIndex].style.display==='none'?'block':'none';
                }
            }
            
        }
    }
</script>

<template>
    <div id="control_pannel">
        <div v-for="(kinds,type) in marker_info" class="markGroup">
            <p>{{ type.toUpperCase() }}</p>
            <ul>
                <li v-for="(info,lKinds) in kinds" @click="hiddenAndShowMark(lKinds)">
                    <img :src="info[0]" :alt="lKinds">
                    <a>{{ lKinds }}</a>&nbsp;
                    <a>{{ info[1] }}</a>
                </li>
            </ul>
        </div>
        <div class="div_border top"></div>
        <div class="div_border bottom"></div>
        <div class="div_border left"></div>
        <div class="div_border right wake_up_handle"></div>
    </div>
    <teleport to="body">
        <div class="mask"></div>
    </teleport>
</template>

<style scoped lang="scss">

$out-offset: -2px;
$border-color: #a09255;
$border-size: 7px;
$background-color: #24282e;

.div_border{
    position: absolute;
    background: #a09255;
    // z-index: 1;
    border: none;
}
.top{
    content: '\00a0';
    width: 20%;
    height: $border-size;
    top: $out-offset;
    left: 50%;
    transform: translate(-50%,0);
}
.bottom{
    width: 10%;
    height: $border-size;
    bottom: $out-offset;
    left: 20%;
    transform: translate(-50%,0);
}
.left{
    width: $border-size;
    height: 30%;
    left: $out-offset;
    top: 50%;
    transform: translate(0,-70%);
}
.right{
    width: $border-size;
    height: 30%;
    right: $out-offset - 5px;
    top: 30%;
    cursor: pointer;
}
#control_pannel{
    z-index: 998;
    margin: 0 auto;
    position: absolute;
    top: 2%;
    left: 20px;
    width: 25%;
    height: 95%;
    color: #d6d6d6;
    background:
        linear-gradient(to bottom,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) left top no-repeat,
        linear-gradient(to right,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) left top no-repeat,
        linear-gradient(to bottom,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) right top no-repeat,
        linear-gradient(to left,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) right top no-repeat,

        linear-gradient(to top,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) left bottom no-repeat,
        linear-gradient(to right,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) left bottom no-repeat,
        linear-gradient(to top,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) right bottom no-repeat,
        linear-gradient(to left,$border-color 0px,$border-color $border-size,transparent 3px,transparent 100%) right bottom no-repeat,

        linear-gradient(#24282e 0 0) content-box;
    padding: 5px ;
    background-size: 2rem 2rem;
    transition: all 0.2s ;

    .markGroup:first-child{
        margin-top: 50px;
    }
    .markGroup{
    clear: both;    
    margin-top: 20px;
    p::after{
        content: '\00A0';
        display: block;
        width: 20%;
        height: 5px;
        background-color: #a09255;
        position: relative;
    }
    // p::before{
    //     top: -2.5px;
    //     left: 50%;
    //     transform: translate(-50%,0);
    // }
    p::after{
        bottom: -2.5px;
        left: 50%;
        transform: translate(-50%,0);
    }
    p{
        font-size: 20px;
        margin: 20px 0 20px 0;
        text-align: center;
    }
    ul{
        display: grid;
        grid: repeat(4,40px) / repeat(2,50%);
        padding-left: 20px;
        li{
            width: 100%;
            height: 100%;
            // grid-column: 1/3;
        }
    }
}
}
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
li{
    width: 25%;
    float: left;
    cursor: pointer;
}
img{
    width: 20px;
    margin-right: 5px;
    vertical-align: middle;
}
a:link{
    text-decoration: none;
    color: #000;
}
a:visited{
    text-decoration: none;
    color: #000;
}
a{
    text-decoration: none;
    color: #000;
}
.mask{
    position: absolute;
    top: 0;
    left:0;
    content: '\00A0';
    z-index: 997;
    background-color: #00000050;
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: none;
}
.wake_up_handle{
    box-shadow: 4px 0 5px rgba(0, 0, 0, 0.5);
}
</style>


