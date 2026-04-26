import { useEffect, useState, type FC } from 'react';
import { Card, Heading, LoadingIcon, Paragraph } from 'neobank-ui-kit';

import { CurrenciesList, getCurrencyConversion } from '@/entities/currency';
import { selectCurrencyConversionsByCode } from '@/entities/currency/model/currency.selectors';
import bankImage from '@/shared/assets/images/Group.svg';
import { useAppDispatch, useAppSelector, useMarginTopSelect } from '@/shared/lib/hooks';
import type { ISection } from '@/shared/types';
import { currencyWidgetConfig } from '@/widgets/currency/config';

import { CurrencyOverlay } from '@/widgets/currency/ui/currency-overlay';
import styles from '@/widgets/currency/ui/currency.module.scss';

export const Currency: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const selectedmt = useMarginTopSelect(marginTop);
  const dispatch = useAppDispatch();

  const [isDeployed, setIsDeployed] = useState(false);

  const lastUpdatedTime = useAppSelector((state) => state.currency.lastUpdatedTime);
  const loadingStatus = useAppSelector((state) => state.currency.status);

  const primaryCurrenciesRUB = useAppSelector((state) =>
    selectCurrencyConversionsByCode(state, 'RUB', currencyWidgetConfig.primaryCurrencies)
  );
  const secondaryCurrenciesRUB = useAppSelector((state) =>
    selectCurrencyConversionsByCode(state, 'RUB', currencyWidgetConfig.secondaryCurrencies)
  );

  const timeLabel = loadingStatus === 'ok' ? lastUpdatedTime : 'loading...';

  useEffect(() => {
    let currencyUpdateInterval: number;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      await dispatch(getCurrencyConversion({ currencyCode: 'RUB' }));

      currencyUpdateInterval = setInterval(async () => {
        await dispatch(getCurrencyConversion({ currencyCode: 'RUB' }));
      }, currencyWidgetConfig.currencyUpdateInterval);
    })();

    return () => {
      clearInterval(currencyUpdateInterval);
    };
  }, [dispatch]);

  return (
    <section className={styles.container} style={{ marginTop: selectedmt }}>
      <Card style={{ width: '100%', paddingBottom: 72, backgroundColor: '#F4F4F4E5' }}>
        <div className={styles.header}>
          <Heading style={{ margin: 0 }} level={3}>
            Exchange rate in internet bank
          </Heading>
          <Paragraph weight="semibold">Update every 15 minutes, {timeLabel}</Paragraph>
        </div>
        <Paragraph size="large" weight="semibold">
          Currency
        </Paragraph>
        <div className={styles.main}>
          {loadingStatus === 'ok' ? (
            <div>
              <CurrenciesList currencies={primaryCurrenciesRUB} />
              {isDeployed && <CurrenciesList currencies={secondaryCurrenciesRUB} />}
            </div>
          ) : (
            <LoadingIcon />
          )}
          <img className={styles.image} src={bankImage} alt="bank image" />
        </div>
        <CurrencyOverlay state={isDeployed} handler={setIsDeployed} />
      </Card>
    </section>
  );
};
