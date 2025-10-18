# ⚒️ Tier 3: Industrial Revolution

**Duration**: Hours 2-6  
**Theme**: Industrial production, metallurgy, and mass manufacturing  
**Goal**: Master industrial production and establish manufacturing systems

## 📊 Resources

### New Resources
- **Iron Ore** - Raw material for steel production
- **Steel** - Advanced construction and tool material
- **Coal** - Fuel for industrial processes
- **Glass** - For advanced construction and technology
- **Cement** - For modern construction
- **Wire** - For electrical and mechanical systems

### Total Resources: 18 (12 from previous tiers + 6 new)

## 🖱️ Click Actions

### New Click Actions
- ⛏️ **Mine Iron Ore** (Cost: 10 tools, 5 food → +2 iron ore)
- 🪨 **Mine Coal** (Cost: 8 tools, 4 food → +2 coal)
- 🔥 **Smelt Steel** (Cost: 3 iron ore, 2 coal → +1 steel)
- 🔮 **Make Glass** (Cost: 5 sand, 3 coal → +1 glass)
- 🏗️ **Make Cement** (Cost: 4 stone, 2 clay, 1 coal → +1 cement)
- 🔌 **Draw Wire** (Cost: 2 steel, 1 tools → +1 wire)

### Advanced Actions
- 🏭 **Industrial Production** (Cost: 20 steel, 10 coal → +5 industrial goods)
- ⚡ **Generate Power** (Cost: 15 coal, 10 wire → +3 power)
- 🔧 **Machine Assembly** (Cost: 25 steel, 15 wire → +2 machines)

## 🔄 Loop Actions

### New Loop Actions
- ⛏️ **Iron Mining Loop** (Cost: 60 tools, 30 food → +20 iron ore)
- 🪨 **Coal Mining Loop** (Cost: 50 tools, 25 food → +18 coal)
- 🔥 **Steel Production Loop** (Cost: 80 iron ore, 50 coal → +25 steel)
- 🔮 **Glass Making Loop** (Cost: 40 sand, 25 coal → +15 glass)
- 🏗️ **Cement Production Loop** (Cost: 50 stone, 30 clay, 15 coal → +20 cement)
- 🔌 **Wire Drawing Loop** (Cost: 35 steel, 20 tools → +18 wire)
- 🏭 **Industrial Production Loop** (Cost: 100 steel, 60 coal → +30 industrial goods)
- ⚡ **Power Generation Loop** (Cost: 80 coal, 50 wire → +25 power)

## 🏗️ Buildings

### Industrial Buildings
- **Iron Mine** (Cost: 250 wood, 150 stone, 80 tools, 20 iron ore)
- **Coal Mine** (Cost: 200 wood, 120 stone, 60 tools, 15 coal)
- **Steel Foundry** (Cost: 300 wood, 200 stone, 100 tools, 50 steel)
- **Glass Workshop** (Cost: 180 wood, 100 stone, 40 tools, 30 glass)
- **Cement Plant** (Cost: 220 wood, 140 stone, 60 tools, 25 cement)
- **Wire Mill** (Cost: 160 wood, 90 stone, 35 tools, 20 wire)

### Advanced Buildings
- **Industrial Furnace** (Cost: 400 wood, 300 stone, 150 steel, 100 coal)
- **Power Plant** (Cost: 500 wood, 400 stone, 200 steel, 150 wire)
- **Machine Shop** (Cost: 350 wood, 250 stone, 120 steel, 80 machines)

## 🔬 Technology Tree

### Tier 3 Technologies

#### 1. Metallurgy
- **Cost**: 800 knowledge, 10 iron ore, 5 coal
- **Duration**: 10 minutes
- **Unlocks**: 
  - Advanced Steel Production action
  - Industrial Furnace building

#### 2. Glass Technology
- **Cost**: 600 knowledge, 15 glass, 8 coal
- **Duration**: 8 minutes
- **Unlocks**: 
  - Advanced Glass Making action
  - Glass Factory building

#### 3. Construction Engineering
- **Cost**: 1000 knowledge, 20 cement, 15 steel
- **Duration**: 12 minutes
- **Unlocks**: 
  - Advanced Construction action
  - Engineering Workshop building

#### 4. Power Systems
- **Cost**: 1200 knowledge, 30 wire, 20 coal
- **Duration**: 15 minutes
- **Unlocks**: 
  - Power Generation action
  - Power Plant building

#### 5. Mining Technology
- **Cost**: 700 knowledge, 25 iron ore, 15 coal
- **Duration**: 9 minutes
- **Unlocks**: 
  - Advanced Mining action

#### 6. Chemical Processing
- **Cost**: 900 knowledge, 20 coal, 10 steel
- **Duration**: 11 minutes
- **Unlocks**: 
  - Chemical Production action

#### 7. Mechanical Engineering
- **Cost**: 1100 knowledge, 40 steel, 25 wire
- **Duration**: 13 minutes
- **Unlocks**: 
  - Machine Assembly action

#### 8. Transportation
- **Cost**: 800 knowledge, 30 steel, 20 wire
- **Duration**: 10 minutes
- **Unlocks**: 
  - Railway Construction action

#### 9. Industrial Automation
- **Cost**: 1500 knowledge, 50 steel, 40 wire, 30 coal
- **Duration**: 18 minutes
- **Unlocks**: 
  - Automated Production action

#### 10. Advanced Materials
- **Cost**: 1300 knowledge, 60 steel, 40 glass, 30 cement
- **Duration**: 16 minutes
- **Unlocks**: 
  - Composite Materials action

### Technology Dependencies
```
Mining Technology → Metallurgy → Advanced Materials
                → Chemical Processing → Industrial Automation
Glass Technology → Advanced Materials
Construction Engineering → Industrial Automation
Power Systems → Industrial Automation
Mechanical Engineering → Industrial Automation
Transportation → Industrial Automation
```

## 🏆 Achievements

### Industrial Mastery
- **Iron Miner** - Mine 5000 iron ore
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'mineIron', resource: 'ironOre', value: 1.5, permanent: true }`
- **Steel Master** - Produce 2000 steel
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'produceSteel', resource: 'steel', value: 1.6, permanent: true }`
- **Coal Baron** - Mine 3000 coal
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'mineCoal', resource: 'coal', value: 1.5, permanent: true }`
- **Glass Blower** - Create 1000 glass
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'makeGlass', resource: 'glass', value: 1.5, permanent: true }`
- **Cement Worker** - Produce 2000 cement
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'produceCement', resource: 'cement', value: 1.4, permanent: true }`
- **Wire Drawer** - Create 1000 wire
  - *Reward*: `{ type: 'actionClickMultiplier', target: 'drawWire', resource: 'wire', value: 1.5, permanent: true }`

### Manufacturing Achievements
- **Industrial Giant** - Build 50 industrial buildings
  - *Reward*: `{ type: 'buildingGainMultiplier', target: 'industrialFurnace', resource: 'steel', value: 1.15, permanent: true }`, `{ type: 'buildingGainMultiplier', target: 'glassFactory', resource: 'glass', value: 1.15, permanent: true }`
- **Steel Production** - Produce 10000 steel
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'steel', value: 1.4, permanent: true }`
- **Power Generator** - Generate 5000 power
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'power', value: 1.3, permanent: true }`
- **Machine Builder** - Build 100 machines
  - *Reward*: `{ type: 'resourceGain', target: 'steel', value: 0.8, permanent: true }`, `{ type: 'resourceGain', target: 'wire', value: 0.8, permanent: true }`, `{ type: 'resourceGain', target: 'cement', value: 0.8, permanent: true }`
- **Industrial Efficiency** - Maintain 75% efficiency for 2 hours
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'steel', value: 1.2, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'ironOre', value: 1.2, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'coal', value: 1.2, permanent: true }`
- **Mass Production** - Produce 10000 industrial goods
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'steel', value: 1.25, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'glass', value: 1.25, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'cement', value: 1.25, permanent: true }`

### Building Achievements
- **Factory Owner** - Build 20 industrial buildings
  - *Reward*: `{ type: 'resourceGain', target: 'steel', value: 1.0, permanent: true }`, `{ type: 'resourceGain', target: 'glass', value: 1.0, permanent: true }`
- **Power Plant Operator** - Build 5 power plants
  - *Reward*: `{ type: 'buildingGainMultiplier', target: 'powerPlant', resource: 'power', value: 1.3, permanent: true }`
- **Mining Expert** - Build 10 mines
  - *Reward*: `{ type: 'buildingGainMultiplier', target: 'ironMine', resource: 'ironOre', value: 1.2, permanent: true }`, `{ type: 'buildingGainMultiplier', target: 'coalMine', resource: 'coal', value: 1.2, permanent: true }`
- **Construction Master** - Build 30 advanced buildings
  - *Reward*: `{ type: 'resourceGain', target: 'cement', value: 1.2, permanent: true }`, `{ type: 'resourceGain', target: 'steel', value: 1.2, permanent: true }`
- **Industrial Complex** - Build 100 buildings total
  - *Reward*: `{ type: 'buildingGainMultiplier', target: 'industrialFurnace', resource: 'steel', value: 1.1, permanent: true }`, `{ type: 'buildingGainMultiplier', target: 'powerPlant', resource: 'power', value: 1.1, permanent: true }`

### Resource Achievements
- **Resource Industrialist** - Produce 50000 of each industrial resource
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'steel', value: 1.3, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'ironOre', value: 1.3, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'coal', value: 1.3, permanent: true }`
- **Steel Magnate** - Produce 50000 steel
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'steel', value: 1.5, permanent: true }`
- **Power Grid** - Generate 25000 power
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'power', value: 1.4, permanent: true }`
- **Industrial Storage** - Store 100000 of any industrial resource
  - *Reward*: `{ type: 'resourceGain', target: 'steel', value: 1.0, permanent: true }`, `{ type: 'resourceGain', target: 'ironOre', value: 1.0, permanent: true }`
- **Efficiency Expert** - Maintain 90% efficiency for 3 hours
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'steel', value: 1.25, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'power', value: 1.25, permanent: true }`

### Hidden Achievements
- **Industrial Revolution** - Complete all industrial achievements
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'steel', value: 1.4, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'power', value: 1.4, permanent: true }`
- **Steel Empire** - Produce 100000 steel
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'steel', value: 1.6, permanent: true }`
- **Power Master** - Generate 100000 power
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'power', value: 1.5, permanent: true }`
- **Machine Master** - Build 1000 machines
  - *Reward*: `{ type: 'resourceGain', target: 'steel', value: 1.5, permanent: true }`, `{ type: 'resourceGain', target: 'wire', value: 1.5, permanent: true }`
- **Industrial Perfectionist** - Complete all Tier 3 achievements
  - *Reward*: `{ type: 'resourceGainMultiplier', target: 'steel', value: 1.35, permanent: true }`, `{ type: 'resourceGainMultiplier', target: 'power', value: 1.35, permanent: true }`

## 👑 Prestige Options

### Tier 3 Prestige Upgrades (Cost: 100-500 prestige)
- **Industrial Revolution** (+100% Tier 3 resource production)
- **Steel Mastery** (+200% steel production)
- **Factory Efficiency** (+150% industrial building output)
- **Technology Boost** (+75% research speed)
- **Mining Expertise** (+125% mining efficiency)
- **Power Generation** (+150% power production)
- **Construction Speed** (+100% building construction speed)
- **Machine Efficiency** (+175% machine production)
- **Industrial Automation** (+125% all loop actions)
- **Resource Processing** (+100% resource processing speed)

### Prestige Bonuses
- **Industrial Mastery** - Unlock Tier 3 prestige upgrades
- **Steel Empire** - All steel production 3x more efficient
- **Power Grid** - All power generation 2x more efficient
- **Factory Network** - All industrial buildings 2x more efficient
- **Research Acceleration** - All research 100% faster
- **Automation Expert** - All loop actions 125% more efficient
- **Construction Master** - All buildings cost 50% less
- **Resource Processing** - All resource processing 2x faster

## 🎯 Progression Milestones

### Milestone 1: Mining Operations (2-3 hours)
- Establish iron and coal mining
- Build first mines
- Master basic metallurgy

### Milestone 2: Steel Production (3-4 hours)
- Master steel smelting
- Build Steel Foundry
- Experience industrial efficiency

### Milestone 3: Advanced Manufacturing (4-5 hours)
- Master glass and cement production
- Build advanced manufacturing buildings
- Establish power generation

### Milestone 4: Industrial Complex (5-6 hours)
- Complete industrial automation
- Build Power Plant
- Master mass production
- **Unlock Tier 4 progression**

## 📈 Balancing Notes

### Resource Ratios
- Iron Ore:Steel:Coal = 5:4:3
- Glass:Cement:Wire = 2:2:1
- Industrial goods require 2x steel + 1x coal

### Time Scaling
- 45 minutes - 1.5 hours per milestone
- Total tier completion: 2-6 hours
- Prestige available after 6 hours

### Complexity Management
- 18 total resources (6 new)
- 18 click actions (6 new)
- 8 loop actions (3 new)
- 9 buildings (3 new)
- 4 research projects with industrial unlocks
