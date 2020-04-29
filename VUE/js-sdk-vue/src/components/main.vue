<template>
  <div>
    <div class="card">
       <h3>页面浏览事件</h3>
       <p class="title">API sensors.quick(name[string],prop[object],callback[function])</p>
       <el-row>
        <el-col :span="8">请选择函数：
            <el-select v-model="pageview.eventName" placeholder="请选择">
            <el-option label="autoTrackWithoutProfile" value="autoTrackWithoutProfile"></el-option>
            <el-option label="autoTrack" value="autoTrack"></el-option>
           </el-select>
        </el-col>
        <el-col :span="8">请选择属性：
            <el-select v-model="pageview.para" placeholder="请选择">
            <el-option 
                :value="item.index" 
                v-for="(item,i) in props" :key="i"
                :label="item.lable"></el-option>
            </el-select>
        </el-col>
        <el-col :span="8">
            是否有回调函数
            <span class="redio-box">
            <el-radio v-model="pageview.callback" label="0">无</el-radio>
            <el-radio v-model="pageview.callback" label="1">有</el-radio>
            </span>
        </el-col>
       </el-row>
       <el-button type="success" @click="autoTrackCallback">初始化pageview</el-button>
       <el-button type="success" @click="reload">清除cookie重新初始化</el-button>
    </div>

    <div class="card">
       <h3>初始化配置</h3> 
       <p class="title">API is_track_single_page</p>
       <el-row>
       <el-col :span="24"> 请选择：
        <el-select v-model="singlepage_val" placeholder="请选择">
            <el-option 
            :value="item.index" 
            v-for="(item,i) in single_pageview" :key="i"
            :label="item.lable"></el-option>
        </el-select>
       </el-col>
       </el-row>

       <p class="title">API heatmap</p>
       <el-row>
       <el-col :span="12"> 请设置heatmap：
        <el-select v-model="heatmap.heatmap_val" placeholder="请选择">
            <el-option 
            :value="item.index" 
            v-for="(item,i) in heatmap_list" :key="i"
            :label="item.lable"></el-option>
        </el-select>
       </el-col>
       <el-col :span="12"> 请设置clickmap：
        <el-select :disabled="clickmap_disabled" v-model="heatmap.clickmap_val" placeholder="请选择">
            <el-option 
            :value="item.index" 
            v-for="(item,i) in clickmap_list" :key="i"
            :label="item.lable"></el-option>
        </el-select>
       </el-col>
       </el-row>
       <div class="btns">
            <el-button type="success" @click="single_page">初始化sdk</el-button>
            <el-button type="success" @click="goto">跳转页面</el-button>
       </div>
    </div>
   
    <div class="card">
        <h3>div,img等元素点击</h3>
        <p class="title">API sensors.quick('trackHeatMap')</p>
        <el-row>
            <el-col :span="24">请选择函数：
                <el-select v-model="trackHeatMap.eventName" placeholder="请选择">
                <el-option label="trackHeatMap" value="trackHeatMap"></el-option>
                <el-option label="trackAllHeatMap" value="trackAllHeatMap"></el-option>
            </el-select>
            </el-col>
         <el-col :span=24>
            <el-radio v-model="trackHeatMap.index" label="1">只传事件名称</el-radio>
            <el-radio v-model="trackHeatMap.index" label="2">传入事件名称和target</el-radio>
            <el-radio v-model="trackHeatMap.index" label="3">传入事件名称和target,自定义属性</el-radio>
            <el-radio v-model="trackHeatMap.index" label="4">传入事件名称和target,自定义属性,回调函数</el-radio>
         </el-col>
        </el-row>
        <div class="btn-box" @click="trackHeatMap_callback">div执行</div>
        <div class="btn-box" @click="trackHeatMap_callback">a执行</div>
         <div class="btn-box" @click="changeServer_url">修改server_url</div>
    </div>
    </div>
</template>

<script>
//import sensors from 'sa-sdk-javascript';
//sensors.init({
 // heatmap_url: 'https://cdn.jsdelivr.net/npm/sa-sdk-javascript@1.14.12/heatmap.min.js',
 // name: 'sensors',
  //单页面切换页面pageview事件添加属性
  //is_track_single_page:()=>{
  //  console.log('aa')
  //  return {
   //   custom_name:'aaa'
   // }
  //},
  //server_url: 'http://test-syg.datasink.sensorsdata.cn/sa?token=27f1e21b78daf376&project=jiangyanyun',
  //preset_properties: {
    //是否采集$latest_utm最近一次广告系列相关参数，默认值true
   // latest_utm:true,
    //是否采集$latest_traffic_source_type最近一次流量来源类型，默认值true
   // latest_traffic_source_type:true,
    //是否采集$latest_search_keyword最近一次搜索引擎关键字，默认值true
   // latest_search_keyword:true,
    //是否采集$latest_referrer最近一次前向地址，默认值true
   // latest_referrer:true,
    //是否采集$latest_referrer_host最近一次前向地址，1.14.8以下版本默认是true，1.14.8及以上版本默认是false，需要手动设置为true开启
   // latest_referrer_host:true,
    //是否采集$latest_landing_page最近一次落地页地址，默认值false
    //latest_landing_page:true,
    //是否采集 $url 页面地址作为公共属性，默认值false
    //url: true,
    //title: true
//}
//});
//初始化pageview事件添加自定义属性
//sensors.quick('autoTrack',{
  //custom_name:'main'
//})

import  { attributes,single_pageview,heatmap_list,clickmap_list} from '../util/list.js'
export default {
    data(){
        return {
          pageview:{
              eventName:"",
              para:"",
              callback:""
          },
          singlepage_val:"",
          heatmap:{
              heatmap_val:"",
              clickmap_val:""
          },
          trackHeatMap:{
              index:"",
              eventName:"",
          },
          props:attributes,
          single_pageview:single_pageview,
          heatmap_list:heatmap_list,
          clickmap_list:clickmap_list,
        }
    },
    computed:{
      clickmap_disabled(){
           return  this.heatmap.heatmap_val!==0 
      }
    },
    methods:{
       autoTrackCallback(){
            let para=this.pageview.para!=="" ? this.props[this.pageview.para].value : ""
            if(this.pageview.callback){
                sensors.quick(this.pageview.eventName,para,()=>{
                console.log(`${this.pageview.eventName} down`)
                });
            }else {
                sensors.quick(this.pageview.eventName,para)
            }
            sensors.track('ViewJww', {
                name: '123456'
            });
       },
       changeServer_url(){
          sensors.para.server_url="https://test-syg.datasink.sensorsdata.cn/sa.gif?project=liangshuang&token=27f1e21b78daf376"
       },
       single_page(){
           sensors_para.is_track_single_page=this.singlepage_val!=="" ? this.single_pageview[this.singlepage_val].value : ""
           if(this.heatmap.heatmap_val===0&&this.heatmap.clickmap_val!==""){
               sensors_para.heatmap = {
                   clickmap:this.clickmap_list[this.heatmap.clickmap_val].value
               }
           }else if(this.heatmap.heatmap_val!==""){
               sensors_para.heatmap = this.heatmap_list[this.heatmap.heatmap_val].value
           }
           console.log('sensors_para',sensors_para)
           sensors.init(sensors_para);
       },
       trackHeatMap_callback(){
           let eventname = this.trackHeatMap.eventName
           console.log(typeof this.trackHeatMap.index,eventname,typeof eventname)
           if(this.trackHeatMap.index==="1"){
                sensors.quick(eventname)
            }else if(this.trackHeatMap.index==="2"){
                sensors.quick(eventname,event.target)
            }else if(this.trackHeatMap.index==="3"){
                sensors.quick(eventname,event.target,{eventname:eventname})
            }else if(this.trackHeatMap.index==="4"){
                sensors.quick(eventname,event.target,{eventname:eventname},function(){
                    console.log(`${eventname} down`)
                })
            }
       },
       goto(){
           this.$router.push({ path: 'foo' })
       },
       reload(){
          this.$cookie.remove('sensorsdata2015jssdkcross')
          window.location.reload()
       }
    }
}
</script>

<style>
.btn-box {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    margin-right: 10px;
}
.el-input{
    width: 240px !important;
    margin-left: 10px;
}

.redio-box {
    margin-left: 10px;
}

.el-row {
    margin-bottom: 10px;
}

.card {
    padding-bottom: 30px;
    border-bottom:1px solid #ddd;
}

.title {
    font-weight: bold;
    color: #00b27a;
}

.btns {
    margin-top: 10px;
}

.img_box {
    background:#00b27a;
    padding: 20px;
}
</style>


