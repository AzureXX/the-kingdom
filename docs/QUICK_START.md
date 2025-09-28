# 🚀 Quick Start Guide

This guide will help you get the Medieval Kingdom game up and running quickly.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **npm or yarn** - Package managers (npm comes with Node.js)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd the-kingdom
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The game will be available at `http://localhost:3000`

## 🏗️ Build for Production

### Development Build
```bash
npm run build
npm start
```

### Production Deployment
The game is built with Next.js and can be deployed to any platform that supports Node.js applications:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Heroku**
- **AWS**
- **DigitalOcean**

## 🎮 First Steps

Once the game is running:

1. **Start Playing**: Click on resource gathering actions to begin
2. **Build Your Kingdom**: Purchase buildings to automate resource production
3. **Research Technologies**: Unlock advanced buildings and actions
4. **Manage Events**: Make strategic choices when random events occur
5. **Prestige**: Reset your kingdom for permanent upgrades

## 🔧 Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

**Node Version Issues**
```bash
# Check Node version
node --version
# Should be 18 or higher
```

**Dependencies Issues**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Issues**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📚 Next Steps

After getting the game running:

1. **Read the Documentation**: Check out the comprehensive documentation in the `docs/` folder
2. **Explore the Code**: The codebase is well-organized and documented
3. **Run Tests**: Ensure everything is working with `npm test`
4. **Start Developing**: Follow the development guidelines in [DEVELOPMENT_GUIDELINES.md](DEVELOPMENT_GUIDELINES.md)

## 🆘 Getting Help

If you encounter issues:

1. **Check the Documentation**: Most questions are answered in the docs
2. **Run Tests**: Ensure the codebase is working correctly
3. **Check Issues**: Look for similar issues in the project repository
4. **Create an Issue**: If you can't find a solution, create a detailed issue report

## 🎯 Development Tips

- **Use TypeScript**: The project is fully typed for better development experience
- **Follow Conventions**: Read [DEVELOPMENT_GUIDELINES.md](DEVELOPMENT_GUIDELINES.md) for coding standards
- **Test Your Changes**: Always run tests before submitting changes
- **Document Changes**: Update documentation when adding new features
