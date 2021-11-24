"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wall = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const index_1 = require("../loader/index");
const styled_components_1 = require("styled-components");
const Root = styled_components_1.default.div `
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${(props) => props.backgroundColor
    ? props.backgroundColor
    : 'rgba(255, 255, 255, 0.7)'};
  overflow: hidden;
  z-index: 100000;

  & > div {
    margin: auto;
  }

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ''; }};
`;
function Wall({ isOn, backgroundColor, loader, overrides, }) {
    var _a, _b;
    return isOn ? ((0, jsx_runtime_1.jsx)(Root, Object.assign({ backgroundColor: backgroundColor }, (typeof ((_a = overrides === null || overrides === void 0 ? void 0 : overrides.Root) === null || _a === void 0 ? void 0 : _a.css) === 'string'
        ? Object.assign({ cssStyle: overrides.Root.css }, ((_b = overrides.Root) !== null && _b !== void 0 ? _b : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Root) == undefined
        ? {}
        : Object.assign({ style: overrides.Root.css }, overrides.Root)), { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(index_1.Loader, Object.assign({}, loader), void 0) }, void 0) }), void 0)) : null;
}
exports.Wall = Wall;
Wall.defaultProps = {
    isOn: false,
};
//# sourceMappingURL=index.js.map