<template>
  <div class="photo-wrap">
    <button class="random" @click="shuffle">随机切换照片墙</button>
    <photo-group :picCollection="picCollection"/>
  </div>
</template>

<script>
import PhotoGroup from './photo-group'
import _ from 'lodash'
export default {
  name: 'Photo',
  data () {
    return {
      picCollection: Array.apply(null, { length: 16 }).map((_, index) => {
        return {
          id: index + 1,
          src: `http://7xj5et.com1.z0.glb.clouddn.com/gallery/img/${index + 1}.jpg`
        }
      })
    }
  },
  components: {
    PhotoGroup
  },
  computed: {
  },
  methods: {
    shuffle () {
      this.picCollection = _.shuffle(this.picCollection)
    }
  }
}
</script>

<style scoped lang="scss">
.photo-wrap {
  .random {
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 4px;
    padding: 10px 16px;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    &:hover {
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }
    &:active {
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
      background: #ddd;
    }
  }
}
</style>
