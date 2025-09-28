"use client";

import React from 'react';
import { useGameStateContext } from '@/lib/game/providers';
import { CONFIG } from '@/lib/game/config';
import styles from '@/styles/page.module.scss';

export function EventNotification() {
  const { state } = useGameStateContext();
  
  if (!state || !state.events.activeEvent) {
    return null;
  }
  
  const eventKey = state.events.activeEvent;
  const event = CONFIG.events[eventKey];
  
  return (
    <div className={styles.eventNotification}>
      <div className={styles.eventNotificationContent}>
        <span className={styles.icon}>{event.icon}</span>
        <span className={styles.eventNotificationText}>
          New Event: {event.name}
        </span>
        <div className={styles.eventNotificationPulse}></div>
      </div>
    </div>
  );
} 