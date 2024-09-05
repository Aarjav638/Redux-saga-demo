import React, {useState} from 'react';
import Navigator from './components/navigator';
import Splash from './screens/Splash';

const App = () => {
  const [isSplashShown, setIsSplashShown] = useState(true);

  setTimeout(() => {
    setIsSplashShown(false);
  }, 2000);

  if (isSplashShown) {
    return <Splash />;
  }

  return <Navigator />;
};

export default App;
