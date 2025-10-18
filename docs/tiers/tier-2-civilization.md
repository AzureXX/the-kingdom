# 🔨 Tier 2: Early Civilization

**Duration**: Minutes 45-120  
**Theme**: Crafting, trade, and early civilization building  
**Goal**: Master primitive crafting and establish trade networks

## 📊 Resources

### New Resources
- **Weapons** - For defense and trade
- **Cloth** - For clothing and advanced crafting
- **Pottery** - For storage and trade goods
- **Leather** - For armor and advanced items
- **Bricks** - For advanced construction
- **Rope** - For construction and tools

### Total Resources: 12 (6 from Tier 1 + 6 new)

## 🖱️ Click Actions

### New Click Actions
- ⚔️ **Craft Weapons** (Cost: 5 tools, 3 stone → +1 weapons)
- 🧵 **Weave Cloth** (Cost: 8 fiber, 2 tools → +1 cloth)
- 🏺 **Make Pottery** (Cost: 4 clay, 2 water → +1 pottery)
- 🦌 **Process Hides** (Cost: 3 food, 2 tools → +1 leather)
- 🧱 **Make Bricks** (Cost: 3 clay, 2 water → +1 bricks)
- 🪢 **Weave Rope** (Cost: 5 fiber → +1 rope)

### Advanced Actions
- 🌾 **Plant Seeds** (Cost: 4 water, 2 fiber → +3 food)
- 🏗️ **Advanced Construction** (Cost: 10 bricks, 5 rope → +1 advanced materials)
- 👕 **Make Clothing** (Cost: 5 cloth, 2 rope → +1 clothing)

## 🔄 Loop Actions

### New Loop Actions
- 🔨 **Tool Production Loop** (Cost: 25 wood, 15 stone → +8 tools)
- ⚔️ **Weapon Crafting Loop** (Cost: 40 tools, 25 stone → +12 weapons)
- 🧵 **Cloth Weaving Loop** (Cost: 50 fiber, 15 tools → +10 cloth)
- 🏺 **Pottery Production Loop** (Cost: 30 clay, 20 water → +8 pottery)
- 🦌 **Leather Processing Loop** (Cost: 25 food, 20 tools → +6 leather)

## 🏗️ Buildings

### Crafting Buildings
- **Weapon Workshop** (Cost: 100 wood, 60 stone, 20 tools, 15 weapons)
- **Weaving Hut** (Cost: 80 wood, 40 stone, 15 tools, 20 cloth)
- **Pottery Workshop** (Cost: 90 wood, 50 stone, 25 clay, 12 pottery)
- **Tannery** (Cost: 110 wood, 70 stone, 30 tools, 18 leather)

### Advanced Buildings
- **Farm** (Cost: 120 wood, 60 stone, 25 tools)
- **Masonry Workshop** (Cost: 150 wood, 100 stone, 50 bricks)
- **Textile Mill** (Cost: 200 wood, 120 stone, 80 cloth)

## 🔬 Technology Tree

### Tier 2 Technologies

#### 1. Textile Production
- **Cost**: 400 knowledge
- **Duration**: 5 minutes
- **Unlocks**: 
  - Make Clothing action
  - Textile Mill building

#### 2. Advanced Agriculture
- **Cost**: 600 knowledge
- **Duration**: 6 minutes
- **Unlocks**: 
  - Crop Rotation action
  - Advanced Farm building

#### 3. Trade Networks
- **Cost**: 800 knowledge
- **Duration**: 8 minutes
- **Unlocks**: 
  - Trade Caravan action
  - Market building

#### 4. Weapon Crafting
- **Cost**: 500 knowledge, 20 weapons
- **Duration**: 4 minutes
- **Unlocks**: 
  - Advanced Weapon Crafting action

#### 5. Pottery Mastery
- **Cost**: 450 knowledge, 30 pottery
- **Duration**: 5 minutes
- **Unlocks**: 
  - Advanced Pottery action

#### 6. Leather Working
- **Cost**: 550 knowledge, 25 leather
- **Duration**: 6 minutes
- **Unlocks**: 
  - Advanced Leather Processing action

#### 7. Brick Making
- **Cost**: 400 knowledge, 40 bricks
- **Duration**: 4 minutes
- **Unlocks**: 
  - Advanced Brick Making action

#### 8. Rope Making
- **Cost**: 350 knowledge, 30 rope
- **Duration**: 3 minutes
- **Unlocks**: 
  - Advanced Rope Making action

#### 9. Social Organization
- **Cost**: 700 knowledge, 50 food
- **Duration**: 7 minutes
- **Unlocks**: 
  - Leadership action

#### 10. Advanced Construction
- **Cost**: 600 knowledge, 60 bricks, 40 rope
- **Duration**: 6 minutes
- **Unlocks**: 
  - Monument Building action

### Technology Dependencies
```
Textile Production → Social Organization
Advanced Agriculture → Advanced Construction
Trade Networks → Social Organization
Weapon Crafting → Advanced Construction
Pottery Mastery → Social Organization
Leather Working → Advanced Construction
Brick Making → Advanced Construction
Rope Making → Advanced Construction
```

## 🏆 Achievements

### Crafting Mastery
- **Weapon Smith** - Craft 1000 weapons
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'craftWeapons', resource: 'weapons', value: 1.4, permanent: true }`
- **Textile Master** - Weave 1000 cloth
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'weaveCloth', resource: 'cloth', value: 1.4, permanent: true }`
- **Pottery Artist** - Create 500 pottery
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'makePottery', resource: 'pottery', value: 1.5, permanent: true }`
- **Leather Worker** - Process 1000 leather
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'processLeather', resource: 'leather', value: 1.4, permanent: true }`
- **Brick Maker** - Create 2000 bricks
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'makeBricks', resource: 'bricks', value: 1.3, permanent: true }`
- **Rope Weaver** - Weave 1000 rope
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'weaveRope', resource: 'rope', value: 1.4, permanent: true }`

### Building Achievements
- **Early Architect** - Build 20 buildings
  - *Reward*: `{ type: 'resourceGain', target: 'wood', value: 0.5, permanent: true }`, `{ type: 'resourceGain', target: 'stone', value: 0.5, permanent: true }`, `{ type: 'resourceGain', target: 'food', value: 0.5, permanent: true }`
- **Crafting Center** - Build 10 crafting buildings
  - *Reward*: `{ type: 'buildingGainMultiplier', target: 'weaponWorkshop', resource: 'weapons', value: 1.1, permanent: true }`, `{ type: 'buildingGainMultiplier', target: 'textileMill', resource: 'cloth', value: 1.1, permanent: true }`
- **Trade Hub** - Build Market and 5 trade buildings
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'gold', value: 1.3, permanent: true }`
- **Agricultural Expert** - Build 5 farms
  - *Reward*: `{ type: 'buildingGainMultiplier', target: 'farm', resource: 'food', value: 1.4, permanent: true }`
- **Construction Master** - Build 15 advanced buildings
  - *Reward*: `{ type: 'resourceGain', target: 'wood', value: 0.8, permanent: true }`, `{ type: 'resourceGain', target: 'stone', value: 0.8, permanent: true }`, `{ type: 'resourceGain', target: 'bricks', value: 0.8, permanent: true }`

### Resource Achievements
- **Resource Collector** - Gather 10000 of each basic resource
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'wood', value: 1.2, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'stone', value: 1.2, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'food', value: 1.2, permanent: true }`
- **Crafted Goods** - Produce 5000 of each crafted resource
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'weapons', value: 1.15, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'cloth', value: 1.15, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'pottery', value: 1.15, permanent: true }`
- **Trade Pioneer** - Complete 100 trades
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'trade', resource: 'gold', value: 1.3, permanent: true }`
- **Efficiency Expert** - Maintain 50% efficiency bonus for 1 hour
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'wood', value: 1.1, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'stone', value: 1.1, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'food', value: 1.1, permanent: true }`
- **Storage Master** - Store 50000 of any single resource
  - *Reward*: `{ type: 'resourceGain', target: 'wood', value: 0.3, permanent: true }`, `{ type: 'resourceGain', target: 'stone', value: 0.3, permanent: true }`, `{ type: 'resourceGain', target: 'food', value: 0.3, permanent: true }`

### Hidden Achievements
- **Crafting Perfectionist** - Complete all crafting achievements
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'weapons', value: 1.3, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'cloth', value: 1.3, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'pottery', value: 1.3, permanent: true }`
- **Trade Master** - Complete 1000 trades
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'trade', resource: 'gold', value: 1.5, permanent: true }`
- **Building Enthusiast** - Build 100 buildings total
  - *Reward*: `{ type: 'buildingGainMultiplier', target: 'farm', resource: 'food', value: 1.2, permanent: true }`, `{ type: 'buildingGainMultiplier', target: 'woodcutter', resource: 'wood', value: 1.2, permanent: true }`
- **Resource Hoarder** - Store 100000 of any single resource
  - *Reward*: `{ type: 'resourceGain', target: 'wood', value: 0.5, permanent: true }`, `{ type: 'resourceGain', target: 'stone', value: 0.5, permanent: true }`, `{ type: 'resourceGain', target: 'food', value: 0.5, permanent: true }`
- **Speed Builder** - Complete Tier 2 in under 60 minutes
  - *Reward*: `{ type: 'clickMultiplier', target: 'wood', value: 1.25, permanent: true }`, `{ type: 'clickMultiplier', target: 'stone', value: 1.25, permanent: true }`, `{ type: 'clickMultiplier', target: 'food', value: 1.25, permanent: true }`

## 👑 Prestige Options

### Tier 2 Prestige Upgrades (Cost: 25-100 prestige)
- **Crafting Mastery** (+75% Tier 2 resource production)
- **Building Discount** (-30% Tier 2 building costs)
- **Action Efficiency** (+100% Tier 2 action effectiveness)
- **Trade Bonus** (+50% trade value)
- **Weapon Expertise** (+150% weapon crafting efficiency)
- **Textile Mastery** (+125% cloth production)
- **Pottery Artistry** (+100% pottery creation)
- **Leather Crafting** (+125% leather processing)
- **Construction Speed** (+50% building construction speed)
- **Research Acceleration** (+75% research speed)

### Prestige Bonuses
- **Civilization Mastery** - Unlock Tier 2 prestige upgrades
- **Crafting Expert** - All crafted resources 2x more efficient
- **Trade Network** - All trades provide 50% more value
- **Building Efficiency** - All buildings cost 30% less
- **Research Pioneer** - All research 75% faster
- **Automation Expert** - All loop actions 75% more efficient

## 🎯 Progression Milestones

### Milestone 1: Crafting Introduction (45-60 minutes)
- Unlock first crafted resources
- Build Weapon Workshop
- Experience crafting efficiency

### Milestone 2: Textile Production (60-80 minutes)
- Master cloth and rope production
- Build Weaving Hut
- Unlock advanced clothing

### Milestone 3: Advanced Construction (80-100 minutes)
- Master brick and pottery production
- Build Masonry Workshop
- Unlock advanced buildings

### Milestone 4: Trade Networks (100-120 minutes)
- Establish trade systems
- Build Market
- Master resource exchange
- **Unlock Tier 3 progression**

## 📈 Balancing Notes

### Resource Ratios
- Basic:Crafted = 3:2 (3 basic resources for 2 crafted)
- Tools:Weapons:Cloth = 3:2:2
- Bricks:Rope:Pottery = 1:1:1

### Time Scaling
- 15-30 minutes per milestone
- Total tier completion: 60-120 minutes
- Prestige available after 120 minutes

### Complexity Management
- 12 total resources (6 new)
- 12 click actions (6 new)
- 5 loop actions (3 new)
- 7 buildings (3 new)
- 3 research projects with meaningful unlocks
