import { globalType } from './global/global.type';

export type ReduxType = `evoui-docs/${Uppercase<string>}`;
export namespace reduxType {
  export interface stateType {
    router: any;
    global: globalType.stateType;
  }
}

export interface ReduxAction {
  type: ReduxType;
  payload?: any;
}
