import { Divider } from 'neobank-ui-kit';

import styles from '@/widgets/rates-widget/ui/rates-widget.module.scss';

const dividerItems = [
  { title: 'Card currency', description: 'Rubles, dollars, euro' },
  { title: 'Interest free period', description: '0% up to 160 days' },
  { title: 'Payment system', description: 'Mastercard, Visa' },
  { title: 'Maximum credit limit on the card', description: '600 000 ₽' },
  {
    title: 'Replenishment and withdrawal',
    description: 'At any ATM. Top up your credit card for free with cash or transfer from other cards',
  },
  { title: 'Max cashback per month', description: '15 000 ₽' },
  {
    title: 'Transaction Alert',
    description:
      '60 ₽ — SMS or push notifications 0 ₽ — card statement, information about transactions in the online bank',
  },
];

export const RatesWidget = () => {
  return (
    <section className={styles.container}>
      <Divider style={{ width: '100%' }} items={dividerItems} />
    </section>
  );
};
