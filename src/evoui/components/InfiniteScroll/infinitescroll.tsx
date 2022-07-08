import { throttle } from 'lodash-es';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { InfiniteScrollType } from './infinitescroll.type';

const Root = styled.div<InfiniteScrollType.RootPropsType>`
  position: relative;
  display: inline-flex;
  width: 100%;
  height: fit-content;
  user-select: ${(props) => (props.isMouseMoving ? 'none' : 'inherit')};
  overflow: ${(props) => (props.refreshOn ? 'hidden' : 'visible')};

  ${(props) => props.cssStyle ?? ''};
`;

const RefreshIconWrapper = styled.div<InfiniteScrollType.RefreshIconWrapperPropsType>`
  z-index: 2;
  position: absolute;
  top: ${(props) => (!props.isScrollY ? '50%' : `-${props.refreshGap / 4}px`)};
  left: ${(props) => (props.isScrollY ? '50%' : `-${props.refreshGap / 4}px`)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms;
  transform: ${(props) => `translate(
    ${props.isScrollY ? '-50%' : `calc(${props.translateValue.x}px - 100%)`},
    ${
      !props.isScrollY ? '-50%' : `calc(${props.translateValue.y}px - 100%)`
    })`};
`;

const RefreshIcon = styled.svg<InfiniteScrollType.RefreshIconPropsType>`
  width: 30px;
  height: 30px;
  fill: #000000;
  transition: transform ease-in-out 100ms;
  transform: ${(props) => `rotate(${props.rotateDeg}deg)`};
  animation: ${(props) =>
    props.isRefreshing ? 'refreshSpin 1s infinite ease-in-out' : ''};

  @keyframes refreshSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  path:first-child {
    fill: #000000;
  }

  path:last-child {
    fill: #ffffff;
  }
`;

const ListWrapper = styled.div<InfiniteScrollType.ListWrapperPropsType>`
  z-index: 1;
  position: relative;
  display: inline-flex;
  flex-direction: ${(props) => (props.isScrollY ? 'column' : 'row')};
  width: 100%;
  height: 100%;
  transition: transform 200ms;
  transform: ${(props) =>
    `translate(${!props.isScrollY ? props.translateValue.x : 0}px,
      ${props.isScrollY ? props.translateValue.y : 0}px)`};
`;

const RefreshMessageWrapper = styled.div<InfiniteScrollType.RefreshMessageWrapperPropsType>`
  position: relative;
  width: 100%;
  height: 0;
  overflow: visible;
`;

const RefreshMessage = styled.div<InfiniteScrollType.RefreshMessagePropsType>`
  position: absolute;
  bottom: 0px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => `${props.refreshGap}px`};
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const DefaultLoadingMessage = styled.div<InfiniteScrollType.DefaultLoadingMessagePropsType>`
  padding: 80px 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${(props) => props.cssStyle ?? ''};
`;

const DefaultEndingMessage = styled.div<InfiniteScrollType.DefaultEndingMessagePropsType>`
  padding: 80px 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${(props) => props.cssStyle ?? ''};
`;

const Observer = styled.div`
  position: absolute;
  margin: 0;
  border: 0;
  padding: 0;
  width: 0;
  height: 0;
  max-width: 0;
  max-height: 0;
  background: transparent;
  opacity: 0;
  box-shadow: none;
  outline: none;
  user-select: none;
  cursor: inherit;
`;

const PrevObserver = styled(Observer)<InfiniteScrollType.PrevObserverPropsType>`
  top: ${(props) => (props.isScrollY ? `${props.activeGap}px` : '')};
  left: ${(props) => (!props.isScrollY ? `${props.activeGap}px` : '0px')};
`;

const NextObserver = styled(Observer)<InfiniteScrollType.NextObserverPropsType>`
  right: ${(props) => (!props.isScrollY ? `${props.activeGap}px` : '')};
  bottom: ${(props) => (props.isScrollY ? `${props.activeGap}px` : '')};
  left: ${(props) => (props.isScrollY ? `0px` : '')};
`;

export default function InfiniteScroll({
  children,
  dataLength,
  next,
  prev,
  hasMore,
  LoadingMessage,
  EndingMessage,
  scrollDirection = 'y',
  scrollTargetId,
  activeGap,
  refreshFunction,
  refreshType = 'none',
  refreshGap = 50,
  refreshMessage = 'Refresh',
  overrides,
}: InfiniteScrollType.PropsType) {
  /*
   * children: 생략
   * dataLength: children의 리스트 길이를 받는다. -> 길이의 변화를 리스트의 업데이트를 파악
   * next: 리스트를 아래로 또는 오른쪽으로 스크롤해서 특정 구간이 되면 실행한다.
   * prev: 리스트를 위로 또는 왼쪽으로 스크롤해서 특정 구간이 되면 실행한다. 주로 리스트의 개수제한이 있거나 스크롤이 중간위치일때 사용
   * hasMore: 리스트가 남았는지 확인. -> next나 prev를 실행할지 확인
   * LoadingMessage: 리스트를 불러오는 로딩중일때의 Element를 받는다.
   * EndingMessage: 리스트를 다 불러왔을때의 Element를 받는다.
   * scrollDirection: 스크롤 방향이 x축인지 y축인지 받는다.
   * scrollTargetId: refresh를 사용한다면 id를 통해 상위 Element의 스크롤 위치가 0인지 파악하기위해 사용한다.
   * activeGap: next나 prev를 실행시킬 위치를 설정한다.
   * refreshFunction: refresh시 실행시킬 함수를 넣는다.
   * refreshType: refresh시 사용할 방식을 선택할 수 있다. -> none이면 사용X, icon이면 로딩 아이콘, message면 메시지 표시
   * refreshGap: drag를 어느정도까지 해야 refresh를 할지 설정할 수 있다.
   * refreshMessage: refreshType이 message일 경우 메시지를 설정할 수 있다.
   * overrides: 전체 Element 요소 커스텀
   */
  const observerRef = useRef<Array<any>>([]);
  const stateRef = useRef<Array<any>>([]);
  /*
   * observerRef.current[0]: Next
   *   - next를 실행시킬때 사용하는 observer
   * observerRef.current[1]: Prev
   *   - prev를 실행시킬때 사용하는 observer
   * stateRef: state값
   *   - 스크롤 이벤트를 실행시킬때 state를 업데이트 해주기 위해 state를 직접 가리키는 ref
   */

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingDirection, setLoadingDirection] = useState<'up' | 'down'>(
    'down',
  );
  const [pastDataLength, setPastDataLength] = useState<number>(dataLength);
  const [mouseDownCoordinates, setMouseDownCoordinates] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const [mouseMoveCoordinates, setMouseMoveCoordinates] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [refreshActive, setRefreshActive] = useState<boolean>(true);
  const [isRefreshCanActive, setIsRefreshCanActive] = useState<boolean>(false);
  /*
   * isLoading: 현재 로딩중인지 여부
   * loadingDirection: 로딩 방향이 위인지 아래인지 체크
   * pastDataLength: dataLength가 변경되었는지 체크하기 위해 관리하는 state값
   * mouseDownCoordinates: 마우스를 클릭하고 있는지 여부 및 클릭한 좌표(refresh를 위해 사용)
   * mouseMoveCoordinates: 마우스를 움직이고 있는 좌표(refresh를 위해 사용)
   * isRefreshing: refresh 중인지의 여부(refresh를 위해 사용)
   * refreshActive: refresh를 하기위해 scrollTop이 0인지 여부
   * isRefreshCanActive: refresh를 실행 가능한지의 여부
   */

  useEffect(() => {
    window.onresize = scrollEvent;

    return () => {
      window.onresize = null;
    };
  }, []);
  /*
   * window의 크기가 변함에 따라 스크롤 이벤트를 실행
   * window의 크기가 변하면서 스크롤 위치가 변하는걸 감지
   */

  useEffect(() => {
    const observer = new IntersectionObserver(scrollEvent);
    if (!!observerRef?.current[0]) {
      observer.observe(observerRef.current[0]);
    }
  }, [observerRef.current[0]]);
  useEffect(() => {
    const observer = new IntersectionObserver(scrollEventPrev);
    if (!!observerRef?.current[1]) {
      observer.observe(observerRef.current[1]);
    }
  }, [observerRef.current[1]]);
  /*
   * observer가 될 Element가 준비가 되면
   * 해당 Element에 IntersectionObserver 부여
   */

  useEffect(() => {
    if (hasMore !== undefined) {
      stateRef.current[0] = hasMore;
    }
  }, [hasMore]);
  useEffect(() => {
    if (isLoading !== undefined) {
      stateRef.current[1] = isLoading;
    }
  }, [isLoading]);
  useEffect(() => {
    if (next !== undefined) {
      stateRef.current[2] = next;
    }
  }, [next]);
  useEffect(() => {
    if (prev !== undefined) {
      stateRef.current[3] = prev;
    }
  }, [prev]);
  /*
   * state값의 최신값을 유지하기 위해
   * state값 업데이트시 ref값도 같이 업데이트 된다.
   */

  useEffect(() => {
    if (dataLength !== pastDataLength && (isLoading || isRefreshing)) {
      setTimeout(() => {
        setPastDataLength(dataLength);
        setIsLoading(false);
        setIsRefreshing(false);
      }, 0);
    }
  }, [dataLength, isLoading]);
  /*
   * 만약 로딩중이거나 새로고침중인데, 리스트의 길이가 달라졌다면
   * 리스트 길이 state값을 현재 리스트 길이로 설정하고, 로딩중과 새로고침중을 false로 전환
   * Todo: 리스트의 길이로 업데이트가 되었는지를 확인하는데에는 한계가 있어, 다른 방식이 필요
   */ // TODO

  useEffect(() => {
    const scrollTarget = document.getElementById(scrollTargetId ?? '');

    function isScrollTopZero(e: any) {
      if (e?.target?.scrollTop === 0) {
        setRefreshActive(true);
      } else {
        setRefreshActive(false);
      }
    }

    if (
      refreshType !== 'none' &&
      !!scrollTarget &&
      refreshFunction !== undefined
    ) {
      setIsRefreshCanActive(true);
      scrollTarget?.removeEventListener('scroll', isScrollTopZero);
      scrollTarget.addEventListener('scroll', isScrollTopZero);
    } else {
      setIsRefreshCanActive(false);
      scrollTarget?.removeEventListener('scroll', isScrollTopZero);
    }
    return () => {
      scrollTarget?.removeEventListener('scroll', isScrollTopZero);
    };
  }, [refreshFunction, refreshType, scrollTargetId]);
  /*
   * 만약 refreshType이 none이 아니고, scrollTargetId를 통한 엘리먼트가 존재하고, refresh시 실행되는 함수가 있다면
   *   refresh를 실행시킬 수 있는지 여부를 true로 설정하고, scrollTarget Element에 스크롤 이벤트를 추가한다.
   * 그렇지 않다면
   *   refresh를 실행시킬 수 있는지 여부를 false로 설정하고, scrollTarget Element에 스크롤 이벤트를 제거한다.
   */

  useEffect(() => {
    let turnOffTimer: ReturnType<typeof setTimeout> | undefined;
    if (isRefreshing) {
      turnOffTimer = setTimeout(() => {
        setIsRefreshing(false);
      }, 10000);
    } else if (!!turnOffTimer) {
      turnOffTimer = undefined;
    }

    return () => {
      turnOffTimer = undefined;
    };
  }, [isRefreshing]);
  /*
   * 만약 refreshing 중인데, 10초가 지나도 리스트가 업데이트되지 않는다면
   *   refresh를 꺼버린다.
   * 또는 만약 refreshing이 끝났는데, 10초 타이머가 켜져있다면
   *   해당 타이머를 비활성화한다.
   */

  useEffect(() => {
    if (!!!mouseDownCoordinates) {
      setMouseMoveCoordinates({ x: 0, y: 0 });
    }
  }, [mouseDownCoordinates]);
  /*
   * 만약 mouse up 또는 touch end가 된다면
   *    refresh를 원래 위치로 되돌린다.
   */

  useEffect(() => {
    if (
      !!!mouseDownCoordinates &&
      ((scrollDirection === 'x' && mouseMoveCoordinates.x >= refreshGap) ||
        (scrollDirection === 'y' && mouseMoveCoordinates.y >= refreshGap))
    ) {
      !!refreshFunction && refreshFunction();
      setIsRefreshing(true);
    } else if (
      !!!mouseDownCoordinates &&
      ((scrollDirection === 'x' && mouseMoveCoordinates.x !== 0) ||
        (scrollDirection === 'y' && mouseMoveCoordinates.y !== 0))
    ) {
      setMouseMoveCoordinates({ x: 0, y: 0 });
    }
  }, [mouseDownCoordinates, mouseMoveCoordinates]);
  /*
   * 만약 mouse up 또는 touch end가 됬는데, refresh를 실행시키는 기준에 맞다면
   *   refresh 함수를 실행시키고, refresh이 실행중임을 true로 설정한다.
   * 또는 만약 mouse up 또는 touch end가 됬는데, refresh 위치가 초기값이 아니라면
   *   refresh 위치를 초기값으로 설정
   */

  const doEvent = useCallback(
    throttle(
      (event: () => void) => {
        setIsLoading(true);
        event();
      },
      500,
      { trailing: false },
    ),
    [],
  );
  /*
   * state의 상태가 업데이트 되지 못하거나,
   * 어떠한 특수 상황 때문에,
   * next나 prev 이벤트가 여러번 발생하는 경우를 줄이는 역할
   */

  const scrollEvent = (): void => {
    let hasMore = stateRef.current[0];
    let isLoading = stateRef.current[1];
    let next = stateRef.current[2];
    if (next !== undefined && !isLoading && hasMore) {
      doEvent(next);
      setLoadingDirection('down');
    }
  };
  const scrollEventPrev = (): void => {
    let hasMore = stateRef.current[0];
    let isLoading = stateRef.current[1];
    let prev = stateRef.current[3];
    if (prev !== undefined && !isLoading && hasMore) {
      doEvent(prev);
      setLoadingDirection('up');
    }
  };
  /*
   * observer나 윈도우의 크기 변화를 통해 실행되면
   * 만약 이벤트가 존재하고, 로딩중이 아니고, 로딩할게 더 있다면
   *   이벤트를 실행시키고, 로딩 위치를 설정한다.
   */

  const mouseMove = useCallback(
    throttle((x: number, y: number) => {
      if (!!mouseDownCoordinates) {
        setMouseMoveCoordinates({
          x:
            x - mouseDownCoordinates.x > 0
              ? x - mouseDownCoordinates.x < refreshGap + 20
                ? x - mouseDownCoordinates.x
                : refreshGap + 20
              : 0,
          y:
            y - mouseDownCoordinates.y > 0
              ? y - mouseDownCoordinates.y < refreshGap + 20
                ? y - mouseDownCoordinates.y
                : refreshGap + 20
              : 0,
        });
      }
    }, 50),
    [mouseDownCoordinates, refreshGap],
  );
  /*
   * 만약 mouse down 또는 touch start이라면
   *   refresh 위치를 설정한다.
   *   이때, refresh 위치는 0보다 커야하며 refresh 실행 조건에 만족하는 값의 20px을 더한값보다 작아야 한다.
   */

  return (
    <Root
      onTouchStart={(e: React.TouchEvent<HTMLDivElement>) =>
        refreshActive && isRefreshCanActive && !isRefreshing
          ? setMouseDownCoordinates(
              e?.targetTouches[0]?.clientY !== undefined
                ? {
                    x: e.targetTouches[0].clientX,
                    y: e.targetTouches[0].clientY,
                  }
                : undefined,
            )
          : undefined
      }
      onTouchEnd={() =>
        refreshActive && isRefreshCanActive && !isRefreshing
          ? setMouseDownCoordinates(undefined)
          : undefined
      }
      onTouchMove={(e: React.TouchEvent<HTMLDivElement>) =>
        refreshActive && isRefreshCanActive && !isRefreshing
          ? mouseMove(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
          : undefined
      }
      onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        refreshActive && isRefreshCanActive && !isRefreshing
          ? setMouseDownCoordinates({ x: e.clientX, y: e.clientY })
          : undefined
      }
      onMouseUp={() =>
        refreshActive && isRefreshCanActive && !isRefreshing
          ? setMouseDownCoordinates(undefined)
          : undefined
      }
      onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        refreshActive && isRefreshCanActive && !isRefreshing
          ? mouseMove(e.clientX, e.clientY)
          : undefined
      }
      isMouseMoving={!!mouseDownCoordinates}
      refreshOn={refreshType !== 'none'}
      {...(typeof overrides?.Root?.css === 'string'
        ? {
            cssStyle: overrides.Root.css,
            ...(overrides.Root ?? {}),
          }
        : overrides?.Root == undefined
        ? {}
        : {
            style: overrides.Root.css,
            ...overrides.Root,
          })}>
      {prev !== undefined ? (
        <PrevObserver
          ref={(el) => (observerRef.current[1] = el)}
          isScrollY={scrollDirection === 'y'}
          activeGap={activeGap ?? 1}
        />
      ) : (
        <></>
      )}
      {refreshType === 'icon' ? (
        <RefreshIconWrapper
          isScrollY={scrollDirection === 'y'}
          translateValue={
            !!mouseDownCoordinates && refreshType === 'icon'
              ? mouseMoveCoordinates
              : isRefreshing
              ? { x: refreshGap, y: refreshGap }
              : { x: 0, y: 0 }
          }
          refreshGap={refreshGap}
          {...(typeof overrides?.RefreshIconWrapper?.css === 'string'
            ? {
                cssStyle: overrides.RefreshIconWrapper.css,
                ...(overrides.RefreshIconWrapper ?? {}),
              }
            : overrides?.RefreshIconWrapper == undefined
            ? {}
            : {
                style: overrides.RefreshIconWrapper.css,
                ...overrides.RefreshIconWrapper,
              })}>
          <RefreshIcon
            viewBox='0 0 473.677 473.677'
            isRefreshing={isRefreshing}
            rotateDeg={(() => {
              let coordinates =
                scrollDirection === 'x'
                  ? mouseMoveCoordinates.x
                  : scrollDirection === 'y'
                  ? mouseMoveCoordinates.y
                  : 0;
              return 180 * (coordinates / (refreshGap + 20));
            })()}
            {...(typeof overrides?.RefreshIcon?.css === 'string'
              ? {
                  cssStyle: overrides.RefreshIcon.css,
                  ...(overrides.RefreshIcon ?? {}),
                }
              : overrides?.RefreshIcon == undefined
              ? {}
              : {
                  style: overrides.RefreshIcon.css,
                  ...overrides.RefreshIcon,
                })}>
            <g>
              <path d='M0,236.842C0,106.028,106.036,0,236.835,0c130.807,0,236.842,106.028,236.842,236.842 c0,130.799-106.036,236.835-236.842,236.835C106.036,473.677,0,367.641,0,236.842z' />
              <path d='M382.648,161.894c-2.393-4.645-14.031-15.284-33.664-5.621s-10.149,30.889-10.149,30.889 c7.318,15.003,11.439,31.861,11.439,49.68c0,62.645-50.787,113.436-113.44,113.436c-62.645,0-113.436-50.791-113.436-113.436 c0-58.64,44.486-106.873,101.537-112.819v29.397c0,0-0.079,1.758,1.743,2.865c1.821,1.111,3.646,0,3.646,0l94.106-55.45 c0,0,2.113-1.111,2.113-3.276c0-1.791-2.113-3.063-2.113-3.063l-93.792-55.14c0,0-2.139-1.529-4.042-0.789 c-1.9,0.737-1.66,3.328-1.66,3.328v31.495c-84.967,6.103-152.017,76.916-152.017,163.449c0,90.531,73.389,163.92,163.917,163.92 c90.531,0,163.924-73.389,163.924-163.92C400.759,209.831,394.218,184.357,382.648,161.894z' />
            </g>
          </RefreshIcon>
        </RefreshIconWrapper>
      ) : (
        <></>
      )}
      <ListWrapper
        isScrollY={scrollDirection === 'y'}
        translateValue={
          !!mouseDownCoordinates && refreshType === 'message'
            ? mouseMoveCoordinates
            : isRefreshing && refreshType === 'message'
            ? { x: refreshGap, y: refreshGap }
            : { x: 0, y: 0 }
        }
        {...(typeof overrides?.ListWrapper?.css === 'string'
          ? {
              cssStyle: overrides.ListWrapper.css,
              ...(overrides.ListWrapper ?? {}),
            }
          : overrides?.ListWrapper == undefined
          ? {}
          : {
              style: overrides.ListWrapper.css,
              ...overrides.ListWrapper,
            })}>
        {refreshType === 'message' ? (
          <RefreshMessageWrapper
            {...(typeof overrides?.RefreshMessageWrapper?.css === 'string'
              ? {
                  cssStyle: overrides.RefreshMessageWrapper.css,
                  ...(overrides.RefreshMessageWrapper ?? {}),
                }
              : overrides?.RefreshMessageWrapper == undefined
              ? {}
              : {
                  style: overrides.RefreshMessageWrapper.css,
                  ...overrides.RefreshMessageWrapper,
                })}>
            <RefreshMessage
              {...(typeof overrides?.RefreshMessage?.css === 'string'
                ? {
                    cssStyle: overrides.RefreshMessage.css,
                    ...(overrides.RefreshMessage ?? {}),
                  }
                : overrides?.RefreshMessage == undefined
                ? {}
                : {
                    style: overrides.RefreshMessage.css,
                    ...overrides.RefreshMessage,
                  })}
              refreshGap={refreshGap}>
              {refreshMessage}
            </RefreshMessage>
          </RefreshMessageWrapper>
        ) : (
          <></>
        )}
        {loadingDirection === 'up' &&
        prev !== undefined &&
        isLoading &&
        LoadingMessage !== undefined ? (
          <LoadingMessage />
        ) : loadingDirection === 'up' && prev !== undefined && isLoading ? (
          <DefaultLoadingMessage
            {...(typeof overrides?.DefaultLoadingMessage?.css === 'string'
              ? {
                  cssStyle: overrides.DefaultLoadingMessage.css,
                  ...(overrides.DefaultLoadingMessage ?? {}),
                }
              : overrides?.DefaultLoadingMessage == undefined
              ? {}
              : {
                  style: overrides.DefaultLoadingMessage.css,
                  ...overrides.DefaultLoadingMessage,
                })}>
            Loading
          </DefaultLoadingMessage>
        ) : (
          <></>
        )}
        {children}
        {!hasMore && EndingMessage !== undefined ? (
          <EndingMessage />
        ) : !hasMore ? (
          <DefaultEndingMessage
            {...(typeof overrides?.DefaultEndingMessage?.css === 'string'
              ? {
                  cssStyle: overrides.DefaultEndingMessage.css,
                  ...(overrides.DefaultEndingMessage ?? {}),
                }
              : overrides?.DefaultEndingMessage == undefined
              ? {}
              : {
                  style: overrides.DefaultEndingMessage.css,
                  ...overrides.DefaultEndingMessage,
                })}>
            This is the end.
          </DefaultEndingMessage>
        ) : loadingDirection === 'down' &&
          next !== undefined &&
          isLoading &&
          LoadingMessage !== undefined ? (
          <LoadingMessage />
        ) : loadingDirection === 'down' && next !== undefined && isLoading ? (
          <DefaultLoadingMessage
            {...(typeof overrides?.DefaultLoadingMessage?.css === 'string'
              ? {
                  cssStyle: overrides.DefaultLoadingMessage.css,
                  ...(overrides.DefaultLoadingMessage ?? {}),
                }
              : overrides?.DefaultLoadingMessage == undefined
              ? {}
              : {
                  style: overrides.DefaultLoadingMessage.css,
                  ...overrides.DefaultLoadingMessage,
                })}>
            Loading
          </DefaultLoadingMessage>
        ) : (
          <></>
        )}
      </ListWrapper>
      {next !== undefined ? (
        <NextObserver
          ref={(el) => (observerRef.current[0] = el)}
          isScrollY={scrollDirection === 'y'}
          activeGap={activeGap ?? 1}
        />
      ) : (
        <></>
      )}
    </Root>
  );
}
