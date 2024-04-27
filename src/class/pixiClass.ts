import * as PIXI from 'pixi.js'
import { getRectAngleCenter, getRectNewTopLeftPoint, xy } from "@/utils/GraphUtils.ts";
import { ifNotValid, ifValid } from "@/utils/ObjectUtils.ts";
import { genId } from "@/utils/IdUtils.ts";
import { runBasedOnFirstAsyncFunction } from "@/utils/FuncUtils.ts";

const defaultTextc = '#000'
const defaultFillc = 0xffffff
const defaultLinec = 0xffffff
const defaultBgc = 0xffffff
const defaultBCLineC = 0x00ff00
const defaultSHZJLineC = 0xffffff

export class PixiClass {
  private el: HTMLElement;
  private pixiScense: any;
  private config = {
    canvasWidth: 3000,
    canvasHeight: 3000
  }
  private mouse = {
    startX: 0,
    startY: 0,
    nowX: 0,
    nowY: 0,
    lastX: 0,
    lastY: 0,
    lastX2: 0,
    lastY2: 0,
    offsetX: 0,
    offsetY: 0,
    down: false
  };
  private pointerDownIngL: boolean = false;
  private pointerDownIngR: boolean = false;
  private keyDownIng: number[] = [];

  constructor(el: HTMLElement) {
    this.el = el
    this.config.canvasWidth = this.el.clientWidth
    this.config.canvasHeight = this.el.clientHeight
    this.initPixi()
  }

  async initPixi() {
    this.pixiScense = new PIXI.Application();
    await this.pixiScense.init({
      width: this.config.canvasWidth,
      height: this.config.canvasHeight,
      antialias: true, // 启用抗锯齿
      resolution: window.devicePixelRatio || 1, // 使用设备的像素比例
    })
    this.el.appendChild(this.pixiScense.canvas);
    this.pixiScense.stage.interactive = true; // 场景交互
    // window.addEventListener('keydown', async e => await this.onKeyDown(e));
    // window.addEventListener('keyup', async e => await this.onKeyUp(e));
    // this.pixiScense.canvas.addEventListener('wheel', async e => await this.onWheel(e))
    // this.pixiScense.canvas.addEventListener('mouseleave', async e => await this.onPointerLeave(e))
    // const interaction = this.pixiScense.renderer.plugins.interaction
    // interaction.on('pointerdown', async e => await this.onPointerDown(e))
    // interaction.on('pointermove', async e => await this.onPointerMove(e))
    // interaction.on('pointerup', async e => await this.onPointerUp(e))
    return new Promise(resolve => {
      resolve(null)
    })
  }

  async destroy() {
    // window.removeEventListener('keydown', async e => await this.onKeyDown(e));
    // window.removeEventListener('keyup', async e => await this.onKeyUp(e));
    // this.pixiScense.canvas.removeEventListener('wheel', async e => await this.onWheel(e))
    // this.pixiScense.canvas.removeEventListener('mouseleave', async e => await this.onPointerLeave(e))
    // const interaction = this.pixiScense.renderer.plugins.interaction
    // interaction.off('pointerdown')
    // interaction.off('pointermove')
    // interaction.off('pointerup')
    this.pixiScense.stage.removeChildren()
    this.pixiScense.stop()
    try {
      this.el.removeChild(this.pixiScense.canvas)
    } catch (e) {
      console.error(e)
    }
  }

  // async onPointerDown(e) {
  //   e && e.data && e.data.originalEvent && e.data.originalEvent.preventDefault()
  //   this.mouse.down = true
  //   // const ex = e.data.global.x, ey = e.data.global.y
  //   this.mouse.lastX2 = e.data.global.x
  //   this.mouse.lastY2 = e.data.global.y
  //   const point = this.pixiScense.renderer.plugins.interaction.mouse.global;
  //   const scenePoint = this.pixiScense.stage.toLocal(point);
  //   const ex = scenePoint.x, ey = scenePoint.y
  //   this.mouse.startX = ex
  //   this.mouse.startY = ey
  //   this.mouse.lastX = ex
  //   this.mouse.lastY = ey
  //   const funcs = [
  //     []
  //   ]
  //   await runBasedOnFirstAsyncFunction(funcs)

  //   if (e.data.button === 0) {
  //     this.pointerDownIngL = true
  //   }
  //   if (e.data.button === 2) {
  //     this.pointerDownIngR = true
  //   }
  // }

  // async onPointerMove(e) {
  //   e && e.data && e.data.originalEvent && e.data.originalEvent.preventDefault()
  //   const offsetX = e.data.global.x + this.el.offsetLeft
  //   const offsetY = e.data.global.y + this.el.offsetTop
  //   const point = this.pixiScense.renderer.plugins.interaction.mouse.global;
  //   const scenePoint = this.pixiScense.stage.toLocal(point);
  //   const ex = scenePoint.x, ey = scenePoint.y
  //   this.mouse.nowX = ex
  //   this.mouse.nowY = ey
  //   this.mouse.offsetX = offsetX
  //   this.mouse.offsetY = offsetY
  //   let movex = ex - this.mouse.lastX
  //   let movey = ey - this.mouse.lastY
  //   const funcs = [
  //     []
  //   ]
  //   await runBasedOnFirstAsyncFunction(funcs)

  //   if (e.data.button === 0) {
  //   }
  //   if (e.data.button === 2) {
  //   }
  //   this.mouse.lastX = ex
  //   this.mouse.lastY = ey
  //   this.mouse.lastX2 = e.data.global.x
  //   this.mouse.lastY2 = e.data.global.y
  // }

  // async onPointerUp(e, ifPointerLeave = false) {
  //   e && e.data && e.data.originalEvent && e.data.originalEvent.preventDefault()
  //   this.mouse.down = false
  //   const point = this.pixiScense.renderer.plugins.interaction.mouse.global;
  //   const scenePoint = this.pixiScense.stage.toLocal(point);
  //   const ex = scenePoint.x, ey = scenePoint.y
  //   this.mouse.nowX = ex
  //   this.mouse.nowY = ey
  //   const funcs = [
  //     []
  //   ]
  //   await runBasedOnFirstAsyncFunction(funcs)

  //   if (e.data && ifValid(e.data.button)) {
  //     if (e.data.button === 0) {
  //       this.pointerDownIngL = false
  //     }
  //     if (e.data.button === 2) {
  //       this.pointerDownIngR = false
  //     }
  //   }
  // }

  // async onPointerLeave(e) {
  //   e && e.data && e.data.originalEvent && e.data.originalEvent.preventDefault()
  //   await this.onPointerUp(e, true)
  // }

  // async onWheel(e) {
  //   e && e.data && e.data.originalEvent && e.data.originalEvent.preventDefault()
  //   e.preventDefault()
  //   const minScale = 0.1
  //   const cs = this.pixiScense.stage.scale.x;
  //   const delta_ = e.deltaY * -0.0005;
  //   const delta = cs + delta_ > minScale ? delta_ : 0;
  //   const canvasContainer = this.pixiScense.stage;
  //   const currentX = canvasContainer.position.x;
  //   const currentY = canvasContainer.position.y;
  //   const nx = currentX - this.mouse.nowX * delta
  //   const ny = currentY - this.mouse.nowY * delta
  //   await this.moveCanvasTo({x: nx, y: ny, scale: cs + delta})
  // }

  // async onKeyDown(e) {
  //   if (this.keyDownIng.indexOf(e.keyCode) === -1) {
  //     this.keyDownIng.push(e.keyCode)
  //   }
  //   switch (e.keyCode) {
  //   }
  // }

  // async onKeyUp(e) {
  //   if (this.keyDownIng.indexOf(e.keyCode) > -1) {
  //     this.keyDownIng.splice(this.keyDownIng.indexOf(e.keyCode), 1)
  //   }
  //   switch (e.keyCode) {
  //   }
  // }

  async moveCanvasTo({
                       x,
                       y,
                       scale
                     }: {
                       x?: number
                       y?: number
                       scale?: number
                     } = {}
  ) {
    const canvasContainer = this.pixiScense.stage;
    const x_ = x || canvasContainer.position.x
    const y_ = y || canvasContainer.position.y
    const scale_ = scale || this.pixiScense.stage.scale.x
    canvasContainer.position.x = x_;
    canvasContainer.position.y = y_;
    canvasContainer.scale.set(scale_);
  }

  /**
   * 两点距离
   * @param x1
   * @param y1
   * @param x2
   * @param y2
   * @returns {number}
   */
  distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  /**
   * 两点距离
   * @param point1
   * @param point2
   * @returns {number}
   */
  distance2(point1: xy, point2: xy) {
    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;
    return this.distance(x1, y1, x2, y2);
  }

  /**
   * 根据id获取画布中的元素
   * @param id
   * @returns {*|null}
   */
  findPixiObjectById(id: any) {
    for (let i = 0; i < this.pixiScense.stage.children.length; i++) {
      const child = this.pixiScense.stage.children[i];
      if (child.id === id) {
        return child;
      }
    }
    return null;
  }

  /**
   * 清空画布
   */
  clearPixi(...ignoreids: any[]) {
    this.pixiScense.stage.removeChild(...this.pixiScense.stage.children.filter((item: any) => ignoreids.indexOf(item.custom.id) === -1))
  }

  /**
   * 删除pixi元素
   * @param ids
   */
  clearPixiObj(...ids: any[]) {
    ids.forEach(id => {
      const obj = this.findPixiObjectById(id)
      if (obj) {
        this.pixiScense.stage.removeChild(obj)
      }
    })
  }

  /**
   * 绘制点
   * @description 如果需要实心点，fillAlpha传1，fill传颜色，lineWidth传0
   * @description 如果需要空心点，fillAlpha传0，lineColor传颜色，lineWidth传线条宽度
   * @param x
   * @param y
   * @param id
   * @param radius
   * @param fillAlpha
   * @param fill
   * @param lineWidth
   * @param lineColor
   * @returns {{x, y, fillAlpha: number, lineColor: number, id: string, radius: number, fill: number, lineWidth: number}}
   */
  drawPoint({
              id = genId(),
              x,
              y,
              radius = 5,
              fillAlpha = 1,
              fill = defaultFillc,
              lineWidth = 0,
              lineColor = defaultLinec
            }: {
              id?: string,
              x: number,
              y: number,
              radius: number,
              fillAlpha?: number,
              fill?: any,
              lineWidth?: number,
              lineColor?: any
            }
  ) {
    const custom = {x, y, id, radius, fillAlpha, fill, lineWidth, lineColor}
    const graphics = new PIXI.Graphics()
    graphics.circle(x, y, radius)
    graphics.setStrokeStyle({width: lineWidth, color: lineColor})
    graphics.fill({color: fill, alpha: fillAlpha})
    graphics['id'] = id
    graphics['custom'] = custom
    this.pixiScense.stage.addChild(graphics)
    return custom
  }

  // /**
  //  * 修改点
  //  * @param id
  //  * @param x
  //  * @param y
  //  * @param radius
  //  * @param fillAlpha
  //  * @param fill
  //  * @param lineWidth
  //  * @param lineColor
  //  */
  // changePoint({
  //               id,
  //               x,
  //               y,
  //               radius,
  //               fillAlpha,
  //               fill,
  //               lineWidth,
  //               lineColor
  //             }: {
  //               id: string,
  //               x?: number,
  //               y?: number,
  //               radius?: number,
  //               fillAlpha?: number,
  //               fill?: any,
  //               lineWidth?: number,
  //               lineColor?: any
  //             }
  // ) {
  //   const graphics = this.findPixiObjectById(id)
  //   if (graphics) {
  //     const custom = graphics.custom
  //     if (ifValid(x) && ifValid(y)) {
  //       custom.x = x
  //       custom.y = y
  //     }
  //     if (ifValid(radius)) {
  //       custom.radius = radius
  //     }
  //     if (ifValid(fillAlpha)) {
  //       custom.fillAlpha = fillAlpha
  //     }
  //     if (ifValid(fill)) {
  //       custom.fill = fill
  //     }
  //     if (ifValid(lineWidth)) {
  //       custom.lineWidth = lineWidth
  //     }
  //     if (ifValid(lineColor)) {
  //       custom.lineColor = lineColor
  //     }
  //     graphics.clear()
  //     graphics.beginFill(custom.fill, custom.fillAlpha)
  //     graphics.lineStyle(custom.lineWidth, custom.lineColor)
  //     graphics.drawCircle(custom.x, custom.y, custom.radius)
  //     graphics.endFill()
  //     graphics.custom = custom
  //   }
  // }

  // /**
  //  * 绘制线
  //  * @param id
  //  * @param x1
  //  * @param y1
  //  * @param x2
  //  * @param y2
  //  * @param width
  //  * @param color
  //  * @param alpha
  //  * @returns {{color: number, alpha: number, y1: *, width: number, x1: *, y2: *, x2: *, id: string}}
  //  */
  // drawLine({
  //            id = genId(),
  //            x1,
  //            y1,
  //            x2,
  //            y2,
  //            width = 2,
  //            color = defaultLinec,
  //            alpha = 1
  //          }: {
  //            id?: string,
  //            x1?: number,
  //            y1?: number,
  //            x2?: number,
  //            y2?: number,
  //            width?: number,
  //            color?: any,
  //            alpha?: number
  //          }
  // ) {
  //   const custom = {x1, y1, x2, y2, id, width, color, alpha}
  //   const graphics = new PIXI.Graphics()
  //   graphics.lineStyle(width, color, alpha)
  //   graphics.moveTo(x1, y1)
  //   graphics.lineTo(x2, y2)
  //   graphics.id = id
  //   graphics.custom = custom
  //   this.pixiScense.stage.addChild(graphics)
  //   return custom
  // }

  // /**
  //  * 修改线
  //  * @param id
  //  * @param x1
  //  * @param y1
  //  * @param x2
  //  * @param y2
  //  * @param width
  //  * @param color
  //  * @param alpha
  //  */
  // changeLine({
  //              id,
  //              x1,
  //              y1,
  //              x2,
  //              y2,
  //              width,
  //              color,
  //              alpha
  //            }: {
  //              id: string,
  //              x1?: number,
  //              y1?: number,
  //              x2?: number,
  //              y2?: number,
  //              width?: number,
  //              color?: any,
  //              alpha?: number
  //            }
  // ) {
  //   const graphics = this.findPixiObjectById(id)
  //   if (graphics) {
  //     const custom = graphics.custom
  //     if (ifValid(width)) {
  //       custom.color = width
  //     }
  //     if (ifValid(color)) {
  //       custom.color = color
  //     }
  //     if (ifValid(alpha)) {
  //       custom.color = alpha
  //     }
  //     if (ifValid(x1) && ifValid(y1) && ifValid(x2) && ifValid(y2)) {
  //       custom.x1 = x1
  //       custom.y1 = y1
  //       custom.x2 = x2
  //       custom.y2 = y2
  //     }
  //     graphics.clear();
  //     graphics.lineStyle(custom.width, custom.color, custom.alpha)
  //     graphics.moveTo(custom.x1, custom.y1);
  //     graphics.lineTo(custom.x2, custom.y2);
  //     graphics.custom = custom
  //   }
  // }

  // /**
  //  * 绘制多边形
  //  * @param id
  //  * @param path
  //  * @param fill
  //  * @param fillAlpha
  //  * @returns {{path: *[], fillAlpha: number, id: string, fill: number}|null}
  //  */
  // drawPolygon({
  //               id = genId(),
  //               path = [],
  //               fill = defaultBgc,
  //               fillAlpha = 1
  //             }: {
  //               id?: string,
  //               path?: any[],
  //               fill?: any,
  //               fillAlpha?: number
  //             }
  // ) {
  //   if (path.length < 3) {
  //     return null
  //   }
  //   const custom = {id, path, fill, fillAlpha}
  //   const graphics = new PIXI.Graphics()
  //   graphics.beginFill(fill, fillAlpha)
  //   graphics.drawPolygon(path)
  //   graphics.endFill()
  //   graphics.id = id
  //   graphics.custom = custom
  //   this.pixiScense.stage.addChild(graphics)
  //   return custom
  // }

  // /**
  //  * 修改多边形
  //  * @param id
  //  * @param path
  //  * @param fill
  //  * @param fillAlpha
  //  */
  // changePolygon({
  //                 id,
  //                 path,
  //                 fill,
  //                 fillAlpha
  //               }: {
  //                 id: string,
  //                 path?: any[],
  //                 fill?: any,
  //                 fillAlpha?: number
  //               }
  // ) {
  //   const graphics = this.findPixiObjectById(id)
  //   if (graphics) {
  //     const custom = graphics.custom
  //     if (ifValid(path)) {
  //       custom.path = path
  //     }
  //     if (ifValid(fill)) {
  //       custom.fill = fill
  //     }
  //     if (ifValid(fillAlpha)) {
  //       custom.fillAlpha = fillAlpha
  //     }
  //     graphics.clear()
  //     graphics.beginFill(custom.fill, custom.fillAlpha)
  //     graphics.drawPolygon(custom.path)
  //     graphics.endFill()
  //     graphics.custom = custom
  //   }
  // }

  // /**
  //  * 绘制图片，根据四点坐标
  //  * @param id
  //  * @param imgUrl
  //  * @param points
  //  * @returns {{onmouseout: null, onclick: null, x: number, width: number, y: number, angle: number, id: string, onmouseover: null, height: number, skew: number[]}|null}
  //  */
  // drawImageBy4Points({
  //                      id = genId(),
  //                      imgUrl = null,
  //                      points = {},
  //                    }: {
  //                      id?: string
  //                      imgUrl?: string | null
  //                      points?: any
  //                    } = {}
  // ) {
  //   if (!!!imgUrl) {
  //     return null
  //   }
  //   const horizontalVector = {x: points.tr.x - points.tl.x, y: points.tr.y - points.tl.y};
  //   const verticalVector = {x: points.bl.x - points.tl.x, y: points.bl.y - points.tl.y};
  //   const skewX = Math.atan2(horizontalVector.y, horizontalVector.x);
  //   const skewY = Math.atan2(verticalVector.x, verticalVector.y);
  //   const skew = [skewY, skewX];
  //   const x = points.tl.x, y = points.tl.y,
  //       width = this.distance2(points.tl, points.tr),
  //       height = this.distance2(points.tl, points.bl)
  //   return this.drawImageByLeftTopPoint({
  //     id, imgUrl, x, y, width, height, skew, angle: 0,
  //   })
  // }

  // /**
  //  * 绘制图片，根据中心点
  //  * todo 目前只适用于角度等于0，以后记得改
  //  * @param imgUrl
  //  * @param id
  //  * @param centerX
  //  * @param centerY
  //  * @param width
  //  * @param height
  //  * @param skew
  //  * @param angle
  //  * @returns {{onmouseout: null, onclick: null, x: number, width: number, y: number, angle: number, id: string, onmouseover: null, height: number, skew: number[]}}
  //  */
  // drawImageByCenterPoint({
  //                          id = genId(),
  //                          imgUrl = null,
  //                          centerX = 0,
  //                          centerY = 0,
  //                          width = 100,
  //                          height = 100,
  //                          skew = [0, 0],
  //                          angle = 0
  //                        }: {
  //                          id?: string,
  //                          imgUrl?: string | null,
  //                          centerX?: number,
  //                          centerY?: number,
  //                          width?: number,
  //                          height?: number,
  //                          skew?: number[],
  //                          angle?: number
  //                        }
  // ) {
  //   const x = centerX - width / 2 - (height * skew[0]) / 2, y = centerY - height / 2 - (width * skew[1]) / 2
  //   return this.drawImageByLeftTopPoint({
  //     imgUrl, id, x, y, width, height, skew, angle
  //   })
  // }

  // /**
  //  * 绘制图片，根据左上点
  //  * @param id
  //  * @param imgUrl
  //  * @param x
  //  * @param y
  //  * @param width
  //  * @param height
  //  * @param skew Δy/Δx
  //  * @param angle
  //  * @param onclick
  //  * @param onmouseover
  //  * @param onmouseout
  //  * @returns {{onmouseout: null, onclick: null, x: number, width: number, y: number, angle: number, id: string, onmouseover: null, height: number, skew: number[]}|null}
  //  */
  // drawImageByLeftTopPoint({
  //                           id = genId(),
  //                           imgUrl = null,
  //                           x = 0,
  //                           y = 0,
  //                           width = 100,
  //                           height = 100,
  //                           skew = [0, 0],
  //                           angle = 0,
  //                         }: {
  //                           id?: string,
  //                           imgUrl?: string | null,
  //                           x?: number,
  //                           y?: number,
  //                           width?: number,
  //                           height?: number,
  //                           skew?: number[],
  //                           angle?: number
  //                         }
  // ) {
  //   if (!!!imgUrl) {
  //     return null
  //   }
  //   const custom = {
  //     id, x, y, width, height, skew, angle
  //   }
  //   const texture = PIXI.Texture.from(imgUrl)
  //   const sprite = new PIXI.Sprite(texture)
  //   sprite.x = x
  //   sprite.y = y
  //   sprite.width = width
  //   sprite.height = height
  //   sprite.skew.set(skew[0], skew[1])
  //   sprite.rotation = angle * PIXI.DEG_TO_RAD
  //   sprite.id = id
  //   sprite.custom = custom
  //   sprite.interactive = true;  // 启用交互性，使图形对象能够响应鼠标事件
  //   this.pixiScense.stage.addChild(sprite)
  //   return custom
  // }

  // /**
  //  * 修改图片
  //  * @param id id
  //  * @param imgUrl imgUrl
  //  */
  // changeImage({
  //               id,
  //               imgUrl = null
  //             }: {
  //               id: string,
  //               imgUrl?: string | null
  //             }
  // ) {
  //   if (!!!imgUrl) {
  //     return null
  //   }
  //   const foundObject = this.findPixiObjectById(id)
  //   if (foundObject) {
  //     foundObject.texture = PIXI.Texture.from(imgUrl)
  //   }
  // }

  // /**
  //  * 绘制矩形，根据中心点坐标
  //  * todo 目前只适用于角度等于0，以后记得改
  //  * @description 如果需要实心矩形，fillAlpha传1，fill传颜色，lineWidth传0
  //  * @description 如果需要空心矩形，fillAlpha传0，lineColor传颜色，lineWidth传线条宽度
  //  * @param id
  //  * @param fill
  //  * @param fillAlpha
  //  * @param lineWidth
  //  * @param lineColor
  //  * @param centerX
  //  * @param centerY
  //  * @param width
  //  * @param height
  //  * @param angle
  //  * @returns {{x: number, width: number, y: number, angle: number, id: string, fill: number, angleByCenter: boolean, height: number}}
  //  */
  // drawRectByCenterPoint({
  //                         id = genId(),
  //                         fill = defaultBgc,
  //                         fillAlpha = 1,
  //                         lineWidth = 0,
  //                         lineColor = defaultLinec,
  //                         centerX = 0,
  //                         centerY = 0,
  //                         width = 100,
  //                         height = 100,
  //                         angle = 0
  //                       }: {
  //                         id?: string,
  //                         fill?: any,
  //                         fillAlpha?: number,
  //                         lineWidth?: number,
  //                         lineColor?: any,
  //                         centerX?: number,
  //                         centerY?: number,
  //                         width?: number,
  //                         height?: number,
  //                         angle?: number
  //                       }
  // ) {
  //   const x = centerX - width / 2, y = centerY - height / 2
  //   return this.drawRectByLeftTopPoint({
  //     id,
  //     fill,
  //     fillAlpha,
  //     lineWidth,
  //     lineColor,
  //     x,
  //     y,
  //     width,
  //     height,
  //     angle,
  //     angleByCenter: true
  //   })
  // }

  // /**
  //  *
  //  * 绘制矩形，根据左上角点坐标
  //  * @description 如果需要实心矩形，fillAlpha传1，fill传颜色，lineWidth传0
  //  * @description 如果需要空心矩形，fillAlpha传0，lineColor传颜色，lineWidth传线条宽度
  //  * @param id
  //  * @param fill
  //  * @param fillAlpha
  //  * @param lineWidth
  //  * @param lineColor
  //  * @param x
  //  * @param y
  //  * @param width
  //  * @param height
  //  * @param angle
  //  * @param angleByCenter
  //  * @returns {{x: number, width: number, y: number, fillAlpha: number, angle: number, lineColor: number, id: string, fill: number, lineWidth: number, angleByCenter: boolean, height: number}}
  //  */
  // drawRectByLeftTopPoint({
  //                          id = genId(),
  //                          fill = defaultBgc,
  //                          fillAlpha = 1,
  //                          lineWidth = 0,
  //                          lineColor = defaultLinec,
  //                          x = 0,
  //                          y = 0,
  //                          width = 100,
  //                          height = 100,
  //                          angle = 0,
  //                          angleByCenter = false,
  //                        }: {
  //                          id?: string,
  //                          fill?: any,
  //                          fillAlpha?: number,
  //                          lineWidth?: number,
  //                          lineColor?: any,
  //                          x?: number,
  //                          y?: number,
  //                          width?: number,
  //                          height?: number,
  //                          angle?: number,
  //                          angleByCenter?: boolean
  //                        }
  // ) {
  //   const custom = {
  //     id, x, y, width, height, fill, fillAlpha, lineWidth, lineColor, angle, angleByCenter
  //   }
  //   const rect = new PIXI.Graphics()
  //   rect.beginFill(fill, fillAlpha)
  //   rect.lineStyle(lineWidth, lineColor)
  //   rect.angle = angle
  //   if (angleByCenter) {
  //     rect.pivot.set(x + width / 2, y + height / 2)
  //     rect.position.set(x + width / 2, y + height / 2)
  //   } else {
  //     rect.pivot.set(x, y)
  //     rect.position.set(x, y)
  //   }
  //   rect.drawRect(x, y, width, height)
  //   rect.endFill()
  //   // rect.blendMode = PIXI.BLEND_MODES.NORMAL; // 颜色混合方式
  //   rect.alpha = 1
  //   rect.id = id
  //   rect.custom = custom
  //   this.pixiScense.stage.addChild(rect)
  //   return custom
  // }

  // /**
  //  * 修改矩形，根据中心点坐标
  //  * todo 目前只适用于角度等于0，以后记得改
  //  * @param id
  //  * @param centerX
  //  * @param centerY
  //  * @param width
  //  * @param height
  //  * @param angle
  //  * @param angleByCenter
  //  */
  // changeRectByCenterPoint({
  //                           id,
  //                           centerX,
  //                           centerY,
  //                           width,
  //                           height,
  //                           angle,
  //                           angleByCenter
  //                         }: {
  //                           id: string,
  //                           centerX?: number,
  //                           centerY?: number,
  //                           width?: number,
  //                           height?: number,
  //                           angle?: number,
  //                           angleByCenter?: boolean
  //                         }
  // ) {
  //   const rect = this.findPixiObjectById(id)
  //   if (rect) {
  //     let custom = rect.custom
  //     if (ifValid(width) && ifValid(height)) {
  //       custom.width = width
  //       custom.height = height
  //     }
  //     const {fill, fillAlpha, lineWidth, lineColor} = custom
  //     if (ifValid(centerX) && ifValid(centerY)) {
  //       const x = centerX ? centerX - custom.width / 2 : custom.x
  //       const y = centerY ? centerY - custom.height / 2 : custom.y
  //       const angle_ = ifValid(angle) ? angle : custom.angle
  //       const angleByCenter_ = ifValid(angleByCenter) ? angleByCenter : custom.angleByCenter
  //       rect.clear()
  //       rect.beginFill(fill, fillAlpha)
  //       rect.lineStyle(lineWidth, lineColor)
  //       rect.angle = angle_
  //       if (angleByCenter_) {
  //         rect.pivot.set(x + custom.width / 2, y + custom.height / 2)
  //         rect.position.set(x + custom.width / 2, y + custom.height / 2)
  //       } else {
  //         rect.pivot.set(x, y)
  //         rect.position.set(x, y)
  //       }
  //       rect.drawRect(x, y, custom.width, custom.height)
  //       rect.endFill()
  //       custom = {...custom, x, y, angle: angle_, angleByCenter: angleByCenter_}
  //       rect.custom = custom
  //     }
  //   }
  // }

  // /**
  //  * 修改矩形，根据左上角点坐标
  //  * @description 如果需要实心矩形，fillAlpha传1，fill传颜色，lineWidth传0
  //  * @description 如果需要空心矩形，fillAlpha传0，lineColor传颜色，lineWidth传线条宽度
  //  * @param id
  //  * @param fill
  //  * @param fillAlpha
  //  * @param lineWidth
  //  * @param lineColor
  //  * @param x
  //  * @param y
  //  * @param angle
  //  * @param angleByCenter
  //  */
  // changeRectByLeftTopPoint({
  //                            id,
  //                            fill,
  //                            fillAlpha,
  //                            lineWidth,
  //                            lineColor,
  //                            x,
  //                            y,
  //                            angle,
  //                            angleByCenter
  //                          }: {
  //                            id: string,
  //                            fill?: any,
  //                            fillAlpha?: number,
  //                            lineWidth?: number,
  //                            lineColor?: any,
  //                            x?: number,
  //                            y?: number,
  //                            angle?: number,
  //                            angleByCenter?: boolean
  //                          }
  // ) {
  //   const rect = this.findPixiObjectById(id)
  //   if (rect) {
  //     const custom = rect.custom
  //     if (ifValid(fill)) {
  //       custom.fill = fill
  //     }
  //     if (ifValid(fillAlpha)) {
  //       custom.fillAlpha = fillAlpha
  //     }
  //     if (ifValid(lineWidth)) {
  //       custom.lineWidth = lineWidth
  //     }
  //     if (ifValid(lineColor)) {
  //       custom.lineColor = lineColor
  //     }
  //     if (ifValid(angle)) {
  //       custom.angle = angle
  //     }
  //     if (ifValid(angleByCenter)) {
  //       custom.angleByCenter = angleByCenter
  //     }
  //     if (ifValid(x) && ifValid(y)) {
  //       custom.x = x
  //       custom.y = y
  //     }
  //     rect.clear()
  //     rect.beginFill(custom.fill, custom.fillAlpha)
  //     rect.lineStyle(custom.lineWidth, custom.lineColor)
  //     rect.angle = custom.angle
  //     if (custom.angleByCenter) {
  //       rect.pivot.set(custom.x + custom.width / 2, custom.y + custom.height / 2)
  //       rect.position.set(custom.x + custom.width / 2, custom.y + custom.height / 2)
  //     } else {
  //       rect.pivot.set(custom.x, custom.y)
  //       rect.position.set(custom.x, custom.y)
  //     }
  //     rect.drawRect(custom.x, custom.y, custom.width, custom.height)
  //     rect.endFill()
  //     rect.custom = custom
  //     // let custom = rect.custom
  //     // const { width, height, fill, fillAlpha, lineWidth, lineColor } = custom
  //     // if (ifValid(x) && ifValid(y)) {
  //     //   const angle_ = ifValid(angle) ? angle : custom.angle
  //     //   const angleByCenter_ = ifValid(angleByCenter) ? angleByCenter : custom.angleByCenter
  //     //   rect.clear()
  //     //   rect.beginFill(fill, fillAlpha)
  //     //   rect.lineStyle(lineWidth, lineColor)
  //     //   rect.angle = angle_
  //     //   if (angleByCenter_) {
  //     //     rect.pivot.set(x + width / 2, y + height / 2)
  //     //     rect.position.set(x + width / 2, y + height / 2)
  //     //   } else {
  //     //     rect.pivot.set(x, y)
  //     //     rect.position.set(x, y)
  //     //   }
  //     //   rect.drawRect(x, y, width, height)
  //     //   rect.endFill()
  //     //   custom = { ...custom, x, y, angle: angle_, angleByCenter: angleByCenter_ }
  //     //   rect.custom = custom
  //     // }
  //   }
  // }

  // /**
  //  * 绘制文字，根据左上点坐标
  //  * @param id
  //  * @param x
  //  * @param y
  //  * @param text
  //  * @param angle
  //  * @param width
  //  * @param align
  //  * @param fill
  //  * @param fontFamily
  //  * @param fontSize
  //  * @param centerX
  //  * @param centerY
  //  * @returns {{fontFamily: string, x: *, width: *, y: *, angle: number, fontSize: number, id: string, text: string, align: string, fill: number}}
  //  */
  // drawTextByLeftTopPoint({
  //                          id = genId(),
  //                          x,
  //                          y,
  //                          text = '',
  //                          angle = 0,
  //                          width,
  //                          align = 'left',
  //                          fill = 0x000000,
  //                          fontFamily = 'Arial',
  //                          fontSize = 8
  //                        }: {
  //                          id?: string,
  //                          x?: number,
  //                          y?: number,
  //                          text?: any,
  //                          angle?: number,
  //                          width?: number,
  //                          align?: any,
  //                          fill?: any,
  //                          fontFamily?: any,
  //                          fontSize?: number
  //                        },
  //                        {
  //                          centerX,
  //                          centerY
  //                        }: {
  //                          centerX?: number
  //                          centerY?: number
  //                        } = {}
  // ) {
  //   const custom = {id, x, y, text, angle, width, align, fill, fontFamily, fontSize}
  //   const pixitext = new PIXI.Text(text, {
  //     align,
  //     fill,
  //     fontFamily,
  //     fontSize
  //   })
  //   if (ifValid(width)) {
  //     pixitext.width = width
  //   } else {
  //     custom.width = pixitext.width
  //   }
  //   if (ifValid(centerX) && ifValid(centerY) && centerX && centerY) {
  //     const rectNewTopLeftPoint = getRectNewTopLeftPoint(centerX, centerY, pixitext.width, pixitext.height, angle);
  //     pixitext.x = rectNewTopLeftPoint.x
  //     pixitext.y = rectNewTopLeftPoint.y
  //   } else {
  //     pixitext.x = x
  //     pixitext.y = y
  //   }
  //   pixitext.angle = angle
  //   pixitext.id = id
  //   pixitext.custom = custom
  //   this.pixiScense.stage.addChild(pixitext)
  //   return custom
  // }

  // /**
  //  * 绘制文字，根据中心点坐标
  //  * @param id
  //  * @param centerX
  //  * @param centerY
  //  * @param text
  //  * @param angle
  //  * @param width
  //  * @param align
  //  * @param fill
  //  * @param fontFamily
  //  * @param fontSize
  //  * @returns {{fontFamily: string, x: *, width: *, y: *, angle: number, fontSize: number, id: string, text: string, align: string, fill: number}}
  //  */
  // drawTextByCenterPoint({
  //                         id = genId(),
  //                         centerX,
  //                         centerY,
  //                         text = '',
  //                         angle = 0,
  //                         width,
  //                         align = 'left',
  //                         fill = 0x000000,
  //                         fontFamily = 'Arial',
  //                         fontSize = 8
  //                       }: {
  //                         id?: string,
  //                         centerX?: number,
  //                         centerY?: number,
  //                         text?: any,
  //                         angle?: number,
  //                         width?: number,
  //                         align?: any,
  //                         fill?: any,
  //                         fontFamily?: any,
  //                         fontSize?: number
  //                       }
  // ) {
  //   return this.drawTextByLeftTopPoint({
  //     id,
  //     text,
  //     angle,
  //     width,
  //     align,
  //     fill,
  //     fontFamily,
  //     fontSize
  //   }, {
  //     centerX,
  //     centerY
  //   })
  // }

  // /**
  //  * 修改文字，根据左上点坐标
  //  * @param id
  //  * @param x
  //  * @param y
  //  * @param text
  //  * @param angle
  //  * @param width
  //  * @param align
  //  * @param fill
  //  * @param fontFamily
  //  * @param fontSize
  //  * @param centerX
  //  * @param centerY
  //  */
  // changeTextByLeftTopPoint({
  //                            id,
  //                            x,
  //                            y,
  //                            text,
  //                            angle,
  //                            width,
  //                            align,
  //                            fill,
  //                            fontFamily,
  //                            fontSize
  //                          }: {
  //                            id: string,
  //                            x?: number,
  //                            y?: number,
  //                            text?: any,
  //                            angle?: number,
  //                            width?: number,
  //                            align?: any,
  //                            fill?: any,
  //                            fontFamily?: any,
  //                            fontSize?: number
  //                          },
  //                          {
  //                            centerX,
  //                            centerY
  //                          }: {
  //                            centerX?: number
  //                            centerY?: number
  //                          } = {}
  // ) {
  //   const pixitext = this.findPixiObjectById(id)
  //   if (pixitext) {
  //     const custom = pixitext.custom
  //     if (ifValid(text)) {
  //       custom.text = text
  //     }
  //     if (ifValid(angle)) {
  //       custom.angle = angle
  //     }
  //     if (ifValid(width)) {
  //       custom.width = width
  //     }
  //     if (ifValid(centerX) && ifValid(centerY) && centerX && centerY) {
  //       const rectNewTopLeftPoint = getRectNewTopLeftPoint(centerX, centerY, pixitext.width, pixitext.height, custom.angle);
  //       custom.x = rectNewTopLeftPoint.x
  //       custom.y = rectNewTopLeftPoint.y
  //     } else if (ifValid(x) && ifValid(y)) {
  //       custom.x = x
  //       custom.y = y
  //     }
  //     if (ifValid(align)) {
  //       custom.align = align
  //     }
  //     if (ifValid(fill)) {
  //       custom.fill = fill
  //     }
  //     if (ifValid(fontFamily)) {
  //       custom.fontFamily = fontFamily
  //     }
  //     if (ifValid(fontSize)) {
  //       custom.fontSize = fontSize
  //     }
  //     pixitext.x = custom.x
  //     pixitext.y = custom.y
  //     pixitext.text = custom.text
  //     pixitext.angle = custom.angle
  //     pixitext.width = custom.width
  //     pixitext.style = {
  //       align: custom.align,
  //       fill: custom.fill,
  //       fontFamily: custom.fontFamily,
  //       fontSize: custom.fontSize
  //     }
  //     pixitext.custom = custom
  //   }
  // }

  // /**
  //  * 修改文字，根据中心点坐标
  //  * @param id
  //  * @param centerX
  //  * @param centerY
  //  * @param text
  //  * @param angle
  //  * @param width
  //  * @param align
  //  * @param fill
  //  * @param fontFamily
  //  * @param fontSize
  //  */
  // changeTextByCenterPoint({
  //                           id,
  //                           centerX,
  //                           centerY,
  //                           text,
  //                           angle,
  //                           width,
  //                           align,
  //                           fill,
  //                           fontFamily,
  //                           fontSize
  //                         }: {
  //                           id: string,
  //                           centerX?: number,
  //                           centerY?: number,
  //                           text?: any,
  //                           angle?: number,
  //                           width?: number,
  //                           align?: any,
  //                           fill?: any,
  //                           fontFamily?: any,
  //                           fontSize?: number
  //                         }
  // ) {
  //   const pixitext = this.findPixiObjectById(id);
  //   if (pixitext) {
  //     let centerX_ = centerX
  //     let centerY_ = centerY
  //     if (ifNotValid(centerX) || ifNotValid(centerY)) {
  //       const rectAngleCenter = getRectAngleCenter(pixitext.width, pixitext.height, pixitext.custom.angle, pixitext.x, pixitext.y);
  //       centerX_ = rectAngleCenter.x
  //       centerY_ = rectAngleCenter.y
  //     }
  //     this.changeTextByLeftTopPoint({
  //       id,
  //       text,
  //       angle,
  //       width,
  //       align,
  //       fill,
  //       fontFamily,
  //       fontSize
  //     }, {
  //       centerX: centerX_,
  //       centerY: centerY_
  //     })
  //   }
  // }
}