import { CashbackCard } from '@/widgets/cashback-widget/ui/cashback-card';
import styles from '@/widgets/cashback-widget/ui/cashback-widget.module.scss';

export const CashbackWidget = () => {
  return (
    <section className={styles.container}>
      <CashbackCard text="For food delivery, cafes and restaurants" title="5%" />
      <CashbackCard style={{ backgroundColor: '#88B3B899' }} text="In supermarkets with our subscription" title="5%" />
      <CashbackCard text="In clothing stores and children's goods" title="2%" />
      <CashbackCard
        style={{ backgroundColor: '#88B3B899' }}
        text="Other purchases and payment of services and fines"
        title="1%"
      />
      <CashbackCard text="Shopping in online stores" title="up to 3%" />
      <CashbackCard style={{ backgroundColor: '#88B3B899' }} text="Purchases from our partners" title="30%" />
    </section>
  );
};
