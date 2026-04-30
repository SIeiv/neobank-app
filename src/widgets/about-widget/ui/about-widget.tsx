import bagIcon from '@/shared/assets/icons/Bag_duotone.svg';
import calendarIcon from '@/shared/assets/icons/Calendar_duotone.svg';
import clockIcon from '@/shared/assets/icons/Clock_duotone.svg';
import cardIcon from '@/shared/assets/icons/Credit card_duotone.svg';
import moneyIcon from '@/shared/assets/icons/Money_duotone.svg';

import { AboutCard } from '@/widgets/about-widget/ui/about-card';
import styles from '@/widgets/about-widget/ui/about-widget.module.scss';

export const AboutWidget = () => {
  return (
    <section className={styles.container}>
      <AboutCard
        style={{ width: 406 }}
        icon={moneyIcon}
        title="Up to 50 000 ₽"
        text="Cash and transfers without commission and percent"
      />
      <AboutCard
        variation="dark"
        style={{ minWidth: 406 }}
        icon={calendarIcon}
        title="Up to 160 days"
        text="Without percent on the loan"
      />
      <AboutCard
        style={{ width: 406 }}
        icon={clockIcon}
        title="Free delivery"
        text="We will deliver your card by courier at a convenient place and time for you"
      />
      <AboutCard
        variation="dark"
        icon={bagIcon}
        title="Up to 12 months"
        text="No percent. For equipment, clothes and other purchases in installments"
      />
      <AboutCard
        icon={cardIcon}
        title="Convenient deposit and withdrawal"
        text="At any ATM. Top up your credit card for free with cash or transfer from other cards"
      />
    </section>
  );
};
