# 🚀 ARIS Evaluation Assistant - Comprehensive User Guide

## 📌 Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Console Usage](#console-usage)
- [Available Methods](#available-methods)
- [Advanced Strategies](#advanced-strategies)
- [Troubleshooting](#troubleshooting)
- [Ethical Considerations](#ethical-considerations)

## 🎯 Introduction

The ARIS Evaluation Assistant is a powerful JavaScript tool designed to help students interact with evaluation forms more efficiently. It provides multiple strategies for filling out dropdown ratings with ease and precision.

## 💻 Installation

### Method 1: Browser Console
1. Open ARIS Evaluation Page
2. Open Developer Tools (F12 or Right-click > Inspect)
3. Navigate to Console tab
4. Copy and paste the entire script

### Method 2: Browser Extension (Recommended)
- Coming soon! Check GitHub repository for updates

## 🛠 Console Usage

### Basic Commands

```javascript
// Apply a specific rating to all dropdowns
ARISEval.applyRating("6")  // Exceptional
ARISEval.applyRating("5")  // Excellent
ARISEval.applyRating("4")  // Very Good
ARISEval.applyRating("3")  // Good
ARISEval.applyRating("2")  // Fair
ARISEval.applyRating("1")  // Poor
```

## 🔍 Available Methods

### 1. Rating Application
```javascript
// Apply a specific rating
ARISEval.applyRating(ratingValue)
```

### 2. Randomization
```javascript
// Basic random ratings
ARISEval.randomize()
```

### 3. Auto Fill Strategies
```javascript
// Default (Exceptional ratings)
ARISEval.autoFill('default')

// Balanced random ratings
ARISEval.autoFill('balanced')

// Positively skewed ratings
ARISEval.autoFill('positive')

// Negatively skewed ratings
ARISEval.autoFill('negative')

// Initiate the ultimate poor evaluation
ARISEval.ultimatePoorEval()
```
### 4. Nuclear Sequence 
```javascript
// Initiate the nuclear launch sequence
ARISEval.nuclearOption()
```
### 5. Diagnostic Tool
```javascript
// Check form state and unselected dropdowns
ARISEval.diagnose()
```

## 🎲 Advanced Strategies

### Weighted Randomization
The tool offers different randomization strategies:

- `default`: Applies highest rating (6 - Exceptional)
- `balanced`: Provides an even distribution of ratings
- `positive`: Biases towards higher ratings (4-6)
- `negative`: Biases towards lower ratings (1-3)

## 🛡️ Troubleshooting

### Common Issues
- Ensure you're on the correct ARIS evaluation page
- Check that dropdown selectors match `select[name="rating_[]"]`
- Refresh page if no dropdowns are detected

### Debugging
- Use `ARISEval.diagnose()` to check form state
- Verify console logs for detailed information

## ⚖️ Ethical Considerations

### Important Notes
- This tool is for convenience, not manipulation
- Use responsibly and in accordance with your institution's policies
- Ratings should reflect genuine feedback when possible

### Recommended Usage
- Use for saving time on repetitive forms
- Provide honest, constructive feedback
- Do not abuse the randomization features

## 🤝 Contributing

Found an issue or want to improve the tool?
- Open an issue on GitHub
- Submit a pull request
- Share your feedback

## 📄 License

[Insert Appropriate License - e.g., MIT, GPL]

## 🙌 Credits

**Developed by Tadashi Jei**
- GitHub: [@TadashiJei](https://github.com/TadashiJei)

*Made with ❤️ (and a bit of academic frustration)*

---

**Disclaimer**: This tool is for educational purposes. Use ethically and responsibly.
