<template>
  <div class="canvas-wrap">
    <div v-if="Number(id) === 1">
      <canvas id="canvas1" class="canvas" width="400" height="400" style="background: blue;"></canvas>
    </div>
    <div v-if="Number(id) === 2">
      <canvas id="canvas2" class="canvas" width="400" height="400"></canvas>
    </div>
    <div v-if="Number(id) === 3">
      <canvas id="canvas3" class="canvas" width="400" height="400"></canvas>
    </div>
    <div v-if="Number(id) === 4">
      <canvas id="canvas4" class="canvas" width="400" height="400"></canvas>
    </div>
    <div v-if="Number(id) === 5">
      <button class="btn" @click="autoBlink">自动眨眼</button>
      <button class="btn" @click="stopAutoBlink">停止自动眨眼</button>
      <button class="btn" @click="openLeftEye">睁开左眼</button>
      <button class="btn" @click="closeLeftEye">闭上左眼</button>
      <button class="btn" @click="openRightEye">睁开右眼</button>
      <button class="btn" @click="closeRightEye">闭上右眼</button>
      <canvas id="canvas5" class="canvas" width="400" height="400"></canvas>
    </div>
    <div v-if="Number(id) === 6">
      <button class="btn" @click="beginMove">开始运动</button>
      <button class="btn" @click="stopMove">停止运动</button>
      <canvas id="canvas6" class="canvas" width="400" height="400"></canvas>
    </div>
    <div v-if="Number(id) === 7">
      <canvas id="canvas7" class="canvas" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<style scoped lang="scss">
.canvas-wrap {
  .btn {
    padding: 6px 10px;
    outline: none;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      box-shadow: 1px 1px 2px #ddd;
    }
    &:active {
      background: #f0f0f0;
    }
  }
  .canvas {
    border: 10px solid yellow;
    color:lightcoral;
  }
}

</style>

<script>
export default {
  name: 'Canvas',
  data () {
    return {
      id: this.$route.params.id,
      eyeStatus: {
        leftEyeIsOpen: true,
        rightEyesIsOpen: true
      },
      timer: null,
      isBlink: false
    }
  },
  mounted () {
    switch (Number(this.id)) {
      case 1:
        this.initCanvas1()
        break
      case 2:
        this.initCanvas2()
        break
      case 3:
        this.initCanvas3()
        break
      case 4:
        this.initCanvas4()
        break
      case 5:
        this.initCanvas5()
        break
      case 6:
        this.initCanvas6()
        break
      case 7:
        this.initCanvas7()
        break
      default:
        break
    }
  },
  methods: {
    initCanvas1 () {
      const canvas1 = document.getElementById('canvas1')
      const ctx = canvas1.getContext('2d')
      ctx.beginPath()
      ctx.fillStyle = 'red'
      ctx.fillRect(50, 50, 300, 300)
      ctx.fillStyle = 'lightgreen'
      ctx.fillRect(100, 100, 200, 200)
      ctx.fillStyle = 'gray'
      ctx.fillRect(120, 180, 160, 30)
      ctx.closePath()
    },
    initCanvas2 () {
      const canvas2 = document.getElementById('canvas2')
      const ctx = canvas2.getContext('2d')
      ctx.beginPath()
      ctx.fillStyle = 'blue'
      ctx.fillRect(30, 30, 300, 300)
      ctx.fillStyle = 'rgba(240, 128, 128, 0.7)'
      ctx.fillRect(90, 90, 300, 300)
      ctx.fillStyle = 'rgba(144, 238, 144, 0.7)'
      ctx.fillRect(60, 60, 300, 300)
      ctx.closePath()
    },
    initCanvas3 () {
      const canvas3 = document.getElementById('canvas3')
      const ctx = canvas3.getContext('2d')
      ctx.beginPath()
      const grd = ctx.createLinearGradient(0, 0, 400, 400)
      grd.addColorStop(0, 'red')
      grd.addColorStop(1, 'green')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, 400, 400)
      ctx.closePath()
    },
    initCanvas4 () {
      const canvas4 = document.getElementById('canvas4')
      const ctx = canvas4.getContext('2d')
      ctx.beginPath()
      const grd = ctx.createRadialGradient(350, 350, 0, 300, 300, 300)
      grd.addColorStop(0, 'lightcoral')
      grd.addColorStop(0.3, 'blue')
      grd.addColorStop(0.5, 'green')
      grd.addColorStop(0.7, 'yellow')
      grd.addColorStop(1, 'red')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, 400, 400)
      ctx.closePath()
    },
    initCanvas5 () {
      const canvas5 = document.getElementById('canvas5')
      const ctx = canvas5.getContext('2d')
      // 头外廓
      ctx.arc(200, 200, 150, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.closePath()
      // 鼻子
      ctx.beginPath()
      ctx.arc(200, 230, 14, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.closePath()
      // left眼睛
      this.initOpenLeftEye(ctx)
      ctx.beginPath()
      ctx.strokeStyle = '#333'
      this.lineFun(ctx, 105, 162, 100, 175)
      this.lineFun(ctx, 112, 168, 108, 180)
      this.lineFun(ctx, 120, 170, 120, 184)
      this.lineFun(ctx, 128, 168, 130, 180)
      this.lineFun(ctx, 135, 162, 140, 175)
      ctx.stroke()
      ctx.closePath()
      // 右眼睛
      ctx.beginPath()
      ctx.strokeStyle = '#333'
      this.lineFun(ctx, 265, 162, 260, 175)
      this.lineFun(ctx, 272, 168, 268, 180)
      this.lineFun(ctx, 280, 170, 280, 184)
      this.lineFun(ctx, 288, 168, 290, 180)
      this.lineFun(ctx, 295, 162, 300, 175)
      ctx.stroke()
      ctx.closePath()
      this.initOpenRightEye(ctx)

      // 嘴巴
      ctx.beginPath()
      ctx.lineWidth = 10
      ctx.strokeStyle = '#333'
      ctx.moveTo(280, 280)
      ctx.bezierCurveTo(260, 310, 120, 310, 100, 250)
      ctx.stroke()
      ctx.closePath()
    },
    lineFun (ctx, x1, y1, x2, y2) {
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
    },
    initOpenLeftEye (ctx) {
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.fillStyle = '#ccc'
      ctx.arc(120, 150, 20, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
      ctx.beginPath()
      ctx.strokeStyle = '#666'
      ctx.arc(120, 150, 20, Math.PI, 2 * Math.PI)
      ctx.lineTo(100, 150)
      ctx.stroke()
      ctx.closePath()
      ctx.beginPath()
      ctx.fillStyle = '#673ab7'
      ctx.arc(120, 150, 20, 0, Math.PI)
      ctx.fill()
      ctx.closePath()
      ctx.beginPath()
      ctx.strokeStyle = '#673ab7'
      ctx.fillStyle = '#000'
      ctx.arc(120, 150, 8, 0, Math.PI)
      ctx.stroke()
      ctx.fill()
      ctx.closePath()
      this.eyeStatus.leftEyeIsOpen = true
    },
    initCloseLeftEye (ctx) {
      ctx.beginPath()
      ctx.fillStyle = '#ccc'
      ctx.arc(120, 150, 20, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = '#666'
      ctx.arc(120, 150, 20, Math.PI, 2 * Math.PI)
      ctx.stroke()
      ctx.closePath()
      this.eyeStatus.leftEyeIsOpen = false
    },
    initOpenRightEye (ctx) {
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.fillStyle = '#ccc'
      ctx.arc(280, 150, 20, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
      ctx.beginPath()
      ctx.strokeStyle = '#666'
      ctx.arc(280, 150, 20, Math.PI, 2 * Math.PI)
      ctx.lineTo(260, 150)
      ctx.stroke()
      ctx.closePath()
      ctx.beginPath()
      ctx.fillStyle = '#673ab7'
      ctx.arc(280, 150, 20, 0, Math.PI)
      ctx.fill()
      ctx.closePath()
      ctx.beginPath()
      ctx.strokeStyle = '#673ab7'
      ctx.fillStyle = '#000'
      ctx.arc(280, 150, 8, 0, Math.PI)
      ctx.stroke()
      ctx.fill()
      ctx.closePath()
      this.eyeStatus.rightEyesIsOpen = true
    },
    initCloseRightEye (ctx) {
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.fillStyle = '#ccc'
      ctx.arc(280, 150, 20, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = '#666'
      ctx.arc(280, 150, 20, Math.PI, 2 * Math.PI)
      ctx.stroke()
      ctx.closePath()
      this.eyeStatus.rightEyesIsOpen = false
    },
    openLeftEye () {
      if (this.eyeStatus.leftEyeIsOpen) return
      const canvas5 = document.getElementById('canvas5')
      const ctx = canvas5.getContext('2d')
      this.initOpenLeftEye(ctx)
    },
    closeLeftEye () {
      if (!this.eyeStatus.leftEyeIsOpen) return
      const canvas5 = document.getElementById('canvas5')
      const ctx = canvas5.getContext('2d')
      this.initCloseLeftEye(ctx)
    },
    openRightEye () {
      if (this.eyeStatus.rightEyesIsOpen) return
      const canvas5 = document.getElementById('canvas5')
      const ctx = canvas5.getContext('2d')
      this.initOpenRightEye(ctx)
    },
    closeRightEye () {
      if (!this.eyeStatus.rightEyesIsOpen) return
      const canvas5 = document.getElementById('canvas5')
      const ctx = canvas5.getContext('2d')
      this.initCloseRightEye(ctx)
    },
    autoBlink () {
      if (this.isBlink) return
      const that = this
      const canvas5 = document.getElementById('canvas5')
      const ctx = canvas5.getContext('2d')
      this.isBlink = true
      this.timer = setInterval(() => {
        if (that.eyeStatus.leftEyeIsOpen) {
          that.initCloseLeftEye(ctx)
        } else {
          that.initOpenLeftEye(ctx)
        }
        if (that.eyeStatus.rightEyesIsOpen) {
          that.initCloseRightEye(ctx)
        } else {
          that.initOpenRightEye(ctx)
        }
      }, 400)
    },
    stopAutoBlink () {
      clearInterval(this.timer)
      this.isBlink = false
    },
    initBaseLine (ctx) {
      ctx.strokeStyle = '#f10'
      for (let i = 0; i < 100; i++) {
        this.lineFun(ctx, Math.random() * 399 + 1, Math.random() * 399 + 1, Math.random() * 399 + 1, Math.random() * 399 + 1)
      }
      ctx.stroke()
      ctx.closePath()
    },
    initCanvas6 () {
      const canvas6 = document.getElementById('canvas6')
      const ctx = canvas6.getContext('2d')
      this.initBaseLine(ctx)
    },
    beginMove () {
      const that = this
      const canvas6 = document.getElementById('canvas6')
      const ctx = canvas6.getContext('2d')
      this.timer = setInterval(() => {
        canvas6.width = canvas6.width
        canvas6.height = canvas6.height
        ctx.clearRect(0, 0, 400, 400)
        that.initBaseLine(ctx)
      }, 300)
    },
    stopMove () {
      clearInterval(this.timer)
    },
    // 表
    initCanvas7 () {
      const canvas7 = document.getElementById('canvas7')
      const ctx = canvas7.getContext('2d')
      ctx.clearRect(0, 0, 400, 400)
      canvas7.width = canvas7.width
      canvas7.height = canvas7.height
      ctx.beginPath()
      ctx.lineWidth = 10
      ctx.strokeStyle = '#ffeb3b8f'
      ctx.arc(200, 200, 188, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.closePath()
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = '#f90'
      ctx.fillStyle = '#ffc10717'
      ctx.arc(200, 200, 180, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
      ctx.beginPath()
      ctx.fillStyle = '#f60'
      ctx.arc(200, 200, 5, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
      ctx.save()
      ctx.lineWidth = 5
      ctx.translate(200, 200)
      for (let i = 0; i < 12; i++) {
        ctx.beginPath()
        ctx.rotate(Math.PI / 6)
        this.lineFun(ctx, 160, 0, 180, 0)
        ctx.stroke()
      }
      ctx.restore()

      ctx.translate(200, 200)
      ctx.lineWidth = 2
      for (let i = 0; i < 60; i++) {
        ctx.beginPath()
        ctx.rotate(Math.PI / 30)
        this.lineFun(ctx, 170, 0, 180, 0)
        ctx.stroke()
      }
      ctx.restore()

      ctx.rotate(-Math.PI / 2)
      let date = new Date()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      // 时针
      this.initHours(ctx, hours, minutes, seconds)
      // 分针
      this.initMinutes(ctx, hours, minutes, seconds)
      // 秒针
      this.initSeconds(ctx, seconds)

      window.requestAnimationFrame(this.initCanvas7)
    },
    initHours (ctx, hours, minutes, seconds) {
      ctx.save()
      ctx.beginPath()
      ctx.lineWidth = 6
      ctx.strokeStyle = '#f60'
      ctx.rotate((Math.PI / 6) * (hours % 12) + (Math.PI / 360) * minutes + (Math.PI / 21600) * seconds)
      this.lineFun(ctx, 0, 0, 80, 0)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
    },
    initMinutes (ctx, hours, minutes, seconds) {
      ctx.save()
      ctx.beginPath()
      ctx.lineWidth = 4
      ctx.rotate((Math.PI / 30) * minutes + (Math.PI / 1800) * seconds)
      this.lineFun(ctx, 0, 0, 110, 0)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
    },
    initSeconds (ctx, seconds) {
      ctx.save()
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.rotate((Math.PI / 30) * seconds)
      this.lineFun(ctx, 0, 0, 150, 0)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
    }
  }
}
</script>
