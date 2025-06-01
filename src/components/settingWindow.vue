<script setup>
import { onMounted,inject } from 'vue';
import {RegDraggableHandle,getHighestZIndexOptimized} from '../Tools/windowEvent.js';
import Cookies from 'js-cookie';

let settingElement; 

//标记了已完成的图标
const markedMarkList = inject('markedMarkList')

onMounted(()=>{
    settingElement = document.getElementById('setting_window');
    const settingTitle = document.getElementById('setting_window').getElementsByClassName('title_bar')[0];
    RegDraggableHandle(settingTitle);
})
function closeWindow(){settingElement.style.display = 'none'; }
function showVersionBar() {
    const versionBar = document.getElementById('version_bar');
    versionBar.style.zIndex=getHighestZIndexOptimized()+1;
    versionBar.style.display='block';
    versionBar.style.left = `${window.innerWidth/2}px`;
    versionBar.style.top = `${window.innerHeight/2}px`;
    
}
function resetMarkedMarker(){
    for(let id of markedMarkList['id']){
        document.getElementById(`mark_${id}`).style.opacity = 1;
    }
    markedMarkList['id'] = [];
    Cookies.set('markedMarker',markedMarkList['id']);
}
function resetSetting(){}
function editMode(){}
</script>

<template>

    <div class="inner_window" id="setting_window">
        <div class="title_bar">
            <h2>设置</h2>
            <a class="close_window" @click="closeWindow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
            </a>
        </div>
        <div class="domain">
            <!-- checkbox 打开时显示版本信息窗口 -->
            <label class="checkbox_label">
                <input type="checkbox" name="" id="version_control">
                <a>&nbsp;打开时显示版本信息窗口</a>
            </label>
            <!-- button 重置所有已标记的标记点 -->
            <input type="button" @click="resetMarkedMarker" value="忘记已标记" id="reset_marked_marker">
            <!-- button 恢复默认设置 弹出提示框（包括已标记的标记点） -->
            <input type="button" @click="resetSetting" value="恢复默认" id="reset_setting">
            <!-- button 编辑模式入口 当前灰色（未来计划） -->
            <input type="button" @click="editMode" value="编辑模式" id="edit_mode">
            <!-- text 版本信息 点击后 信息窗口显示，移至最前，移至中间 -->
            <p id="about_version" @click="showVersionBar">版本信息</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "sass:color";
$title_bar_height:40px;
$border-color: #a09255;
#setting_window{
    display: none;
    position: absolute;
    left: 50%;
    top: 20%;
    height: 300px;
    width: 400px;

}
#setting_window{
    cursor:default;
    .title_bar{
        $border-size: 5px;
        height: $title_bar_height;
        position: absolute;
        top: 0;
        width: 100%;
        padding-top: 15px;
        cursor: grab;
        h2{
            font-size: 20px;
            color: white;
            text-align: center;
            margin: 0;
        }
        h2::after{
            content: '\00A0';
            display: block;
            width: 25%;
            height: 2px;
            background-color: #a09255;
            position: relative;
            cursor: default;
        }
        h2::after{
            bottom: -2.5px;
            left: 50%;
            top:10px;
            transform: translate(-50%,0);
        }
        .close_window{
            cursor: pointer;
            position: absolute;
            right: 10px;
            top: 7.5px;
            width: 25px;
            height: 25px;
            color: white;
            transition: 0.2s;
        }
        .close_window:hover{
            color: red;
        }
    }
    .domain{
        position: relative;
        top: $title_bar_height;
        margin: $title_bar_height 10% 0 10%;
        height: calc(100% - $title_bar_height * 2);
        color: white;
        display: grid;
        grid: repeat(4,auto)/ repeat(2,auto);
        grid-column-gap:20px;
        grid-row-gap:20px;
        .checkbox_label{
            grid-column: 1/3;

        }
        input[type=button]{
            border-radius: none;
            border: 2px solid $border-color;
            background-color: transparent;
            color: white;
            transition: 0.1s;
        }
        input[type=button]:hover{
            background:$border-color;
        }
        input[type=button]:active{
            background: color.mix($border-color,rgb(0,0,0));
        }
        #edit_mode{
            grid-column: 1/3;
        }
        #about_version{
            grid-column: 1/3;
        }
        p{
            text-align: center;
        }
    }
}
</style>