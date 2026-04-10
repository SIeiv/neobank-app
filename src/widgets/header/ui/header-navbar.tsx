import type { FC } from 'react';
import { Button, Link } from 'neobank-ui-kit';

import type { ScreenMode } from '@/shared/types';
import { headerConfig } from '@/widgets/header/config';

import styles from '@/widgets/header/ui/header.module.scss';

interface IHeaderNavbar {
  mode: ScreenMode;
}

export const HeaderNavbar: FC<IHeaderNavbar> = ({ mode }) => {
  return (
    <nav className={`${styles.navbar} ${mode !== 'desktop' && styles.navbarMobile}`}>
      {headerConfig.links.map((link) => (
        <Link key={`${link.to}_${link.text}`} to={link.to}>
          {link.text}
        </Link>
      ))}
      {mode !== 'desktop' && <Button>{headerConfig.buttonText}</Button>}
    </nav>
  );
};
