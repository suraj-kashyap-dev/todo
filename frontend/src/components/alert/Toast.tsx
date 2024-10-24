import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eventBus from '../../utils/eventBus';

const Toast = () => {
  useEffect(() => {
    const showToast = ({ message, options }) => {
      toast(message, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: 'success',
        theme: document.documentElement.classList.contains('dark')
          ? 'dark'
          : 'light',
        ...options,
      });
    };

    eventBus.on('toast', showToast);

    return () => {
      eventBus.off('toast', showToast);
    };
  }, []);

  return <ToastContainer />;
};

export default Toast;
