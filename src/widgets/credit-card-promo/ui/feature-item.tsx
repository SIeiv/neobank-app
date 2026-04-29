import type { FC } from 'react';
import { Paragraph } from 'neobank-ui-kit';

interface IFeatureItem {
  mainText: string;
  secondaryText: string;
}

export const FeatureItem: FC<IFeatureItem> = ({ mainText, secondaryText }) => {
  return (
    <div>
      <Paragraph style={{ margin: 0, marginBottom: 10 }} size="large" weight="bold">
        {mainText}
      </Paragraph>
      <Paragraph style={{ margin: 0 }} weight="semibold">
        {secondaryText}
      </Paragraph>
    </div>
  );
};
