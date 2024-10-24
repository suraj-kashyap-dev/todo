import eventBus from './eventBus';

interface ToastOptions {
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
  type?: string;
}

export const showToast = (message: string, options: ToastOptions = {}) => {
  eventBus.emit('toast', { message, options });
};
