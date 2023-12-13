import { ElementTypes } from "@/containers/Main/constents";
import { sampleTemples } from "@/containers/Main/sampleTemplet";
import { atom } from "jotai";

type activeElementType = {
  x: number;
  y: number;
};

type canvasModeType = "View" | "Edit";

type canvasElementModeType = {
  mode: canvasModeType;
  elementType: keyof ElementTypes | null;
};

type canvasDimensions = {
  height: number;
  width: number;
  baseWP: number;
  baseHP: number;
};

export const canvasDimensionsAtom = atom<canvasDimensions | null>(null);
export const ElementListAtom = atom<(typeof sampleTemples)["canvasElement"]>(
  sampleTemples.canvasElement
);
export const activeElementAtom = atom<activeElementType | null>(null);
export const activeElementID = atom<number>(-1);
export const canvasElementModeAtom = atom<canvasElementModeType>({
  mode: "View",
  elementType: null,
});
