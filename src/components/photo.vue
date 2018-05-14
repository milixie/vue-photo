<template>
  <div class="photo-wrap">
    <button class="random" @click="shuffle">随机切换照片墙</button>
    <!--<photo-group/>-->
    <ul class="photo-group">
      <transition-group name="cell" tag="li">
        <li class="sub-item" v-for="item in picCollection" :key="item.id">
          <img :src="item.src" alt="" :id="item.id">
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import PhotoGroup from './photo-group'
import _ from 'lodash'
export default {
  name: 'Photo',
  data () {
    return {
      picCollection: Array.apply(null, { length: 9 }).map((_, index) => {
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
    // picCollection () {
    //   const len = 9
    //   const picCollection = []
    //   for (let i = 0; i < len; i++) {
    //     picCollection.push({
    //       id: i + 1,
    //       src: `http://7xj5et.com1.z0.glb.clouddn.com/gallery/img/${i + 1}.jpg`
    //     })
    //   }
    //   return picCollection
    // }
  },
  methods: {
    shuffle () {
      this.picCollection = _.shuffle(this.picCollection)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  }
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
}
</style>
