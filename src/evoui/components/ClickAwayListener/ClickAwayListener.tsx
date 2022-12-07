import React, { useEffect, useRef } from 'react';

import { PropsType } from './ClickAwayListener.type';

export default function ClickAwayListener({
  children,
  handleClickAway,
  nonClickAwayRefs,
  listenByPosition, // createPortal등을 통해 다른 위치에 생성된 컴포넌트가 있어 컴포넌트가 ref에 포함되지 않을때 사용
}: PropsType): JSX.Element {
  let listenerRef = useRef<HTMLInputElement>(null);
  const childElement = React.Children.only(children);

  const getOffset = (el: HTMLInputElement) => {
    const rect = el.getBoundingClientRect();
    return rect;
  };

  const handleClick = (e: MouseEvent) => {
    if (listenByPosition && listenerRef.current) {
      const left = e.x;
      const top = e.y;
      const rectPosition = getOffset(listenerRef.current);
      if (
        left < rectPosition.left ||
        left > rectPosition.right ||
        top < rectPosition.top ||
        top > rectPosition.bottom
      ) {
        handleClickAway();
      }
    } else {
      if (nonClickAwayRefs && nonClickAwayRefs.length) {
        for (let i = 0; i < nonClickAwayRefs.length; i++) {
          if (
            nonClickAwayRefs[i] &&
            nonClickAwayRefs[i].current &&
            nonClickAwayRefs[i].current!.contains(e.target as Node)
          ) {
            return;
          }
        }
      }

      if (
        listenerRef &&
        listenerRef.current &&
        !listenerRef.current.contains(e.target as Node)
      ) {
        handleClickAway();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [listenerRef]);

  return React.cloneElement(childElement, {
    ref: listenerRef,
  });
}
