/**
 * THE FOURTH KIND — COSMIC STARFIELD ENGINE
 * Pure HTML5 Canvas, 60fps, Zero Dependencies, Mouse Parallax & Twinkle
 */

(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  const PARTICLE_COUNT = 150;

  // Mouse interaction state
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  // Resize handler
  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Re-initialize particles if empty
    if (particles.length === 0) {
      initParticles();
    }
  }

  // Particle constructor
  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4, // Size between 0.4px and 2.2px
      baseAlpha: Math.random() * 0.6 + 0.2, // Base opacity between 0.2 and 0.8
      alpha: 0,
      twinkleSpeed: Math.random() * 0.02 + 0.008,
      twinklePhase: Math.random() * Math.PI * 2,
      speedX: (Math.random() - 0.5) * 0.15, // Gentle drift
      speedY: -(Math.random() * 0.25 + 0.08), // Upward float
      depth: Math.random() * 0.8 + 0.2, // Parallax depth factor
      color: Math.random() > 0.85 
        ? 'rgba(230, 245, 255, ' // Subtle cosmic cyan
        : Math.random() > 0.9 
          ? 'rgba(255, 245, 220, ' // Subtle gold star
          : 'rgba(255, 255, 255, ' // Crisp white
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  // Mouse tracking for subtle 3D parallax
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX - width / 2) * 0.035;
    mouse.targetY = (e.clientY - height / 2) * 0.035;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.targetX = (e.touches[0].clientX - width / 2) * 0.025;
      mouse.targetY = (e.touches[0].clientY - height / 2) * 0.025;
    }
  }, { passive: true });

  window.addEventListener('resize', resize);
  resize();

  // Animation Loop
  let lastTime = 0;
  function animate(time) {
    // Smooth lerp for parallax
    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Update positions
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around edges
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      // Twinkle calculation
      p.twinklePhase += p.twinkleSpeed;
      const pulse = Math.sin(p.twinklePhase);
      const currentAlpha = Math.max(0.08, Math.min(1, p.baseAlpha + pulse * 0.3));

      // Calculate rendered position with parallax depth
      const renderX = p.x + mouse.x * p.depth;
      const renderY = p.y + mouse.y * p.depth;

      // Draw Star
      ctx.beginPath();
      ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + currentAlpha + ')';
      ctx.fill();

      // Soft outer glow for brighter stars
      if (p.size > 1.4 && currentAlpha > 0.5) {
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (currentAlpha * 0.18) + ')';
        ctx.fill();
      }
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
