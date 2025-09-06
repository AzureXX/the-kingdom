export type SceneKey = 'actions' | 'buildings' | 'research' | 'prestige' | 'performance';

export interface SceneConfig {
  key: SceneKey;
  title: string;
  description: string;
  icon: string;
  color: string;
  keyboardShortcut: string;
}

export interface SceneNavigationState {
  currentScene: SceneKey;
  previousScene: SceneKey | null;
  sceneHistory: SceneKey[];
  isTransitioning: boolean;
}

export const SCENE_CONFIGS: Record<SceneKey, SceneConfig> = {
  actions: {
    key: 'actions',
    title: 'Actions',
    description: 'Manage your kingdom\'s daily operations and automated processes',
    icon: '🎮',
    color: '#4CAF50',
    keyboardShortcut: '1'
  },
  buildings: {
    key: 'buildings',
    title: 'Buildings',
    description: 'Construct and manage buildings to expand your kingdom\'s infrastructure',
    icon: '🏗️',
    color: '#2196F3',
    keyboardShortcut: '2'
  },
  research: {
    key: 'research',
    title: 'Research',
    description: 'Advance your kingdom through scientific research and technological innovation',
    icon: '🔬',
    color: '#FF9800',
    keyboardShortcut: '3'
  },
  prestige: {
    key: 'prestige',
    title: 'Prestige',
    description: 'Ascend to greater heights and unlock permanent upgrades',
    icon: '👑',
    color: '#9C27B0',
    keyboardShortcut: '4'
  },
  performance: {
    key: 'performance',
    title: 'Performance',
    description: 'Monitor game performance and system health',
    icon: '📊',
    color: '#607D8B',
    keyboardShortcut: '5'
  }
};

export const SCENE_ORDER: SceneKey[] = ['actions', 'buildings', 'research', 'prestige', 'performance'];
