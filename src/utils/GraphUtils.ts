/**
 * 已知矩形中心点坐标、长、宽、顺时针旋转角度，求新的左上角点的坐标
 * @param centerX
 * @param centerY
 * @param width
 * @param height
 * @param rotation
 * @returns {{x: number, y: number}}
 */
export function getRectNewTopLeftPoint(centerX: number, centerY: number, width: number, height: number, rotation: number) {
  const radians = (Math.PI / 180) * rotation;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const topLeftX = centerX - halfWidth * Math.cos(radians) + halfHeight * Math.sin(radians);
  const topLeftY = centerY - halfWidth * Math.sin(radians) - halfHeight * Math.cos(radians);
  return {x: topLeftX, y: topLeftY};
}

/**
 * 已知矩形长、宽、顺时针旋转角度，旋转后的左上点坐标，求矩形中心点的坐标
 * @param width
 * @param height
 * @param rotation
 * @param topLeftX
 * @param topLeftY
 * @returns {{x: number, y: *}}
 */
export function getRectAngleCenter(width: number, height: number, rotation: number, topLeftX: number, topLeftY: number) {
  const radians = (Math.PI / 180) * rotation;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const centerX = topLeftX + halfWidth * Math.cos(radians) - halfHeight * Math.sin(radians);
  const centerY = topLeftY + halfWidth * Math.sin(radians) + halfHeight * Math.cos(radians);
  return {x: centerX, y: centerY};
}
