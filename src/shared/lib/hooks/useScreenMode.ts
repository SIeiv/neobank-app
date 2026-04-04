import { useEffect, useState } from 'react';

import { UIConfig } from '@/shared/config/ui.config';
import type { ScreenMode } from '@/shared/types';

import { useWindowSize } from '@/shared/lib/hooks';

const calcMode = (width: number): ScreenMode => {
  if (width > UIConfig.breakpoints.tablet) {
    return 'desktop';
  } else if (width <= UIConfig.breakpoints.tablet && width > UIConfig.breakpoints.mobile) {
    return 'tablet';
  }
  return 'mobile';
};

export const useScreenMode = (): ScreenMode => {
  const { width } = useWindowSize();
  const [mode, setMode] = useState<ScreenMode>(calcMode(width));

  useEffect(() => {
    setMode(calcMode(width));
  }, [width]);

  return mode;
};
