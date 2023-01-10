import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if (instance) return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.frame = 0
    this.score = 0
    this.bullets = []
    this.enemys = []
    this.animations = []
    this.gameOver = false
    this.enhances = []
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
    const temp = this.enemys.shift()

    temp.visible = false
    // console.log("enemy: ", enemy.y, "temp: ", temp.y, ); 、、 没有顺序问题，总是一致
    this.pool.recover('enemy', enemy)
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    const temp = this.bullets.splice(this.bullets.indexOf(bullet), 1)
    // const temp = this.bullets.shift()

    temp.visible = false
    // console.log("will remove:", temp[0].angle, "this->", bullet.angle, temp[0] == bullet ); // temp[0] always=== bullet
    // this.pool.recover('bullet', bullet)
    this.pool.recover('bullet', bullet)
  }

  removeEnhance(enhance) {
    const temp = this.enhances.splice(this.enhances.indexOf(enhance), 1)[0]
    // console.log("enhance: ", enhance.random, "temp: ", temp.random, "|", enhance.y, temp.y);
    temp.visible = false

    this.pool.recover('enhance', enhance)
  }
}
