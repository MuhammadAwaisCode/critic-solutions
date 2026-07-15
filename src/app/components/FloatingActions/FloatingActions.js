import styles from './FloatingActions.module.css';

export default function FloatingActions() {
  return (
    <div className={styles.floatingContainer}>
      
      <a 
        href="mailto:awaisabbas972@gmail.com" 
        className={`${styles.floatingButton} ${styles.mailBtn}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Send an Email"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a1.75 1.75 0 01-1.644 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a.25.25 0 00.234 0L22.5 6.908z" />
        </svg>
      </a>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/923496257662" 
        className={`${styles.floatingButton} ${styles.whatsappBtn}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.17L2.06 21.94a.75.75 0 00.944.945l4.77-1.379A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.78 13.32c-.227-.113-1.343-.663-1.552-.738-.208-.076-.36-.113-.51.113-.152.227-.588.738-.72.89-.133.15-.266.17-.493.057-.227-.114-.958-.353-1.826-1.127-.675-.602-1.13-1.346-1.263-1.573-.132-.227-.014-.35.1-.462.102-.102.227-.265.34-.397.114-.133.152-.227.227-.379.076-.152.038-.284-.019-.398-.057-.113-.51-1.23-.7-1.686-.184-.443-.37-.383-.51-.39h-.436c-.152 0-.398.057-.606.284-.208.227-.796.777-.796 1.894 0 1.118.814 2.198.928 2.35 1.14 1.54 2.454 2.375 3.864 2.915 1.096.42 1.98.343 2.727.23.832-.125 1.553-.635 1.773-1.25.22-.613.22-1.137.152-1.25-.068-.113-.246-.17-.473-.284z" />
        </svg>
      </a>
    </div>
  );
}