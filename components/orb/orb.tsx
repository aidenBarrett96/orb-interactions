import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Position } from "../../types/position";
import { MotionBox } from "../motionBox";
import { OrbContext } from "./orbContext";

interface Orb {
  position: Position;
  size: number;
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const Orb: FC<Orb> = ({ position, size }) => {
  const { setOrbActualPosition } = useContext(OrbContext);

  const [isPressed, setIsPressed] = useState<boolean>(false);

  useEffect(() => {
    const pressHandler = () => {
      setIsPressed(true);
    };
    const releaseHandler = () => {
      setIsPressed(false);
    };
    window.addEventListener("mousedown", pressHandler);
    window.addEventListener("mouseup", releaseHandler);

    return () => {
      window.removeEventListener("mousedown", pressHandler);
      window.removeEventListener("mouseup", releaseHandler);
    };
  }, []);

  return (
    <MotionBox
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      pointerEvents="none"
      borderRadius="50%"
      position="fixed"
      top={0}
      left={0}
      onUpdate={({ x, y }) => {
        if (!x || !y) return;
        setOrbActualPosition({
          x: parseInt(x.toString()),
          y: parseInt(y.toString()),
        });
      }}
      whileTap={{
        scale: 0.8,
      }}
      animate={{
        width: `${size}px`,
        height: `${size}px`,
        x: position?.x,
        y: position?.y,
        boxShadow: `0px 0px ${isPressed ? 20 : 60}px ${
          isPressed ? 20 : 40
        }px rgba(255, 255, 255, 0.${isPressed ? 45 : 25})`,
        scale: isPressed ? 0.8 : 1,
        transition: {
          type: "spring",
          mass: 1.5,
          damping: 15,
        },
      }}
      background="#FFFFFF"
    />
  );
};
