import { getBaseCanvasPercentage } from "@/containers/Main/utility";

describe("check base percentage for different devices and canvas sizes", () => {
  test("when user chooses 500x500 logo on a small Android device", () => {
    const mobileWidth = 320; // Small Android device
    const canvasWidth = 500;

    expect(getBaseCanvasPercentage(mobileWidth, canvasWidth)).toBe(156.25);
  });

  test("when user chooses 800x800 logo on a medium-sized iPhone", () => {
    const mobileWidth = 375; // Medium-sized iPhone
    const canvasWidth = 800;

    expect(getBaseCanvasPercentage(mobileWidth, canvasWidth)).toBe(213.33);
  });

  test("when user chooses 1200x1200 logo on a large Android tablet", () => {
    const mobileWidth = 768; // Large Android tablet
    const canvasWidth = 1200;

    expect(getBaseCanvasPercentage(mobileWidth, canvasWidth)).toBeCloseTo(
      156.25
    );
  });

  test("when user chooses 1920x1080 poster on a standard desktop screen", () => {
    const mobileWidth = 1366; // Standard desktop screen
    const canvasWidth = 1920;

    expect(getBaseCanvasPercentage(mobileWidth, canvasWidth)).toBe(140.56);
  });

  test("when user chooses 2048x1536 poster on a large iPad", () => {
    const mobileWidth = 1024; // Large iPad
    const canvasWidth = 2048;

    expect(getBaseCanvasPercentage(mobileWidth, canvasWidth)).toBe(200);
  });
});
