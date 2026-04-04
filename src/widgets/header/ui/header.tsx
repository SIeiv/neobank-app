import { useEffect, useState, type JSX } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Link, MenuIcon } from 'neobank-ui-kit';

import neobankLogo from '@/shared/assets/images/NeoBank.png';
import { UIConfig } from '@/shared/config/ui.config';
import { useWindowSize } from '@/shared/lib/hooks';

import styles from '@/widgets/header/ui/header.module.css';

type ScreenMode = 'desktop' | 'tablet';

export const Header = () => {
  const { width } = useWindowSize();
  const [mode, setMode] = useState<ScreenMode>(width > UIConfig.breakpoints.tablet ? 'desktop' : 'tablet');

  useEffect(() => {
    setMode(width > UIConfig.breakpoints.tablet ? 'desktop' : 'tablet');
  }, [width]);

  const headerButtonSelector = (): JSX.Element => {
    switch (mode) {
      case 'desktop':
        return <Button>Online Bank</Button>;
      case 'tablet':
        return (
          <Button
            style={{
              height: 50,
              width: 50,
              display: 'flex',
              padding: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            border="rounded"
          >
            <MenuIcon />
          </Button>
        );
      default: {
        const _exhaustiveCheck: never = mode;
        return _exhaustiveCheck;
      }
    }
  };

  return (
    <header className={styles.header}>
      <NavLink to={'/'}>
        <img src={neobankLogo} alt="neobank logo" />
      </NavLink>
      {mode === 'desktop' && (
        <nav className={styles.navbar}>
          <Link to="/">Credit card</Link>
          <Link to="/">Product</Link>
          <Link to="/">Account</Link>
          <Link to="/">Resources</Link>
        </nav>
      )}
      {headerButtonSelector()}
    </header>
  );
};
