<template>
    <div>
        <group-node v-for="group in groupList" :group-data="group" @closeLeft="test"></group-node>       
    </div>
</template>
<script>
    import groupNode from './groupNode.vue'
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
     methods: {
        test () {
            this.$emit('closeLeft')
        }
     },
     computed: {
        groupList () {
            return this.$store.state.groupList
        }
    },
    components: {
        groupNode
    }
}
</script>

