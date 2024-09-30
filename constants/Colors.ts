/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a0a0a';
const tintColorDark = '#fafafa';

export const NeutralColors = {
  50: '#fafafa',
  100: '#f5f5f5f',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0a0a0a',
};
export const ParallaxBgClass:string = 'bg-red-300 dark:bg-blue-300';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    backgroundColor: '#fff',
    tint: tintColorLight,
    faded: '#262626',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    backgroundColor: '#0d0d0d',
    tint: tintColorDark,
    faded: '#e5e5e5',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
