import styles from '../styles/Header.module.scss';
import { HeaderLogo } from '../assets/logos';

const Header = (props: { loaded: boolean; isLoading: boolean }) => {
  return (
    <header className={styles['header']}>
      <div className={styles['title-container']}>
        <h1 className={styles['title']}>
          AI Travel Agent
          <hr />
        </h1>
        {(props.loaded || props.isLoading) && <HeaderLogo />}
      </div>
    </header>
  );
};

export default Header;
