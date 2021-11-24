"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FleaLoader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("../globalstyle/animation.css");
const styled_components_1 = require("styled-components");
const Root = styled_components_1.default.div `
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: ${(props) => { var _a, _b, _c; return ((_a = props.scale) !== null && _a !== void 0 ? _a : 1) * (((_b = props.width) !== null && _b !== void 0 ? _b : 0) + 38 + ((_c = props.margin) !== null && _c !== void 0 ? _c : 0)); }}px;
  height: ${(props) => { var _a, _b; return ((_a = props.scale) !== null && _a !== void 0 ? _a : 1) * (10 + ((_b = props.height) !== null && _b !== void 0 ? _b : 0)); }}px;

  & > div > div {
    width: ${(props) => { var _a, _b; return ((_a = props.scale) !== null && _a !== void 0 ? _a : 1) * ((_b = props.width) !== null && _b !== void 0 ? _b : 9); }}px;
    height: ${(props) => { var _a, _b; return ((_a = props.scale) !== null && _a !== void 0 ? _a : 1) * ((_b = props.height) !== null && _b !== void 0 ? _b : 9); }}px;
    background-color: ${(props) => { var _a; return (_a = props.color) !== null && _a !== void 0 ? _a : '#9f5cfa'; }};
    border-radius: ${(props) => { var _a, _b; return ((_a = props.scale) !== null && _a !== void 0 ? _a : 1) * (3 + ((_b = props.radius) !== null && _b !== void 0 ? _b : 0)); }}px;
  }

  & > div:nth-child(1) {
    animation-duration: ${(props) => { var _a; return 1 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1); }}s;
    animation-delay: -1s;
    margin-right: ${(props) => { var _a; return (_a = props.margin) !== null && _a !== void 0 ? _a : 0; }}px;
  }
  & > div:nth-child(2) {
    animation-duration: ${(props) => { var _a; return 1 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1); }}s;
    animation-delay: ${(props) => { var _a; return 0.2 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1) - 1; }}s;
    margin-right: ${(props) => { var _a; return (_a = props.margin) !== null && _a !== void 0 ? _a : 0; }}px;
  }
  & > div:nth-child(3) {
    animation-duration: ${(props) => { var _a; return 1 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1); }}s;
    animation-delay: ${(props) => { var _a; return 0.4 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1) - 1; }}s;
  }

  & > div:nth-child(1) > div {
    animation-duration: ${(props) => { var _a; return 1 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1); }}s;
    animation-delay: -1s;
  }
  & > div:nth-child(2) > div {
    animation-duration: ${(props) => { var _a; return 1 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1); }}s;
    animation-delay: ${(props) => { var _a; return 0.2 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1) - 1; }}s;
  }
  & > div:nth-child(3) > div {
    animation-duration: ${(props) => { var _a; return 1 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1); }}s;
    animation-delay: ${(props) => { var _a; return 0.4 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1) - 1; }}s;
  }
`;
function FleaLoader({ scale, color, height, width, radius, speed, margin, }) {
    return ((0, jsx_runtime_1.jsxs)(Root, Object.assign({ scale: scale, color: color, height: height, width: width, radius: radius, speed: speed, margin: margin }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'evo-jump' }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'evo-rotate' }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'evo-jump' }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'evo-rotate' }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'evo-jump' }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'evo-rotate' }, void 0) }), void 0)] }), void 0));
}
exports.FleaLoader = FleaLoader;
//# sourceMappingURL=flealoader.js.map