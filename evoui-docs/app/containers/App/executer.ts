import { useEffect } from 'react';
import { AppType } from './index.type';

export default function Executer({
  targetFunction,
}: AppType.ExecuterType.PropsType) {
  useEffect(() => {
    targetFunction();
  });

  return null;
}
