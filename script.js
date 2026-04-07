const introLines = [
  'initializing system...',
  'loading memories...',
  'access granted'
];

const introTerminal = document.getElementById('typing-terminal');
const analysisLine = document.getElementById('analysis-line');

function typeLines(element, lines, speed = 45, lineDelay = 350) {
  let lineIndex = 0;

  function typeNextLine() {
    if (lineIndex >= lines.length) return;

    const line = lines[lineIndex];
    const row = document.createElement('div');
    row.className = 'typed-row';
    element.appendChild(row);

    let charIndex = 0;
    const charTimer = setInterval(() => {
      row.textContent = `> ${line.slice(0, charIndex + 1)}`;
      charIndex += 1;

      if (charIndex >= line.length) {
        clearInterval(charTimer);
        lineIndex += 1;
        setTimeout(typeNextLine, lineDelay);
      }
    }, speed);
  }

  typeNextLine();
}

function typeSingleLine(element, text, speed = 40) {
  let i = 0;
  element.textContent = '';
  const cursor = setInterval(() => {
    element.textContent = `[root@archive] $ ${text.slice(0, i + 1)}`;
    i += 1;
    if (i >= text.length) {
      clearInterval(cursor);
    }
  }, speed);
}

function revealOnScroll() {
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

window.addEventListener('DOMContentLoaded', () => {
  typeLines(introTerminal, introLines);

  setTimeout(() => {
    typeSingleLine(analysisLine, 'ANALYZING MEMORY FILES...');
  }, 900);

  revealOnScroll();
});