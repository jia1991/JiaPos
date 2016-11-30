<template>
    <div id="map" :style="mapstyle">
       
   </div>
</template>
<script>
    export default {
        data(){
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