import Sprite from '../base/sprite'
import DataBus from '../databus'

const BULLET_IMG_SRC = 'images/bullet.png'
const BULLET_WIDTH = 16
const BULLET_HEIGHT = 30
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const __ = {
  speed: Symbol('speed')
}

const databus = new DataBus()

export default class Bullet extends Sprite {
  constructor() {
    super(BULLET_IMG_SRC, BULLET_WIDTH, BULLET_HEIGHT)
  }

  init(x, y, speed, angle) {
    this.x = x
    this.y = y
    this.angle = angle // 顺时针角度
    this[__.speed] = speed

    this.visible = true
  }

  // 每一帧更新子弹位置
  update() {
    if ( this.angle ) {
      
      // console.log(this.angle, Math.sin(this.angle/180*Math.PI), Math.cos(this.angle/180*Math.PI));
      this.x += Math.round(this[__.speed] * Math.sin(this.angle/180*Math.PI))
      this.y -= Math.round(this[__.speed] * Math.cos(this.angle/180*Math.PI))
    } else {
      this.y -= this[__.speed]
    }
    // 超出屏幕外回收自身
    // console.log(this.x, this.y, screenHeight)
    if (this.y < -this.height || this.x < -this.width || this.x > screenWidth)  {
      databus.removeBullets(this)
      // console.log("回收", this.x, this.y, screenWidth, this.height, this.width)
    }

  }
}
