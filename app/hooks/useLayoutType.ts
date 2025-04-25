import { useEffect, useState } from "react";
import { LayoutType } from "../types/search";

export default function useLayoutType(): [
  LayoutType | "",
  (newType: LayoutType) => void
] {
  const [layoutType, setLayoutType] = useState<LayoutType | "">("");

  function hasElapsed24h(time: string) {
    const now: number = new Date().getTime();
    const past: number = new Date(time).getTime();
    return (now - past) / (1000 * 60 * 60) >= 24;
  }

  function getRandowLayoutType(): LayoutType {
    return Math.random() < 0.5 ? "list" : "grid";
  }

  function saveLayoutToStorage(type?: LayoutType) {
    const newType = type ? type : getRandowLayoutType();

    localStorage.setItem(
      "weebur_layout",
      JSON.stringify({
        type: newType,
        createdAt: new Date().toISOString(),
      })
    );
    setLayoutType(newType);
  }

  function changeLayoutType(layoutType: LayoutType) {
    setLayoutType(layoutType);
    saveLayoutToStorage(layoutType);
  }

  useEffect(() => {
    try {
      const savedLayout = localStorage.getItem("weebur_layout");

      if (!savedLayout) {
        saveLayoutToStorage();
        return;
      }

      const layoutObj = JSON.parse(savedLayout);

      if (
        !layoutObj.type ||
        !layoutObj.createdAt ||
        (layoutObj.type !== "grid" && layoutObj.type !== "list")
      ) {
        throw new Error("잘못된 데이터가 저장되어 있습니다.");
      }

      if (hasElapsed24h(layoutObj.createdAt)) {
        saveLayoutToStorage();
      } else {
        setLayoutType(layoutObj.type);
      }
    } catch {
      saveLayoutToStorage();
    }
  }, []);

  return [layoutType, changeLayoutType];
}
