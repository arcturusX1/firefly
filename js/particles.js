// Scatters decorative "firefly" dots into a container. Purely visual.
function spawnFireflies(container, count) {
  if (!container) return;
  const flyAnimations = ['fly1', 'fly2', 'fly3'];
  const frag = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const size = 3 + Math.random() * 5;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const glowOpacity = (0.36 + Math.random() * 0.24).toFixed(2);
    const flyName = flyAnimations[i % flyAnimations.length];
    const flyDuration = (10 + Math.random() * 9).toFixed(1);
    const flyDelay = (Math.random() * 6).toFixed(1);
    const blinkDuration = (2.8 + Math.random() * 3.6).toFixed(1);
    const blinkDelay = (Math.random() * 4).toFixed(1);

    const dot = document.createElement('span');
    dot.className = 'firefly';
    dot.style.left = left.toFixed(1) + '%';
    dot.style.top = top.toFixed(1) + '%';
    dot.style.width = size.toFixed(1) + 'px';
    dot.style.height = size.toFixed(1) + 'px';
    dot.style.boxShadow = `0 0 ${(size * 1.9).toFixed(0)}px ${(size * 0.85).toFixed(0)}px rgba(242,223,58,${glowOpacity})`;
    dot.style.animation = `${flyName} ${flyDuration}s ease-in-out infinite ${flyDelay}s, blink ${blinkDuration}s ease-in-out infinite ${blinkDelay}s`;
    frag.appendChild(dot);
  }

  container.appendChild(frag);
}
