import { useScreenMode } from '@/shared/lib/hooks';

export const useMarginTopSelect = (marginTop: [number, number, number]): number => {
  const mode = useScreenMode();

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
