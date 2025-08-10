import React, { ReactNode } from 'react';
import styles from '@/styles/page.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps): React.JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className={styles.modalWrap} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.modalHead}>
          <strong>{title}</strong>
          <button onClick={onClose}>✕</button>
        </div>
        <div className={styles.section}>
          {children}
        </div>
      </div>
    </div>
  );
} 