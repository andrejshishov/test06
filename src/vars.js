import styles from './components/Tabs/Tabs.module.scss';

export const transferFilterItems = {
  titles: ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'],
  flags: [true, true, true, true, true],
};

export const tabItems = {
  titles: ['Самый дешевый', 'Самый быстрый', 'Оптимальный'],
  styles: [[styles.tab], [styles.tab, styles['tab-border']], [styles.tab]],
};