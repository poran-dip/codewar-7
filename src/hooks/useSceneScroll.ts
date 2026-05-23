"use client";

import { useEffect } from "react";
import { isLocked, lock } from "@/engine/transitionLock";

export type SceneDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "enter"
  | "exit"
  | "nav1"
  | "nav2"
  | "nav3"
  | "nav4"
  | "nav5";

export default function useSceneScroll(
  onDirection: (dir: SceneDirection) => void,
) {
  useEffect(() => {
    // Mouse wheel
    const handleWheel = (e: WheelEvent) => {
      if (isLocked()) return;
      if (Math.abs(e.deltaY) < 10) return;

      lock();
      onDirection(e.deltaY > 0 ? "down" : "up");
    };

    // Touch
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaX = Math.abs(touchStartX - e.touches[0].clientX);
      const deltaY = Math.abs(touchStartY - e.touches[0].clientY);
      // If horizontal swipe is dominant, prevent browser back/forward
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isLocked()) return;

      const deltaX = touchStartX - e.changedTouches[0].clientX;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (Math.max(absX, absY) < 40) return;

      if (absY > absX) {
        lock();
        onDirection(deltaY > 0 ? "down" : "up");
      } else {
        lock();
        onDirection(deltaX > 0 ? "right" : "left");
      }
    };

    // Keyboard
    const handleKey = (e: KeyboardEvent) => {
      if (isLocked()) return;

      const target = e.target as HTMLElement;
      const tag = target.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || target.isContentEditable)
        return;

      let direction: SceneDirection | null = null;

      if (
        e.key === "ArrowUp" ||
        e.key === "PageUp" ||
        e.key === "w" ||
        e.key === "W"
      )
        direction = "up";
      else if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === "s" ||
        e.key === "S"
      )
        direction = "down";
      else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
        direction = "left";
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
        direction = "right";
      else if (e.key === "Enter" || e.key === "f" || e.key === "F")
        direction = "enter";
      else if (e.key === "Escape") direction = "exit";
      else if (e.key === "1") {
        e.preventDefault();
        lock();
        onDirection("nav1");
        return;
      } else if (e.key === "2") {
        e.preventDefault();
        lock();
        onDirection("nav2");
        return;
      } else if (e.key === "3") {
        e.preventDefault();
        lock();
        onDirection("nav3");
        return;
      } else if (e.key === "4") {
        e.preventDefault();
        lock();
        onDirection("nav4");
        return;
      } else if (e.key === "5") {
        e.preventDefault();
        lock();
        onDirection("nav5");
        return;
      }

      if (direction) {
        e.preventDefault();
        lock();
        onDirection(direction);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onDirection]);
}
