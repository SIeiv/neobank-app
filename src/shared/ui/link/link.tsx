import type { CSSProperties, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import styles from '@/shared/ui/link/link.module.scss';

export interface ILink {
  to: string;
  tag?: 'a' | 'navlink';
  active?: boolean;
  children?: ReactElement | ReactElement[] | string;
  style?: CSSProperties;
  className?: string;
}

export const Link = ({ to, children, active = false, style, tag = 'a', className }: ILink) => {
  switch (tag) {
    case 'a': {
      return (
        <a
          style={style}
          rel="noopener noreferrer"
          className={`${styles.link} ${active && styles.active} ${className}`}
          href={to}
        >
          {children}
        </a>
      );
    }
    case 'navlink': {
      return (
        <NavLink style={style} className={`${styles.link} ${active && styles.active}`} to={to}>
          {children}
        </NavLink>
      );
    }
    default: {
      const _exhaustiveCheck: never = tag;
      return _exhaustiveCheck;
    }
  }
};
