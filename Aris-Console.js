(function() {
  const ARISEvaluationTool = {
    config: {
      nuclearOptionEnabled: true,
      warningThreshold: 3, // Number of confirmations needed
      securityCode: null
    },

    // Nuclear Option Security Generator
    generateSecurityCode() {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    },

    // Dramatic Nuclear Launch Sequence
    nuclearLaunchSequence() {
      if (!this.config.nuclearOptionEnabled) {
        this.log("Nuclear option is currently disabled", "error");
        return false;
      }

      // Generate a unique security code
      this.config.securityCode = this.generateSecurityCode();

      // Create nuclear launch interface
      this.createNuclearLaunchUI();

      return true;
    },

    createNuclearLaunchUI() {
      // Create a full-screen modal with nuclear launch interface
      const modal = document.createElement('div');
      modal.id = 'nuclear-launch-modal';
      modal.innerHTML = `
        <div style="
          position: fixed; 
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%; 
          background: rgba(0,0,0,0.9); 
          color: red; 
          z-index: 10000; 
          display: flex; 
          flex-direction: column; 
          justify-content: center; 
          align-items: center; 
          font-family: monospace;
          text-align: center;
        ">
          <h1>🚨 NUCLEAR EVALUATION LAUNCH SYSTEM 🚨</h1>
          <div style="background: #200; padding: 20px; border: 3px solid red;">
            <p>SECURITY VERIFICATION REQUIRED</p>
            <h2>SECURITY CODE: ${this.config.securityCode}</h2>
            <input type="text" id="nuclear-code-input" placeholder="ENTER SECURITY CODE" 
              style="
                background: black; 
                color: red; 
                border: 2px solid red; 
                padding: 10px; 
                text-align: center; 
                font-size: 20px;
                text-transform: uppercase;
              ">
            <button id="nuclear-confirm-btn" style="
              background: red; 
              color: white; 
              border: none; 
              padding: 10px 20px; 
              margin-top: 10px;
              cursor: pointer;
            ">CONFIRM LAUNCH</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      const codeInput = modal.querySelector('#nuclear-code-input');
      const confirmBtn = modal.querySelector('#nuclear-confirm-btn');

      let attemptCount = 0;

      confirmBtn.addEventListener('click', () => {
        if (codeInput.value.toUpperCase() === this.config.securityCode) {
          this.executeTotalNuclearOption();
          document.body.removeChild(modal);
        } else {
          attemptCount++;
          codeInput.style.backgroundColor = 'darkred';
          
          if (attemptCount >= 3) {
            this.triggerSecurityLockdown();
          }
        }
      });
    },

    triggerSecurityLockdown() {
      // Simulate security lockdown
      document.body.innerHTML = `
        <div style="
          background: black; 
          color: red; 
          height: 100vh; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          font-family: monospace;
          text-align: center;
        ">
          <h1>🚨 SECURITY BREACH DETECTED 🚨<br>SYSTEM LOCKED</h1>
        </div>
      `;

      // Optional: Add sound effect
      this.playAlarmSound();
    },

    playAlarmSound() {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime); 
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 3); 
      } catch (error) {
        console.warn("Could not play alarm sound");
      }
    },

    executeTotalNuclearOption() {
      const selects = document.querySelectorAll('select[name="rating_[]"]');
      const totalDropdowns = selects.length;
      let poorRatingCount = 0;

      // Dramatic pre-launch countdown
      this.nuclearCountdown();

      selects.forEach((select, index) => {
        const poorOption = Array.from(select.options).find(opt => opt.value === "1");
        
        if (poorOption) {
          // Staggered rating application for dramatic effect
          setTimeout(() => {
            select.value = "1";
            ['change', 'input', 'blur'].forEach(eventType => {
              select.dispatchEvent(new Event(eventType, { bubbles: true }));
            });
            poorRatingCount++;

            // Visual indicator of progress
            this.updateNuclearProgressVisual(poorRatingCount, totalDropdowns);
          }, index * 50);
        }
      });

      // Final nuclear impact visualization
      setTimeout(() => this.nuclearImpactVisualization(), totalDropdowns * 50 + 1000);

      return {
        totalDropdowns,
        poorRatingCount,
        status: poorRatingCount === totalDropdowns ? 'TOTAL NUCLEAR STRIKE COMPLETE' : 'PARTIAL STRIKE'
      };
    },

    nuclearCountdown() {
      const countdownOverlay = document.createElement('div');
      countdownOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        font-size: 200px;
        font-family: monospace;
      `;

      document.body.appendChild(countdownOverlay);

      const countdownSequence = [3, 2, 1, 'LAUNCH'];
      let currentIndex = 0;

      const countdownInterval = setInterval(() => {
        if (currentIndex < countdownSequence.length) {
          countdownOverlay.textContent = countdownSequence[currentIndex];
          currentIndex++;
        } else {
          clearInterval(countdownInterval);
          document.body.removeChild(countdownOverlay);
        }
      }, 1000);
    },

    updateNuclearProgressVisual(current, total) {
      // Optional: Update a progress indicator
      console.log(`🚀 Nuclear Strike Progress: ${current}/${total}`);
    },

    nuclearImpactVisualization() {
      const impactOverlay = document.createElement('div');
      impactOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(0,0,0,1) 100%);
        z-index: 10000;
        opacity: 0;
        animation: nuclear-impact 2s ease-out;
      `;

      const styleSheet = document.createElement("style");
      styleSheet.textContent = `
        @keyframes nuclear-impact {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(2); }
        }
      `;

      document.body.appendChild(styleSheet);
      document.body.appendChild(impactOverlay);

      setTimeout(() => {
        document.body.removeChild(impactOverlay);
        document.body.removeChild(styleSheet);
      }, 2000);
    },

    init() {
      // Expose nuclear option
      window.ARISEval = {
        ...window.ARISEval,
        nuclearOption: () => this.nuclearLaunchSequence()
      };
    }
  };

  ARISEvaluationTool.init();
})();
