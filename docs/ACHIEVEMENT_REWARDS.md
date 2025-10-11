# 🏆 Achievement Rewards System

## Overview

The achievement rewards system provides granular bonuses that can be applied to different aspects of gameplay. This document outlines all available reward types and their specific targeting mechanisms.

## Reward Categories

The achievement system supports three main categories of bonuses:

1. **Production Bonuses** - Affect automatic resource generation
2. **Click Bonuses** - Affect manual click actions  
3. **Loop Bonuses** - Affect automated loop actions

Each category can be further subdivided into **resource-specific** and **action/building-specific** bonuses.

---

## 🏗️ Production Bonuses

### 1. Resource Production Bonuses

These bonuses affect all production of a specific resource type.

#### `resourceGain`
- **Description**: Adds flat production bonus to a specific resource
- **Target**: Resource key (e.g., `'gold'`, `'wood'`, `'stone'`)
- **Example**: `+3 wood/s` from all sources
- **Usage**: `{ type: 'resourceGain', target: 'wood', value: 3, permanent: true }`

#### `resourceGainMultiplier`
- **Description**: Multiplies production of a specific resource
- **Target**: Resource key or `'all'` for all resources
- **Example**: `1.2x wood/s` (20% increase)
- **Usage**: `{ type: 'resourceGainMultiplier', target: 'wood', value: 1.2, permanent: true }`

### 2. Building-Specific Production Bonuses

These bonuses affect only specific building types.

#### `buildingGain`
- **Description**: Adds flat production bonus from a specific building type
- **Target**: Building key (e.g., `'woodcutter'`, `'quarry'`)
- **Resource**: Resource key (e.g., `'wood'`, `'stone'`)
- **Example**: `+2 wood/s` from woodcutter buildings only
- **Usage**: `{ type: 'buildingGain', target: 'woodcutter', resource: 'wood', value: 2, permanent: true }`

#### `buildingGainMultiplier`
- **Description**: Multiplies production from a specific building type
- **Target**: Building key (e.g., `'woodcutter'`, `'quarry'`)
- **Resource**: Resource key (e.g., `'wood'`, `'stone'`)
- **Example**: `1.3x woodcutter production` (30% increase)
- **Usage**: `{ type: 'buildingGainMultiplier', target: 'woodcutter', resource: 'wood', value: 1.3, permanent: true }`

---

## 🖱️ Click Bonuses

### 1. Resource Click Bonuses

These bonuses affect all click actions that produce a specific resource.

#### `clickGain`
- **Description**: Adds flat bonus to all click actions for a specific resource
- **Target**: Resource key or `'all'` for all resources
- **Example**: `+1 wood` per click action
- **Usage**: `{ type: 'clickGain', target: 'wood', value: 1, permanent: true }`

#### `clickMultiplier`
- **Description**: Multiplies all click action gains for a specific resource
- **Target**: Resource key or `'all'` for all resources
- **Example**: `1.2x click gains` (20% increase)
- **Usage**: `{ type: 'clickMultiplier', target: 'all', value: 1.2, permanent: true }`

### 2. Action-Specific Click Bonuses

These bonuses affect only specific click actions.

#### `actionClickGain`
- **Description**: Adds flat bonus to a specific click action
- **Target**: Action key (e.g., `'gatherWood'`, `'gatherStone'`)
- **Resource**: Resource key (e.g., `'wood'`, `'stone'`)
- **Example**: `+2 wood` from `gatherWood` action only
- **Usage**: `{ type: 'actionClickGain', target: 'gatherWood', resource: 'wood', value: 2, permanent: true }`

#### `actionClickMultiplier`
- **Description**: Multiplies gains from a specific click action
- **Target**: Action key (e.g., `'gatherWood'`, `'gatherStone'`)
- **Resource**: Resource key (e.g., `'wood'`, `'stone'`)
- **Example**: `1.5x gatherWood gains` (50% increase)
- **Usage**: `{ type: 'actionClickMultiplier', target: 'gatherWood', resource: 'wood', value: 1.5, permanent: true }`

---

## 🔄 Loop Bonuses

### 1. Resource Loop Bonuses

These bonuses affect all loop actions that produce a specific resource.

#### `loopGain`
- **Description**: Adds flat bonus to all loop actions for a specific resource
- **Target**: Resource key or `'all'` for all resources
- **Example**: `+1 wood` per loop action
- **Usage**: `{ type: 'loopGain', target: 'wood', value: 1, permanent: true }`

#### `loopMultiplier`
- **Description**: Multiplies all loop action gains for a specific resource
- **Target**: Resource key or `'all'` for all resources
- **Example**: `1.2x loop gains` (20% increase)
- **Usage**: `{ type: 'loopMultiplier', target: 'all', value: 1.2, permanent: true }`

### 2. Action-Specific Loop Bonuses

These bonuses affect only specific loop actions.

#### `actionLoopGain`
- **Description**: Adds flat bonus to a specific loop action
- **Target**: Action key (e.g., `'gatherWood'`, `'gatherStone'`)
- **Resource**: Resource key (e.g., `'wood'`, `'stone'`)
- **Example**: `+3 wood` from woodcutting loop only
- **Usage**: `{ type: 'actionLoopGain', target: 'gatherWood', resource: 'wood', value: 3, permanent: true }`

#### `actionLoopMultiplier`
- **Description**: Multiplies gains from a specific loop action
- **Target**: Action key (e.g., `'gatherWood'`, `'gatherStone'`)
- **Resource**: Resource key (e.g., `'wood'`, `'stone'`)
- **Example**: `1.4x woodcutting loop gains` (40% increase)
- **Usage**: `{ type: 'actionLoopMultiplier', target: 'gatherWood', resource: 'wood', value: 1.4, permanent: true }`

---

## 🎁 Other Reward Types

### `resource`
- **Description**: Direct resource amount (one-time bonus)
- **Target**: Resource key (e.g., `'gold'`, `'wood'`)
- **Example**: `+100 gold` immediately
- **Usage**: `{ type: 'resource', target: 'gold', value: 100, permanent: false }`

### `unlock`
- **Description**: Unlocks buildings, technologies, actions, etc.
- **Target**: Unlock key (e.g., `'woodcutter'`, `'writing'`)
- **Example**: Unlocks woodcutter building
- **Usage**: `{ type: 'unlock', target: 'woodcutter', value: 1, permanent: true }`

### `cosmetic`
- **Description**: Cosmetic rewards (titles, themes, etc.)
- **Target**: Cosmetic key
- **Example**: Unlocks new theme
- **Usage**: `{ type: 'cosmetic', target: 'theme_forest', value: 1, permanent: true }`

---

## 🎯 Targeting Examples

### Resource-Specific vs Action-Specific

**Resource-Specific** (affects all actions producing that resource):
```typescript
// All wood-producing actions get +1 wood
{ type: 'clickGain', target: 'wood', value: 1, permanent: true }
```

**Action-Specific** (affects only the specified action):
```typescript
// Only gatherWood action gets +2 wood
{ type: 'actionClickGain', target: 'gatherWood', resource: 'wood', value: 2, permanent: true }
```

### Building-Specific vs Resource-Specific

**Resource-Specific** (affects all buildings producing that resource):
```typescript
// All wood-producing buildings get +1 wood/s
{ type: 'resourceGain', target: 'wood', value: 1, permanent: true }
```

**Building-Specific** (affects only the specified building type):
```typescript
// Only woodcutter buildings get +2 wood/s
{ type: 'buildingGain', target: 'woodcutter', resource: 'wood', value: 2, permanent: true }
```

---

## 📊 Complete Achievement Example

```typescript
const lumberjackMaster: AchievementDef = {
  key: 'lumberjackMaster',
  name: 'Lumberjack Master',
  description: 'Collect 50,000 wood',
  icon: '🪓',
  category: 'resource',
  rarity: 'epic',
  points: 100,
  requirements: [
    { type: 'resource', target: 'wood', value: 50000 }
  ],
  rewards: [
    // Building-specific bonus: woodcutters produce more
    { type: 'buildingGainMultiplier', target: 'woodcutter', resource: 'wood', value: 1.5, permanent: true },
    
    // Action-specific bonus: gatherWood action is more effective
    { type: 'actionClickMultiplier', target: 'gatherWood', resource: 'wood', value: 2.0, permanent: true },
    
    // Resource-specific bonus: all wood production gets a boost
    { type: 'resourceGain', target: 'wood', value: 5, permanent: true }
  ],
  hidden: false,
  repeatable: false
};
```

---

## 🔧 Implementation Notes

### Data Structure
The achievement bonuses are stored in the game state as:
```typescript
achievementBonuses: {
  // Resource-level bonuses
  resourceGain: { wood: 5, gold: 2 },
  resourceGainMultiplier: { wood: 1.2, all: 1.1 },
  
  // Building-level bonuses
  buildingGain: { 
    woodcutter: { wood: 2 },
    quarry: { stone: 1 }
  },
  buildingGainMultiplier: {
    woodcutter: { wood: 1.5 }
  },
  
  // Click bonuses
  clickGain: { wood: 1, all: 0.5 },
  clickMultiplier: { all: 1.2 },
  actionClickGain: {
    gatherWood: { wood: 2 }
  },
  actionClickMultiplier: {
    gatherWood: { wood: 1.5 }
  },
  
  // Loop bonuses
  loopGain: { wood: 1 },
  loopMultiplier: { all: 1.1 },
  actionLoopGain: {
    gatherWood: { wood: 3 }
  },
  actionLoopMultiplier: {
    gatherWood: { wood: 1.4 }
  }
}
```

### Calculation Order
Bonuses are applied in the following order:
1. **Base production/action values**
2. **Building-specific bonuses** (if applicable)
3. **Action-specific bonuses** (if applicable)
4. **Resource-specific bonuses**
5. **Multipliers** (applied to the final result)

### Performance Considerations
- Building and action-specific bonuses require additional lookups
- Use resource-specific bonuses when possible for better performance
- Action-specific bonuses are most granular but have higher computational cost

---

## 🎮 Gameplay Impact

### Strategic Depth
The granular bonus system allows for:
- **Specialized builds**: Focus on specific resources or actions
- **Balanced progression**: Different paths to power
- **Meaningful choices**: Trade-offs between general and specific bonuses

### Player Experience
- **Clear feedback**: Players can see exactly what each achievement provides
- **Targeted improvements**: Bonuses feel impactful and specific
- **Build variety**: Multiple viable strategies based on achievement choices

---

*Last updated: December 2024*
