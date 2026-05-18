import { Button, Heading, Paragraph } from 'neobank-ui-kit';

import image from '@/shared/assets/images/Oops 404 Error with a broken robot-rafiki 1.png';

import styles from '@/pages/not-found-page/ui/styles.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div>
        <Heading level={3} style={{ fontWeight: 700, margin: 0, marginBottom: 32 }}>
          Oops....
        </Heading>
        <Heading level={3} style={{ marginBottom: 32 }}>
          Page not found
        </Heading>
        <Paragraph style={{ marginBottom: 32 }}>
          This Page doesn`t exist or was removed! We suggest you go back.
        </Paragraph>
        <Button border="flat" style={{ paddingInline: 64 }}>
          Go back
        </Button>
      </div>
      <img src={image} alt="page not fount 404 image" />
    </div>
  );
};
