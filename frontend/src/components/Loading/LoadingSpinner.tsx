import styles from "./styles/LoadingSpinner.module.scss";

export const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};
