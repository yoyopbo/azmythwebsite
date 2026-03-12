// Magical Interactive Effects - Jewel Tone Theme

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // FLOATING ORBS - Always drifting jewel-toned orbs
  // ============================================
  const orbContainer = document.createElement('div');
  orbContainer.className = 'orb-container';
  document.body.appendChild(orbContainer);

  const orbColors = [
    { bg: 'rgba(201, 162, 39, 0.3)', glow: 'rgba(201, 162, 39, 0.6)' },   // gold
    { bg: 'rgba(92, 61, 110, 0.25)', glow: 'rgba(122, 82, 153, 0.5)' },   // amethyst
    { bg: 'rgba(26, 74, 122, 0.25)', glow: 'rgba(45, 106, 168, 0.5)' },   // sapphire
    { bg: 'rgba(26, 92, 58, 0.25)', glow: 'rgba(46, 204, 113, 0.4)' },    // emerald
    { bg: 'rgba(139, 26, 61, 0.2)', glow: 'rgba(196, 30, 74, 0.4)' }      // ruby
  ];

  for (let i = 0; i < 12; i++) {
    const orb = document.createElement('div');
    orb.className = 'floating-orb';
    const color = orbColors[Math.floor(Math.random() * orbColors.length)];
    const size = 8 + Math.random() * 25;

    orb.style.width = size + 'px';
    orb.style.height = size + 'px';
    orb.style.background = `radial-gradient(circle, ${color.bg} 0%, transparent 70%)`;
    orb.style.boxShadow = `0 0 ${size}px ${color.glow}`;
    orb.style.left = Math.random() * 100 + 'vw';
    orb.style.top = Math.random() * 100 + 'vh';
    orb.style.animationDuration = (15 + Math.random() * 20) + 's';
    orb.style.animationDelay = (Math.random() * -20) + 's';

    orbContainer.appendChild(orb);
  }

  // ============================================
  // CLICK BURST - Explosion of sparkles on click
  // ============================================
  document.addEventListener('click', (e) => {
    for (let i = 0; i < 15; i++) {
      const burst = document.createElement('div');
      burst.className = 'click-burst';
      const angle = (i / 15) * Math.PI * 2;
      const distance = 50 + Math.random() * 80;
      const color = orbColors[Math.floor(Math.random() * orbColors.length)];

      burst.style.left = e.clientX + 'px';
      burst.style.top = e.clientY + 'px';
      burst.style.background = color.bg;
      burst.style.boxShadow = `0 0 10px ${color.glow}`;
      burst.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
      burst.style.setProperty('--ty', Math.sin(angle) * distance + 'px');

      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 800);
    }
  });

  // ============================================
  // CURSOR GLOW - Soft jewel-toned light follows mouse
  // ============================================
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow animation
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  console.log('Magic effects loaded!');

  // ============================================
  // SPARKLE TRAIL - Occasional gold sparkles on movement
  // ============================================
  let lastSparkle = 0;
  const sparkleColors = [
    'rgba(201, 162, 39, 0.8)',   // gold
    'rgba(232, 197, 71, 0.8)',   // light gold
    'rgba(245, 215, 110, 0.7)', // bright gold
    'rgba(232, 228, 220, 0.6)'  // pearl
  ];

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkle > 30) { // Limit sparkle rate
      lastSparkle = now;
      if (Math.random() > 0.3) { // 70% of movements create sparkles
        createSparkle(e.clientX, e.clientY);
      }
    }
  });

  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'magic-sparkle';
    sparkle.style.left = (x + (Math.random() - 0.5) * 30) + 'px';
    sparkle.style.top = (y + (Math.random() - 0.5) * 30) + 'px';
    sparkle.style.background = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    const size = 4 + Math.random() * 6;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    sparkle.style.boxShadow = `0 0 ${size * 2}px ${sparkleColors[Math.floor(Math.random() * sparkleColors.length)]}`;
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1200);
  }

  // ============================================
  // PARALLAX STARS - Stars move slightly with mouse
  // ============================================
  const stars = document.querySelectorAll('.star');
  const jewels = document.querySelectorAll('.jewel');

  document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (e.clientX - centerX) / centerX;
    const moveY = (e.clientY - centerY) / centerY;

    stars.forEach((star, i) => {
      const depth = (i % 3 + 1) * 0.5; // Varying depths
      const x = moveX * 15 * depth;
      const y = moveY * 15 * depth;
      star.style.transform = `translate(${x}px, ${y}px)`;
    });

    jewels.forEach((jewel, i) => {
      const depth = (i % 2 + 1) * 0.3;
      const x = moveX * 10 * depth;
      const y = moveY * 10 * depth;
      jewel.style.transform = `translate(${x}px, ${y}px) rotate(${moveX * 5}deg)`;
    });
  });

  // ============================================
  // HOVER MAGIC - Cards and buttons get extra sparkle
  // ============================================
  const interactiveElements = document.querySelectorAll('.card, .btn, .portrait-frame');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          const x = rect.left + Math.random() * rect.width;
          const y = rect.top + Math.random() * rect.height;
          createSparkle(x, y);
        }, i * 50);
      }
    });
  });

  // ============================================
  // SCROLL FADE - Elements fade in as you scroll
  // ============================================
  const fadeElements = document.querySelectorAll('.card, .skill-category, .project-card, .service-card, .curiosity-item');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    el.classList.add('fade-in-element');
    fadeObserver.observe(el);
  });

});
