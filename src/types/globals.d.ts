import alphaTab from './alphaTab';

declare global {
  interface Window {
    alphaTab: typeof alphaTab;
  }
}
