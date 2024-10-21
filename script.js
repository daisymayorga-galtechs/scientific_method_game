const steps = [
    "Ask a Question",
    "Do Background Research",
    "Construct a Hypothesis",
    "Test with an Experiment",
    "Analyze Data and Draw Conclusion",
    "Communicate Results"
  ];
  
  const list = document.getElementById('steps');
  const message = document.getElementById('message');
  const checkButton = document.getElementById('checkOrder');
  const playAgainButton = document.getElementById('playAgain');
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  function initializeGame() {
    list.innerHTML = ''; // Clear previous steps
    const shuffledSteps = [...steps].sort(() => Math.random() - 0.5);
    shuffledSteps.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      li.className = 'step';
      li.draggable = true;
      list.appendChild(li);
    });
    setupDragAndDrop();
  }
  
  function setupDragAndDrop() {
    let dragged;
    document.querySelectorAll('.step').forEach(item => {
      item.addEventListener('dragstart', () => (dragged = item));
      item.addEventListener('dragover', e => e.preventDefault());
      item.addEventListener('drop', function () {
        if (this !== dragged) {
          const siblings = [...this.parentNode.children];
          const draggedIndex = siblings.indexOf(dragged);
          const targetIndex = siblings.indexOf(this);
  
          if (draggedIndex < targetIndex) {
            this.parentNode.insertBefore(dragged, this.nextSibling);
          } else {
            this.parentNode.insertBefore(dragged, this);
          }
        }
      });
    });
  }
  
  checkButton.addEventListener('click', () => {
    const currentOrder = [...list.children].map(li => li.textContent.trim());
    const isCorrect = currentOrder.every((step, index) => step === steps[index]);
  
    if (isCorrect) {
      message.textContent = 'Correct! 🎉';
      message.style.color = 'green';
      startConfetti();
      playAgainButton.classList.remove('hidden'); // Show Play Again button
    } else {
      message.textContent = 'Incorrect! Resetting the game...';
      message.style.color = 'red';
      setTimeout(() => {
        initializeGame(); // Reset the game after a short delay
        message.textContent = ''; // Clear message
      }, 1000);
    }
  });
  
  playAgainButton.addEventListener('click', () => {
    window.location.reload(); // Refresh the page to start again
  });
  
  function startConfetti() {
    canvas.classList.remove('hidden');
    const particles = [];
  
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 4 - 2,
        vy: Math.random() * 4 + 1,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        size: Math.random() * 5 + 2,
      });
    }
  
    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > canvas.height) p.y = 0;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(update);
    }
    update();
  
    setTimeout(() => {
      canvas.classList.add('hidden');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
  }
  
  // Initialize the game on page load
  initializeGame();
  