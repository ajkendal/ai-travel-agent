import { useState } from 'react';

import Header from './components/Header';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Header loaded={loaded} />
    </>
  );
}

export default App;
