import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './redux-implements/custom-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);
