import { useState, useEffect, useCallback } from 'react';
import { SceneKey, SceneNavigationState, SCENE_ORDER } from '@/lib/game/types/scenes';

const STORAGE_KEY = 'medieval-kingdom-current-scene';

export function useSceneNavigation() {
  const [state, setState] = useState<SceneNavigationState>(() => {
    // Initialize with default scene - localStorage will be checked after hydration
    return {
      currentScene: SCENE_ORDER[0],
      previousScene: null,
      sceneHistory: [SCENE_ORDER[0]],
      isTransitioning: false
    };
  });

  // Initialize from localStorage after component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedScene = localStorage.getItem(STORAGE_KEY) as SceneKey;
      const initialScene = savedScene && SCENE_ORDER.includes(savedScene) ? savedScene : SCENE_ORDER[0];
      
      setState(prev => {
        if (initialScene !== prev.currentScene) {
          return {
            ...prev,
            currentScene: initialScene,
            sceneHistory: [initialScene]
          };
        }
        return prev;
      });
    }
  }, []); // Only run once on mount

  const changeScene = useCallback((newScene: SceneKey) => {
    if (newScene === state.currentScene || state.isTransitioning) return;

    setState(prev => ({
      currentScene: newScene,
      previousScene: prev.currentScene,
      sceneHistory: [...prev.sceneHistory, newScene].slice(-10), // Keep last 10 scenes
      isTransitioning: true
    }));

    // Save to localStorage (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newScene);
    }

    // Update URL hash (client-side only)
    if (typeof window !== 'undefined') {
      window.location.hash = `#${newScene}`;
    }

    // Reset transition state after animation
    setTimeout(() => {
      setState(prev => ({ ...prev, isTransitioning: false }));
    }, 300);
  }, [state.currentScene, state.isTransitioning]);

  const goToPreviousScene = useCallback(() => {
    if (state.previousScene) {
      changeScene(state.previousScene);
    }
  }, [state.previousScene, changeScene]);

  const goToNextScene = useCallback(() => {
    const currentIndex = SCENE_ORDER.indexOf(state.currentScene);
    const nextIndex = (currentIndex + 1) % SCENE_ORDER.length;
    changeScene(SCENE_ORDER[nextIndex]);
  }, [state.currentScene, changeScene]);

  const goToPreviousSceneInOrder = useCallback(() => {
    const currentIndex = SCENE_ORDER.indexOf(state.currentScene);
    const prevIndex = currentIndex === 0 ? SCENE_ORDER.length - 1 : currentIndex - 1;
    changeScene(SCENE_ORDER[prevIndex]);
  }, [state.currentScene, changeScene]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle if not typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = event.key;
      
      // Number keys 1-5 for scene switching
      if (key >= '1' && key <= '5') {
        const sceneIndex = parseInt(key) - 1;
        if (sceneIndex < SCENE_ORDER.length) {
          event.preventDefault();
          changeScene(SCENE_ORDER[sceneIndex]);
        }
      }
      
      // Arrow keys for scene navigation
      if (key === 'ArrowLeft') {
        event.preventDefault();
        goToPreviousSceneInOrder();
      } else if (key === 'ArrowRight') {
        event.preventDefault();
        goToNextScene();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [changeScene, goToNextScene, goToPreviousSceneInOrder]);

  // Handle URL hash changes (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as SceneKey;
      if (SCENE_ORDER.includes(hash) && hash !== state.currentScene) {
        changeScene(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [state.currentScene, changeScene]);

  return {
    currentScene: state.currentScene,
    previousScene: state.previousScene,
    sceneHistory: state.sceneHistory,
    isTransitioning: state.isTransitioning,
    changeScene,
    goToPreviousScene,
    goToNextScene,
    goToPreviousSceneInOrder
  };
}
