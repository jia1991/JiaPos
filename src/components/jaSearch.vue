<template>
  <div :class="{'ja-search':visible}">
    <div class="ja-searchbar">
      <div class="ja-searchbar-inner">
        <i class="mintui mintui-search ja-search-icon" v-show="visible"></i>
        <input
        ref="input"
        @click="visible = true"
        type="search"
        v-model="currentValue"
        :placeholder="visible ? placeholder : ''"
        class="ja-search-input">
      </div>
      <a
      @click="visible = false, currentValue = ''"
      v-show="visible"
      class="cancelText"
      v-text="cancelText">
    </a>
    <label
    @click="visible = true, $refs.input.focus()"
    class="ja-search-label"
    v-show="!visible">
    <i class="mintui mintui-search ja-search-icon"></i>
    <span v-text="placeholder"></span>
  </label>
</div>
<div class="" v-show="currentValue">
  <div class="">
    <slot>
      <mt-cell v-for="item in result" track-by="$index" :title="item"></mt-cell>
    </slot>
  </div>
</div>
</div>
</template>

<script>
/**
 * ja-search
 * @module components/search
 * @desc 根据mt-search 改写部分样式的搜索框，**依赖mintui中的mt-cell组件**
 * @param {string} value - 绑定值
 * @param {string} [cancel-text=取消] - 取消按钮文字
 * @param {string} [placeholder=取消] - 搜索框占位内容
 * @param {string[]} [result] - 结果列表
 * @param {slot} 结果列表
 *
 * @example
 * <mt-search :value.sync="value" :result.sync="result"></mt-search>
 * <mt-search :value.sync="value">
 *   <mt-cell v-for="item in result" :title="item"></mt-cell>
 * </mt-search>
 */
 export default {
  name: 'ja-search',

  data() {
    return {
      visible: false,
      currentValue: this.value
    };
  },

  watch: {
    visible(val) {
      this.$emit('input', val);
    }
  },

  props: {
    value: String,
    cancelText: {
      default: '取消'
    },
    placeholder: {
      default: '搜索'
    },
    result: Array
  }
};
</script>

<style lang="css">
  .ja-search {
    height: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .ja-searchbar{
    position: relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #d9d9d9;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 5px 10px;
    z-index: 1;
  }
  .ja-searchbar:before{
    color: #c8c8cd;
    content: " ";
    width: 100%;
    border-bottom: 1px solid;
    bottom: 0;
    left: 0;
    position: absolute;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
  .ja-searchbar-inner {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #fff;
    border-radius: 2px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 20px;
    padding: 2px;
  }
  .ja-search-label{
    position: absolute;
    width: 100%;
    text-align: center;
    left: 0;
    right: 0;
    font-size: 12px;
    color: gray;
  }
  .ja-search-icon{
    font-size: 12px
  }
  .ja-search-input{
    border: none;
    outline:none;
  }
  .cancelText{
    font-size: smaller;
    width: 35px;
    text-align: right;
    color: darkslategray;
  }
</style>
