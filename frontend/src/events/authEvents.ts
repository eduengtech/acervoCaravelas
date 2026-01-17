type Listener = () => void;

let listeners: Listener[] = [];

export function subscribeAuthError(listener: Listener) {
    listeners.push(listener);
};

export function notifyAuthError() {
    listeners.forEach(listener => listener());
};