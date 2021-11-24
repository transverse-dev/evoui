"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = require("styled-components");
const Root = styled_components_1.default.div `
  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ''; }};
`;
function Icon({ type = 'success', overrides }) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    switch (type) {
        case 'success':
            return ((0, jsx_runtime_1.jsx)(Root, Object.assign({}, (typeof ((_a = overrides === null || overrides === void 0 ? void 0 : overrides.Root) === null || _a === void 0 ? void 0 : _a.css) === 'string'
                ? Object.assign({ cssStyle: overrides.Root.css }, ((_b = overrides.Root) !== null && _b !== void 0 ? _b : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Root) == undefined
                ? {}
                : Object.assign({ style: overrides.Root.css }, overrides.Root)), { children: (0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: 'http://www.w3.org/2000/svg', height: '24px', viewBox: '0 0 24 24', width: '24px', fill: 'currentColor' }, { children: [(0, jsx_runtime_1.jsx)("path", { d: 'M0 0h24v24H0z', fill: 'none' }, void 0), (0, jsx_runtime_1.jsx)("path", { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' }, void 0)] }), void 0) }), void 0));
        case 'error':
            return ((0, jsx_runtime_1.jsx)(Root, Object.assign({}, (typeof ((_c = overrides === null || overrides === void 0 ? void 0 : overrides.Root) === null || _c === void 0 ? void 0 : _c.css) === 'string'
                ? Object.assign({ cssStyle: overrides.Root.css }, ((_d = overrides.Root) !== null && _d !== void 0 ? _d : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Root) == undefined
                ? {}
                : Object.assign({ style: overrides.Root.css }, overrides.Root)), { children: (0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: 'http://www.w3.org/2000/svg', height: '24px', viewBox: '0 0 24 24', width: '24px', fill: 'currentColor' }, { children: [(0, jsx_runtime_1.jsx)("path", { d: 'M0 0h24v24H0z', fill: 'none' }, void 0), (0, jsx_runtime_1.jsx)("path", { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' }, void 0)] }), void 0) }), void 0));
        case 'warning':
            return ((0, jsx_runtime_1.jsx)(Root, Object.assign({}, (typeof ((_e = overrides === null || overrides === void 0 ? void 0 : overrides.Root) === null || _e === void 0 ? void 0 : _e.css) === 'string'
                ? Object.assign({ cssStyle: overrides.Root.css }, ((_f = overrides.Root) !== null && _f !== void 0 ? _f : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Root) == undefined
                ? {}
                : Object.assign({ style: overrides.Root.css }, overrides.Root)), { children: (0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: 'http://www.w3.org/2000/svg', height: '24px', viewBox: '0 0 24 24', width: '24px', fill: 'currentColor' }, { children: [(0, jsx_runtime_1.jsx)("path", { d: 'M0 0h24v24H0z', fill: 'none' }, void 0), (0, jsx_runtime_1.jsx)("path", { d: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z' }, void 0)] }), void 0) }), void 0));
        case 'info':
            return ((0, jsx_runtime_1.jsx)(Root, Object.assign({}, (typeof ((_g = overrides === null || overrides === void 0 ? void 0 : overrides.Root) === null || _g === void 0 ? void 0 : _g.css) === 'string'
                ? Object.assign({ cssStyle: overrides.Root.css }, ((_h = overrides.Root) !== null && _h !== void 0 ? _h : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Root) == undefined
                ? {}
                : Object.assign({ style: overrides.Root.css }, overrides.Root)), { children: (0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: 'http://www.w3.org/2000/svg', height: '24px', viewBox: '0 0 24 24', width: '24px', fill: 'currentColor' }, { children: [(0, jsx_runtime_1.jsx)("path", { d: 'M0 0h24v24H0z', fill: 'none' }, void 0), (0, jsx_runtime_1.jsx)("path", { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' }, void 0)] }), void 0) }), void 0));
    }
}
exports.Icon = Icon;
//# sourceMappingURL=index.js.map