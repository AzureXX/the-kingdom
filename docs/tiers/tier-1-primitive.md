# 🌱 Tier 1: Primitive Beginnings

**Duration**: Minutes 0-45  
**Theme**: Basic survival and tool making  
**Goal**: Establish basic resource gathering and create first tools

## 📊 Resources

### Starting Resources
- **Wood** (0) - Basic building material
- **Stone** (0) - Construction material  
- **Food** (0) - Sustains population

### Unlocked Resources
- **Water** - Essential for survival and crafting
- **Clay** - Used for pottery and construction
- **Fiber** - For rope making and textiles
- **Tools** - Increases efficiency of all actions
- **Knowledge** - Required for research

## 🖱️ Click Actions

### Starting Actions
- 🌲 **Gather Wood** (+3 wood)
- 🪨 **Gather Stone** (+2 stone)
- 🍖 **Hunt Food** (+2 food)

### Unlocked Actions
- 🛏️ **Rest** (Cost: 2 wood, 1 stone → +8 food)
- 🔨 **Craft Basic Tools** (Cost: 8 wood, 5 stone → +1 tools)
- 🧠 **Think and Learn** (Cost: 3 food → +1 knowledge)
- 💧 **Collect Water** (Cost: 1 food → +2 water)
- 🏺 **Dig Clay** (Cost: 2 food → +1 clay)
- 🌿 **Gather Fiber** (Cost: 1 food → +1 fiber)

## 🔄 Loop Actions

### Basic Automation
- 🌾 **Basic Gathering Loop** (Cost: 5 food → +10 wood, +8 stone, +12 food)
- 💧 **Water Collection Loop** (Cost: 3 food → +15 water)

## 🏗️ Buildings

### Basic Structures
- **Primitive Hut** (Cost: 25 wood, 15 stone, 5 food)
  - *Unlocks*: Rest action
- **Tool Workshop** (Cost: 60 wood, 40 stone, 8 tools)
  - *Unlocks*: 2.5x gathering efficiency
- **Study Corner** (Cost: 40 wood, 25 stone, 15 knowledge)
  - *Unlocks*: Research system
- **Crafting Hut** (Cost: 80 wood, 50 stone, 20 clay)
  - *Unlocks*: Advanced crafting

## 🔬 Technology Tree

### Tier 1 Technologies

#### 1. Basic Agriculture
- **Cost**: 150 knowledge
- **Duration**: 3 minutes
- **Unlocks**: 
  - Plant Seeds action
  - Farm building

#### 2. Basic Construction
- **Cost**: 300 knowledge
- **Duration**: 4 minutes
- **Unlocks**: 
  - Advanced Construction action
  - Masonry Workshop building

#### 3. Tool Making
- **Cost**: 200 knowledge, 10 tools
- **Duration**: 2 minutes
- **Unlocks**: 
  - Advanced Tool Crafting action

#### 4. Water Management
- **Cost**: 180 knowledge, 15 water
- **Duration**: 3 minutes
- **Unlocks**: 
  - Water Collection Loop

#### 5. Clay Processing
- **Cost**: 250 knowledge, 20 clay
- **Duration**: 4 minutes
- **Unlocks**: 
  - Pottery Making action

#### 6. Fiber Weaving
- **Cost**: 220 knowledge, 25 fiber
- **Duration**: 3 minutes
- **Unlocks**: 
  - Rope Making action

#### 7. Primitive Medicine
- **Cost**: 400 knowledge, 30 food, 20 water
- **Duration**: 5 minutes
- **Unlocks**: 
  - Healing action

#### 8. Basic Storage
- **Cost**: 350 knowledge, 40 wood, 20 stone
- **Duration**: 4 minutes
- **Unlocks**: 
  - Storage building

### Technology Dependencies
```
Basic Agriculture → Water Management → Primitive Medicine
                → Clay Processing → Basic Storage
                → Fiber Weaving
                → Tool Making → Basic Construction
```

## 🏆 Achievements

### Basic Milestones
- **First Steps** - Gather 100 of each basic resource
  - *Reward*: `{ type: 'clickGain', target: 'wood', value: 0.5, permanent: true }`, `{ type: 'clickGain', target: 'stone', value: 0.5, permanent: true }`, `{ type: 'clickGain', target: 'food', value: 0.5, permanent: true }`
- **Tool Maker** - Craft 500 tools
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'craftTools', resource: 'tools', value: 1.3, permanent: true }`
- **Primitive Builder** - Build 5 primitive buildings
  - *Reward*: `{ type: 'resourceGain', target: 'wood', value: 0.2, permanent: true }`, `{ type: 'resourceGain', target: 'stone', value: 0.2, permanent: true }`, `{ type: 'resourceGain', target: 'food', value: 0.2, permanent: true }`
- **Knowledge Seeker** - Accumulate 1000 knowledge
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'knowledge', value: 1.25, permanent: true }`
- **Clay Master** - Process 1000 clay
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'digClay', resource: 'clay', value: 1.4, permanent: true }`
- **Fiber Weaver** - Create 500 fiber items
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'gatherFiber', resource: 'fiber', value: 1.3, permanent: true }`

### Advanced Milestones
- **Efficient Gatherer** - Gather 5000 of each basic resource
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'wood', value: 1.15, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'stone', value: 1.15, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'food', value: 1.15, permanent: true }`
- **Master Craftsman** - Craft 2000 tools
  - *Reward*: `{ type: 'buildingGainMultiplier', target: 'toolWorkshop', resource: 'tools', value: 1.5, permanent: true }`
- **Architect** - Build 20 primitive buildings
  - *Reward*: `{ type: 'resourceGain', target: 'wood', value: 0.5, permanent: true }`, `{ type: 'resourceGain', target: 'stone', value: 0.5, permanent: true }`, `{ type: 'resourceGain', target: 'food', value: 0.5, permanent: true }`
- **Scholar** - Accumulate 5000 knowledge
  - *Reward*: `{ type: 'buildingGainMultiplier', target: 'studyCorner', resource: 'knowledge', value: 1.4, permanent: true }`
- **Resource Hoarder** - Store 10000 of any single resource
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'wood', value: 1.1, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'stone', value: 1.1, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'food', value: 1.1, permanent: true }`
- **Speed Runner** - Complete Tier 1 in under 30 minutes
  - *Reward*: `{ type: 'clickMultiplier', target: 'wood', value: 1.2, permanent: true }`, `{ type: 'clickMultiplier', target: 'stone', value: 1.2, permanent: true }`, `{ type: 'clickMultiplier', target: 'food', value: 1.2, permanent: true }`

### Hidden Achievements
- **Perfectionist** - Complete all Tier 1 achievements
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'wood', value: 1.25, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'stone', value: 1.25, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'food', value: 1.25, permanent: true }`
- **Click Master** - Perform 1000 manual actions
  - *Reward*: `{ type: 'clickMultiplier', target: 'wood', value: 1.3, permanent: true }`, `{ type: 'clickMultiplier', target: 'stone', value: 1.3, permanent: true }`, `{ type: 'clickMultiplier', target: 'food', value: 1.3, permanent: true }`
- **Loop Pioneer** - Have 2 loop actions running simultaneously
  - *Reward*: `{ type: 'loopMultiplier', target: 'water', value: 1.2, permanent: true }`, `{ type: 'loopMultiplier', target: 'clay', value: 1.2, permanent: true }`

## 👑 Prestige Options

### Tier 1 Prestige Upgrades (Cost: 1-25 prestige)
- **Efficient Gathering** (+50% Tier 1 resource gathering speed)
- **Quick Building** (-15% Tier 1 building construction time)
- **Fast Research** (+30% Tier 1 research speed)
- **Basic Automation** (+25% Tier 1 loop action efficiency)
- **Tool Mastery** (+100% tool crafting efficiency)
- **Knowledge Boost** (+50% knowledge generation)
- **Resource Storage** (+25% resource storage capacity)
- **Click Efficiency** (+25% click action effectiveness)

### Prestige Bonuses
- **Primitive Mastery** - Unlock Tier 1 prestige upgrades
- **Gathering Expert** - All gathering actions 2x more efficient
- **Builder's Wisdom** - All buildings cost 25% less
- **Research Acceleration** - All research 50% faster
- **Automation Pioneer** - All loop actions 50% more efficient

## 🎯 Progression Milestones

### Milestone 1: Basic Shelter (5-10 minutes)
- Build Primitive Hut
- Unlock Rest action
- Learn basic resource management

### Milestone 2: Tool Making (10-20 minutes)
- Craft first tools
- Build Tool Workshop
- Experience efficiency improvements

### Milestone 3: Knowledge Discovery (20-30 minutes)
- Generate first knowledge
- Build Study Corner
- Unlock research system

### Milestone 4: Basic Automation (30-45 minutes)
- Unlock Water, Clay, Fiber
- Activate first loop actions
- Master primitive automation
- **Unlock Tier 2 progression**

## 📈 Balancing Notes

### Resource Ratios
- Wood:Stone:Food = 1:1:1 (basic balance)
- Tools provide 2.5x efficiency multiplier
- Knowledge unlocks advanced systems

### Time Scaling
- 5-15 minutes per milestone
- Total tier completion: 30-45 minutes
- First prestige available after 45 minutes

### Complexity Management
- Start with 3 resources, expand to 6
- 6 click actions, 2 loop actions
- 4 buildings with clear progression
- 2 research projects with meaningful unlocks
