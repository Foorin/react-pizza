import React from 'react';

import styles from './NotFound.module.sass';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено</h1>
      <p className={styles.description}>Нет такой страницы</p>
    </div>
  );
};
export default NotFoundBlock;
