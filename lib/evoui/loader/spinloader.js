"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinLoader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = require("styled-components");
const Root = styled_components_1.default.div `
  display: flex;
  align-items: flex-end;
  position: relative;
  width: ${(props) => { var _a, _b; return ((_a = props.scale) !== null && _a !== void 0 ? _a : 1) * (((_b = props.width) !== null && _b !== void 0 ? _b : 0) + 38); }}px;
  height: ${(props) => { var _a, _b; return ((_a = props.scale) !== null && _a !== void 0 ? _a : 1) * (((_b = props.height) !== null && _b !== void 0 ? _b : 0) + 38); }}px;
  animation: root ${(props) => { var _a; return 2.5 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1); }}s infinite linear both;

  & > div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    animation: spin ${(props) => { var _a; return 2.5 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1); }}s infinite ease-in-out
      both;
  }

  & > div:before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: ${(props) => '#9f5cfa'};
    border-radius: 100%;
    animation: dotInit ${(props) => { var _a; return 2.5 / ((_a = props.speed) !== null && _a !== void 0 ? _a : 1); }}s infinite
      ease-in-out both;
  }

  & > div:nth-child(1) {
    animation-delay: -1.1s;
  }
  & > div:nth-child(2) {
    animation-delay: -1s;
  }
  & > div:nth-child(3) {
    animation-delay: -0.9s;
  }
  & > div:nth-child(4) {
    animation-delay: -0.8s;
  }
  & > div:nth-child(5) {
    animation-delay: -0.7s;
  }
  & > div:nth-child(6) {
    animation-delay: -0.6s;
  }
  & > div:nth-child(1):before {
    animation-delay: -1.1s;
  }
  & > div:nth-child(2):before {
    animation-delay: -1s;
  }
  & > div:nth-child(3):before {
    animation-delay: -0.9s;
  }
  & > div:nth-child(4):before {
    animation-delay: -0.8s;
  }
  & > div:nth-child(5):before {
    animation-delay: -0.7s;
  }
  & > div:nth-child(6):before {
    animation-delay: -0.6s;
  }

  @keyframes root {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin {
    70%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dotInit {
    50% {
      transform: scale(0.4);
    }
    100%,
    0% {
      transform: scale(1.1);
    }
  }
`;
function SpinLoader({ scale, color, height, width, radius, speed, margin, }) {
    return ((0, jsx_runtime_1.jsxs)(Root, Object.assign({ scale: scale, color: color, height: height, width: width, radius: radius, speed: speed, margin: margin }, { children: [(0, jsx_runtime_1.jsx)("div", {}, void 0), (0, jsx_runtime_1.jsx)("div", {}, void 0), (0, jsx_runtime_1.jsx)("div", {}, void 0), (0, jsx_runtime_1.jsx)("div", {}, void 0), (0, jsx_runtime_1.jsx)("div", {}, void 0), (0, jsx_runtime_1.jsx)("div", {}, void 0)] }), void 0));
}
exports.SpinLoader = SpinLoader;
//# sourceMappingURL=spinloader.js.map