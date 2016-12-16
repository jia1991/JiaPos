<template>
  <div id="map" :style="mapstyle">

  </div>
</template>
<script>
  import rectify from '../utils/rectify';

  var sMarker = null;
  var oMarker = null;
  var sIcon = null;
  export default {
    data(){
      var _v = this;
      _v.$http.get ('/user/device')
      .then((res) => {
        var imei = res.body.data;
        navigator.geolocation.getCurrentPosition(function (pos) {
          var temp = {$lat: pos.coords.latitude, $lng: pos.coords.longitude}
          rectify.g2b(temp);
          console.log(temp);
          _v.$store.dispatch('setSelfPos',{blat: temp.$lat, blng: temp.$lng})
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
          _v.$http.get('/devices/status',{params:{imei:imei}})
          .then((res) => {
            _v.$store.dispatch('setSelfPos',res.body.data);
          })
        });
      })
      
      var mapheight = document.documentElement.clientHeight - 55 + 'px'
      return {
       mapstyle:{'height': mapheight}
     }
   },
   computed: {
    selfPos () {
      return this.$store.state.selfPos
    },
    otherPos () {
      return this.$store.state.otherPos
    }
  },
  watch: {
    selfPos (val) {
      console.log(val.stateData)
      var point = new BMap.Point(val.stateData.blng, val.stateData.blat);
      console.log(point)
      if(!sMarker){
        window.map.centerAndZoom(point, 15);
        sIcon = new BMap.Icon('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABmElEQVQ4T52TQXLTQBBF/x8js6Iwa6IAGyyvCCcgOQHOCbBPAD4BzgnwDSxOgDkB5gSwk2EDSMleVFbxIH2qxyhF4shFMRuppmded//+Q+xYq71oZuHk1L9qO8a2QLZ365DOzS3uKh0/PvOfbzq7BcjiaETiDcDe1QsqJUwGhU//3r8CyOIoJfkCwnuiSmu4ULpDPbN/ks8opf3CjxvIJWCTmXMBJ4N8PbUDq7i7CBoU66F9s/3ulMBrSeOmkkvAaj8qIS6bw3bhWw+hjUclyiZjFkdLEk+S3N+zvQD4I9gHqjruF1XI2ra+xJ2h2HnnKj01YRlG5fgcwENIS4Dl7fP12LJaWwaycq2aizvdOaAeyEMA3yEtAkCOQwIPJH3kBjBqAaSCeiamgB+stfjvFlTXR4PTX8trIuJTUvijpv8dIh4kuQ8Cb42RwLSfr092jRHQJMl9sHmLkUzMeia4SWMkwb008SS9HRQ+iLsFCCPdWHkG8O41K/8EMG0ytwKawNf70UHV4cYTdT0ywW7yRutrDBr8w3P+Dakx0COA4/5BAAAAAElFTkSuQmCC',new BMap.Size(16,16))
        sMarker = new BMap.Marker(point,{icon:sIcon}); 
        window.map.addOverlay(sMarker);  
      } else {
        window.map.panTo(point, 15);
        sMarker.setPosition(point);
      }
    },
    otherPos (val) {
      var point = new BMap.Point(val.stateData.blng, val.stateData.blat);
      if(!oMarker){
        window.map.centerAndZoom(point, 15);
        oMarker = new BMap.Marker(point); 
        window.map.addOverlay(oMarker);  
      } else {
      console.log(val)
        window.map.panTo(point, 15);
        oMarker.setPosition(point);
      }
    }
  }
}
</script> 
<style>
  #map {
    width: 100%;
  }
</style>