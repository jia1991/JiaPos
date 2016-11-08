<template>
  <div id="app">
    <mt-header title="定位">
      <mt-button slot="left" @click.native="startHacking">
        <i class="iconfont">&#xe6cf;</i>
      </mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <h1>{{ msg }}</h1>
    
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      startHacking () {
        this.$toast('It Works!')
      }
    }
  }
</script>

<style>
  body{
    margin: 0;
  }

  @font-face {
    font-family: 'iconfont';  /* project id："177182" */
    src: url('//at.alicdn.com/t/font_r4umgtn06gz257b9.eot');
    src: url('//at.alicdn.com/t/font_r4umgtn06gz257b9.eot') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_r4umgtn06gz257b9.woff') format('woff'),
    url('//at.alicdn.com/t/font_r4umgtn06gz257b9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_r4umgtn06gz257b9.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:24px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
