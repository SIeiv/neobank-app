import type { FC } from 'react';
import { Paragraph, Select, type ISelect } from 'neobank-ui-kit';

import styles from '@/shared/ui/select-with-title/select-with-title.module.scss';

interface ISelectWithTitle extends ISelect {
  title: string;
}

export const SelectWithTitle: FC<ISelectWithTitle> = ({ title, ...props }) => {
  return (
    <div>
      <div className={styles.titleContainer}>
        <Paragraph style={{ marginBlock: 8 }} weight="semibold">
          {title}
        </Paragraph>
        {props.required && (
          <Paragraph style={{ color: '#FF5631', marginBlock: 8 }} weight="semibold">
            *
          </Paragraph>
        )}
      </div>
      <Select {...props} />
    </div>
  );
};
