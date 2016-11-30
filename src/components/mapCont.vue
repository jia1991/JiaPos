<template>
    <div>
       55555
   </div>
</template>
<script>
    export default {
        data(){
            var timer = setInterval(function () {
                if(BMap){
                    console.log(BMap);
                    clearInterval(timer);
                }
            },1000)
            return {
               test: 123456 
           }
       },
       computed: {
        groupList () {
            return this.$store.state.groupList
        }
    }
}
</script> 