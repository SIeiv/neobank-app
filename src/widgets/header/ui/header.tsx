import { type JSX } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Link, MenuIcon } from 'neobank-ui-kit';

import neobankLogo from '@/shared/assets/images/NeoBank.png';
import { useScreenMode } from '@/shared/lib/hooks';

import styles from '@/widgets/header/ui/header.module.css';

export const Header = () => {
  const mode = useScreenMode();

  const headerButtonSelector = (): JSX.Element => {
    switch (mode) {
      case 'desktop':
        return <Button>Online Bank</Button>;
      case 'tablet':
      case 'mobile':
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
