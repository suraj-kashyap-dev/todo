import mitt, { Emitter } from 'mitt';

interface ToastOptions {
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
}

type Events = {
  toast: { message: string; options?: ToastOptions };
  someEvent?: string;
};

const eventBus: Emitter<Events> = mitt<Events>();

declare global {
  interface Window {
    eventBus: Emitter<Events>;
  }
}

window.eventBus = eventBus;

export default eventBus;
