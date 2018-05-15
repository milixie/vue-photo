import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Photo from '@/components/photo/photo'
import Turntable from '@/components/turntable/turntable'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/photo',
    name: 'Photo',
    component: Photo
  }, {
    path: '/turntable',
    name: 'Turntable',
    component: Turntable
  }]
})
