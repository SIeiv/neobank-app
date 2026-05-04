import type { FC, PointerEvent } from 'react';
import { Paragraph } from 'neobank-ui-kit';

interface IFeatureItem {
  mainText: string;
  secondaryText: string;

  onPointerEnter?: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerLeave?: (e: PointerEvent<HTMLDivElement>) => void;
}

export const FeatureItem: FC<IFeatureItem> = ({ mainText, secondaryText, onPointerEnter, onPointerLeave }) => {
  return (
    <div onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <Paragraph style={{ margin: 0, marginBottom: 10 }} size="large" weight="bold">
        {mainText}
      </Paragraph>
      <Paragraph style={{ margin: 0 }} weight="semibold">
        {secondaryText}
      </Paragraph>
    </div>
  );
};
