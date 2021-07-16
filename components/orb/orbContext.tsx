import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Position } from "../../types/position";
import { Orb } from "./orb";
import { useOrbStandardPosition } from "./useOrbStandardPosition";

interface OrbContext {
  orbPosition: Position;
  orbStandardPosition: Position;
  orbActualPosition: Position;
  setOrbActualPosition: Dispatch<SetStateAction<Position>>;
  focusOrbOnPoint: (focusPosition: Position) => void;
  unfocus: () => void;
  focusedPosition: Position;
  isFocused: boolean;
}

const orbInitialState: OrbContext = {
  orbPosition: null,
  orbStandardPosition: null,
  orbActualPosition: null,
  setOrbActualPosition: null,
  focusOrbOnPoint: null,
  unfocus: null,
  focusedPosition: null,
  isFocused: false,
};

export const OrbContext = createContext<OrbContext>(orbInitialState);
const { Provider } = OrbContext;

export const OrbProvider: FC = ({ children }) => {
  const [orbSize, setOrbSize] = useState<number>(14);
  const standardOrbPosition = useOrbStandardPosition({ orbSize });
  const [focusedPosition, setFocusedPosition] = useState<Position>(null);
  const isFocused = useMemo(() => !!focusedPosition, [focusedPosition]);
  const [orbActualPosition, setOrbActualPosition] = useState<Position>(null);

  const [orbTargetPosition, setOrbTargetPosition] = useState<Position>(null);

  console.log(`orbTargetPosition`, orbTargetPosition);

  useEffect(() => {
    setOrbTargetPosition(focusedPosition || standardOrbPosition);
  }, [standardOrbPosition, focusedPosition]);

  const focusOrbOnPoint = useCallback(
    (focusPosition: Position) => {
      setFocusedPosition(focusPosition);
    },
    [setFocusedPosition]
  );

  const unfocus = useCallback(() => {
    setFocusedPosition(null);
  }, [setFocusedPosition]);

  return (
    <Provider
      value={{
        orbPosition: standardOrbPosition,
        orbStandardPosition: standardOrbPosition,
        orbActualPosition,
        setOrbActualPosition,
        focusOrbOnPoint,
        unfocus,
        focusedPosition,
        isFocused,
      }}
    >
      <Orb position={orbTargetPosition} size={orbSize} />
      {children}
    </Provider>
  );
};
