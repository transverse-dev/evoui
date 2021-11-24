"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styled_components_1 = require("styled-components");
const Root = styled_components_1.default.div `
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 12px;
  @media only screen and (max-width: 1168px) {
    margin-left: auto;
    display: flex;
    flex-direction: column;
  }
`;
const Bar = styled_components_1.default.div `
  width: ${(props) => (props.onText ? "80%" : "100%")};
  height: 20px;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  background-color: ${(props) => { var _a; return (_a = props.bgColor) !== null && _a !== void 0 ? _a : "#9e5cfa4e"; }};
  border-radius: 20px;
  padding: 0 5px 0 0;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.52) inset;

  @media only screen and (max-width: 564px) {
    width: 100%;
  }

  @media only screen and (max-width: 946px) {
    margin-bottom: 22px;
  }
`;
const Spot = styled_components_1.default.div `
  z-index: 1;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    transform: ${(props) => props.temp || "scale(1.2)"};
  }
`;
const SelectBar = styled_components_1.default.div `
  background-color: ${(props) => { var _a; return (_a = props.fillColor) !== null && _a !== void 0 ? _a : '#9f5cfa'; }};
  width: calc(${(props) => props.length}%);
  /* width: 50%; */
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 20px;
  transition-property: width;
  transition-duration: 0.3s;
`;
const SelectSpot = styled_components_1.default.div `
  z-index: 2;
  position: absolute;
  width: 24px;
  height: 24px;
  right: -7px;
  border-radius: 100%;
  background-color: white;
  box-shadow: 0px 0px 7px 2px #0000004b;
`;
const ItemText = styled_components_1.default.div `
  width: 20%;
  font-size: 20px;
  text-align: right;
  padding-right: 10px;
  color: ${(props) => { var _a; return (_a = props.textColor) !== null && _a !== void 0 ? _a : '#9f5cfa'; }};
  @media only screen and (min-width: 565px) and (max-width: 946px) {
    margin-bottom: 22px;
  }
  @media only screen and (max-width: 1168px) {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 9px;
  }
`;
function Slider({ textlist, fillColor, bgColor, textColor, stateValues, initValue, changeValue, onChange, selected, changeClosure, onText, }) {
    var _a, _b, _c;
    const [sliderIndex, _] = (0, react_1.useState)(stateValues === null || stateValues === void 0 ? void 0 : stateValues.indexOf(initValue));
    const [spotItem, setSpotItem] = (0, react_1.useState)({
        length: (sliderIndex !== null && sliderIndex !== void 0 ? sliderIndex : 0) === -1 ? 0 : sliderIndex,
        item: (_a = textlist === null || textlist === void 0 ? void 0 : textlist[(sliderIndex !== null && sliderIndex !== void 0 ? sliderIndex : 0) === -1 ? 0 : sliderIndex !== null && sliderIndex !== void 0 ? sliderIndex : 0]) !== null && _a !== void 0 ? _a : "",
    });
    (0, react_1.useEffect)(() => {
        var _a, _b, _c, _d, _e;
        if (!selected) {
            setSpotItem({
                length: ((_a = stateValues === null || stateValues === void 0 ? void 0 : stateValues.indexOf(initValue)) !== null && _a !== void 0 ? _a : 0) === -1
                    ? 0
                    : stateValues === null || stateValues === void 0 ? void 0 : stateValues.indexOf(initValue),
                item: (_c = textlist === null || textlist === void 0 ? void 0 : textlist[(stateValues === null || stateValues === void 0 ? void 0 : stateValues.indexOf(initValue !== null && initValue !== void 0 ? initValue : 0)) === -1
                    ? 0
                    : (_b = stateValues === null || stateValues === void 0 ? void 0 : stateValues.indexOf(initValue)) !== null && _b !== void 0 ? _b : 0]) !== null && _c !== void 0 ? _c : "",
            });
            changeClosure === null || changeClosure === void 0 ? void 0 : changeClosure(false);
        }
        else {
            setSpotItem({
                length: (stateValues === null || stateValues === void 0 ? void 0 : stateValues.indexOf(changeValue !== null && changeValue !== void 0 ? changeValue : 0)) === -1
                    ? 0
                    : stateValues === null || stateValues === void 0 ? void 0 : stateValues.indexOf(changeValue !== null && changeValue !== void 0 ? changeValue : 0),
                item: (_e = textlist === null || textlist === void 0 ? void 0 : textlist[(stateValues === null || stateValues === void 0 ? void 0 : stateValues.indexOf(changeValue !== null && changeValue !== void 0 ? changeValue : 0)) === -1
                    ? 0
                    : (_d = stateValues === null || stateValues === void 0 ? void 0 : stateValues.indexOf(changeValue !== null && changeValue !== void 0 ? changeValue : 0)) !== null && _d !== void 0 ? _d : 0]) !== null && _e !== void 0 ? _e : "",
            });
            changeClosure === null || changeClosure === void 0 ? void 0 : changeClosure(true);
        }
    }, [selected, changeValue]);
    return ((0, jsx_runtime_1.jsxs)(Root, { children: [onText ? ((0, jsx_runtime_1.jsx)(ItemText, Object.assign({ textColor: textColor }, { children: spotItem.item }), void 0)) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0)), (0, jsx_runtime_1.jsxs)(Bar, Object.assign({ bgColor: bgColor }, { children: [(0, jsx_runtime_1.jsx)(Spot, { style: { visibility: "hidden" } }, void 0), textlist === null || textlist === void 0 ? void 0 : textlist.map((item, i) => ((0, jsx_runtime_1.jsx)(Spot, { onClick: () => {
                            var _a;
                            setSpotItem({ length: i, item: item });
                            onChange === null || onChange === void 0 ? void 0 : onChange((_a = stateValues === null || stateValues === void 0 ? void 0 : stateValues[i]) !== null && _a !== void 0 ? _a : 0);
                        } }, i))), (0, jsx_runtime_1.jsx)(SelectBar, Object.assign({ fillColor: fillColor, length: (100 / ((_b = textlist === null || textlist === void 0 ? void 0 : textlist.length) !== null && _b !== void 0 ? _b : 1)) * (((_c = spotItem === null || spotItem === void 0 ? void 0 : spotItem.length) !== null && _c !== void 0 ? _c : 1) + 1) }, { children: (0, jsx_runtime_1.jsx)(SelectSpot, {}, void 0) }), void 0)] }), void 0)] }, void 0));
}
exports.Slider = Slider;
//# sourceMappingURL=index.js.map