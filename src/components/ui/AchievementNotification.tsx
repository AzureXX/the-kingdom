"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useAchievements } from '@/lib/game/hooks';
import { ACHIEVEMENTS } from '@/lib/game/config/achievements/index';
import styles from './AchievementNotification.module.scss';

interface AchievementNotificationProps {
  onClose?: () => void;
  autoCloseDelay?: number;
}

export function AchievementNotification({ 
  onClose, 
  autoCloseDelay = 5000 
}: AchievementNotificationProps) {
  const { pendingNotifications, markNotificationAsShown, getRarityColor } = useAchievements();
  const [visibleNotifications, setVisibleNotifications] = useState<typeof pendingNotifications>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = useCallback((achievementKey: string) => {
    setIsAnimating(false);
    
    setTimeout(() => {
      setVisibleNotifications(prev => 
        prev.filter(n => !(n.achievementKey === achievementKey))
      );
      markNotificationAsShown(achievementKey);
      
      if (onClose) {
        onClose();
      }
    }, 300); // Wait for animation to complete
  }, [markNotificationAsShown, onClose]);

  useEffect(() => {
    if (pendingNotifications && pendingNotifications.length > 0) {
      const newNotifications = pendingNotifications.filter(
        n => !visibleNotifications.some(vn => vn.achievementKey === n.achievementKey && vn.timestamp === n.timestamp)
      );
      
      if (newNotifications.length > 0) {
        setVisibleNotifications(prev => [...prev, ...newNotifications]);
        setIsAnimating(true);
        
        // Auto-close after delay
        const timer = setTimeout(() => {
          handleClose(newNotifications[0].achievementKey);
        }, autoCloseDelay);
        
        return () => clearTimeout(timer);
      }
    }
  }, [pendingNotifications, autoCloseDelay, visibleNotifications, handleClose]);

  
  if (visibleNotifications.length === 0) {
    return null;
  }

  return (
    <div className={styles.notificationContainer}>
      {visibleNotifications.map((notification, index) => {
        const achievement = ACHIEVEMENTS[notification.achievementKey];
        if (!achievement) return null;

        const rarityColor = getRarityColor(achievement.rarity);
        const isLatest = index === visibleNotifications.length - 1;

        return (
          <div
            key={`${notification.achievementKey}-${notification.timestamp}`}
            className={`${styles.notification} ${isLatest ? styles.latest : ''} ${isAnimating && isLatest ? styles.animating : ''}`}
            style={{ 
              '--rarity-color': rarityColor,
              '--index': index 
            } as React.CSSProperties}
          >
            <div className={styles.notificationContent}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>{achievement.icon}</span>
                <div className={styles.rarityIndicator} />
              </div>
              
              <div className={styles.textContent}>
                <div className={styles.title}>
                  Achievement Unlocked!
                </div>
                <div className={styles.achievementName}>
                  {achievement.name}
                </div>
                <div className={styles.achievementDescription}>
                  {achievement.description}
                </div>
                <div className={styles.rewardInfo}>
                  +{achievement.points} points
                  {notification.level && notification.level > 1 && (
                    <span className={styles.levelBadge}>
                      Level {notification.level}
                    </span>
                  )}
                </div>
              </div>
              
              <button
                className={styles.closeButton}
                onClick={() => handleClose(notification.achievementKey)}
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
            
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ 
                  animation: `progress ${autoCloseDelay}ms linear forwards` 
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
