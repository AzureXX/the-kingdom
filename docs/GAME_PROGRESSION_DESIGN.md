# 🎮 Medieval Kingdom - Game Progression Design

## 📋 Overview

This document outlines the complete progression flow for Medieval Kingdom, transforming it from a functionality test into a comprehensive idle game with 50+ resources, extensive achievements, buildings, actions, and strategic depth.
This is just blueprint of possible design and not how it was implemented now.

## 🎯 Design Principles

### Core Progression Philosophy
- **Gradual Unlocks**: Each milestone unlocks 1-3 new elements
- **Meaningful Choices**: Players must make strategic decisions about resource allocation
- **Clear Progression**: Each phase has distinct goals and mechanics
- **Balanced Complexity**: Complexity increases gradually without overwhelming players
- **Multiple Paths**: Different strategies lead to different progression routes

### Resource Categories
- **Basic Resources** (Tier 1): Wood, Stone, Food, Water
- **Crafted Resources** (Tier 2): Tools, Weapons, Cloth, Pottery
- **Advanced Resources** (Tier 3): Steel, Glass, Medicine, Books
- **Specialized Resources** (Tier 4): Gems, Spices, Artifacts, Magic
- **Prestige Resources** (Tier 5): Divine Favor, Ancient Knowledge, Cosmic Energy

---

## 🌱 Phase 1: Primitive Beginnings (Minutes 0-30)

### Starting State
- **Resources**: Wood (0), Stone (0), Food (0), Water (0)
- **Actions Available**: 
  - 🌲 Gather Wood (+2 wood)
  - 🪨 Gather Stone (+1 stone)
  - 🍖 Hunt Food (+1 food)
  - 💧 Collect Water (+1 water)

### First Milestone: Basic Shelter
**Goal**: Build your first building
- **Building Unlock**: Primitive Hut (Cost: 20 wood, 10 stone)
- **Reward**: Unlocks "Rest" action (+5 food, +3 water)
- **New Action**: 🛏️ Rest (Cost: 1 wood, 1 stone)

### Second Milestone: Tool Making
**Goal**: Create your first tools
- **Resource Unlock**: Tools
- **New Action**: 🔨 Craft Basic Tools (Cost: 5 wood, 3 stone → +1 tools)
- **Building Unlock**: Tool Workshop (Cost: 50 wood, 30 stone, 5 tools)
- **Reward**: All gathering actions become 2x more efficient

### Third Milestone: Knowledge Discovery
**Goal**: Begin the path of learning
- **Resource Unlock**: Knowledge
- **New Action**: 🧠 Think and Learn (Cost: 2 food, 1 water → +1 knowledge)
- **Building Unlock**: Study Corner (Cost: 30 wood, 20 stone, 10 knowledge)
- **Reward**: Unlocks Research system

---

## 🔬 Phase 2: Early Civilization (Minutes 30-120)

### Research System Introduction
**First Research**: Basic Agriculture
- **Cost**: 100 knowledge
- **Duration**: 2 minutes
- **Unlocks**: 
  - 🌾 Plant Seeds action (Cost: 3 water → +2 food)
  - 🏡 Farm building (Cost: 100 wood, 50 stone, 20 tools)

### Resource Expansion
**New Resources**:
- **Clay** (from Clay Pit action)
- **Fiber** (from Plant Fibers action)
- **Leather** (from Process Hides action)

**New Buildings**:
- **Clay Pit** (Cost: 40 wood, 20 stone)
- **Weaving Hut** (Cost: 60 wood, 30 stone, 10 fiber)
- **Tannery** (Cost: 80 wood, 40 stone, 15 leather)

### Second Research: Basic Construction
- **Cost**: 200 knowledge
- **Duration**: 3 minutes
- **Unlocks**: 
  - 🧱 Make Bricks action (Cost: 2 clay, 1 water → +1 bricks)
  - 🏗️ Masonry Workshop building

---

## 🏰 Phase 3: Medieval Development (Hours 2-8)

### Advanced Resource Production
**New Resources**:
- **Iron Ore** (from Mining action)
- **Coal** (from Coal Mining action)
- **Wool** (from Sheep Herding action)
- **Grain** (from Advanced Farming action)

**New Buildings**:
- **Iron Mine** (Cost: 200 wood, 100 stone, 50 tools)
- **Coal Mine** (Cost: 150 wood, 80 stone, 40 tools)
- **Sheep Farm** (Cost: 120 wood, 60 stone, 30 tools)
- **Windmill** (Cost: 300 wood, 150 stone, 100 tools)

### Technology Tree Expansion
**Research Options**:
1. **Metallurgy** (Cost: 500 knowledge, 2 iron ore)
   - Unlocks: Iron Smelting, Blacksmith Workshop
2. **Textile Production** (Cost: 400 knowledge, 5 wool)
   - Unlocks: Loom, Cloth Production
3. **Advanced Agriculture** (Cost: 600 knowledge, 10 grain)
   - Unlocks: Crop Rotation, Advanced Farm

### Achievement System Introduction
**Early Achievements**:
- **First Builder**: Build your first building
- **Tool Master**: Craft 100 tools
- **Knowledge Seeker**: Accumulate 1000 knowledge
- **Resource Collector**: Gather 1000 of each basic resource

---

## ⚔️ Phase 4: Military and Trade (Hours 8-24)

### Military System
**New Resources**:
- **Weapons** (from Weapon Crafting)
- **Armor** (from Armor Making)
- **Horses** (from Horse Breeding)
- **Gold** (from Gold Mining)

**New Buildings**:
- **Barracks** (Cost: 500 wood, 300 stone, 100 iron)
- **Armory** (Cost: 400 wood, 250 stone, 150 iron)
- **Stables** (Cost: 300 wood, 200 stone, 50 horses)
- **Gold Mine** (Cost: 600 wood, 400 stone, 200 tools)

### Trade System Introduction
**New Actions**:
- 💰 Trade with Merchants (Exchange resources for gold)
- 🚢 Send Trade Caravans (Cost: 50 gold → +various resources)
- 🏪 Build Market (Cost: 800 wood, 500 stone, 200 gold)

### Advanced Research
**Research Options**:
1. **Military Tactics** (Cost: 1000 knowledge, 10 weapons)
2. **Trade Routes** (Cost: 800 knowledge, 100 gold)
3. **Engineering** (Cost: 1200 knowledge, 20 tools)

---

## 🏛️ Phase 5: Kingdom Building (Hours 24-72)

### Government System
**New Resources**:
- **Laws** (from Legal System)
- **Taxes** (from Tax Collection)
- **Diplomacy** (from Diplomatic Relations)
- **Culture** (from Cultural Activities)

**New Buildings**:
- **Town Hall** (Cost: 1000 wood, 800 stone, 500 gold)
- **Courthouse** (Cost: 800 wood, 600 stone, 300 gold)
- **Embassy** (Cost: 1200 wood, 900 stone, 700 gold)
- **Theater** (Cost: 600 wood, 400 stone, 200 gold)

### Advanced Crafting
**New Resources**:
- **Steel** (from Steel Production)
- **Glass** (from Glass Making)
- **Pottery** (from Pottery Workshop)
- **Jewelry** (from Jewelry Crafting)

### Prestige System Introduction
**Prestige Mechanics**:
- **Prestige Points**: Earned by completing major milestones
- **Prestige Upgrades**: Permanent bonuses that persist across resets
- **Prestige Buildings**: Special buildings that provide unique benefits

---

## 🌟 Phase 6: Advanced Civilization (Hours 72-168)

### Magic and Mysticism
**New Resources**:
- **Mana** (from Meditation)
- **Crystals** (from Crystal Mining)
- **Herbs** (from Herb Gathering)
- **Artifacts** (from Archaeological Digs)

**New Buildings**:
- **Mage Tower** (Cost: 2000 wood, 1500 stone, 1000 gold, 100 mana)
- **Crystal Cave** (Cost: 1500 wood, 1000 stone, 500 gold)
- **Herb Garden** (Cost: 800 wood, 600 stone, 300 gold)
- **Archaeological Site** (Cost: 3000 wood, 2000 stone, 1500 gold)

### Advanced Technology
**Research Options**:
1. **Magic Theory** (Cost: 5000 knowledge, 100 mana)
2. **Advanced Engineering** (Cost: 4000 knowledge, 50 steel)
3. **Cultural Studies** (Cost: 3000 knowledge, 100 culture)

---

## 🚀 Phase 7: Space Age (Hours 168+)

### Cosmic Resources
**New Resources**:
- **Stardust** (from Stellar Observation)
- **Cosmic Energy** (from Energy Harvesting)
- **Alien Artifacts** (from Space Exploration)
- **Quantum Matter** (from Quantum Research)

**New Buildings**:
- **Observatory** (Cost: 5000 wood, 3000 stone, 2000 gold, 500 mana)
- **Energy Collector** (Cost: 4000 wood, 2500 stone, 1500 gold)
- **Space Port** (Cost: 10000 wood, 8000 stone, 5000 gold, 1000 stardust)
- **Quantum Lab** (Cost: 8000 wood, 6000 stone, 4000 gold, 500 cosmic energy)

---

## 🏆 Achievement System Design

### Achievement Categories

#### Resource Achievements
- **Basic Gatherer**: Gather 1000 of each basic resource
- **Master Craftsman**: Craft 1000 of each crafted resource
- **Resource Hoarder**: Accumulate 100,000 of any single resource
- **Balanced Economy**: Maintain 10,000 of each resource simultaneously

#### Building Achievements
- **First Builder**: Build your first building
- **Architect**: Build 100 buildings total
- **City Planner**: Build 10 of each building type
- **Metropolis**: Build 1000 buildings total

#### Research Achievements
- **Scholar**: Complete 10 research projects
- **Scientist**: Complete 50 research projects
- **Genius**: Complete 100 research projects
- **Innovator**: Complete all available research

#### Action Achievements
- **Clicker**: Perform 1000 manual actions
- **Automation Master**: Have 50 loop actions running simultaneously
- **Efficiency Expert**: Complete 1000 actions in a single session
- **Action Hero**: Perform every available action at least once

#### Prestige Achievements
- **First Prestige**: Complete your first prestige
- **Prestige Master**: Complete 10 prestiges
- **Prestige Legend**: Complete 100 prestiges
- **Prestige God**: Complete 1000 prestiges

#### Hidden Achievements
- **Secret Discoverer**: Find 10 hidden achievements
- **Mystery Solver**: Solve all hidden puzzles
- **Legendary Player**: Unlock all achievements

---

## 🔄 Loop Action Progression

### Early Loop Actions
1. **Basic Gathering Loop** (Cost: 5 food)
   - Produces: +10 wood, +8 stone, +12 food
2. **Tool Production Loop** (Cost: 20 wood, 10 stone)
   - Produces: +5 tools
3. **Knowledge Generation Loop** (Cost: 15 food, 10 water)
   - Produces: +3 knowledge

### Mid-Game Loop Actions
1. **Industrial Production Loop** (Cost: 50 iron, 30 coal)
   - Produces: +20 steel, +15 tools
2. **Trade Loop** (Cost: 100 gold)
   - Produces: +50 of random resources
3. **Research Loop** (Cost: 200 knowledge)
   - Produces: +10 research progress

### Late-Game Loop Actions
1. **Cosmic Energy Loop** (Cost: 1000 stardust)
   - Produces: +100 cosmic energy, +50 quantum matter
2. **Universal Knowledge Loop** (Cost: 5000 knowledge)
   - Produces: +1000 universal knowledge
3. **Divine Favor Loop** (Cost: 10000 prestige)
   - Produces: +100 divine favor

---

## 🎯 Event System Progression

### Early Events
- **Merchant Visit**: Trade resources for gold
- **Bandit Raid**: Lose resources or pay tribute
- **Bountiful Harvest**: Gain multiple resources
- **Drought**: Lose food or accept reduced production

### Mid-Game Events
- **Royal Tax**: Pay gold or lose prestige
- **Mysterious Stranger**: Trade gold for prestige
- **Plague**: Lose prestige or accept consequences
- **Festival**: Gain resources through celebration

### Late-Game Events
- **Cosmic Storm**: Gain cosmic energy or lose resources
- **Alien Contact**: Trade for alien artifacts
- **Divine Intervention**: Gain divine favor
- **Universal Crisis**: Major resource loss with prestige gain

---

## 📊 Prestige System Design

### Prestige Calculation
```
Prestige = sqrt(Total Resources Generated / 10000) + 
           sqrt(Total Buildings Built / 100) + 
           sqrt(Total Research Completed / 10)
```

### Prestige Upgrades

#### Tier 1 Upgrades (Cost: 1-10 prestige)
- **Efficient Gathering**: +25% resource gathering speed
- **Quick Building**: -10% building construction time
- **Fast Research**: +20% research speed

#### Tier 2 Upgrades (Cost: 10-100 prestige)
- **Resource Multiplier**: +50% all resource production
- **Building Discount**: -25% all building costs
- **Action Efficiency**: +100% all action effectiveness

#### Tier 3 Upgrades (Cost: 100-1000 prestige)
- **Prestige Multiplier**: +200% prestige gain
- **Universal Knowledge**: Unlock advanced research
- **Cosmic Awareness**: Unlock space-age content

#### Tier 4 Upgrades (Cost: 1000+ prestige)
- **Divine Favor**: Unlock divine resources
- **Universal Mastery**: +500% all production
- **Infinite Wisdom**: Unlock all content

---

## 🎮 User Experience Flow

### Onboarding (First 5 minutes)
1. **Tutorial**: Guide player through first 3 actions
2. **First Building**: Help build Primitive Hut
3. **First Research**: Guide through Basic Agriculture
4. **Achievement**: Celebrate first achievement

### Early Game (Minutes 5-60)
1. **Resource Management**: Teach resource balancing
2. **Building Strategy**: Show building synergies
3. **Research Planning**: Explain research benefits
4. **Achievement Hunting**: Encourage exploration

### Mid Game (Hours 1-24)
1. **Complex Systems**: Introduce advanced mechanics
2. **Strategic Choices**: Present meaningful decisions
3. **Prestige Planning**: Prepare for first prestige
4. **Content Exploration**: Unlock new areas

### Late Game (Hours 24+)
1. **Optimization**: Focus on efficiency
2. **Prestige Cycles**: Master prestige mechanics
3. **Achievement Completion**: Hunt remaining achievements
4. **Content Mastery**: Unlock all systems

---

## 📈 Balancing Considerations

### Resource Ratios
- **Basic Resources**: 1:1:1:1 (Wood:Stone:Food:Water)
- **Crafted Resources**: 3:2:1 (Tools:Weapons:Armor)
- **Advanced Resources**: 5:3:2:1 (Steel:Glass:Pottery:Jewelry)
- **Specialized Resources**: 10:5:2:1 (Gems:Spices:Artifacts:Magic)

### Time Scaling
- **Early Game**: 1-5 minutes per milestone
- **Mid Game**: 10-30 minutes per milestone
- **Late Game**: 1-3 hours per milestone
- **End Game**: 6-24 hours per milestone

### Complexity Curve
- **Phase 1**: 4 resources, 4 actions, 1 building
- **Phase 2**: 8 resources, 8 actions, 4 buildings
- **Phase 3**: 15 resources, 15 actions, 10 buildings
- **Phase 4**: 25 resources, 25 actions, 20 buildings
- **Phase 5**: 40 resources, 40 actions, 35 buildings
- **Phase 6**: 50+ resources, 50+ actions, 50+ buildings

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Implement basic resource system
- [ ] Create first 4 actions
- [ ] Build Primitive Hut
- [ ] Add basic achievement system

### Phase 2: Expansion (Week 3-4)
- [ ] Add research system
- [ ] Implement 8 new resources
- [ ] Create 4 new buildings
- [ ] Add loop actions

### Phase 3: Complexity (Week 5-8)
- [ ] Implement military system
- [ ] Add trade mechanics
- [ ] Create advanced buildings
- [ ] Expand achievement system

### Phase 4: Advanced Features (Week 9-12)
- [ ] Add prestige system
- [ ] Implement magic system
- [ ] Create space-age content
- [ ] Add hidden achievements

### Phase 5: Polish (Week 13-16)
- [ ] Balance all systems
- [ ] Add visual effects
- [ ] Implement sound system
- [ ] Create comprehensive tutorial

---

## 📝 Notes for Implementation

### Configuration Structure
- Each phase should have its own configuration file
- Resources should be organized by tier
- Buildings should have clear unlock conditions
- Research should have proper prerequisites

### Performance Considerations
- Implement lazy loading for late-game content
- Use efficient data structures for large resource counts
- Optimize rendering for 50+ resources
- Implement proper caching for calculations

### User Interface
- Create expandable resource panels
- Implement search and filtering for achievements
- Add progress indicators for all systems
- Create comprehensive help system

---

*This document serves as the master blueprint for transforming Medieval Kingdom from a functionality test into a comprehensive idle game experience. Each section should be expanded with detailed specifications as development progresses.*
