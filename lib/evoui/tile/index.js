"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("../globalstyle/animation.css");
const styled_components_1 = require("styled-components");
const Root = styled_components_1.default.div `
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 1px 1px 4px rgb(0, 0, 0, 0.25);

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ''; }};
`;
function Tile({ children, effect, css }) {
    return ((0, jsx_runtime_1.jsx)(Root, Object.assign({ className: `evo-${effect}` || undefined }, (typeof css === 'string'
        ? { cssStyle: css }
        : css === undefined
            ? {}
            : { style: css }), { children: children }), void 0));
}
exports.Tile = Tile;
//# sourceMappingURL=index.js.map