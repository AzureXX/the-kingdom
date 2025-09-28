# ⚙️ Configuration Guide

This document provides comprehensive guidance on configuring and extending the Medieval Kingdom game.

## 🔧 Configuration System

The game is fully data-driven through a modular configuration system. All game content is organized into logical modules for easy maintenance and extension:

### Modular Configuration Structure

The configuration system is organized into specialized modules:

- **`config/actions/`**: Action definitions split by category
  - `basicActions.ts` - Always available actions
  - `tradingActions.ts` - Resource trading actions
  - `buildingActions.ts` - Building-dependent actions
  - `technologyActions.ts` - Technology-dependent actions
- **`config/achievements/`**: Achievement definitions by type
  - `actionAchievements.ts` - Action-based achievements
  - `buildingAchievements.ts` - Building-based achievements
  - `resourceAchievements.ts` - Resource-based achievements
  - `technologyAchievements.ts` - Technology-based achievements
  - `prestigeAchievements.ts` - Prestige-based achievements
  - `eventAchievements.ts` - Event-based achievements
  - `timeAchievements.ts` - Time-based achievements
  - `comboAchievements.ts` - Multi-condition achievements
  - `hiddenAchievements.ts` - Secret achievements
- **`config/events/`**: Event definitions by category
  - `tradingEvents.ts` - Merchant and trading events
  - `conflictEvents.ts` - Bandit raids and conflicts
  - `naturalEvents.ts` - Weather and natural events
  - `socialEvents.ts` - Royal and social events
- **`config/loopActions/`**: Loop action definitions by category
  - `gatheringLoopActions.ts` - Resource gathering loops
  - `craftingLoopActions.ts` - Crafting and production loops
  - `researchLoopActions.ts` - Research and study loops
  - `militaryLoopActions.ts` - Military and prestige loops

## 🎯 Adding New Content

### Adding New Actions
```typescript
// src/lib/game/config/actions/basicActions.ts
export const BASIC_ACTIONS: Record<ActionKey, ActionDef> = {
  newAction: {
    name: 'New Action',
    icon: '🎯',
    description: 'Description of the action.',
    cost: { wood: 5 },
    gains: { gold: 10 },
    unlockConditions: [
      { type: 'building', key: 'blacksmith', value: 1 }
    ],
    oneTimeUnlock: false,
  },
};

// Then export in src/lib/game/config/actions/index.ts
export * from './basicActions';
export * from './tradingActions';
export * from './buildingActions';
export * from './technologyActions';
```

### Adding New Resources
```typescript
// src/lib/game/config/resources.ts
export const RESOURCES: Record<ResourceKey, ResourceDef> = {
  newResource: { 
    name: 'New Resource', 
    icon: '🎯', 
    decimals: 0, 
    start: 0 
  },
};
```

### Adding New Buildings
```typescript
// src/lib/game/config/buildings.ts
export const BUILDINGS: Record<BuildingKey, BuildingDef> = {
  newBuilding: {
    name: 'New Building',
    icon: '🏗️',
    desc: 'Description of the building.',
    baseCost: { gold: 100 },
    costScale: 1.15,
    baseProd: { gold: 5.0 },
    baseUse: { food: 1.0 },
  },
};
```

### Adding New Technologies
```typescript
// src/lib/game/config/technologies.ts
export const TECHNOLOGIES: Record<TechnologyKey, TechnologyDef> = {
  newTechnology: {
    name: 'New Technology',
    icon: 'ic-research',
    desc: 'Description of the technology.',
    baseCost: { gold: 200, researchPoints: 50 },
    costScale: 1.0,
    researchTime: 120,
    requiresTech: ['prerequisite'],
  },
};
```

### Adding New Loop Actions
```typescript
// src/lib/game/config/loopActions/craftingLoopActions.ts
export const CRAFTING_LOOP_ACTIONS: Record<LoopActionKey, LoopActionDef> = {
  newLoopAction: {
    name: 'New Loop Action',
    icon: '🎯',
    description: 'Description of the loop action.',
    cost: { food: 5 },
    gains: { gold: 10 },
    unlockConditions: [
      { type: 'building', key: 'blacksmith', value: 1 }
    ],
    loopPointsRequired: 1000,
    loopCategory: 'crafting',
    showWhenLocked: false,
  },
};

// Then export in src/lib/game/config/loopActions/index.ts
export * from './gatheringLoopActions';
export * from './craftingLoopActions';
export * from './researchLoopActions';
export * from './militaryLoopActions';
```

### Adding New Achievements
```typescript
// src/lib/game/config/achievements/actionAchievements.ts
export const ACTION_ACHIEVEMENTS: Record<AchievementKey, AchievementDef> = {
  newAchievement: {
    name: 'New Achievement',
    description: 'Description of the achievement.',
    icon: '🏆',
    category: 'action',
    condition: {
      type: 'action',
      action: 'newAction',
      count: 100
    },
    reward: {
      type: 'multiplier',
      resource: 'gold',
      value: 1.1
    },
    hidden: false,
  },
};
```

### Adding New Events
```typescript
// src/lib/game/config/events/tradingEvents.ts
export const TRADING_EVENTS: Record<EventKey, EventDef> = {
  newEvent: {
    name: 'New Event',
    description: 'Description of the event.',
    icon: '🎯',
    category: 'trading',
    choices: [
      {
        text: 'Accept the offer',
        effects: { gold: 50, wood: -10 }
      },
      {
        text: 'Decline',
        effects: { prestige: -1 }
      }
    ],
    weight: 1.0,
    minInterval: 300,
    maxInterval: 600,
  },
};
```

## 🎨 Styling Configuration

### SCSS File Organization
All SCSS files are organized in the `src/styles/` directory with the following structure:

```
src/styles/
├── components/              # Component-specific styles
│   ├── game/               # Game component styles
│   │   ├── AchievementCard.module.scss
│   │   ├── AchievementList.module.scss
│   │   ├── BuildingList.module.scss
│   │   ├── LoopActionButton.module.scss
│   │   ├── LoopActionList.module.scss
│   │   └── ResourceDisplay.module.scss
│   ├── scenes/             # Scene component styles
│   │   └── AchievementScene.module.scss
│   └── ui/                 # UI component styles
│       ├── AchievementNotification.module.scss
│       └── ErrorBoundary.module.scss
├── scenes/                 # Scene layout styles
│   ├── SceneLayout.module.scss
│   └── SceneNavigation.module.scss
├── globals.scss            # Global styles
└── page.module.scss        # Page-specific styles
```

**Guidelines for adding new SCSS files:**
- **Component styles**: Place in `src/styles/components/[category]/` matching the component's location
- **Scene styles**: Place in `src/styles/scenes/` for scene-specific layouts
- **Global styles**: Add to `src/styles/globals.scss` for app-wide styles
- **Import paths**: Use `@/styles/` prefix for all style imports
- **Naming**: Use `.module.scss` for component-specific styles, `.scss` for global styles

**Example import:**
```typescript
import styles from '@/styles/components/game/NewComponent.module.scss';
```

## 🔧 Configuration Best Practices

### Content Integration
All new content automatically integrates with the existing systems and UI components through the modular architecture:

#### Configuration Files
- **Actions**: Add new actions in the appropriate `src/lib/game/config/actions/` module
- **Loop Actions**: Add new loop actions in the appropriate `src/lib/game/config/loopActions/` module
- **Events**: Add new events in the appropriate `src/lib/game/config/events/` module
- **Achievements**: Add new achievements in the appropriate `src/lib/game/config/achievements/` module
- **Buildings**: Add new buildings in `src/lib/game/config/buildings.ts`
- **Technologies**: Add new technologies in `src/lib/game/config/technologies.ts`
- **Resources**: Add new resources in `src/lib/game/config/resources.ts`

#### Styling
- **Styles**: Add new SCSS files in `src/styles/` following the organized structure

### Type Safety
All configuration objects are fully typed with TypeScript, ensuring:
- **Compile-time validation** of configuration structure
- **IntelliSense support** for configuration properties
- **Runtime validation** through the configuration validator
- **Automatic integration** with game systems

### Validation
The game includes a comprehensive configuration validator that:
- **Validates all configuration objects** at startup
- **Checks for missing or invalid properties**
- **Ensures cross-references are valid** (e.g., building requirements)
- **Provides detailed error messages** for configuration issues
