import {
  getBaseCanvasPercentage,
  getDimensionValue,
} from "@/containers/Main/utility";

describe("calculate element dimensions for Small Android device for 500x500 canvas", () => {
  const mobileWidth = 320; // Small Android device
  const canvasWidth = 500;
  const canvasHeight = 500;

  const basePercentage = getBaseCanvasPercentage(mobileWidth, canvasWidth);

  test("if rect element height and width is random value", () => {
    const actualElementWidthSize = 348.9;
    const actualElementHeightSize = 96.1;
    expect(getDimensionValue(basePercentage, actualElementWidthSize)).toBe(
      223.3
    );
    expect(getDimensionValue(basePercentage, actualElementHeightSize)).toBe(
      61.5
    );
  });

  test("if rect element height and width is equal to canvas size", () => {
    expect(getDimensionValue(basePercentage, canvasWidth)).toBe(mobileWidth);
    expect(getDimensionValue(100, canvasHeight)).toBe(canvasHeight);
  });

  test("if rect element has minimum possible dimensions", () => {
    const actualElementWidthSize = 1;
    const actualElementHeightSize = 1;
    expect(getDimensionValue(basePercentage, actualElementWidthSize)).toBe(
      0.64
    );
    expect(getDimensionValue(basePercentage, actualElementHeightSize)).toBe(
      0.64
    );
  });

  test("if rect element has maximum possible dimensions", () => {
    const actualElementWidthSize = 1000;
    const actualElementHeightSize = 1000;

    //size of element maybe bigger then canvas size so that user can adjust zooming of element
    expect(getDimensionValue(basePercentage, actualElementWidthSize)).toBe(640);
    expect(getDimensionValue(100, actualElementHeightSize)).toBe(1000);
  });
});
