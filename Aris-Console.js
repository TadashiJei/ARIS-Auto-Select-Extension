(function() {
  // Advanced ARIS Evaluation Assistant
  const ARISEvaluationTool = {
    // Configuration options
    config: {
      autoApplyDelay: 500, // Delay between actions
      loggingEnabled: true,
      ratingPresets: {
        exceptional: "6",
        excellent: "5",
        veryGood: "4",
        good: "3",
        fair: "2",
        poor: "1"
      }
    },

    // Logging utility
    log(message, type = 'info') {
      if (!this.config.loggingEnabled) return;
      
      const styles = {
        info: 'color: blue; font-weight: bold',
        success: 'color: green; font-weight: bold',
        warning: 'color: orange; font-weight: bold',
        error: 'color: red; font-weight: bold'
      };

      console.log(`%c[ARIS Eval Tool] ${message}`, styles[type] || styles.info);
    },

    // Get all rating dropdowns
    getDropdowns() {
      return document.querySelectorAll('select[name="rating_[]"]');
    },

    // Apply a specific rating to all dropdowns
    applyRating(rating) {
      const selects = this.getDropdowns();
      let successCount = 0;
      let failCount = 0;

      selects.forEach(select => {
        const option = Array.from(select.options).find(opt => opt.value === rating);
        
        if (option) {
          select.value = rating;
          // Trigger multiple events to ensure form recognition
          ['change', 'input', 'blur'].forEach(eventType => {
            select.dispatchEvent(new Event(eventType, { bubbles: true }));
          });
          successCount++;
        } else {
          failCount++;
        }
      });

      this.log(`Applied rating ${rating}. Success: ${successCount}, Failed: ${failCount}`, 
        failCount > 0 ? 'warning' : 'success');

      return { successCount, failCount };
    },

    // Randomize ratings with more control
    randomizeRatings(options = {}) {
      const {
        excludeFirst = true, // Exclude first (usually blank) option
        weightedRandom = false, // More complex randomization
        weightMap = { 
          "6": 0.1, 
          "5": 0.2, 
          "4": 0.3, 
          "3": 0.2, 
          "2": 0.1, 
          "1": 0.1 
        }
      } = options;

      const selects = this.getDropdowns();
      let results = { randomizations: [] };

      selects.forEach(select => {
        let randomIndex;
        
        if (weightedRandom) {
          // Weighted random selection
          const weightedOptions = Array.from(select.options)
            .map((opt, index) => ({
              value: opt.value,
              probability: weightMap[opt.value] || 0.1,
              index: index
            }))
            .filter(opt => !excludeFirst || opt.index > 0);

          const totalWeight = weightedOptions.reduce((sum, opt) => sum + opt.probability, 0);
          const randomValue = Math.random() * totalWeight;

          let cumulativeWeight = 0;
          randomIndex = weightedOptions.find(opt => {
            cumulativeWeight += opt.probability;
            return randomValue <= cumulativeWeight;
          }).index;
        } else {
          // Simple random selection
          randomIndex = excludeFirst 
            ? Math.floor(Math.random() * (select.options.length - 1)) + 1 
            : Math.floor(Math.random() * select.options.length);
        }

        select.selectedIndex = randomIndex;
        
        // Trigger events
        ['change', 'input', 'blur'].forEach(eventType => {
          select.dispatchEvent(new Event(eventType, { bubbles: true }));
        });

        results.randomizations.push({
          element: select,
          selectedValue: select.value,
          selectedText: select.options[randomIndex].text
        });
      });

      this.log(`Randomized ${results.randomizations.length} ratings`, 'success');
      return results;
    },

    // Advanced auto-fill with multiple strategies
    autoFill(strategy = 'default') {
      const strategies = {
        default: () => this.applyRating(this.config.ratingPresets.exceptional),
        balanced: () => this.randomizeRatings({ weightedRandom: true }),
        positive: () => this.randomizeRatings({
          weightMap: { 
            "6": 0.3, 
            "5": 0.3, 
            "4": 0.2, 
            "3": 0.1, 
            "2": 0.05, 
            "1": 0.05 
          }
        }),
        negative: () => this.randomizeRatings({
          weightMap: { 
            "6": 0.05, 
            "5": 0.1, 
            "4": 0.2, 
            "3": 0.3, 
            "2": 0.2, 
            "1": 0.15 
          }
        })
      };

      return strategies[strategy] ? strategies[strategy]() : this.autoFill('default');
    },

    // Diagnostic tool to check form state
    diagnose() {
      const dropdowns = this.getDropdowns();
      const unselectedDropdowns = Array.from(dropdowns).filter(
        select => select.selectedIndex === 0
      );

      this.log(`Total Dropdowns: ${dropdowns.length}`, 'info');
      this.log(`Unselected Dropdowns: ${unselectedDropdowns.length}`, 
        unselectedDropdowns.length > 0 ? 'warning' : 'success');

      return {
        totalDropdowns: dropdowns.length,
        unselectedDropdowns: unselectedDropdowns
      };
    },

    // Initialize tool
    init() {
      this.log('ARIS Evaluation Assistant Initialized', 'success');
      
      // Expose methods globally
      window.ARISEval = {
        applyRating: (rating) => this.applyRating(rating),
        randomize: () => this.randomizeRatings(),
        autoFill: (strategy) => this.autoFill(strategy),
        diagnose: () => this.diagnose()
      };
    }
  };

  // Initialize the tool
  ARISEvaluationTool.init();
})();
