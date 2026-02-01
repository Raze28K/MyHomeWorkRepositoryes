import styles from "./Modal.module.css";

function Modal({ title, children, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
