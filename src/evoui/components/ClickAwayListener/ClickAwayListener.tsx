import { useEffect, useRef } from 'react';

import { PropsType } from './ClickAwayListener.type';

export default function ClickAwayListener({
  children,
  handleClickAway,
}: PropsType): JSX.Element {
  let listenerRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: MouseEvent) => {
    console.dir(e.target);

    if (
      listenerRef.current &&
      !listenerRef.current.contains(e.target as Node)
    ) {
      handleClickAway();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [listenerRef]);

  return (
    <div id='clickAwayListener' ref={listenerRef}>
      {children}
    </div>
  );
}
