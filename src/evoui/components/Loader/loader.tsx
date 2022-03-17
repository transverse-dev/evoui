import BounceLoader from './bounceloader';
import DailyLoader from './dailyloader';
import FleaLoader from './flealoader';
import { LoaderType } from './loader.type';
import SpinLoader from './spinloader';

export default function Loader({
  type = 'daily',
  scale,
  color,
  height,
  width,
  radius,
  speed,
  margin,
}: LoaderType.PropsType) {
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
    case 'daily':
      return (
        <DailyLoader
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
