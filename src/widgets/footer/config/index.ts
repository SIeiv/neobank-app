import neoflexLogo from '@/shared/assets/images/logo 1.png';
import type { LinkType } from '@/shared/types';

export const footerConfig = {
  contacts: {
    company: {
      logo: neoflexLogo,
      link: 'https://www.neoflex.ru/',
    },
    telephone: '+7 (495) 984 25 13',
    email: 'info@neoflex.ru',
  },
  links: [
    { text: 'About bank', to: '' },
    { text: 'Ask a Question', to: '' },
    { text: 'Quality of service', to: '' },
    { text: 'Requisites', to: '' },
    { text: 'Press center', to: '' },
    { text: 'Bank career', to: '' },
    { text: 'Investors', to: '' },
    { text: 'Analytics', to: '' },
    { text: 'Business and processes', to: '' },
    { text: 'Compliance and business ethics', to: '' },
  ] satisfies LinkType[],
  footerText:
    'We use cookies to personalize our services and improve the user experience of our website. Cookies are small files containing information about previous visits to a website. If you do not want to use cookies, please change your browser settings',
};
