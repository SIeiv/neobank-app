import type { FC } from 'react';
import { Heading, Paragraph } from 'neobank-ui-kit';

import mapImage from '@/shared/assets/images/Huge Global.svg';
import { useScreenMode } from '@/shared/lib/hooks';
import { marginTopSelect } from '@/shared/lib/utilities';
import type { ISection } from '@/shared/types';

import styles from '@/widgets/map/ui/map.module.css';

export const Map: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const mode = useScreenMode();
  return (
    <section className={styles.container} style={{ marginTop: marginTopSelect(mode, marginTop) }}>
      <Heading level={3}>You can use our services anywhere in the world</Heading>
      <Paragraph weight="semibold">Withdraw and transfer money online through our application</Paragraph>
      <img className={styles.image} src={mapImage} alt="world map" />
    </section>
  );
};
