# 🤝 Contributing to Medieval Kingdom

Thank you for your interest in contributing to Medieval Kingdom! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and Next.js

### Development Setup
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/the-kingdom.git
   cd the-kingdom
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Contribution Guidelines

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow the configured Next.js rules
- **SCSS**: Use CSS Modules for component styling
- **React**: Use functional components with hooks
- **Import Guidelines**: Always use `@/` alias instead of relative paths

### Development Standards
- **Test Coverage**: Add tests for new functionality
- **Documentation**: Update relevant documentation
- **Performance**: Ensure changes don't negatively impact performance
- **Accessibility**: Maintain accessibility standards
- **Error Handling**: Follow the established error handling patterns

### Commit Messages
Use clear, descriptive commit messages:
```
feat: add new building type
fix: resolve resource calculation bug
docs: update configuration guide
test: add tests for new action system
refactor: improve game loop performance
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=stringUtils
```

### Writing Tests
- **Component Tests**: Test React components with proper props
- **Game Logic Tests**: Test pure functions for game calculations
- **Integration Tests**: Test game loop and state management
- **Performance Tests**: Monitor frame rate and memory usage

### Test Requirements
- All new features must have corresponding tests
- Maintain or improve test coverage
- Tests must pass before submitting PR

## 🎯 Types of Contributions

### 🐛 Bug Fixes
- Fix existing issues
- Improve error handling
- Resolve performance problems
- Update documentation for clarity

### ✨ New Features
- Add new game mechanics
- Implement new buildings or technologies
- Create new events or achievements
- Enhance UI/UX components

### 📚 Documentation
- Improve existing documentation
- Add code examples
- Update configuration guides
- Create tutorials or guides

### 🎨 UI/UX Improvements
- Enhance visual design
- Improve accessibility
- Optimize responsive design
- Add animations or interactions

### ⚡ Performance
- Optimize game loop
- Improve rendering performance
- Reduce memory usage
- Enhance save/load functionality

## 🔧 Development Workflow

### 1. Planning
- Check existing issues and discussions
- Plan your changes and approach
- Consider impact on existing functionality
- Document your approach

### 2. Development
- Follow the established code style
- Write tests for your changes
- Update documentation as needed
- Test thoroughly

### 3. Testing
- Run all tests: `npm test`
- Test manually in the browser
- Check for performance regressions
- Verify accessibility compliance

### 4. Documentation
- Update relevant documentation files
- Add code comments for complex logic
- Update README if needed
- Document any new configuration options

### 5. Submission
- Create a pull request with a clear description
- Reference any related issues
- Include screenshots for UI changes
- Provide testing instructions

## 📝 Pull Request Process

### Before Submitting
- [ ] Code follows the project's style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Performance impact is minimal

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] Performance tested

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #issue_number
```

### Review Process
1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: Maintainers review the code
3. **Testing**: Changes are tested in different environments
4. **Approval**: PR is approved and merged

## 🎮 Game Content Contributions

### Adding New Content
The game is designed to be easily extensible. See [CONFIGURATION_GUIDE.md](CONFIGURATION_GUIDE.md) for detailed instructions on adding:

- **New Actions**: Add to appropriate action configuration files
- **New Buildings**: Add to buildings configuration
- **New Technologies**: Add to technologies configuration
- **New Events**: Add to appropriate event configuration files
- **New Achievements**: Add to appropriate achievement configuration files
- **New Loop Actions**: Add to appropriate loop action configuration files

### Content Guidelines
- **Balance**: Ensure new content is balanced with existing mechanics
- **Theme**: Maintain the medieval kingdom theme
- **Progression**: Consider how new content fits into the progression curve
- **Testing**: Test new content thoroughly in different game states

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, Node.js version
- **Screenshots**: If applicable

### Feature Requests
For feature requests, please include:

- **Description**: Clear description of the proposed feature
- **Use Case**: Why this feature would be useful
- **Implementation Ideas**: Any thoughts on how to implement
- **Alternatives**: Other solutions you've considered

## 📞 Getting Help

### Resources
- **Documentation**: Check the `docs/` folder for comprehensive guides
- **Issues**: Search existing issues for similar problems
- **Discussions**: Use GitHub Discussions for questions

### Community Guidelines
- Be respectful and constructive
- Help others when you can
- Follow the code of conduct
- Provide clear, helpful feedback

## 🏆 Recognition

Contributors will be recognized in:
- **README.md**: Listed in the acknowledgments
- **Release Notes**: Mentioned in relevant releases
- **GitHub**: Listed as contributors to the project

## 📄 License

By contributing to Medieval Kingdom, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

Thank you for contributing to Medieval Kingdom! Your efforts help make this game better for everyone. 🏰👑
