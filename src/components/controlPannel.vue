<script setup>
import { onMounted,getCurrentInstance } from 'vue';
import mark_json from '../assets/location/json/mark.json'

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
</template>

<style scoped lang="scss">
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
}
</style>


