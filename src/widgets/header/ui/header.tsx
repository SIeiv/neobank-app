import { useState, type JSX } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Drawer, MenuIcon } from 'neobank-ui-kit';

import exitIcon from '@/shared/assets/icons/exit.svg';
import neobankLogo from '@/shared/assets/images/NeoBank.png';
import { useScreenMode } from '@/shared/lib/hooks';
import { headerConfig } from '@/widgets/header/config';

import { HeaderButton } from '@/widgets/header/ui/header-button';
import { HeaderNavbar } from '@/widgets/header/ui/header-navbar';
import styles from '@/widgets/header/ui/header.module.css';

export const Header = () => {
  const mode = useScreenMode();

  const [mobileDrawerState, setMobileDrawerState] = useState(false);

  const headerButtonSelector = (): JSX.Element => {
    switch (mode) {
      case 'desktop':
        return <Button>{headerConfig.buttonText}</Button>;
      case 'tablet':
      case 'mobile':
        return (
          <HeaderButton
            onClick={() => {
              setMobileDrawerState(true);
            }}
            icon={<MenuIcon />}
          />
        );
      default: {
        const _exhaustiveCheck: never = mode;
        return _exhaustiveCheck;
      }
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <NavLink to={'/'}>
            <img src={neobankLogo} alt="neobank logo" />
          </NavLink>
          {mode === 'desktop' && <HeaderNavbar mode="desktop" />}
          {headerButtonSelector()}
        </div>
      </header>
      <Drawer activeState={mobileDrawerState} setter={setMobileDrawerState}>
        <div className={styles.drawerHeader}>
          <HeaderButton
            onClick={() => {
              setMobileDrawerState(false);
            }}
            icon={<img style={{ width: 24 }} src={exitIcon} alt="exit icon" />}
          />
        </div>
        <HeaderNavbar mode="mobile" />
      </Drawer>
    </>
  );
};
