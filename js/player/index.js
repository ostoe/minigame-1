import Sprite from '../base/sprite'
import Bullet from './bullet'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/hero.png'
const PLAYER_WIDTH = 80
const PLAYER_HEIGHT = 80
const BULLET_LEVEL = {
  0: [0],
  1: [-5, 5],
  2: [-5, 0, 5],
  3: [-10, -5, 0, 5],
  4: [-10, -5, 0, 5, 10],
  5: [-15, -10, -5, 0, 5, 10],
  6: [-15, -10, -5, 0, 5, 10, -15],
  7: [-30, -15, -10, -5, 0, 5, 10, -15],
  8: [-30, -15, -10, -5, 0, 5, 10, -15, 30],
}

const databus = new DataBus()

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = screenHeight - this.height - 30

    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false

    this.bullets = []

    // 初始化事件监听
    this.initEvent()
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30

    return !!(x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation)
  }

  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2
    let disY = y - this.height / 2

    if (disX < 0) disX = 0

    else if (disX > screenWidth - this.width) disX = screenWidth - this.width

    if (disY <= 0) disY = 0

    else if (disY > screenHeight - this.height) disY = screenHeight - this.height

    this.x = disX
    this.y = disY
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      //
      if (this.checkIsFingerOnAir(x, y)) {
        this.touched = true

        this.setAirPosAcrossFingerPosZ(x, y)
      }
    }))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      if (this.touched) this.setAirPosAcrossFingerPosZ(x, y)
    }))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      this.touched = false
    }))
  }

  /**
   * 玩家射击操作
   * 射击时机由外部决定
   */
  shoot(mode=0) {
    let imgSrc = ""
    if(mode == 0) {
      // console.log('---');
      const bullet = databus.pool.getItemByClass('bullet', Bullet)
      bullet.init(
        this.x + this.width / 2 - bullet.width / 2,
        this.y - 10,
        10,
        0
      )
  
      databus.bullets.push(bullet)
    } else if(mode <= 8) { // 五发模式 [-30, -15, -10, -5, 0, 5, 10, 15, 30]
      // console.log("---1");
      // let tmp11 = databus.bullets.map(e=>e.angle)
      // console.log("b length:", databus.bullets.length, tmp11);
      BULLET_LEVEL[mode].forEach( (e) => {
        const bullet = databus.pool.getItemByClass('bullet', Bullet, )
        // {BULLET_IMG_SRC: 'images/bullet1.png'})
        // console.log( e, "<-", bullet.angle)
        
        if (Math.abs(e) == 10) {
          imgSrc = 'images/bullet1.png';
        } else {
          imgSrc = 'images/bullet.png'
        }
        bullet.init(
          this.x + this.width / 2 - bullet.width / 2,
          this.y - 10,
          10,
          e,
          imgSrc
        )
        // console.log( e, "==?", bullet.angle)
        databus.bullets.push(bullet)
      })
      // let tmp = databus.bullets.map(e=>e.angle)
      // console.log("a length:", databus.bullets.length, tmp);
    } else if(8< mode <= 100) {
      BULLET_LEVEL[8].forEach( (e) => {
        const bullet = databus.pool.getItemByClass('bullet', Bullet, )
        if (Math.abs(e) == 10) {
          imgSrc = 'images/bullet1.png';
        } else {
          imgSrc = 'images/bullet.png'
        }
        bullet.init(
          this.x + this.width / 2 - bullet.width / 2,
          this.y - 10,
          10,
          e,
          imgSrc
        )
        databus.bullets.push(bullet)
      })

    }
    
  }
}
