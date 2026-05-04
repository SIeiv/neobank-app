import type { LinkType } from '@/shared/types';

export const headerConfig = {
  links: [
    { text: 'Credit card', to: '/neobank-app/loan/' },
    { text: 'Product', to: '#' },
    { text: 'Account', to: '#' },
    { text: 'Resources', to: '#' },
  ] satisfies LinkType[],
  buttonText: 'Online Bank',
};
