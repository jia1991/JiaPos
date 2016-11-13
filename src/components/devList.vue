<template>
    <div>
        <div v-for="group in groupList" @click="showGroup(group)">
            <mt-cell>
                <div slot="title"><i class="group-icon">&#xe634;</i> {{group.jname}}</div>
                <small>[{{group.online_num}}/{{group.dnum}}]</small>
            </mt-cell>
            <mt-cell v-for="dev in group.devs">
                <div slot="title" style="margin-left: 30px">{{dev.dname}}</div>
            </mt-cell>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            this.$http.get('/group/list')
            .then((response) => {
                this.$store.commit('updateGroup',response.body.data)            
            })
            return {
             test: 123456 
         }
     },
     computed: {
        groupList () {
            return this.$store.state.groupList
        }
     },
     methods: {
        showGroup (group) {
            var gname = group.jname;
            var params = {gname}
            this.$http.get('/group/devices',{params})
            .then((response) => {
                var devs = response.body.data;
                this.$store.dispatch('updateGroupDevs',{gname,devs})
            })
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
        color: #ccc
    }
</style>