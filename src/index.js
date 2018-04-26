import './index.css';
import registerServiceWorker from './registerServiceWorker';
import './Game';

const root = document.getElementById('root');
const testGame = document.createElement('test-game');
root.appendChild(testGame);
registerServiceWorker();
