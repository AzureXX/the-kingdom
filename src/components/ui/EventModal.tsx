"use client";

import React from 'react';
import { useGameStateContext } from '@/lib/game/providers';
import { CONFIG } from '@/lib/game/config';
import { canMakeEventChoice, makeEventChoice } from '@/lib/game/utils/event';
import { formatNumber as fmt } from '@/lib/game/utils';
import styles from '@/styles/page.module.scss';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EventModal({ isOpen, onClose }: EventModalProps) {
  const { state, setState } = useGameStateContext();
  
  if (!isOpen || !state || !state.events.activeEvent) {
    return null;
  }
  
  const eventKey = state.events.activeEvent;
  const event = CONFIG.events[eventKey];
  
  const handleChoice = (choiceIndex: number) => {
    if (!state) return;
    
    const nextState = makeEventChoice(state, eventKey, choiceIndex);
    setState(nextState);
    
    onClose();
  };
  
  const formatResourceChange = (gives: Record<string, number>, takes: Record<string, number>) => {
    const changes: string[] = [];
    
    // Add positive changes
    for (const [resource, amount] of Object.entries(gives)) {
      if (amount > 0) {
        changes.push(`+${fmt(amount)} ${CONFIG.resources[resource as keyof typeof CONFIG.resources]?.name || resource}`);
      }
    }
    
    // Add negative changes
    for (const [resource, amount] of Object.entries(takes)) {
      if (amount > 0) {
        changes.push(`-${fmt(amount)} ${CONFIG.resources[resource as keyof typeof CONFIG.resources]?.name || resource}`);
      }
    }
    
    return changes.length > 0 ? changes.join(', ') : 'No change';
  };
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <span className={styles.icon}>{event.icon}</span>
            {event.name}
          </h2>
          <button className={styles.modalClose} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.modalContent}>
          <p className={styles.eventDescription}>{event.desc}</p>
          
          <div className={styles.eventChoices}>
            {event.choices.map((choice, index) => {
              const canChoose = canMakeEventChoice(state, eventKey, index);
              const changes = formatResourceChange(choice.gives, choice.takes);
              
              return (
                <button
                  key={index}
                  className={`${styles.eventChoice} ${!canChoose ? styles.disabled : ''}`}
                  onClick={() => canChoose && handleChoice(index)}
                  disabled={!canChoose}
                >
                  <div className={styles.choiceText}>{choice.text}</div>
                  <div className={styles.choiceEffects}>{changes}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 