"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToast = exports.Toast = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const styled_components_1 = require("styled-components");
const Canvas = styled_components_1.default.div `
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99999;
`;
const ToastWrapper = styled_components_1.default.div `
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 100vh;
  max-width: 100vw;
  overflow-y: auto;
  height: fit-content;
  transition-duration: 0.6s;

  &::-webkit-scrollbar {
    width: 0;
  }
`;
const Root = styled_components_1.default.div `
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  overflow: hidden;
  transition-duration: 0.6s;

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const ToastContent = styled_components_1.default.div `
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
  box-shadow: 1px 1px 4px rgb(0 0 0 / 25%);
  color: white;
  background-color: ${(props) => props.type === "success"
    ? "#38A169"
    : props.type === "error"
        ? "#E53E3E"
        : props.type === "info"
            ? "#226B99"
            : props.type == "warning"
                ? "#C4A01C"
                : "black"};
  animation-duration: 0.4s;
  animation-fill-mode: both;
  animation-name: ${(props) => props.willRemoved ? "fadeOutRight" : "fadeInRight"};
  transition-duration: 0.4s;
  pointer-events: all;
  padding: 13px 15px;
  min-width: 240px;
  overflow: hidden;
  margin: 0 10px 10px 10px;

  @media screen and (max-width: 280px) {
    min-width: 0;
  }

  @keyframes fadeInRight {
    0% {
      opacity: 0;
      transform: translateX(20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.7);
    }
  }

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const Header = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const Icon = styled_components_1.default.div `
  margin: 3px 6px auto 0;
  line-height: 0;

  & > svg {
    fill: white;
  }

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const Title = styled_components_1.default.div `
  margin: auto auto auto 0;
  padding-bottom: 2px;
  line-height: 21px;
  font-weight: 500;
  font-size: 17px;

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const CloseButton = styled_components_1.default.div `
  margin: -4px -6px auto 3px;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  cursor: pointer;
  line-height: 0;
  font-weight: 400;

  &:hover {
    background-color: #00000033;
  }

  & > svg {
    fill: #ffffff99;
    margin: 2px;
  }

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const Content = styled_components_1.default.div `
  line-height: 17px;
  font-size: 15px;
  padding-left: 25px;

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
function IndependentToast({ title, content, type = "info", duration = 5000, closable = true, icon, closeButton, overrides, }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            if (!!ref.current) {
                ref.current.style.animationName = "fadeOut";
            }
        }, duration - 500);
    }, []);
    const ref = (0, react_1.useRef)(null);
    const doClose = () => {
        if (!!ref.current) {
            ref.current.style.animationName = "fadeOut";
            setTimeout(() => {
                if (!!ref.current) {
                    ref.current.style.margin = "0";
                    ref.current.style.padding = "0";
                    ref.current.style.height = "0";
                }
            }, 400);
        }
    };
    return ((0, jsx_runtime_1.jsx)(Root, Object.assign({}, (typeof ((_a = overrides === null || overrides === void 0 ? void 0 : overrides.Root) === null || _a === void 0 ? void 0 : _a.css) === "string"
        ? Object.assign({ cssStyle: overrides.Root.css }, ((_b = overrides.Root) !== null && _b !== void 0 ? _b : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Root) == undefined
        ? {}
        : Object.assign({ style: overrides.Root.css }, overrides.Root)), { children: (0, jsx_runtime_1.jsxs)(ToastContent, Object.assign({ type: type, ref: ref }, (typeof ((_c = overrides === null || overrides === void 0 ? void 0 : overrides.ToastContent) === null || _c === void 0 ? void 0 : _c.css) === "string"
            ? Object.assign({ cssStyle: overrides.ToastContent.css }, ((_d = overrides.ToastContent) !== null && _d !== void 0 ? _d : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.ToastContent) == undefined
            ? {}
            : Object.assign({ style: overrides.ToastContent.css }, overrides.ToastContent)), { children: [(0, jsx_runtime_1.jsxs)(Header, Object.assign({}, (typeof ((_e = overrides === null || overrides === void 0 ? void 0 : overrides.Header) === null || _e === void 0 ? void 0 : _e.css) === "string"
                    ? Object.assign({ cssStyle: overrides.Header.css }, ((_f = overrides.Header) !== null && _f !== void 0 ? _f : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Header) == undefined
                    ? {}
                    : Object.assign({ style: overrides.Header.css }, overrides.Header)), { children: [(0, jsx_runtime_1.jsx)(Icon, Object.assign({}, (typeof ((_g = overrides === null || overrides === void 0 ? void 0 : overrides.Icon) === null || _g === void 0 ? void 0 : _g.css) === "string"
                            ? Object.assign({ cssStyle: overrides.Icon.css }, ((_h = overrides.Icon) !== null && _h !== void 0 ? _h : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Icon) == undefined
                            ? {}
                            : Object.assign({ style: overrides.Icon.css }, overrides.Icon)), { children: !!icon ? (icon) : type === "error" ? ((0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "18px", viewBox: "0 0 24 24", width: "18px" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }, void 0) }), void 0)) : type === "success" ? ((0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "18px", viewBox: "0 0 24 24", width: "18px" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" }, void 0) }), void 0)) : type === "info" ? ((0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "18px", viewBox: "0 0 24 24", width: "18px" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" }, void 0) }), void 0)) : type === "warning" ? ((0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "18px", viewBox: "0 0 24 24", width: "18px" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" }, void 0) }), void 0)) : ("") }), void 0), (0, jsx_runtime_1.jsx)(Title, Object.assign({}, (typeof ((_j = overrides === null || overrides === void 0 ? void 0 : overrides.Title) === null || _j === void 0 ? void 0 : _j.css) === "string"
                            ? Object.assign({ cssStyle: overrides.Title.css }, ((_k = overrides.Title) !== null && _k !== void 0 ? _k : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Title) == undefined
                            ? {}
                            : Object.assign({ style: overrides.Title.css }, overrides.Title)), { children: title }), void 0), closable && ((0, jsx_runtime_1.jsx)(CloseButton, Object.assign({ onClick: () => doClose() }, (typeof ((_l = overrides === null || overrides === void 0 ? void 0 : overrides.CloseButton) === null || _l === void 0 ? void 0 : _l.css) === "string"
                            ? Object.assign({ cssStyle: overrides.CloseButton.css }, ((_m = overrides.CloseButton) !== null && _m !== void 0 ? _m : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.CloseButton) == undefined
                            ? {}
                            : Object.assign({ style: overrides.CloseButton.css }, overrides.CloseButton)), { children: !!closeButton ? (closeButton) : ((0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "18px", viewBox: "0 0 24 24", width: "18px" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" }, void 0) }), void 0)) }), void 0))] }), void 0), content && ((0, jsx_runtime_1.jsx)(Content, Object.assign({ onClick: () => doClose() }, (typeof ((_o = overrides === null || overrides === void 0 ? void 0 : overrides.Content) === null || _o === void 0 ? void 0 : _o.css) === "string"
                    ? Object.assign({ cssStyle: overrides.Content.css }, ((_p = overrides.Content) !== null && _p !== void 0 ? _p : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Content) == undefined
                    ? {}
                    : Object.assign({ style: overrides.Content.css }, overrides.Content)), { children: content }), void 0))] }), void 0) }), void 0));
}
function ToastCanvas() {
    const [changed, setChanged] = (0, react_1.useState)(false);
    const [list, setList] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        ToastManager.setList = (list) => setList(list);
        ToastManager.listChanged = () => setChanged((changed) => !changed);
        return () => {
            ToastManager.setList = null;
            ToastManager.listChanged = null;
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (!!ref.current) {
            ref.current.scroll({ top: ref.current.scrollHeight, behavior: "smooth" });
        }
    }, [changed]);
    const ref = (0, react_1.useRef)(null);
    return ((0, jsx_runtime_1.jsx)(Canvas, { children: (0, jsx_runtime_1.jsx)(ToastWrapper, Object.assign({ ref: ref }, { children: list &&
                list.map &&
                list.map((toast, i) => {
                    var _a;
                    return ((0, jsx_runtime_1.jsx)(IndependentToast, { title: toast.toast.title, content: toast.toast.content, type: toast.toast.type, duration: toast.toast.duration, closable: toast.toast.closable, icon: toast.toast.icon, closeButton: toast.toast.closeButton, overrides: toast.toast.overrides }, (_a = toast.key) !== null && _a !== void 0 ? _a : i));
                }) }), void 0) }, void 0));
}
class ToastManager {
    static init(canvas) {
        if (!this.initialized) {
            this.canvas = canvas;
            this.initialized = true;
        }
    }
    static isInitialized() {
        return this.initialized;
    }
    static uninit() {
        this.canvas = undefined;
        this.initialized = false;
    }
    static enqueueToast(toastProps) {
        if (!this.isInitialized()) {
            this.uninitializedError();
        }
        this.toastQueue.push({ toast: toastProps, key: this.toastKey++ });
        if (this.maxDisplaySize === 0 ||
            this.toastQueue.length < this.maxDisplaySize) {
            this.dequeueToast();
        }
    }
    static dequeueToast() {
        var _a, _b;
        let toast = this.toastQueue.shift();
        if (!toast || !this.setList)
            return;
        this.displayList.push(toast);
        this.setList(this.displayList);
        this.listChanged();
        setTimeout(() => {
            if (!this.isInitialized() || !this.setList)
                return;
            this.displayList = this.displayList.filter((el) => { var _a, _b; return ((_a = el === null || el === void 0 ? void 0 : el.key) !== null && _a !== void 0 ? _a : -2) !== ((_b = toast === null || toast === void 0 ? void 0 : toast.key) !== null && _b !== void 0 ? _b : -1); });
            this.setList(this.displayList);
            this.listChanged();
        }, (_b = (_a = toast.toast) === null || _a === void 0 ? void 0 : _a.duration) !== null && _b !== void 0 ? _b : 5000);
    }
    static uninitializedError() {
        throw "Toast did not initialized. Toast component must be mounted somewhere in the React DOM tree.";
    }
}
ToastManager.canvas = undefined;
ToastManager.setList = null;
ToastManager.listChanged = null;
ToastManager.initialized = false;
ToastManager.maxDisplaySize = 0;
ToastManager.toastQueue = [];
ToastManager.displayList = [];
ToastManager.toastKey = 0;
function Toast({}) {
    const [initialized, setInitialized] = (0, react_1.useState)(false);
    const toastCanvas = (0, jsx_runtime_1.jsx)(ToastCanvas, {}, void 0);
    (0, react_1.useEffect)(() => {
        if (!ToastManager.isInitialized()) {
            ToastManager.init(toastCanvas);
            setInitialized(true);
        }
        return () => {
            ToastManager.uninit();
        };
    }, []);
    return initialized ? (0, react_dom_1.createPortal)(toastCanvas, document.body) : null;
}
exports.Toast = Toast;
function sendToast({ title, content, type, duration, closable, icon, closeButton, overrides, }) {
    ToastManager.enqueueToast({
        title,
        content,
        type,
        duration,
        closable,
        icon,
        closeButton,
        overrides,
    });
}
exports.sendToast = sendToast;
//# sourceMappingURL=index.js.map