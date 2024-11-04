import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Board } from '../pages/boardPage';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Theme preset={presetGpnDefault}>
        <Board />
      </Theme>
    </Provider>
  );
}

export default App;
