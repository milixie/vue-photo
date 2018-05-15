<template>
  <transition name="component-fade">
    <div class="prize" v-if="show">
      <div class="mask"></div>
      <span class="close" @click="close">×</span>
      <div class="content">
        <p>{{defaultWord}}</p>
        <p>{{prize}}</p>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .1s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }
  .prize {
    position: relative;
    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 101;
    }
    .close {
      position: fixed;
      right: 40px;
      top: 40px;
      font-size: 60px;
      z-index: 102;
      color: #fff;
      cursor: pointer;
    }
    .content {
      position: fixed;
      left: 50%;
      top: 35%;
      width: 120px;
      margin-left: -60px;
      background: lightgreen;
      padding: 10px;
      border-radius: 4px;
      z-index: 102;
    }
  }
</style>

<script>
export default {
  name: 'prize',
  props: ['prize', 'show'],
  data () {
    return {

    }
  },
  computed: {
    defaultWord () {
      if (this.prize === '谢谢参与') {
        return '很遗憾'
      }
      return '恭喜您抽中'
    },
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
