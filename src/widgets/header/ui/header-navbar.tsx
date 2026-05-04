import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'neobank-ui-kit';

import type { ScreenMode } from '@/shared/types';
import { Link } from '@/shared/ui/link';
import { headerConfig } from '@/widgets/header/config';

import styles from '@/widgets/header/ui/header.module.scss';

interface IHeaderNavbar {
  mode: ScreenMode;
}

export const HeaderNavbar: FC<IHeaderNavbar> = ({ mode }) => {
  const location = useLocation();

  return (
    <nav className={`${styles.navbar} ${mode !== 'desktop' && styles.navbarMobile}`}>
      {headerConfig.links.map((link) => (
        <Link key={`${link.to}_${link.text}`} to={link.to} tag="navlink" active={location.pathname.includes(link.to)}>
          {link.text}
        </Link>
      ))}
      {mode !== 'desktop' && <Button>{headerConfig.buttonText}</Button>}
    </nav>
  );
};
