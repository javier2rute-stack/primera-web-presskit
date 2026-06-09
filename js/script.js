const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const toast = qs('.toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

const menuButton = qs('.menu-btn');
const mobileMenu = qs('#mobileMenu');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  });

  qsa('a', mobileMenu).forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });
}

qsa('[data-toast]').forEach((element) => {
  element.addEventListener('click', () => showToast(element.dataset.toast));
});

qsa('[data-export]').forEach((button) => {
  button.addEventListener('click', () => {
    showToast('Preparing print/export view');
    setTimeout(() => window.print(), 250);
  });
});

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('reveal');
      });
    }, { threshold: 0.14 })
  : null;

qsa('.reveal-on-scroll').forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('reveal');
});

qsa('.glass-card').forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  });
});

const audioToggles = qsa('[data-audio-toggle]');
let playing = false;
let audioTimer;
let audioSeconds = 0;

function updateAudioUI() {
  document.body.classList.toggle('is-playing', playing);
  audioToggles.forEach((button) => {
    button.textContent = button.classList.contains('mini-player-btn') ? (playing ? 'Pause preview' : 'Play preview') : '';
    button.setAttribute('aria-label', playing ? 'Pause preview' : 'Play preview');
  });
}

audioToggles.forEach((button) => {
  button.addEventListener('click', () => {
    playing = !playing;
    updateAudioUI();
    showToast(playing ? 'Preview playing' : 'Preview paused');
    clearInterval(audioTimer);
    if (playing) {
      audioTimer = setInterval(() => {
        audioSeconds = (audioSeconds + 1) % 223;
        const time = qs('[data-track-time]');
        const progress = qs('.track-progress span');
        if (time) {
          const minutes = String(Math.floor(audioSeconds / 60)).padStart(2, '0');
          const seconds = String(audioSeconds % 60).padStart(2, '0');
          time.textContent = `${minutes}:${seconds}`;
        }
        if (progress) progress.style.width = `${(audioSeconds / 223) * 100}%`;
      }, 1000);
    }
  });
});

function animateCounter(counter) {
  const target = Number(counter.dataset.target || 0);
  const suffix = counter.dataset.suffix || '';
  const decimals = target % 1 === 0 ? 0 : 1;
  let frame = 0;
  const totalFrames = 70;
  const tick = () => {
    frame += 1;
    const progress = Math.min(frame / totalFrames, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  };
  tick();
}

const counterObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.4 })
  : null;

qsa('.counter').forEach((counter) => {
  if (counterObserver) counterObserver.observe(counter);
  else animateCounter(counter);
});

const barWrap = qs('[data-bars]');
if (barWrap) {
  setInterval(() => {
    qsa('span,b', barWrap).forEach((bar) => {
      const height = Math.floor(Math.random() * 55) + 28;
      bar.style.height = `${height}%`;
    });
  }, 2600);
}

qsa('[data-autosave]').forEach((field) => {
  const key = `stitch:${location.pathname}:${field.value.slice(0, 20)}:${field.name || field.tagName}`;
  const saved = localStorage.getItem(key);
  if (saved) field.value = saved;
  field.addEventListener('input', () => localStorage.setItem(key, field.value));
});

qsa('[data-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;

    qsa('[data-error-for]', form).forEach((error) => {
      error.textContent = '';
    });

    qsa('input, textarea', form).forEach((field) => {
      const error = qs(`[data-error-for="${field.name}"]`, form);
      if (!field.checkValidity()) {
        valid = false;
        if (error) {
          if (field.validity.valueMissing) error.textContent = 'Required field';
          else if (field.validity.typeMismatch) error.textContent = 'Use a valid email';
          else if (field.validity.tooShort) error.textContent = `Minimum ${field.minLength} characters`;
          else error.textContent = 'Please review this field';
        }
      }
    });

    const status = qs('.form-status', form);
    if (!valid) {
      if (status) status.textContent = 'Please fix the highlighted fields.';
      showToast('Form needs attention');
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    console.info('Ready for backend integration:', payload);
    if (status) status.textContent = 'Inquiry prepared successfully.';
    showToast('Inquiry ready for backend integration');
    form.reset();
  });
});

updateAudioUI();
