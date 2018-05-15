<template>
  <div class="square-lottery">
    <div class="lottery-block" :style="pos"></div>
    <prize :prize="lotteryData[index].prize" :show="showPrize" @close="closePrize"/>
    <table class="lottery-table">
      <tr>
        <td style="background: darkcyan" :id="lotteryData[0].id">{{ lotteryData[0].prize }}</td>
        <td style="background: lightblue" :id="lotteryData[1].id">{{ lotteryData[1].prize }}</td>
        <td style="background: yellow" :id="lotteryData[2].id">{{ lotteryData[2].prize }}</td>
        <td style="background: aliceblue" :id="lotteryData[3].id">{{ lotteryData[3].prize }}</td>
      </tr>
      <tr>
        <td style="background: greenyellow" :id="lotteryData[11].id">{{ lotteryData[11].prize }}</td>
        <!--<td></td>-->
        <td colspan="2" rowspan="2" style="background: red; color: #fff; font-size: 28px; cursor: pointer" @click="beginLottery">开始抽奖</td>
        <td style="background: lightgreen" :id="lotteryData[4].id">{{ lotteryData[4].prize }}</td>
      </tr>
      <tr>
        <td style="background: lightcyan" :id="lotteryData[10].id">{{ lotteryData[10].prize }}</td>
        <!--<td></td>-->
        <!--<td></td>-->
        <td style="background: blanchedalmond" :id="lotteryData[5].id">{{ lotteryData[5].prize }}</td>
      </tr>
      <tr>
        <td style="background: mediumorchid" :id="lotteryData[9].id">{{ lotteryData[9].prize }}</td>
        <td style="background: burlywood" :id="lotteryData[8].id">{{ lotteryData[8].prize }}</td>
        <td style="background: cornflowerblue" :id="lotteryData[7].id">{{ lotteryData[7].prize }}</td>
        <td style="background: aquamarine" :id="lotteryData[6].id">{{ lotteryData[6].prize }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import Prize from '../common/prize'
export default {
  name: 'SquareLottery',
  data () {
    return {
      lotteryData: [{
        id: 1,
        prize: 'iPhone X'
      }, {
        id: 2,
        prize: '谢谢参与'
      }, {
        id: 3,
        prize: 'iPad'
      }, {
        id: 4,
        prize: '爵士手表'
      }, {
        id: 5,
        prize: '50元优惠券'
      }, {
        id: 6,
        prize: '精品水杯'
      }, {
        id: 7,
        prize: '谢谢参与'
      }, {
        id: 8,
        prize: '小米手环'
      }, {
        id: 9,
        prize: '精致钢笔'
      }, {
        id: 10,
        prize: '谢谢参与'
      }, {
        id: 11,
        prize: '20元优惠券'
      }, {
        id: 12,
        prize: '100M流量'
      }],
      index: 0,
      timer: null,
      time: 10,
      isTurning: false,
      showPrize: false,
      posArr: [{
        left: '2px',
        top: '0px'
      }, {
        left: '100px',
        top: 0
      }, {
        left: '200px',
        top: 0
      }, {
        left: '298px',
        top: 0
      }, {
        left: '298px',
        top: '100px'
      }, {
        left: '298px',
        top: '200px'
      }, {
        left: '298px',
        top: '298px'
      }, {
        left: '200px',
        top: '298px'
      }, {
        left: '100px',
        top: '298px'
      }, {
        left: '2px',
        top: '298px'
      }, {
        left: '2px',
        top: '200px'
      }, {
        left: '2px',
        top: '100px'
      }]
    }
  },
  components: {
    Prize
  },
  computed: {
    pos () {
      return this.posArr[this.index]
    }
  },
  methods: {
    beginLottery () {
      if (this.isTurning) return
      this.isTurning = true
      const that = this
      that.timerInterval()
      setTimeout(() => {
        clearInterval(that.timer)
        that.time = 10
        that.showPrize = true
        that.isTurning = false
      }, 3000)
    },
    timerInterval () {
      const that = this
      this.timer = setInterval(() => {
        that.index++
        clearInterval(that.timer)
        that.timerInterval()
        that.time += 6
        if (that.index === 12) {
          that.index = 0
        }
      }, that.time)
    },
    closePrize () {
      this.showPrize = false
    }
  }
}
</script>

<style scoped lang="scss">
.square-lottery {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  background: lightcoral;
  .lottery-block {
    width: 100px;
    height: 102px;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(240, 128, 128, 0.8);
  }
  .lottery-table {
    width: 100%;
    height: 100%;
    border: 2px solid lightcoral;
    tr {
      width: 100%;
      td {
        width: 100px;
      }
    }
  }
}
</style>
