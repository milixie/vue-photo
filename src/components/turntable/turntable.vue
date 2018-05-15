<template>
  <div class="turntable">
    <prize :prize="prize" :show="showPrize" @close="closePrize"/>
    <canvas id="turnCanvas" width="420" height="420" class="turning" :style="styles"></canvas>
    <div class="lottery" :class="{'lottery-over': lotteryTime < 1}" @click="lottery">
      <p>抽奖</p>
      <span>({{lotteryTime}}次机会)</span></div>
  </div>
</template>
<style scoped lang="scss">
.turntable {
  position: relative;
  width: 420px;
  height: 420px;
  margin: 0 auto;
  .turning {
    transition: all 3s;
  }
  .lottery {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80px;
    height: 80px;
    margin-left: -40px;
    margin-top: -40px;
    border-radius: 50%;
    z-index: 100;
    font-size: 20px;
    background: #f70;
    border: 4px solid #f40;
    box-shadow: 2px 2px 2px #ddd;
    color: #fff;
    line-height: 60px;
    cursor: pointer;
    &:after {
      content: '';
      position: absolute;
      left: 30px;
      top: -40px;
      width: 0;
      height: 0;
      border-width: 0 5px 40px 5px;
      border-style: solid;
      border-color: transparent transparent #f40 transparent;
    }
    &.lottery-over {
      background: #999;
      border: 4px solid #ccc;
      &:after {
        border-color: transparent transparent #ccc transparent;
      }
    }
    span {
      position: absolute;
      bottom: 15px;
      left: 12px;
      font-size: 12px;
      display: inline-block;
      line-height: 1em;
    }
  }
}
</style>
<script>
import Prize from '../common/prize'
export default {
  name: 'Turntable',
  mounted () {
    this.initCanvas()
  },
  data () {
    return {
      prize: '',
      isTurning: false,
      styles: '',
      n: 0,
      rotateAngle: 0,
      showPrize: false,
      lotteryTime: 5,
      turnPlate: {
        text: ['10元', '谢谢参与', '20元', '5元', '谢谢参与', '30元', '5元', '10元', '10元优惠券', '5元优惠券'],
        colors: ['#fff', '#fff4d6', '#fff', '#fff4d6', '#fff', '#fff4d6', '#fff', '#fff4d6', '#fff', '#fff4d6']
      }
    }
  },
  components: {
    Prize
  },
  methods: {
    initCanvas () {
      const canvas = document.getElementById('turnCanvas')
      const ctx = canvas.getContext('2d')
      const arc = Math.PI / (this.turnPlate.text.length / 2)
      console.log(Math.PI, arc)
      for (let i = 0; i < this.turnPlate.text.length; i++) {
        const angle = i * arc
        ctx.fillStyle = this.turnPlate.colors[i]
        ctx.beginPath()
        ctx.arc(210, 210, 200, angle, angle + arc, false)
        ctx.arc(210, 210, 30, angle + arc, angle, false)
        // ctx.stroke()
        ctx.fill()
        ctx.save()

        ctx.fillStyle = '#E5302F'
        // translate方法重新映射画布上的 (0,0) 位置
        ctx.translate(210 + Math.cos(angle + arc / 2) * 210, 210 + Math.sin(angle + arc / 2) * 210)

        // rotate方法旋转当前的绘图
        ctx.rotate(angle + arc / 2 + Math.PI / 2)
        ctx.font = 'bold 20px Microsoft YaHei'
        ctx.fillText(this.turnPlate.text[i], -ctx.measureText(this.turnPlate.text[i]).width / 2, 60)
        ctx.restore()
      }

      ctx.beginPath()
      ctx.arc(210, 210, 200, 0, Math.PI * 2, true) // 绘制
      ctx.arc(210, 210, 194, 0, Math.PI * 2, true) // 绘制
      ctx.lineWidth = 6
      ctx.strokeStyle = '#E5302F'
      ctx.stroke()
      ctx.closePath()
    },
    getPrize (n) {
      if (n > 7) {
        return this.turnPlate.text[7 - n + 10]
      }
      return this.turnPlate.text[7 - n]
    },
    lottery () {
      if (this.isTurning) return
      if (this.lotteryTime < 1) {
        return
      }
      this.isTurning = true
      this.rotateAngle = parseInt(((Math.random()) * 20 + this.n * 20)) * 36
      this.styles = `transform: rotate(${this.rotateAngle}deg)`
      const index = (this.rotateAngle % 360) / 36
      this.n++
      setTimeout(() => {
        this.isTurning = false
        this.prize = this.getPrize(index)
        this.showPrize = true
        this.lotteryTime--
      }, 3500)
    },
    closePrize () {
      this.showPrize = false
    }
  }
}
</script>
