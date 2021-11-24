"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = require("styled-components");
const Root = styled_components_1.default.div `
  width: 100%;
  height: 100%;
  background: ${(props) => `linear-gradient(135deg, #00000000 33%, #00000011 50%, #00000000 66%)`};
  background-size: 300% 300%;
  background-color: #f6f6f6;
  animation: skeleton 1.4s infinite;

  @keyframes skeleton {
    0% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ''; }};
`;
function Skeleton({ overrides }) {
    var _a, _b, _c;
    return ((0, jsx_runtime_1.jsx)(Root, Object.assign({}, (typeof ((_a = overrides === null || overrides === void 0 ? void 0 : overrides.Root) === null || _a === void 0 ? void 0 : _a.css) === 'string'
        ? Object.assign({ cssStyle: overrides.Root.css }, ((_b = overrides.Root) !== null && _b !== void 0 ? _b : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Root) == undefined
        ? {}
        : Object.assign({ style: overrides.Root.css }, ((_c = overrides.Root) !== null && _c !== void 0 ? _c : {})))), void 0));
}
exports.Skeleton = Skeleton;
//# sourceMappingURL=index.js.map