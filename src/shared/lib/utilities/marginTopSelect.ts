import type { ScreenMode } from '@/shared/types';

export const marginTopSelect = (mode: ScreenMode, marginTop: [number, number, number]): number => {
  switch (mode) {
    case 'desktop':
      return marginTop[0];
    case 'tablet':
      return marginTop[1];
    case 'mobile':
      return marginTop[2];
    default: {
      const _exhaustiveCheck: never = mode;
      return _exhaustiveCheck;
    }
  }
};
