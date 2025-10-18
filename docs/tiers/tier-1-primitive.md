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
- **Gather Wood** (+3 wood)
- **Gather Stone** (+2 stone)
- **Hunt Food** (+2 food)

### Unlocked Actions
- **Rest** (Cost: 2 wood, 1 stone → +8 food)
- **Craft Basic Tools** (Cost: 8 wood, 5 stone → +1 tools)
- **Think and Learn** (Cost: 3 food → +1 knowledge)
- **Collect Water** (Cost: 1 food → +2 water)
- **Dig Clay** (Cost: 2 food → +1 clay)
- **Gather Fiber** (Cost: 1 food → +1 fiber)

## 🔄 Loop Actions

### Basic Automation
- **Basic Gathering Loop** (Cost: 5 food → +10 wood, +8 stone, +12 food)
- **Water Collection Loop** (Cost: 3 food → +15 water)

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

## 🎲 Events

### Natural Events
- **Bountiful Harvest** 🌾 - Wild plants and berries are unusually abundant *(No requirements)*
  - *Choice 1*: Gather Everything → +15 food, +5 wood
  - *Choice 2*: Share with Others → +8 food, +2 knowledge
- **Stormy Weather** ⛈️ - A fierce storm approaches requiring shelter *(Requires: 5 wood)*
  - *Choice 1*: Wait it Out → (no cost/gain)
  - *Choice 2*: Build Emergency Shelter → +10 water, -8 wood, -5 stone

### Discovery Events
- **Ancient Cave** 🕳️ - Discover a mysterious cave with primitive drawings *(Requires: 5 stone)*
  - *Choice 1*: Mark the Location → +2 knowledge
  - *Choice 2*: Explore the Cave → +5 knowledge, +8 stone, -2 food
- **Rich Clay Deposit** 🏺 - Find a particularly rich clay deposit *(Requires: 5 water)*
  - *Choice 1*: Mark the Location → (no cost/gain)
  - *Choice 2*: Study the Formation → +6 clay, +3 knowledge, -1 food
  - *Choice 3*: Mine the Clay → +12 clay, +5 water, -3 food

### Social Events
- **Wandering Trader** 🧳 - A friendly trader passes through with primitive goods *(Requires: 3 knowledge)*
  - *Choice 1*: Exchange Pleasantries → (no cost/gain)
  - *Choice 2*: Share Knowledge → +4 knowledge, +2 food, -2 knowledge
  - *Choice 3*: Trade for Tools → +3 tools, -8 food, -5 wood

### Challenge Events
- **Wild Animal Encounter** 🐺 - A wild animal approaches your camp *(Requires: 15 food)*
  - *Choice 1*: Stay Still and Quiet → (no cost/gain)
  - *Choice 2*: Scare it Away → +3 food, -2 wood
  - *Choice 3*: Hunt the Animal → +12 food, +3 fiber, -1 tools
- **Fiber Discovery** 🌿 - Discover a new type of plant with strong fibers *(Requires: 3 fiber)*
  - *Choice 1*: Observe from Afar → (no cost/gain)
  - *Choice 2*: Study the Plant → +5 fiber, +4 knowledge, -1 food
  - *Choice 3*: Harvest the Fibers → +10 fiber, +2 knowledge, -2 food

### Learning Events
- **Primitive Invention** 💡 - Have a breakthrough idea while working with tools *(Requires: 2 tools)*
  - *Choice 1*: Think About It → (no cost/gain)
  - *Choice 2*: Document the Idea → +5 knowledge, -1 food
  - *Choice 3*: Build the Invention → +2 tools, +3 knowledge, -6 wood, -4 stone, -2 food

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

## 👑 Prestige Upgrades

### Available Immediately (0 prestige required)
- **Primitive Mastery** - +25% click gains per level
- **Gathering Expert** - +50% wood and stone gathering efficiency per level
- **Builder's Wisdom** - -25% building costs per level
- **Tool Mastery** - +100% tool crafting efficiency per level
- **Knowledge Boost** - +50% knowledge generation per level
- **Click Efficiency** - +25% click action effectiveness per level

### Requires 100 Prestige
- **Research Acceleration** - +50% knowledge generation per level
- **Automation Pioneer** - +50% loop action efficiency per level
- **Resource Storage** - +25% all resource production per level
- **Fast Research** - +30% knowledge generation per level
- **Basic Automation** - +25% Tier 1 loop action efficiency per level

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
