import { createRoot } from 'react-dom/client';
import './i18n/config';
import App from './App.tsx';
import './index.css';
import Toast from './components/alert/Toast.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Toast />
  </>,
);
