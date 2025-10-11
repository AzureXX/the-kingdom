"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useAchievements } from '@/hooks';
import { ACHIEVEMENTS } from '@/lib/game/config';
import styles from '@/styles/components/ui/AchievementNotification.module.scss';

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
  
  // Local state for shown notifications - has priority over global state
  const [localShownNotifications, setLocalShownNotifications] = useState<Set<string>>(new Set());
  const isInitialized = useRef(false);
  const lastSyncTime = useRef(0);
  const SYNC_INTERVAL = 2000; // Sync every 2 seconds

  // Function to sync local shown notifications to global state
  const syncToGlobalState = useCallback(() => {
    const now = Date.now();
    if (now - lastSyncTime.current < SYNC_INTERVAL) return;
    
    // Since pendingNotifications is already filtered to show only unshown notifications,
    // we need to sync any notifications that are in local shown but still appear in pendingNotifications
    const pendingKeys = new Set(pendingNotifications?.map(n => n.achievementKey) || []);
    
    const needsSync = Array.from(localShownNotifications).filter(
      key => pendingKeys.has(key) // If it's in local shown but still in pending, it needs sync
    );
    
    if (needsSync.length > 0) {
      needsSync.forEach(achievementKey => {
        markNotificationAsShown(achievementKey);
      });
      lastSyncTime.current = now;
    }
  }, [localShownNotifications, pendingNotifications, markNotificationAsShown]);

  // Sync local state with global state on initialization and updates
  useEffect(() => {
    if (!pendingNotifications) return;
    
    // On first load, initialize local state as empty since pendingNotifications only contains unshown notifications
    if (!isInitialized.current) {
      setLocalShownNotifications(new Set());
      isInitialized.current = true;
    }
    // Note: We don't need to sync from global state since pendingNotifications is already filtered
    // and we maintain local state as the source of truth for what's been shown
  }, [pendingNotifications]);

  // Periodic sync to global state
  useEffect(() => {
    const interval = setInterval(() => {
      syncToGlobalState();
    }, SYNC_INTERVAL);

    return () => clearInterval(interval);
  }, [syncToGlobalState]);

  // Sync to global state when local shown notifications change
  useEffect(() => {
    if (isInitialized.current) {
      syncToGlobalState();
    }
  }, [localShownNotifications, syncToGlobalState]);

  const handleClose = useCallback((achievementKey: string) => {
    setIsAnimating(false);
    
    // Add to local shown notifications immediately
    setLocalShownNotifications(prev => {
      const newSet = new Set(prev);
      newSet.add(achievementKey);
      return newSet;
    });
    
    setTimeout(() => {
      setVisibleNotifications(prev => 
        prev.filter(n => !(n.achievementKey === achievementKey))
      );
      
      if (onClose) {
        onClose();
      }
    }, 300); // Wait for animation to complete
  }, [onClose]);

  useEffect(() => {
    if (pendingNotifications && pendingNotifications.length > 0) {
      // Filter out notifications that are already shown locally (local state has priority)
      const newNotifications = pendingNotifications.filter(n => {
        // Don't show if already in local shown notifications
        if (localShownNotifications.has(n.achievementKey)) {
          return false;
        }
        
        // Don't show if already visible
        if (visibleNotifications.some(vn => vn.achievementKey === n.achievementKey && vn.timestamp === n.timestamp)) {
          return false;
        }
        
        return true;
      });
      
      if (newNotifications.length > 0) {
        setVisibleNotifications(prev => [...prev, ...newNotifications]);
        setIsAnimating(true);

        // Auto-close after delay
        const timer = setTimeout(() => {
          handleClose(newNotifications[0].achievementKey);
          clearTimeout(timer);
        }, autoCloseDelay);
        
      }
    }
  }, [pendingNotifications, autoCloseDelay, visibleNotifications, handleClose, localShownNotifications]);

  
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
