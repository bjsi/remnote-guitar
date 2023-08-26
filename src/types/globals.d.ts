import alphaTab from '@coderline/alphatab';

declare global {
  interface Window {
    alphaTab: typeof alphaTab;
  }
}
