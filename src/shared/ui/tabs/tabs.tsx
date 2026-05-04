import { useEffect, useRef, useState, type CSSProperties, type FC, type MouseEventHandler } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import type { Link } from '@/shared/types';

import styles from '@/shared/ui/tabs/tabs.module.scss';

export interface ITabs {
  links: Link[];
  style?: CSSProperties;
}

export const Tabs: FC<ITabs> = ({ links }) => {
  const location = useLocation();
  const linksRef = useRef<HTMLDivElement>(null);

  const [indicatorProperties, setIndicatorProperties] = useState({ x: 0, y: 0, width: 100 });

  const updateIndicator = (element: HTMLAnchorElement) => {
    if (linksRef.current) {
      const containerRect = linksRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      setIndicatorProperties({
        x: elementRect.left - containerRect.left,
        y: elementRect.bottom - containerRect.top,
        width: elementRect.width,
      });
    }
  };

  const handleOnClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    updateIndicator(e.currentTarget);
  };

  useEffect(() => {
    if (linksRef.current) {
      const initialIndex = links.findIndex((link) => link.to === location.pathname);

      if (initialIndex !== -1) {
        const activeLink = linksRef.current.childNodes[initialIndex] as HTMLAnchorElement;
        if (activeLink) {
          updateIndicator(activeLink);
        }
      }
    }
  }, [links, location.pathname]);

  return (
    <nav className={styles.nav}>
      <div className={styles.links} ref={linksRef}>
        {links.map((link) => (
          <NavLink onClick={handleOnClick} className={styles.link} key={`${link.text}_${link.to}`} to={link.to}>
            {link.text}
          </NavLink>
        ))}

        <div
          style={{
            left: indicatorProperties.x,
            top: indicatorProperties.y,
            width: indicatorProperties.width,
          }}
          className={styles.indicator}
        ></div>
      </div>
      <div className={styles.path}></div>
    </nav>
  );
};
