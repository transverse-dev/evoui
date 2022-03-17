import { Palette } from './palette';

export const dark = {
  colors: {
    universal: {
      bgColor: Palette.darkgray,
      fgColor: Palette.white,
      mainColor: Palette.evo,
    },
    header: {
      bgColor: Palette.darkgray,
      shadow: `0 0 0 1px ${Palette.white}20`,
    },
    footer: {
      bgColor: Palette.darkevo,
    },
    pageWrapper: {
      bgColor: Palette.aether,
    },
    sidemenu: {
      selectedItemBgColor: Palette.aether,
    },
  },
};

export const light = {
  colors: {
    universal: {
      bgColor: Palette.white,
      fgColor: Palette.black,
      mainColor: Palette.evo,
    },
    header: {
      bgColor: Palette.white,
      shadow: `0 0 0 1px ${Palette.black}20`,
    },
    footer: {
      bgColor: Palette.lightevo,
    },
    pageWrapper: {
      bgColor: Palette.gray,
    },
    sidemenu: {
      selectedItemBgColor: Palette.gray,
    },
  },
};
