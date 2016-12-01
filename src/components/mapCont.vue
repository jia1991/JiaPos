<template>
  <div id="map" :style="mapstyle">

  </div>
</template>
<script>
  import rectify from '../utils/rectify';

  export default {
    data(){
      this.$http.get ('/user/device')
      .then((res) => {
        var imei = res.body.data;
        navigator.geolocation.getCurrentPosition(function (pos) {
        console.log(pos);
        var temp = {$lat: pos.coords.latitude, $lng: pos.coords.longitude}
        rectify.g2b(temp);
        console.log(temp);
        var point = new BMap.Point(temp.$lng, temp.$lat);
        window.map.centerAndZoom(point, 15);  
        window.marker = new BMap.Marker(point); 
        window.map.addOverlay(window.marker);  
        
      },function (error){
        switch(error.code) {
          case error.TIMEOUT:
          console.log("A timeout occured! Please try again!");
          break;
          case error.POSITION_UNAVAILABLE:
          console.log('We can\'t detect your location. Sorry!');
          break;
          case error.PERMISSION_DENIED:
          console.log('Please allow geolocation access for this to work.');
          break;
          case error.UNKNOWN_ERROR:
          console.log('An unknown error occured!');
          break;
        }
      });
      })
      
      var mapheight = document.documentElement.clientHeight - 55 + 'px'
      return {
       mapstyle:{'height': mapheight}
     }
   },
   computed: {
    groupList () {
      return this.$store.state.groupList
    }
  }
}
</script> 
<style>
  #map {
    width: 100%;
  }
</style>