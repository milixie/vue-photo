<template>
  <ul class="photo-group">
    <li class="sub-item" v-for="item in picCollection" :key="item.id">
      <img :src="item.src" alt="" :id="item.id">
    </li>
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
    width: 200px;
    height: 200px;
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
  data () {
    return {
    }
  },
  computed: {
    picCollection () {
      const len = 9
      const picCollection = []
      for (let i = 0; i < len; i++) {
        picCollection.push({
          id: i + 1,
          src: `http://7xj5et.com1.z0.glb.clouddn.com/gallery/img/${i + 1}.jpg`
        })
      }
      return picCollection
    }
  }
}
</script>
