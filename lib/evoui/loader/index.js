"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const bounceloader_1 = require("./bounceloader");
const flealoader_1 = require("./flealoader");
const imsiloader_1 = require("./imsiloader");
const spinloader_1 = require("./spinloader");
function Loader({ type, scale, color, height, width, radius, speed, margin, }) {
    switch (type) {
        case 'flea':
            return ((0, jsx_runtime_1.jsx)(flealoader_1.FleaLoader, { scale: scale, color: color, height: height, width: width, radius: radius, speed: speed, margin: margin }, void 0));
        case 'imsi':
            return ((0, jsx_runtime_1.jsx)(imsiloader_1.ImsiLoader, { scale: scale, color: color, height: height, width: width, radius: radius, speed: speed, margin: margin }, void 0));
        case 'spin':
            return ((0, jsx_runtime_1.jsx)(spinloader_1.SpinLoader, { scale: scale, color: color, height: height, width: width, radius: radius, speed: speed, margin: margin }, void 0));
        case 'bounce':
            return ((0, jsx_runtime_1.jsx)(bounceloader_1.BounceLoader, { scale: scale, color: color, height: height, width: width, radius: radius, speed: speed, margin: margin }, void 0));
        default:
            return ((0, jsx_runtime_1.jsx)(flealoader_1.FleaLoader, { scale: scale, color: color, height: height, width: width, radius: radius, speed: speed, margin: margin }, void 0));
    }
}
exports.Loader = Loader;
//# sourceMappingURL=index.js.map