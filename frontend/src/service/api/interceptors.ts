import { notifyAuthError } from "../../events/authEvents";
import { acervoHttp } from "./axios";

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

function processQueue(error: any) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });

  failedQueue = [];
}

acervoHttp.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => acervoHttp(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await acervoHttp.post("/auth/refresh");
        processQueue(null);
        return acervoHttp(originalRequest);
      } catch (err) {
        processQueue(err);
        notifyAuthError();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
