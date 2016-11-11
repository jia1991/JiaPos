<template>
  <div>
    <mt-header title="设备列表" v-show="!searching">
      <mt-button slot="left">
        <small>管理</small>
      </mt-button>
      <mt-button slot="right">
        <small>添加</small>
      </mt-button>
    </mt-header>
    <ja-search cancel-text="" placeholder="搜索" cancel-text="取消" v-on:input='search($event)'>545454</ja-search>
    <dev-list></dev-list>
  </div>
</template>

<script>
  import devList from './devList.vue'
  import jaSearch from './jaSearch.vue'

  export default {
    data(){
      return {
        searchVal: '',
        searching: false
      }
    },
    methods: {
      search (e) {
        this.searching = e;
      }
    },
    components: {
      devList,
      jaSearch
    },
  }
  
</script>

<style>

</style>