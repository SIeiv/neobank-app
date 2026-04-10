import { Link, Paragraph } from 'neobank-ui-kit';

import { footerConfig } from '@/widgets/footer/config';

import styles from '@/widgets/footer/ui/footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contacts}>
          <a href={footerConfig.contacts.company.link} rel="noopener noreferrer">
            <img src={footerConfig.contacts.company.logo} alt="company logo" />
          </a>
          <div className={styles.contactsRight}>
            <Link style={{ fontSize: 30, fontWeight: 700 }} to={`tel:${footerConfig.contacts.telephone}`} tag="a">
              {footerConfig.contacts.telephone}
            </Link>
            <Link style={{ fontWeight: 500 }} to={`mailto:${footerConfig.contacts.email}`} tag="a">
              {footerConfig.contacts.email}
            </Link>
          </div>
        </div>
        <div className={styles.links}>
          {footerConfig.links.map((item) => (
            <Link key={`${item.text}_${item.to}`} style={{ fontWeight: 500 }} to={item.to}>
              {item.text}
            </Link>
          ))}
        </div>
        <hr className={styles.separator} />
        <Paragraph style={{ fontWeight: 500 }}>{footerConfig.footerText}</Paragraph>
      </div>
    </footer>
  );
};
