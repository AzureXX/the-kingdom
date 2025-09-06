# 🏰 Medieval Kingdom - UI Scene Separation Plan

## 📋 Overview

This document outlines a comprehensive plan to separate the current single-page UI into distinct, focused scenes while maintaining the ResourceDisplay component across all scenes. The goal is to improve user experience, organization, and scalability of the Medieval Kingdom idle game.

## 🎯 Current State Analysis

### Existing UI Structure
The current game displays all components in a single page with these sections:
- **Resources Section**: ResourceDisplay component showing all game resources
- **Actions Section**: ActionList (manual actions) + LoopActionList (automated actions)
- **Buildings Section**: BuildingList for construction and management
- **Technologies Section**: TechnologyList for research and development
- **Prestige Section**: UpgradeList for prestige upgrades
- **Performance Section**: PerformanceMonitor + ConfigurationValidator

### Current Components
- `ResourceDisplay.tsx` - Shows all resources with per-second rates
- `ActionList.tsx` - Manual action buttons (gather, trade, craft, etc.)
- `LoopActionList.tsx` - Automated loop actions management
- `BuildingList.tsx` - Building construction interface
- `TechnologyList.tsx` - Technology research system
- `UpgradeList.tsx` - Prestige upgrade purchases
- `PerformanceMonitor.tsx` - Real-time performance metrics
- `ConfigurationValidator.tsx` - System validation

## 🎨 Proposed Scene Architecture

### Scene 1: Actions Scene 🎮
**Purpose**: Manage daily kingdom operations and automated processes

**Components**:
- ResourceDisplay (always visible)
- ActionList (manual actions)
- LoopActionList (automated actions)

**Features**:
- Grouped action categories (Basic, Trading, Building, Technology)
- Loop action management with active/inactive states
- Resource cost/gain visualization
- Action unlock progress tracking

**Scene Description**: "Manage your kingdom's daily operations and automated processes"

### Scene 2: Buildings Scene 🏗️
**Purpose**: Construct and manage kingdom infrastructure

**Components**:
- ResourceDisplay (always visible)
- BuildingList (construction interface)

**Features**:
- Building unlock requirements
- Technology prerequisites display
- Cost scaling visualization
- Production/consumption rates
- Building count and ownership tracking

**Scene Description**: "Construct and manage buildings to expand your kingdom's infrastructure"

### Scene 3: Research Scene 🔬
**Purpose**: Advance kingdom through scientific research

**Components**:
- ResourceDisplay (always visible)
- TechnologyList (research system)

**Features**:
- Technology tree visualization
- Research progress tracking
- Prerequisite requirements
- Research time estimates
- Unlocked building previews

**Scene Description**: "Advance your kingdom through scientific research and technological innovation"

### Scene 4: Prestige Scene 👑
**Purpose**: Ascend to greater heights with permanent upgrades

**Components**:
- ResourceDisplay (always visible)
- UpgradeList (prestige upgrades)
- Prestige Modal (ascension mechanics)

**Features**:
- Prestige calculation display
- Upgrade level tracking
- Cost curve visualization
- Permanent upgrade effects
- Ascension confirmation

**Scene Description**: "Ascend to greater heights and unlock permanent upgrades"

### Scene 5: Performance Scene 📊
**Purpose**: Monitor game performance and system health

**Components**:
- ResourceDisplay (always visible)
- PerformanceMonitor (real-time metrics)
- ConfigurationValidator (system validation)

**Features**:
- Real-time performance metrics
- FPS and memory monitoring
- Performance suggestions
- System validation status
- Detailed performance insights

**Scene Description**: "Monitor game performance and system health"

## 🛠️ Technical Implementation Plan

### Phase 1: Core Infrastructure

#### 1.1 Scene Navigation System
**File**: `src/components/scenes/SceneNavigation.tsx`

**Features**:
- Tab-based navigation interface
- Active scene indicator
- Keyboard shortcut support (1-5 keys)
- Responsive design for mobile
- Scene transition animations

**Props**:
```typescript
interface SceneNavigationProps {
  currentScene: SceneKey;
  onSceneChange: (scene: SceneKey) => void;
  disabled?: boolean;
}
```

#### 1.2 Scene State Management
**File**: `src/hooks/useSceneNavigation.tsx`

**Features**:
- Scene state persistence (localStorage)
- URL hash integration for bookmarking
- Scene transition history
- Keyboard event handling

**State**:
```typescript
interface SceneNavigationState {
  currentScene: SceneKey;
  previousScene: SceneKey | null;
  sceneHistory: SceneKey[];
  isTransitioning: boolean;
}
```

#### 1.3 Scene Types and Constants
**File**: `src/lib/game/types/scenes.ts`

**Types**:
```typescript
export type SceneKey = 'actions' | 'buildings' | 'research' | 'prestige' | 'performance';

export interface SceneConfig {
  key: SceneKey;
  title: string;
  description: string;
  icon: string;
  color: string;
  keyboardShortcut: string;
}
```

### Phase 2: Individual Scene Components

#### 2.1 Actions Scene
**File**: `src/components/scenes/ActionsScene.tsx`

**Structure**:
```typescript
interface ActionsSceneProps {
  state: GameState;
  perSec: ResourceAmount;
  fmt: (n: number, decimals?: number) => string;
  onExecuteAction: (actionKey: ActionKey) => void;
  onToggleLoopAction: (actionKey: LoopActionKey) => void;
}
```

**Layout**:
- Header with scene title and description
- ResourceDisplay at the top
- ActionList section (manual actions)
- LoopActionList section (automated actions)
- Footer with navigation hints

#### 2.2 Buildings Scene
**File**: `src/components/scenes/BuildingsScene.tsx`

**Structure**:
```typescript
interface BuildingsSceneProps {
  state: GameState;
  costFor: (key: BuildingKey) => ResourceCost;
  onBuyBuilding: (key: BuildingKey) => void;
}
```

**Layout**:
- Header with scene title and description
- ResourceDisplay at the top
- BuildingList section
- Building statistics summary
- Footer with navigation hints

#### 2.3 Research Scene
**File**: `src/components/scenes/ResearchScene.tsx`

**Structure**:
```typescript
interface ResearchSceneProps {
  state: GameState;
  onResearchTechnology: (key: TechnologyKey) => void;
}
```

**Layout**:
- Header with scene title and description
- ResourceDisplay at the top
- TechnologyList section
- Research progress overview
- Footer with navigation hints

#### 2.4 Prestige Scene
**File**: `src/components/scenes/PrestigeScene.tsx`

**Structure**:
```typescript
interface PrestigeSceneProps {
  state: GameState;
  prestigePotential: number;
  fmt: (n: number, decimals?: number) => string;
  onBuyUpgrade: (key: PrestigeUpgradeKey) => void;
  onDoPrestige: () => void;
}
```

**Layout**:
- Header with scene title and description
- ResourceDisplay at the top
- Prestige calculation display
- UpgradeList section
- Prestige modal integration
- Footer with navigation hints

#### 2.5 Performance Scene
**File**: `src/components/scenes/PerformanceScene.tsx`

**Structure**:
```typescript
interface PerformanceSceneProps {
  // Performance monitoring is self-contained
}
```

**Layout**:
- Header with scene title and description
- ResourceDisplay at the top
- PerformanceMonitor section
- ConfigurationValidator section
- Performance insights summary
- Footer with navigation hints

### Phase 3: Styling and Layout

#### 3.1 Scene Navigation Styles
**File**: `src/styles/scenes/SceneNavigation.module.scss`

**Features**:
- Tab bar styling
- Active state indicators
- Hover effects
- Mobile responsiveness
- Transition animations

#### 3.2 Scene Layout Styles
**File**: `src/styles/scenes/SceneLayout.module.scss`

**Features**:
- Consistent scene header styling
- ResourceDisplay positioning
- Content area layout
- Footer styling
- Responsive breakpoints

#### 3.3 Scene-Specific Styles
**Files**: `src/styles/scenes/[SceneName]Scene.module.scss`

**Features**:
- Scene-specific color schemes
- Component spacing
- Icon styling
- Button variations
- Status indicators

### Phase 4: Integration and Updates

#### 4.1 Main Page Update
**File**: `src/app/page.tsx`

**Changes**:
- Replace current section-based layout with scene navigation
- Implement scene state management
- Add keyboard shortcut handling
- Maintain all existing functionality
- Add scene transition effects

#### 4.2 Game Context Updates
**File**: `src/lib/game/GameContext.tsx`

**Additions**:
- Scene navigation state
- Scene transition handlers
- Keyboard shortcut management
- Scene persistence logic

## 🎨 UI/UX Design Specifications

### Navigation Design
- **Tab Bar**: Horizontal tabs at the top with icons and labels
- **Active Indicator**: Bold border and background color for current scene
- **Hover Effects**: Subtle color changes and scale effects
- **Mobile**: Collapsible tab menu for smaller screens

### Scene Layout
- **Header**: Scene title, description, and navigation breadcrumbs
- **Resources**: Always visible ResourceDisplay at the top
- **Content**: Scene-specific components in the main area
- **Footer**: Navigation hints, keyboard shortcuts, and scene info

### Visual Consistency
- **ResourceDisplay**: Identical styling and positioning across all scenes
- **Color Coding**: Each scene has a distinct accent color
- **Icons**: Consistent iconography with scene-specific variations
- **Typography**: Unified font hierarchy and sizing
- **Spacing**: Consistent padding and margins throughout

### Responsive Design
- **Desktop**: Full tab bar with all scenes visible
- **Tablet**: Condensed tab bar with icon labels
- **Mobile**: Hamburger menu with scene selection
- **Touch**: Optimized touch targets and gestures

## 🔧 Technical Specifications

### File Structure
```
src/
├── components/
│   ├── scenes/
│   │   ├── SceneNavigation.tsx
│   │   ├── ActionsScene.tsx
│   │   ├── BuildingsScene.tsx
│   │   ├── ResearchScene.tsx
│   │   ├── PrestigeScene.tsx
│   │   ├── PerformanceScene.tsx
│   │   └── index.ts
│   └── game/ (existing components)
├── hooks/
│   ├── useSceneNavigation.tsx
│   └── useKeyboardShortcuts.tsx
├── lib/
│   ├── game/
│   │   └── types/
│   │       └── scenes.ts
│   └── utils/
│       └── sceneUtils.ts
└── styles/
    ├── scenes/
    │   ├── SceneNavigation.module.scss
    │   ├── SceneLayout.module.scss
    │   ├── ActionsScene.module.scss
    │   ├── BuildingsScene.module.scss
    │   ├── ResearchScene.module.scss
    │   ├── PrestigeScene.module.scss
    │   └── PerformanceScene.module.scss
    └── page.module.scss (updated)
```

### State Management
- **Scene State**: Managed by useSceneNavigation hook
- **Persistence**: localStorage for scene preference
- **URL Integration**: Hash-based scene routing
- **History**: Track scene navigation history

### Performance Considerations
- **Lazy Loading**: Load scene components only when needed
- **Memoization**: Use React.memo for scene components
- **State Optimization**: Minimize re-renders with proper dependencies
- **Memory Management**: Cleanup unused scene data

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support for all scenes
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators and tab order
- **Color Contrast**: WCAG compliant color schemes

## 🚀 Implementation Timeline

### Week 1: Foundation
- [ ] Create scene navigation system
- [ ] Implement scene state management
- [ ] Set up basic scene routing
- [ ] Create scene type definitions

### Week 2: Core Scenes
- [ ] Implement ActionsScene
- [ ] Implement BuildingsScene
- [ ] Implement ResearchScene
- [ ] Create scene-specific styles

### Week 3: Advanced Scenes
- [ ] Implement PrestigeScene
- [ ] Implement PerformanceScene
- [ ] Add scene transitions
- [ ] Implement keyboard shortcuts

### Week 4: Integration & Polish
- [ ] Update main page.tsx
- [ ] Add responsive design
- [ ] Implement accessibility features
- [ ] Add performance optimizations
- [ ] Testing and bug fixes

## 🧪 Testing Strategy

### Unit Tests
- Scene navigation logic
- Scene state management
- Keyboard shortcut handling
- Scene transition effects

### Integration Tests
- Scene switching functionality
- State persistence across scenes
- ResourceDisplay consistency
- Game context integration

### User Experience Tests
- Navigation flow testing
- Mobile responsiveness
- Keyboard accessibility
- Performance impact

### Performance Tests
- Scene loading times
- Memory usage monitoring
- Render performance
- Transition smoothness

## 📊 Success Metrics

### User Experience
- Reduced cognitive load per scene
- Improved task completion rates
- Better mobile experience
- Increased user engagement

### Technical Performance
- Faster initial load times
- Reduced memory usage
- Smoother animations
- Better code organization

### Maintainability
- Easier feature additions
- Cleaner code structure
- Better separation of concerns
- Improved testability

## 🔮 Future Enhancements

### Additional Scenes
- **Settings Scene**: Game configuration and preferences
- **Statistics Scene**: Detailed game analytics and progress
- **Achievements Scene**: Unlockable achievements and rewards
- **Social Scene**: Multiplayer features and leaderboards

### Advanced Features
- **Scene Customization**: User-defined scene layouts
- **Quick Actions**: Cross-scene action shortcuts
- **Scene Notifications**: Scene-specific alerts and updates
- **Scene Themes**: Customizable visual themes per scene

### Integration Opportunities
- **PWA Features**: Offline scene caching
- **Analytics**: Scene usage tracking
- **A/B Testing**: Scene layout optimization
- **Accessibility**: Advanced accessibility features

## 📝 Conclusion

This scene separation plan provides a comprehensive approach to reorganizing the Medieval Kingdom UI into focused, user-friendly scenes. The implementation maintains all existing functionality while significantly improving the user experience, code organization, and future scalability.

The plan emphasizes:
- **User Experience**: Clear, focused interfaces for each game aspect
- **Technical Excellence**: Clean architecture and performance optimization
- **Accessibility**: Full keyboard navigation and screen reader support
- **Maintainability**: Well-organized code structure for future development
- **Scalability**: Easy addition of new scenes and features

By following this plan, the game will provide a more intuitive and organized experience while maintaining the depth and complexity that makes it engaging for players.
