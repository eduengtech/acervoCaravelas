type Listener = () => void;

const listeners: Listener[] = [];

export function subscribeAuthError(listener: Listener) {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
  };
}

export function notifyAuthError() {
  listeners.forEach((listener) => listener());
}
