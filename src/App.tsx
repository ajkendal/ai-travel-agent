import { useState } from 'react';

import Header from './components/Header';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [returnedData, setReturnedData] = useState(null);

  return (
    <>
      <Header loaded={loaded} />
    </>
  );
}

export default App;
