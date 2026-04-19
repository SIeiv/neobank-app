import { CardShowcase } from '@/widgets/card-showcase';
import { Currency } from '@/widgets/currency';
import { Features } from '@/widgets/features';
import { Map } from '@/widgets/map';
import { News } from '@/widgets/news';
import { Newsletter } from '@/widgets/newsletter';

export const MainPage = () => {
  return (
    <>
      <CardShowcase marginTop={[132, 96, 96]} />
      <Features marginTop={[112, 112, 96]} />
      <Currency marginTop={[48, 48, 48]} />
      <Map marginTop={[48, 48, 48]} />
      <News marginTop={[48, 48, 48]} />
      <Newsletter marginTop={[64, 64, 64]} />
    </>
  );
};
