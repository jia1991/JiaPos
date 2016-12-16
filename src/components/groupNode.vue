<template>
  <div>
    <div @click="toggleGroup(groupData)">
      <mt-cell>
        <div slot="title">
          <i class="group-icon" :style="[show&&({'transform':'rotate(45deg)'})]">&#xe634;</i> {{groupData.jname}}
        </div>
        <small>[{{groupData.online_num}}/{{groupData.dnum}}]</small>
      </mt-cell>
    </div>
    <div v-show="show">
      <mt-cell v-for="dev in groupData.devs">
        <div slot="title" style="margin-left: 20px" @click="getPos(dev.imei)">
          <i class="dev-icon" :style="[dev.sta&&({color:'#26a2ff'})]">&#xe737;</i>{{dev.dname}}
        </div>
      </mt-cell>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      groupData: Object
    },
    data() {
      return{
        show: false
      }
    },
    methods: {
      toggleGroup (group) {
        if(this.show){
          this.show = false;
          return
        }
        var gname = group.jname;
        var params = {gname}
        this.$http.get('/group/devices',{params})
        .then((response) => {
          var devs = response.body.data;
          this.$store.dispatch('updateGroupDevs',{gname,devs})
          this.show = true;
        })
      },
      getPos (imei) {
        var params = {imei}
        this.$http.get('/devices/status',{params})
        .then((res) => {
          if(res.body.errorcode == '0') {
            var data = res.body.data;
            this.$store.dispatch('setOtherPos',data)
            /*var point = new BMap.Point(data.blng, data.blat);
            window.map.panTo(point, 15);  
            window.marker.setPosition(point)*/
            //window.map.addOverlay(marker);
            this.$emit('closeLeft')
          }
        });
        
      }
    }
  }
</script>


<style>
  .group-icon{
    font-family:"iconfont" !important;
    font-size:12px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    color: #ccc;
    display: inline-block;
  }
  .dev-icon{
    font-family:"iconfont" !important;
    font-size:22px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    color: #9b9b9b;
    display: inline-block;
    margin-right: 5px;
  }
</style>