import { ReactElement } from 'react';

export interface PropsType {
  children: ReactElement<any, any>;
  handleClickAway: () => any;
  nonClickAwayRefs?: React.RefObject<HTMLInputElement>[];
  listenByPosition?: boolean;
}
