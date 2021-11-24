"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("../globalstyle/animation.css");
const icon_1 = require("../icon");
const loader_1 = require("../loader");
const styled_components_1 = require("styled-components");
const Root = styled_components_1.default.div `
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f6f1ff;
  border-radius: 10px;
  color: #9f5cfa;
  font-weight: 600;
  ${(props) => props.clickable
    ? `
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      background-color: #efeaf7;
    }
  `
    : ''};

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ''; }};
`;
function Feedback({ children, effect, enhancer, overrides, onClick, }) {
    var _a, _b, _c;
    return ((0, jsx_runtime_1.jsx)(Root, Object.assign({ className: `evo-${effect}` || undefined, clickable: onClick !== undefined, onClick: onClick }, (typeof ((_a = overrides === null || overrides === void 0 ? void 0 : overrides.Root) === null || _a === void 0 ? void 0 : _a.css) === 'string'
        ? Object.assign({ cssStyle: overrides.Root.css }, ((_b = overrides.Root) !== null && _b !== void 0 ? _b : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Root) == undefined
        ? {}
        : Object.assign({ style: overrides.Root.css }, ((_c = overrides.Root) !== null && _c !== void 0 ? _c : {}))), { children: enhancer === undefined ? (children) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ['loaderType' in enhancer ? ((0, jsx_runtime_1.jsx)(loader_1.Loader, { type: enhancer.loaderType }, void 0)) : ((0, jsx_runtime_1.jsx)(icon_1.Icon, { type: enhancer.iconType }, void 0)), (0, jsx_runtime_1.jsx)("div", { style: { marginRight: '16px' } }, void 0), (0, jsx_runtime_1.jsx)("div", { children: children }, void 0)] }, void 0)) }), void 0));
}
exports.Feedback = Feedback;
//# sourceMappingURL=index.js.map