<template>
  <ul class="photo-group">
    <transition-group name="cell" tag="li">
      <li class="sub-item" v-for="item in picCollection" :key="item.id" :id="item.id">
        <img :src="item.src" alt="">
      </li>
    </transition-group>
  </ul>
</template>

<style scoped lang="scss">
.photo-group {
  width: 600px;
  height: 600px;
  margin: 20px auto;
  background: #f0f0f0;
  .sub-item {
    float: left;
    width: 150px;
    height: 150px;
    padding: 10px;
    list-style: none;
    transition: transform 1s;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<script>
export default {
  name: 'photoGroup',
  props: ['picCollection'],
  data () {
    return {
      isDrag: false
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
