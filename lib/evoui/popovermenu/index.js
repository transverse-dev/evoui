"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopoverMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const styled_components_1 = require("styled-components");
const Root = styled_components_1.default.div `
  font-size: 14.4px;
  position: relative;
  width: fit-content;
  height: fit-content;

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const MenuListBase = styled_components_1.default.div `
  position: absolute;
  margin-top: 10px;
  left: 0;
  right: 0;

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const MenuListWrapper = styled_components_1.default.div `
  z-index: 1000;
  overflow: hidden;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 1px 1px 4px rgb(0 0 0 / 25%);
  position: ${(props) => (props.isFixed ? "fixed" : "absolute")};
  display: ${(props) => (props.menuVisible ? "flex" : "none")};
  right: 0;
  top: 0;
  animation-name: fadeIn;
  animation-duration: 0.3s;
  animation-fill-mode: both;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const MenuList = styled_components_1.default.div `
  flex-direction: column;
  min-width: 80px;
  padding: 4px 0;
  max-height: 90vh;
  max-width: 90vw;
  overflow: hidden auto;

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const MenuItem = styled_components_1.default.div `
  padding: 4px 12px;
  color: #555555;
  line-height: 24px;
  text-align: center;
  cursor: ${(props) => !!props.disabled || !!props.noClick ? "default" : "pointer"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  opacity: ${(props) => (!!props.disabled ? "0.5" : "1")};
  font-size: 14.4px;
  transition-duration: 0.1s;

  &:hover {
    background-color: ${(props) => !props.disabled && !props.noClick
    ? "rgba(233,233,233,0.72)"
    : "transparent"};
  }

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const Divider = styled_components_1.default.div `
  height: 1px;
  margin: 4px 0;
  background-color: #e5e5e5;

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const Circle = styled_components_1.default.div `
  height: 24px;
  width: 24px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & path {
    fill: #212121;
  }
`;
const DefaultButton = function DefaultButton() {
    return ((0, jsx_runtime_1.jsx)(Circle, { children: (0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "24", viewBox: "0 0 24 24", width: "24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }, void 0) }), void 0) }, void 0));
};
exports.PopoverMenu = (0, react_1.memo)(function PopoverMenu({ Button, items, overrides, isFixed = false, fixedParent, onOpen, onClose, location, snap = "sticky", closeOnOut = false, scrollTarget = window, }) {
    var _a, _b, _c, _d, _e;
    const [menuVisible, setMenuVisible] = (0, react_1.useState)(false);
    const popoverMenuRef = (0, react_1.useRef)([]);
    const toggleMenu = () => {
        if (menuVisible)
            closeMenu();
        else
            openMenu();
    };
    const openMenu = () => {
        onOpen && onOpen();
        setMenuVisible(true);
    };
    const closeMenu = () => {
        onClose && onClose();
        setMenuVisible(false);
    };
    const handleClickOutside = (event) => {
        if (!popoverMenuRef.current[0] || !popoverMenuRef.current[1])
            closeMenu();
        else if (!popoverMenuRef.current[0].contains(event.target) &&
            !popoverMenuRef.current[1].contains(event.target))
            closeMenu();
    };
    (0, react_1.useEffect)(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popoverMenuRef.current[0]]);
    const scrollEvent = () => {
        var _a, _b;
        if (menuVisible) {
            if (!!(popoverMenuRef === null || popoverMenuRef === void 0 ? void 0 : popoverMenuRef.current[2]) && !!(popoverMenuRef === null || popoverMenuRef === void 0 ? void 0 : popoverMenuRef.current[1])) {
                if (isFixed) {
                    if (!!popoverMenuRef.current[1]) {
                        let offsetX;
                        let offsetY;
                        if (snap === "sticky") {
                            offsetX = -Math.min(Math.max(window.document.documentElement.clientWidth -
                                popoverMenuRef.current[2].getBoundingClientRect().right, 0), window.document.documentElement.clientWidth -
                                popoverMenuRef.current[1].getBoundingClientRect().width);
                            offsetY = -Math.max(Math.min(-popoverMenuRef.current[2].getBoundingClientRect().bottom, 0), popoverMenuRef.current[1].getBoundingClientRect().height -
                                window.document.documentElement.clientHeight);
                        }
                        else if (snap === "pop") {
                            offsetX = -(window.document.documentElement.clientWidth -
                                popoverMenuRef.current[2].getBoundingClientRect().right);
                            if ((popoverMenuRef.current[2].style.bottom === "100%"
                                ? -(popoverMenuRef.current[2].getBoundingClientRect().bottom +
                                    ((_b = (_a = popoverMenuRef.current[3]) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height) !== null && _b !== void 0 ? _b : 0) +
                                    20)
                                : -popoverMenuRef.current[2].getBoundingClientRect().bottom) <
                                popoverMenuRef.current[1].getBoundingClientRect().height -
                                    window.document.documentElement.clientHeight) {
                                popoverMenuRef.current[2].style.bottom = "100%";
                                popoverMenuRef.current[2].style.marginBottom = "10px";
                                offsetY =
                                    popoverMenuRef.current[2].getBoundingClientRect().top -
                                        popoverMenuRef.current[1].getBoundingClientRect().height;
                            }
                            else {
                                popoverMenuRef.current[2].style.bottom = "";
                                popoverMenuRef.current[2].style.marginBottom = "0";
                                offsetY =
                                    popoverMenuRef.current[2].getBoundingClientRect().bottom;
                            }
                        }
                        else {
                            offsetX = -(window.document.documentElement.clientWidth -
                                popoverMenuRef.current[2].getBoundingClientRect().right);
                            offsetY =
                                popoverMenuRef.current[2].getBoundingClientRect().bottom;
                        }
                        if (closeOnOut &&
                            (-offsetX < 0 ||
                                -offsetX >
                                    window.document.documentElement.clientWidth -
                                        popoverMenuRef.current[1].getBoundingClientRect().width ||
                                -offsetY > 0 ||
                                -offsetY <
                                    popoverMenuRef.current[1].getBoundingClientRect().height -
                                        window.document.documentElement.clientHeight)) {
                            closeMenu();
                        }
                        popoverMenuRef.current[1].style.transform = `translate(${Math.floor(offsetX)}px, ${Math.floor(offsetY)}px)`;
                    }
                }
                else {
                    if (!!popoverMenuRef.current[1]) {
                        let offsetY = 0;
                        switch (location === null || location === void 0 ? void 0 : location.split("-")[0]) {
                            case "top": {
                                popoverMenuRef.current[2].style.bottom = "100%";
                                popoverMenuRef.current[2].style.marginBottom = "10px";
                                if (popoverMenuRef.current[2].getBoundingClientRect().top -
                                    popoverMenuRef.current[1].getBoundingClientRect().height <
                                    0) {
                                    offsetY =
                                        popoverMenuRef.current[2].getBoundingClientRect().top;
                                }
                                else if (popoverMenuRef.current[2].getBoundingClientRect().top >
                                    window.document.documentElement.clientHeight) {
                                    offsetY =
                                        popoverMenuRef.current[2].getBoundingClientRect().top +
                                            popoverMenuRef.current[1].getBoundingClientRect().height -
                                            window.document.documentElement.clientHeight;
                                }
                                else {
                                    offsetY =
                                        popoverMenuRef.current[1].getBoundingClientRect().height;
                                }
                                break;
                            }
                            case "bottom": {
                                offsetY =
                                    popoverMenuRef.current[2].getBoundingClientRect().top +
                                        popoverMenuRef.current[1].getBoundingClientRect().height -
                                        window.document.documentElement.clientHeight;
                                if (offsetY > 0) {
                                }
                                else if (popoverMenuRef.current[2].getBoundingClientRect().top < 0) {
                                    offsetY =
                                        popoverMenuRef.current[2].getBoundingClientRect().top;
                                }
                                else {
                                    offsetY = 0;
                                }
                                break;
                            }
                        }
                        let offsetX = 0;
                        switch (location === null || location === void 0 ? void 0 : location.split("-")[1]) {
                            case "start": {
                                offsetX =
                                    popoverMenuRef.current[2].getBoundingClientRect().width -
                                        popoverMenuRef.current[1].getBoundingClientRect().width;
                                if (popoverMenuRef.current[2].getBoundingClientRect().left < 0) {
                                    offsetX =
                                        -popoverMenuRef.current[2].getBoundingClientRect().left;
                                }
                                else if (popoverMenuRef.current[2].getBoundingClientRect().left +
                                    popoverMenuRef.current[1].getBoundingClientRect().width >
                                    window.document.documentElement.clientWidth) {
                                    offsetX =
                                        popoverMenuRef.current[2].getBoundingClientRect().right -
                                            window.document.documentElement.clientWidth;
                                }
                                break;
                            }
                            case "center": {
                                offsetX =
                                    (popoverMenuRef.current[2].getBoundingClientRect().width -
                                        popoverMenuRef.current[1].getBoundingClientRect().width) /
                                        2;
                                if (popoverMenuRef.current[2].getBoundingClientRect().right -
                                    popoverMenuRef.current[2].getBoundingClientRect().width /
                                        2 -
                                    popoverMenuRef.current[1].getBoundingClientRect().width /
                                        2 <
                                    0) {
                                    offsetX =
                                        -popoverMenuRef.current[2].getBoundingClientRect().left;
                                }
                                else if (popoverMenuRef.current[2].getBoundingClientRect().right -
                                    offsetX >
                                    window.document.documentElement.clientWidth) {
                                    offsetX =
                                        popoverMenuRef.current[2].getBoundingClientRect().right -
                                            window.document.documentElement.clientWidth;
                                }
                                break;
                            }
                            case "end":
                            default: {
                                offsetX =
                                    popoverMenuRef.current[2].getBoundingClientRect().right -
                                        popoverMenuRef.current[1].getBoundingClientRect().width;
                                if (offsetX < 0) {
                                }
                                else if (popoverMenuRef.current[2].getBoundingClientRect().right >
                                    window.document.documentElement.clientWidth) {
                                    offsetX =
                                        popoverMenuRef.current[2].getBoundingClientRect().right -
                                            window.document.documentElement.clientWidth;
                                }
                                else {
                                    offsetX = 0;
                                }
                            }
                        }
                        popoverMenuRef.current[1].style.transform = `translate(${Math.floor(-offsetX)}px, ${Math.floor(-offsetY)}px)`;
                    }
                }
            }
        }
    };
    (0, react_1.useEffect)(() => {
        if (menuVisible) {
            scrollEvent();
            scrollTarget.addEventListener("scroll", scrollEvent);
        }
        else {
            scrollTarget.removeEventListener("scroll", scrollEvent);
        }
        return () => {
            scrollTarget.removeEventListener("scroll", scrollEvent);
        };
    }, [menuVisible]);
    (0, react_1.useEffect)(() => {
        scrollEvent();
    }, [menuVisible, Button, items, overrides]);
    const MenuListComponent = () => {
        var _a, _b, _c, _d, _e;
        return ((0, jsx_runtime_1.jsx)(MenuListWrapper, Object.assign({ menuVisible: menuVisible, isFixed: isFixed, ref: (el) => (popoverMenuRef.current[1] = el) }, (typeof ((_a = overrides === null || overrides === void 0 ? void 0 : overrides.MenuListWrapper) === null || _a === void 0 ? void 0 : _a.css) === "string"
            ? Object.assign({ cssStyle: overrides.MenuListWrapper.css }, ((_b = overrides.MenuListWrapper) !== null && _b !== void 0 ? _b : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.MenuListWrapper) == undefined
            ? {}
            : Object.assign({ style: overrides.MenuListWrapper.css }, overrides.MenuListWrapper)), { children: (0, jsx_runtime_1.jsx)(MenuList, Object.assign({}, (typeof ((_c = overrides === null || overrides === void 0 ? void 0 : overrides.MenuList) === null || _c === void 0 ? void 0 : _c.css) === "string"
                ? Object.assign({ cssStyle: overrides.MenuList.css }, ((_d = overrides.MenuList) !== null && _d !== void 0 ? _d : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.MenuList) == undefined
                ? {}
                : Object.assign({ style: overrides.MenuList.css }, overrides.MenuList)), { children: (_e = items === null || items === void 0 ? void 0 : items.map((item, i) => {
                    var _a, _b, _c, _d;
                    return ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: item === "divider" ? ((0, jsx_runtime_1.jsx)(Divider, Object.assign({}, (typeof ((_a = overrides === null || overrides === void 0 ? void 0 : overrides.Divider) === null || _a === void 0 ? void 0 : _a.css) === "string"
                            ? Object.assign({ cssStyle: overrides.Divider.css }, ((_b = overrides.Divider) !== null && _b !== void 0 ? _b : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Divider) == undefined
                            ? {}
                            : Object.assign({ style: overrides.Divider.css }, overrides.Divider))), void 0)) : ((0, jsx_runtime_1.jsx)(MenuItem, Object.assign({ disabled: item.disabled, noClick: !item.onClick, onClick: (event) => {
                                if (!!item.onClick && !item.disabled) {
                                    item.onClick(event);
                                    closeMenu();
                                }
                            } }, (typeof ((_c = overrides === null || overrides === void 0 ? void 0 : overrides.MenuItem) === null || _c === void 0 ? void 0 : _c.css) === "string"
                            ? Object.assign({ cssStyle: overrides.MenuItem.css }, ((_d = overrides.MenuItem) !== null && _d !== void 0 ? _d : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.MenuItem) == undefined
                            ? {}
                            : Object.assign({ style: overrides.MenuItem.css }, overrides.MenuItem)), { children: item.label }), void 0)) }, i));
                })) !== null && _e !== void 0 ? _e : null }), void 0) }), void 0));
    };
    return ((0, jsx_runtime_1.jsxs)(Root, Object.assign({ ref: (el) => (popoverMenuRef.current[0] = el) }, (typeof ((_a = overrides === null || overrides === void 0 ? void 0 : overrides.Root) === null || _a === void 0 ? void 0 : _a.css) === "string"
        ? Object.assign({ cssStyle: overrides.Root.css }, ((_b = overrides.Root) !== null && _b !== void 0 ? _b : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Root) == undefined
        ? {}
        : Object.assign({ style: overrides.Root.css }, overrides.Root)), { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ onClick: toggleMenu, ref: (el) => (popoverMenuRef.current[3] = el) }, { children: !!Button ? (0, jsx_runtime_1.jsx)(Button, { menuVisible: menuVisible }, void 0) : (0, jsx_runtime_1.jsx)(DefaultButton, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(MenuListBase, Object.assign({ ref: (el) => (popoverMenuRef.current[2] = el) }, (typeof ((_c = overrides === null || overrides === void 0 ? void 0 : overrides.MenuListBase) === null || _c === void 0 ? void 0 : _c.css) === "string"
                ? Object.assign({ cssStyle: overrides.MenuListBase.css }, ((_d = overrides.MenuListBase) !== null && _d !== void 0 ? _d : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.MenuListBase) == undefined
                ? {}
                : Object.assign({ style: overrides.MenuListBase.css }, overrides.MenuListBase)), { children: isFixed ? ((0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)(MenuListComponent, {}, void 0), fixedParent
                    ? (_e = (0, react_dom_1.findDOMNode)(fixedParent)) !== null && _e !== void 0 ? _e : document.body
                    : document.body)) : ((0, jsx_runtime_1.jsx)(MenuListComponent, {}, void 0)) }), void 0)] }), void 0));
});
//# sourceMappingURL=index.js.map