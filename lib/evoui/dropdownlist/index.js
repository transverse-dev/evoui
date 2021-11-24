"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDownList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styled_components_1 = require("styled-components");
const Root = styled_components_1.default.div `
  width: 100px;
  height: 28px;
  border-radius: 6px;
  user-select: none;
  position: relative;

  ${(props) => { var _a; return (_a = props === null || props === void 0 ? void 0 : props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const ListWrapper = styled_components_1.default.div `
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: ${(props) => props.listVisible ? `1px 1px 4px rgb(0 0 0 / 25%)` : "none"};
  height: ${(props) => (props.listVisible ? "fit-content" : "28px")};
  background-color: #ffffff;
  max-height: 90vh;
  z-index: ${(props) => (props.listVisible ? "9" : "0")};
  position: absolute;
  left: 0;
  right: 0;
  top: ${(props) => (props.listVisible ? `${-props.absolute}px` : "0")};
  transition-duration: 0.1s;

  &:hover {
    box-shadow: 1px 1px 4px rgb(0 0 0 / 25%);
  }

  ${(props) => { var _a; return (_a = props === null || props === void 0 ? void 0 : props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const List = styled_components_1.default.div `
  width: 100%;
  overflow: ${(props) => (props.listVisible ? "hidden auto" : "hidden")};
  height: ${(props) => (props.listVisible ? "fit-content" : "28px")};
  max-height: 90vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  ${(props) => { var _a; return (_a = props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
const ListItem = styled_components_1.default.div `
  height: 28px;
  padding: 2px 8px;
  color: ${(props) => !!props.selected && props.listVisible ? "#9f5cfa" : "#555555"};
  line-height: 24px;
  text-align: center;
  cursor: ${(props) => (!!props.disabled ? "default" : "pointer")};
  white-space: nowrap;
  margin: 0;
  opacity: ${(props) => (!!props.disabled ? "0.5" : "1")};
  font-size: 14.4px;

  &:hover {
    background-color: ${(props) => props.listVisible && !props.disabled
    ? "rgba(233,233,233,0.72)"
    : "transparent"};
  }

  ${(props) => { var _a; return (_a = props === null || props === void 0 ? void 0 : props.cssStyle) !== null && _a !== void 0 ? _a : ""; }};
`;
function DropDownList({ options = [{ label: "DropDownList", id: 0 }], placeholder = "Select", value, onChange, overrides, closeOnChange = true, }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const [listVisible, setListVisible] = (0, react_1.useState)(false);
    const [isListAbsolute, setIsListAbsolute] = (0, react_1.useState)(0);
    const dropDownListRef = (0, react_1.useRef)([]);
    const closeList = () => setListVisible(false);
    const handleClickOutside = (event) => {
        if (dropDownListRef.current[0] &&
            !dropDownListRef.current[0].contains(event.target))
            closeList();
    };
    (0, react_1.useEffect)(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropDownListRef.current[0]]);
    const scrollEvent = () => {
        if (listVisible) {
            if (!!(dropDownListRef === null || dropDownListRef === void 0 ? void 0 : dropDownListRef.current[0]) && !!(dropDownListRef === null || dropDownListRef === void 0 ? void 0 : dropDownListRef.current[1])) {
                let offset = dropDownListRef.current[0].getBoundingClientRect().top +
                    dropDownListRef.current[1].getBoundingClientRect().height -
                    window.innerHeight;
                if (offset > 0) {
                    setIsListAbsolute(offset);
                }
                else if (dropDownListRef.current[0].getBoundingClientRect().top < 0) {
                    setIsListAbsolute(dropDownListRef.current[0].getBoundingClientRect().top);
                }
                else {
                    setIsListAbsolute(0);
                }
            }
        }
    };
    (0, react_1.useEffect)(() => {
        if (listVisible) {
            window.addEventListener("scroll", scrollEvent);
        }
        else {
            window.removeEventListener("scroll", scrollEvent);
        }
        return () => {
            window.removeEventListener("scroll", scrollEvent);
        };
    }, [listVisible]);
    (0, react_1.useEffect)(() => {
        scrollEvent();
    }, [listVisible, options, placeholder, value, overrides]);
    return ((0, jsx_runtime_1.jsx)(Root, Object.assign({ ref: (el) => (dropDownListRef.current[0] = el) }, (typeof ((_a = overrides === null || overrides === void 0 ? void 0 : overrides.Root) === null || _a === void 0 ? void 0 : _a.css) === "string"
        ? Object.assign({ cssStyle: overrides.Root.css }, ((_b = overrides.Root) !== null && _b !== void 0 ? _b : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.Root) == undefined
        ? {}
        : Object.assign({ style: overrides.Root.css }, overrides.Root)), { children: (0, jsx_runtime_1.jsx)(ListWrapper, Object.assign({ listVisible: listVisible, absolute: isListAbsolute }, (typeof ((_c = overrides === null || overrides === void 0 ? void 0 : overrides.ListWrapper) === null || _c === void 0 ? void 0 : _c.css) === "string"
            ? Object.assign({ cssStyle: overrides.ListWrapper.css }, ((_d = overrides.ListWrapper) !== null && _d !== void 0 ? _d : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.ListWrapper) == undefined
            ? {}
            : Object.assign({ style: overrides.ListWrapper.css }, overrides.ListWrapper)), { children: (0, jsx_runtime_1.jsxs)(List, Object.assign({ ref: (el) => (dropDownListRef.current[1] = el), listVisible: listVisible }, (typeof ((_e = overrides === null || overrides === void 0 ? void 0 : overrides.List) === null || _e === void 0 ? void 0 : _e.css) === "string"
                ? Object.assign({ cssStyle: overrides.List.css }, ((_f = overrides.List) !== null && _f !== void 0 ? _f : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.List) == undefined
                ? {}
                : Object.assign({ style: overrides.List.css }, overrides.List)), { children: [(0, jsx_runtime_1.jsx)(ListItem, Object.assign({ listVisible: listVisible, selected: true, onClick: () => setListVisible((listVisible) => !listVisible) }, (typeof ((_g = overrides === null || overrides === void 0 ? void 0 : overrides.ListItem) === null || _g === void 0 ? void 0 : _g.css) === "string"
                        ? Object.assign({ cssStyle: overrides.ListItem.css }, ((_h = overrides.ListItem) !== null && _h !== void 0 ? _h : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.ListItem) == undefined
                        ? {}
                        : Object.assign({ style: overrides.ListItem.css }, overrides.ListItem)), { children: value ? value.label : placeholder }), void 0), (_j = options === null || options === void 0 ? void 0 : options.filter((option) => (value ? value.id !== option.id : true)).map((option) => {
                        var _a, _b;
                        return ((0, jsx_runtime_1.jsx)(ListItem, Object.assign({ listVisible: listVisible, onClick: () => {
                                if (!option.disabled) {
                                    !!onChange && onChange(option);
                                    !!closeOnChange && closeList();
                                }
                            }, disabled: option.disabled }, (typeof ((_a = overrides === null || overrides === void 0 ? void 0 : overrides.ListItem) === null || _a === void 0 ? void 0 : _a.css) === "string"
                            ? Object.assign({ cssStyle: overrides.ListItem.css }, ((_b = overrides.ListItem) !== null && _b !== void 0 ? _b : {})) : (overrides === null || overrides === void 0 ? void 0 : overrides.ListItem) == undefined
                            ? {}
                            : Object.assign({ style: overrides.ListItem.css }, overrides.ListItem)), { children: option.label }), option.id));
                    })) !== null && _j !== void 0 ? _j : null] }), void 0) }), void 0) }), void 0));
}
exports.DropDownList = DropDownList;
//# sourceMappingURL=index.js.map