import { useState } from 'react';

import Header from './components/Header';
import styles from './styles/App.module.scss';
import { MainLogo } from './assets/logos';
import { LoadingIcon, CloseIcon, MenuIcon } from './assets/icons';
import FormPage from './components/Form';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [returnedData, setReturnedData] = useState({});
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Header loaded={loaded} />

      <div className={styles['app-container']}>
        <div className={styles['form-container-desktop']}>
          <FormPage
            setReturnedData={setReturnedData}
            setIsLoading={setIsLoading}
            setLoaded={setLoaded}
          />
        </div>
        <div className={styles['form-container-mobile']}>
          <div style={{ display: isOpen ? 'block' : 'none' }}>
            <FormPage
              setReturnedData={setReturnedData}
              setIsLoading={setIsLoading}
              setLoaded={setLoaded}
            />
          </div>

          {isOpen ? (
            <span onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </span>
          ) : (
            <span onClick={() => setIsOpen(true)}>
              <MenuIcon />
            </span>
          )}
        </div>
        {isLoading ? (
          <div className={styles['no-content']}>
            <LoadingIcon />
          </div>
        ) : loaded ? (
          <div> Loaded Content</div>
        ) : (
          <div className={styles['no-content']}>
            <MainLogo />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
