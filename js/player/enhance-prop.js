import Animation from '../base/animation'
import DataBus from '../databus'

const ENHANCE_IMG_SRC = 'images/mogu.png'
const ENHANCE_WIDTH = 48/2
const ENHANCE_HEIGHT = 48/2

const __ = {
  speed: Symbol('speed')
}

const databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class EnhanceProp extends Animation {
  constructor() {
    super(ENHANCE_IMG_SRC, ENHANCE_WIDTH, ENHANCE_HEIGHT)

    // this.initExplosionAnimation()
  }

  init(x, y, speed, imgSrc) {
    this.x = x
    this.y = y
    !imgSrc || (this.img.src = imgSrc);
    // console.log("speed: ", speed);
    this[__.speed] = speed
    this.random = rnd(0, 60)
    this.visible = true
  }


  // 每一帧更新道具位置 TODO非直线轨迹
  update() {
    // this.x += Math.round(this[__.speed] * Math.sin(this.random/180*Math.PI))
    // if (Math.random() < 0.05) console.log("speed: ",this[__.speed], this.count, this.interval, this.random, this.visible);
    this.y += Math.round(this[__.speed] * 0.3)
    if (this.x > window.innerWidth || this.x < 0) {
      this.random = -this.random
    }

    // 对象回收
    if (this.y > window.innerHeight + this.height) databus.removeEnhance(this)
  }
}
