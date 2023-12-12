export function getBaseCanvasPercentage(
  parentWidth: number,
  elementWidth: number
): number {
  let base = parentWidth / 100;
  let basePercent = elementWidth / base;
  return parseFloat(basePercent.toFixed(2));
}

export function getElementDimensionValue(
  basePercentage: number,
  baseWidth: number,
  elementWidth: number
): number {
  let base = baseWidth / basePercentage;
  let basePercent = elementWidth / base;
  let result = (elementWidth / basePercent) * 100;
  return parseFloat(result.toFixed(2));
}

export function getDimensionValue(
  basePercentage: number,
  elementWidth: number
) {
  let result = (elementWidth / basePercentage) * 100;
  return parseFloat(result.toFixed(2));
}

export function getElementCenterPositionValue(
  parentDimensionsValue: number,
  elementPositionValue: number
) {
  let positionValue = parentDimensionsValue - elementPositionValue;

  return positionValue / 2;
}
