"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BounceLoader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = require("styled-components");
const Root = styled_components_1.default.div `
  width: ${(props) => { var _a, _b; return ((_a = props.scale) !== null && _a !== void 0 ? _a : 1) * (((_b = props.width) !== null && _b !== void 0 ? _b : 0) + 38); }}px;
  height: ${(props) => { var _a, _b; return ((_a = props.scale) !== null && _a !== void 0 ? _a : 1) * (((_b = props.height) !== null && _b !== void 0 ? _b : 0) + 38); }}px;
  position: relative;

  & > div {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${(props) => { var _a; return (_a = props.color) !== null && _a !== void 0 ? _a : '#9f5cfa'; }};
    border-radius: 50%;
    opacity: 0.6;
    animation: bounce 2s infinite ease-in-out;
    top: 0;
    left: 0;
  }

  & > .second {
    animation-delay: -1s;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;
function BounceLoader({ scale, color, height, width, radius, speed, margin, }) {
    return ((0, jsx_runtime_1.jsxs)(Root, Object.assign({ scale: scale, color: color, height: height, width: width, radius: radius, speed: speed, margin: margin }, { children: [(0, jsx_runtime_1.jsx)("div", { className: 'first' }, void 0), (0, jsx_runtime_1.jsx)("div", { className: 'second' }, void 0)] }), void 0));
}
exports.BounceLoader = BounceLoader;
//# sourceMappingURL=bounceloader.js.map