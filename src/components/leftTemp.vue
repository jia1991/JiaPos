<template>
  <div>
  <div class="left-header">
    <mt-header title="设备列表" v-show="!searching">
      <mt-button slot="left">
        管理
      </mt-button>
      <mt-button slot="right">
        添加
      </mt-button>
    </mt-header>
  </div>
    <ja-search cancel-text="" placeholder="搜索" cancel-text="取消" v-on:input='search($event)'>545454</ja-search>
    <dev-list @closeLeft="test"></dev-list>
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
      },
      test () {
        this.$emit('closeLeft')
      }
    },
    components: {
      devList,
      jaSearch
    },
  }
  
</script>

<style>
  .left-header .mint-header {
    height: 50px
  }
  .left-header .mint-header-title {
    font-size: large;
  }
</style>