import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    outline: none;
    text-decoration: none;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
      'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
      sans-serif !important;
  }

  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote,
  pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article,
  aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav,
  output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  html {
    font-size: 16px;

    @media (min-device-width: 720px) {
      font-size: 18px;
    }
  }

  body {
    background-color: ${(props) => props.theme.colors.universal.bgColor};
    color: ${(props) => props.theme.colors.universal.fgColor};
  }

  button {
    border: none;
    padding: 0;
    background: none;
    cursor: pointer;
  }

  /* nProgress */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background-color: ${(props) => props.theme.colors.universal.mainColor};
    position: fixed;
    z-index: 100001;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${(props) =>
      props.theme.colors.universal.mainColor}, 0 0 5px ${(props) =>
  props.theme.colors.universal.mainColor};
    opacity: 1.0;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
            transform: rotate(3deg) translate(0px, -4px);
  }
`;
