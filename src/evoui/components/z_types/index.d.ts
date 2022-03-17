/*

  #######################################
  #                                     #
  #                 ###                 #
  #      #########################      #
  #      #########################      #
  #       #                     #       #
  #       #   ###   ###   ###   #       #
  #        #  # #   # #   # #  #        #
  #        #  # #   # #   # #  #        #
  #         # # #   # #   # # #         #
  #         # # #   # #   # # #         #
  #          # ##   ###   ## #          #
  #          #               #          #
  #          #################          #
  #                                     #
  #######################################
  
*/
// import {
//   DefaultOverridesType,
//   DefaultPrimitiveType,
//   DefaultPropsType,
// } from '../../global-properties';
// import React, { ReactElement } from 'react';
// import { DropDownListOptionsType } from 'evoui/@types/evo-ui';
// import { loader } from 'evoui/loader/index.type';

// declare module 'evoui/@types/evo-ui' {
//   export namespace popoverMenu {
//     export interface RootPropsType extends DefaultPropsType {}

//     export interface MenuListBasePropsType extends DefaultPropsType {}

//     export interface MenuListWrapperWrapperPropsType extends DefaultPropsType {
//       menuVisible: boolean;
//       isFixed: boolean;
//     }

//     export interface MenuListWrapperPropsType extends DefaultPropsType {}

//     export interface MenuListPropsType extends DefaultPropsType {}

//     export interface MenuItemPropsType extends DefaultPropsType {
//       disabled?: boolean;
//       noClick?: boolean;
//     }

//     export interface DividerPropsType extends DefaultPropsType {}

//     export interface DefaultButtonPropsType {
//       toggleMenu: () => void;
//     }

//     interface PopoverMenuItemType {
//       /**label could be number, string, React component, or React element type.*/
//       label:
//         | DefaultPrimitiveType
//         | React.ComponentType
//         | React.ElementType
//         | ReactElement;
//       onClick?: (event: any) => any;
//       disabled?: boolean;
//     }

//     export interface PopoverMenuProps {
//       /** A Button React Component that triggers open the menu. */
//       Button?: React.ComponentType | React.ElementType;
//       items?: Array<PopoverMenuItemType | 'divider'>;
//       /** UI elements props will be overridden. Only css value is available on current version. */
//       overrides?: {
//         Root?: DefaultOverridesType;
//         MenuListBase?: DefaultOverridesType;
//         MenuListWrapper?: DefaultOverridesType;
//         MenuListWrapperWrapper?: DefaultOverridesType;
//         MenuList?: DefaultOverridesType;
//         MenuItem?: DefaultOverridesType;
//         Divider?: DefaultOverridesType;
//       };
//       /** Where to attach menu when menu is located out of the screen. When isFixed set to false, the option doesn't work on current version. Default value is 'sticky'. */
//       snap?: 'sticky' | 'pop' | false;
//       /** If closeOnOut set to true, the menu will be closed when menu is located out of the screen. When isFixed set to false, the option doesn't work on current version. Default value is false. */
//       closeOnOut?: boolean;
//       /** If isFixed set to true, the menu list works as 'position: fixed' outside the component, so it can ignore css properties like 'overflow: hidden' or scrolling of parent component. Default value is false. */
//       isFixed?: boolean;
//       /** A React component the fixed menu list will be append. If not set, the fixed menu list would be appended to the body. */
//       fixedParent?: React.ReactInstance;
//       onOpen?: () => any;
//       onClose?: () => any;
//       /** A location where to attach the menu list. When isFixed set to true, the option doesn't work on current version. Default value is 'bottom-start'. */
//       location?:
//         | 'top-end'
//         | 'top-center'
//         | 'top-start'
//         | 'bottom-end'
//         | 'bottom-center'
//         | 'bottom-start';
//       scrollTarget?:
//         | window
//         | React.ComponentType
//         | React.ElementType
//         | ReactElement;
//     }
//   }
// }
