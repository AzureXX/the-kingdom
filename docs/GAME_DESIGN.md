# 🎮 Game Design Documentation

This document provides a comprehensive overview of the game systems and mechanics in Medieval Kingdom.

## 🎮 Game Overview

**Medieval Kingdom** is an incremental game where players start with basic resources and gradually expand their kingdom through strategic decision-making. The game features:

- **Resource Management**: Gold, Wood, Stone, Food, Prestige, and Research Points
- **Action System**: 12 configurable actions with unlock conditions and progression
- **Loop Actions System**: 10 automated actions that run continuously with resource costs
- **Building System**: 8 unique buildings with different production capabilities
- **Technology Tree**: 6 technologies that unlock advanced buildings and upgrades
- **Event System**: 8 random events across 4 categories providing choices and consequences
- **Prestige System**: Reset mechanics with permanent upgrades
- **Save System**: Automatic and manual save/load functionality

## 🎯 Core Game Systems

### 1. Resource System
The game features 6 primary resources:

| Resource | Icon | Starting Amount | Description |
|----------|------|----------------|-------------|
| Gold | 🪙 | 10 | Primary currency for purchases |
| Wood | 🌲 | 0 | Basic building material |
| Stone | 🪨 | 0 | Advanced building material |
| Food | 🍖 | 0 | Sustains population and buildings |
| Prestige | 👑 | 0 | Hidden resource for prestige upgrades |
| Research Points | 🔬 | 0 | Hidden resource for technology research |

### 2. Action System
The game features 12 configurable actions that provide active gameplay beyond passive resource generation:

#### Basic Actions (Always Available)
- **🌲 Gather Wood**: +2 wood - Basic resource gathering
- **🪨 Gather Stone**: +1 stone - Basic resource gathering  
- **🍖 Hunt Food**: +1 food - Basic resource gathering

#### Trading Actions (Unlock with Resource Thresholds)
- **💰 Sell Wood**: -10 wood, +5 gold (unlocks at 50+ wood)
- **💰 Sell Stone**: -5 stone, +8 gold (unlocks at 25+ stone)
- **💰 Sell Food**: -20 food, +15 gold (unlocks at 100+ food)

#### Building-Dependent Actions
- **🔨 Craft Tools**: -5 wood, +2 stone (requires Blacksmith)
- **⚔️ Forge Weapons**: -3 stone, +10 gold (requires Blacksmith)
- **🌾 Farm Work**: -2 food, +5 wood (requires Farm)

#### Technology-Dependent Actions
- **🪨 Advanced Mining**: +3 stone (requires Engineering)
- **🔬 Scientific Research**: +2 research points (requires Chemistry)
- **👑 Royal Diplomacy**: +1 prestige (requires Writing)

**Action Features:**
- **Progressive Unlocking**: Actions unlock through building construction, technology research, and resource accumulation
- **One-time Unlocks**: Trading actions become permanently available after first unlock
- **Strategic Choices**: Players must balance resource costs and gains
- **Visual Feedback**: SVG icons and hover tooltips for clear understanding

### 3. Loop Actions System
The game features 10 automated loop actions that run continuously, providing passive resource generation with ongoing costs:

#### Gathering Loop Actions
- **🌾 Basic Gathering**: +5 food (no cost, available from start)
- **⛏️ Continuous Mining**: +10 stone, costs 5 food (requires Quarry)
- **🪓 Continuous Logging**: +8 wood, costs 5 food (requires Woodcutter's Hut)
- **🚜 Continuous Farming**: +12 food, costs 5 food (requires Farm + 100 food)

#### Crafting Loop Actions
- **🔨 Mass Tool Production**: +15 stone, costs 20 wood (requires Blacksmith)
- **⚔️ Weapon Forging**: +25 gold, costs 30 stone (requires Blacksmith)

#### Research Loop Actions
- **📚 Ongoing Research**: +5 research points, costs 10 food (requires Library)
- **🎓 Advanced Studies**: +10 research points, costs 15 food + 5 gold (requires University)

#### Military Loop Actions
- **🛡️ Training Soldiers**: +2 prestige, costs 20 food + 10 gold (requires Castle)
- **🏰 Fortification**: +5 prestige, costs 50 stone + 30 wood + 20 gold (requires Castle)

**Loop Action Features:**
- **Automated Operation**: Actions run continuously once activated
- **Resource Management**: Each action has ongoing costs and gains
- **Progressive Unlocking**: Actions unlock through building construction and resource thresholds
- **Strategic Depth**: Players must balance loop action costs with their resource production
- **Categories**: Actions are organized by type (Gathering, Crafting, Research, Military)

### 4. Building System
8 unique buildings with different production and consumption patterns:

#### Basic Buildings
- **Woodcutter's Hut**: Produces Wood (1.2/s) - Cost: 15 Gold
- **Quarry**: Produces Stone (0.8/s) - Cost: 30 Gold, 5 Wood
- **Farm**: Produces Food (1.5/s) - Cost: 25 Gold, 8 Wood
- **Blacksmith**: Produces Gold (2.5/s), consumes Wood (0.3/s) and Stone (0.2/s) - Cost: 50 Gold, 15 Wood, 10 Stone

#### Advanced Buildings
- **Castle**: Produces Prestige (0.1/s), consumes Food (0.5/s) - Cost: 200 Gold, 50 Wood, 100 Stone, 20 Food
- **Library**: Produces Gold (1.0/s) and Research Points (0.1/s) - Cost: 100 Gold, 30 Wood, 20 Stone - Requires Writing technology
- **University**: Produces Gold (3.0/s), Prestige (0.05/s), and Research Points (0.3/s), consumes Food (1.0/s) - Cost: 300 Gold, 80 Wood, 60 Stone, 30 Food - Requires Writing and Mathematics
- **Laboratory**: Produces Gold (5.0/s), Prestige (0.1/s), and Research Points (0.5/s), consumes Food (2.0/s) - Cost: 500 Gold, 100 Wood, 150 Stone, 50 Food - Requires Chemistry and Engineering

### 5. Technology System
6 technologies that unlock advanced buildings and provide strategic depth. Research is time-based and requires active management:

**Research Mechanics:**
- **Time-based Research**: Each technology has a specific research duration
- **Active Research**: Only one technology can be researched at a time
- **Resource Costs**: Technologies require specific resource combinations
- **Prerequisites**: Some technologies require other technologies to be completed first

| Technology | Cost | Research Time | Unlocks | Prerequisites |
|------------|------|---------------|---------|---------------|
| Writing | 50 Gold, 20 Wood | 30s | Library | None |
| Mathematics | 100 Gold, 30 Wood, 20 Stone | 60s | University | Writing |
| Engineering | 150 Gold, 50 Wood, 40 Stone | 90s | - | Writing, Mathematics |
| Chemistry | 200 Gold, 60 Wood, 50 Stone, 20 Food | 120s | Laboratory | Mathematics, Engineering |
| Physics | 300 Gold, 80 Wood, 70 Stone, 30 Food | 180s | - | Mathematics, Chemistry |
| Biology | 400 Gold, 100 Wood, 90 Stone, 50 Food | 240s | - | Chemistry, Physics |

### 6. Prestige System
Prestige is earned by resetting the game with accumulated Food. The formula is:
```
Prestige = sqrt(Total Food Generated / 1000)
```

Prestige can be spent on 4 permanent upgrades:

| Upgrade | Effect | Cost Formula | Max Level |
|---------|--------|--------------|-----------|
| Royal Decrees | +25% click gains per level | 5 × 1.6^level | 20 |
| Master Craftsmen | -3% building costs per level | 8 × 1.7^level | 25 |
| Fertile Lands | +20% Food production per level | 6 × 1.65^level | 25 |
| Military Might | +20% Prestige production per level | 10 × 1.7^level | 20 |

### 7. Event System
Random events occur at different intervals based on game progression, providing players with choices that affect resources:

**Event Timing:**
- **Initial Events**: 10-30 seconds (faster events for new players)
- **Standard Events**: 1-3 minutes (60-180 seconds)
- **Auto-resolve**: Events automatically resolve after 30 seconds if no choice is made

#### Event Types
- **🛒 Merchant Visit**: Trade resources for Gold
- **⚔️ Bandit Raid**: Lose resources or pay tribute
- **🌾 Bountiful Harvest**: Gain multiple resources
- **🌵 Drought**: Lose Food or accept reduced production
- **👑 Royal Tax**: Pay Gold or lose Prestige
- **👤 Mysterious Stranger**: Trade Gold for Prestige
- **🦠 Plague**: Lose Prestige or accept consequences
- **🎉 Festival**: Gain resources through celebration
