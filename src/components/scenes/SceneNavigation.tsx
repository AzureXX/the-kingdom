import React, { memo } from 'react';
import { SceneKey, SCENE_CONFIGS, SCENE_ORDER } from '@/lib/game/types/scenes';
import styles from '@/styles/scenes/SceneNavigation.module.scss';

interface SceneNavigationProps {
  currentScene: SceneKey;
  onSceneChange: (scene: SceneKey) => void;
  disabled?: boolean;
}

export const SceneNavigation = memo(function SceneNavigation({ 
  currentScene, 
  onSceneChange, 
  disabled = false 
}: SceneNavigationProps) {
  const handleSceneClick = (sceneKey: SceneKey) => {
    if (!disabled && sceneKey !== currentScene) {
      onSceneChange(sceneKey);
    }
  };

  return (
    <nav className={styles.navigation} role="tablist">
      <div className={styles.tabContainer}>
        {SCENE_ORDER.map((sceneKey) => {
          const config = SCENE_CONFIGS[sceneKey];
          const isActive = sceneKey === currentScene;
          
          return (
            <button
              key={sceneKey}
              className={`${styles.tab} ${isActive ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
              onClick={() => handleSceneClick(sceneKey)}
              disabled={disabled}
              role="tab"
              aria-selected={isActive}
              aria-label={`${config.title} scene (${config.keyboardShortcut})`}
              title={`${config.title} - ${config.description} (Press ${config.keyboardShortcut})`}
            >
              <span className={styles.icon} style={{ color: isActive ? config.color : undefined }}>
                {config.icon}
              </span>
              <span className={styles.label}>{config.title}</span>
              <span className={styles.shortcut}>{config.keyboardShortcut}</span>
            </button>
          );
        })}
      </div>
      
      <div className={styles.navigationHints}>
        <span className={styles.hint}>
          Use number keys (1-5) or arrow keys to navigate scenes
        </span>
      </div>
    </nav>
  );
});
