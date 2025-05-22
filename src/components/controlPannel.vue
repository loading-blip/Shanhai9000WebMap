<script setup>
import { onMounted,getCurrentInstance } from 'vue';
import mark_json from '../assets/location/json/mark.json'
import {ShowControlPanel} from '../Tools/windowEvent.js';

    //每个图标使用的图标映射表
    let markImg = getCurrentInstance().appContext.config.globalProperties.$markImg;
    //地图上所有标记信息，xy位置，描述等
    let markdata = getCurrentInstance().appContext.config.globalProperties.$markdata;
    //刷新url
    let markImg_url = {}
    for(let i in mark_json){
        markImg_url[i] = {}
        for(let j in mark_json[i]){
            markImg_url[i][j] = new URL(`../assets/mark/${mark_json[i][j]}`, import.meta.url).href
        }
    }

    //markdata处理成{'explore':['chest','lockedChest'],'enemy':[...]}
    let marksType = {};
    for(let i in markdata){
        marksType[i] = Object.keys(markdata[i]);
    }
onMounted(()=>{
    const pannelDiv = document.getElementById('control_pannel');
    const handleBar = document.getElementsByClassName('right')[0];
    const mask = document.getElementsByClassName('mask')[0];
    let pannelSize = {
        width: pannelDiv.offsetWidth,
        height: pannelDiv.offsetHeight
    }
    handleBar.addEventListener('click',()=>{
        ShowControlPanel(
            pannelDiv, 
            mask,
            pannelDiv.offsetLeft > 0?'show':'hide',
            pannelSize['width']
        );
    })
    mask.addEventListener('click',()=>{
        ShowControlPanel(
            pannelDiv, 
            mask,
            'show',
            pannelSize['width']
        );
    })

    setTimeout(()=>{
        pannelDiv.style.left = `${-pannelSize['width']}px`;
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
        <div class="div_border top"></div>
        <div class="div_border bottom"></div>
        <div class="div_border left"></div>
        <div class="div_border right"></div>
        <div v-for="(kinds,type) in markImg_url" class="markOutline">
            <p>{{ type }}</p>
            <ul>
                <li v-for="(url,lKinds) in kinds" @click="hiddenAndShowMark(lKinds)">
                    <img :src="url" :alt="lKinds">
                    <a>{{ lKinds }}</a>
                </li>
            </ul>
        </div>
    </div>
    <teleport to="body">
        <div class="mask">单击隐藏</div>
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
    text-align: center;
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
    padding: 5px;
    background-size: 2rem 2rem;
    transition: all 0.2s;
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
.markOutline{
    clear: both;
    margin-top: 50px;
    p{
        font-size: 20px;
        margin-bottom: 10px;
    }
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
</style>


