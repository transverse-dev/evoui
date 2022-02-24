import { BounceLoader } from './bounceloader';
import { FleaLoader } from './flealoader';
import { ImsiLoader } from './imsiloader';
import { SpinLoader } from './spinloader';
import { loader } from './index.type';

export function Loader({
  type,
  scale,
  color,
  height,
  width,
  radius,
  speed,
  margin,
}: loader.LoaderProps) {
  switch (type) {
    case 'flea':
      return (
        <FleaLoader
          scale={scale}
          color={color}
          height={height}
          width={width}
          radius={radius}
          speed={speed}
          margin={margin}
        />
      );
    case 'imsi':
      return (
        <ImsiLoader
          scale={scale}
          color={color}
          height={height}
          width={width}
          radius={radius}
          speed={speed}
          margin={margin}
        />
      );
    case 'spin':
      return (
        <SpinLoader
          scale={scale}
          color={color}
          height={height}
          width={width}
          radius={radius}
          speed={speed}
          margin={margin}
        />
      );
    case 'bounce':
      return (
        <BounceLoader
          scale={scale}
          color={color}
          height={height}
          width={width}
          radius={radius}
          speed={speed}
          margin={margin}
        />
      );
    default:
      return (
        <FleaLoader
          scale={scale}
          color={color}
          height={height}
          width={width}
          radius={radius}
          speed={speed}
          margin={margin}
        />
      );
  }
}
