<script setup>
import { onMounted } from 'vue';

const props = defineProps({
        belong:{
            type: String,
            required: true
        },
        coordinates:{
            type: Array,
            required: true
        },
        //其他特殊属性
        content:{
            type: Object,
            default: null
        },
        spoil:{
            type: Object,
            default: null
        },
        description:{
            type: String,
            default: '没有描述'
        },
        markURL:{
            type: String,
            default: new URL('../assets/mark/vue.svg', import.meta.url).href
        },
        imgURL:{
            type: String,
            default: null
        },
        ne_require:{
            type: String,
            default: null 
        },

    })
</script>

<template>
    <div class="popup">
        <img :src="markURL" :alt="markURL" style="width:40px" class="marker_logo"/>
        <div class="popup_attr">
            <p class="belong_p"><b>所属</b>&nbsp;<a>{{ belong }}</a></p>
            <p class="mark_xy_p"><span>X </span>{{ coordinates[0] }}&nbsp;<span>Y&nbsp;</span>{{ coordinates[0] }}</p>
        </div>
        <div class="mark_attribute">
            
            <div v-if="props.content!==null" class="content">
                <p><b>内容:</b></p>
                <ul>
                    <li v-for="(value, key) in props.content" :key="key">{{ key }}&nbsp;{{ value }}</li>
                </ul>
            </div>
            <div v-if="props.spoil!==null" class="spoil">
                <p><b>战利品:</b></p>
                <ul>
                    <li v-for="(value, key) in props.spoil" :key="key">{{ key }}&nbsp;{{ value }}</li>
                </ul>
            </div>  
            
        </div>
        <div class="mark_image">
            <p v-if="props.imgURL==null" >暂无游戏中图片</p>
            <img v-else :src="props.imgURL" alt="图片">
        </div>
        
        <p class="marker_describe"><b>描述：</b>{{description}} <a v-if="props.ne_require"><br><b>需要：</b> {{ ne_require }}</a></p>
    </div>
</template>

<style scoped lang="scss">
.mark_logo{
    display: block;
}
.popup{
    display: grid;
    grid: repeat(5,80px)/ repeat(2,50%);
    .popup_attr{
        grid-column: 2;
        text-align: right;
        p{
            span{
                font-weight: bold;
            }
        }
    }
    .mark_attribute{
        grid-column: 1/3;
        p{
            margin-bottom: 0;
        }
        ul{
            margin-top: 0;
            padding: 0;
            li{
                display: inline-block;
                margin: 5px 10px 5px 10px;
            }
        }
        
        
    }
    .mark_image{
        // height: 200px;
        border: 1px solid #888;
        grid-column: 1 / 3;
        grid-row: 3/5;
        p{
            position: absolute;
            right: 50%;
            top: 50%;
            transform: translate(50%, 50%);
            font-size: 12px;
        }
        img{
            width: 100%;
            height: 100%;
            position: relative;
            // right: 5%;
            // top: 50%;
            // transform: translate(0, -50%);
        }
    }
    .marker_describe{
        grid-row: 5;
        grid-column: 1/3;
    }
}


</style>