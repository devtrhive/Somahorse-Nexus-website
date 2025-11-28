/* ================== SPA NAVIGATION (single index.html) ================== */
(function () {
  const navBtns = Array.from(document.querySelectorAll('.nav-btn'));
  const pages = Array.from(document.querySelectorAll('.page'));
  const mobileLinks = Array.from(document.querySelectorAll('.mobile-link'));
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  const requestDesktop = document.getElementById('requestProposalDesktop');
  const requestMobile = document.getElementById('requestProposalMobile');

  function showPage(id) {
    pages.forEach(p => p.classList.toggle('active', p.id === id));
    navBtns.forEach(b => b.classList.toggle('active', b.dataset.target === id));
    // close mobile menu if open
    if (mobileMenu) { mobileMenu.setAttribute('aria-hidden', 'true'); hamburger.setAttribute('aria-expanded', 'false'); }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // attach nav handlers
  navBtns.forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.target)));
  mobileLinks.forEach(ml => ml.addEventListener('click', () => showPage(ml.dataset.target)));

  // hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!open));
      if (mobileMenu) mobileMenu.setAttribute('aria-hidden', String(open));
    });
  }

  // request proposal shortcuts
  if (requestDesktop) requestDesktop.addEventListener('click', () => showPage('contact'));
  if (requestMobile) requestMobile.addEventListener('click', () => showPage('contact'));

  // default page
  showPage('home');
})();

/* ================== SERVICES accordion inside card (open/close inline) ================== */
(function () {
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));

  function closeAllExcept(except) {
    serviceCards.forEach(card => {
      const body = card.querySelector('.card-body');
      const toggle = card.querySelector('.toggle-open');
      if (card !== except) {
        body.classList.remove('open');
        toggle && toggle.setAttribute('aria-expanded', 'false');
        card.style.opacity = '1';
      } else {
        // leave as is
      }
    });
  }
  // ----- SERVICE CARD TOGGLE -----
document.querySelectorAll(".service-card").forEach(card => {
    const openBtn = card.querySelector(".toggle-open");
    const closeBtn = card.querySelector(".close-card");
    const body = card.querySelector(".card-body");

    openBtn.addEventListener("click", () => {
        card.classList.add("open");
        openBtn.setAttribute("aria-expanded", "true");
        body.setAttribute("aria-hidden", "false");
    });

    closeBtn.addEventListener("click", () => {
        card.classList.remove("open");
        openBtn.setAttribute("aria-expanded", "false");
        body.setAttribute("aria-hidden", "true");
    });
});


  serviceCards.forEach(card => {
    const toggle = card.querySelector('.toggle-open');
    const body = card.querySelector('.card-body');
    const closeBtn = card.querySelector('.close-card');

    // open/close when clicking toggle
    toggle.addEventListener('click', (e) => {
      const isOpen = body.classList.contains('open');
      if (isOpen) {
        body.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        card.style.opacity = '1';
      } else {
        closeAllExcept(card);
        body.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        // dim other cards
        serviceCards.forEach(c => { if (c !== card) c.style.opacity = '0.6'; });
      }
    });

    // keyboard open (Enter)
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') toggle.click(); });

    // close button inside body
    closeBtn.addEventListener('click', () => {
      body.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      serviceCards.forEach(c => c.style.opacity = '1');
    });
  });
})();

/* ================== INDUSTRIES inline expansion ================== */
(function () {
  const industryCards = Array.from(document.querySelectorAll('.industry-card'));

  const industryData = {
    fintech: {
      title: 'Fintech & Financial Services',
      problem: 'Rising fraud, data complexity and pressure to automate operations in financial services.',
      solutions: ['Fraud detection', 'Cashflow forecasting', 'Credit scoring'],
      impact: 'Reduce manual fraud reviews by 60%+ and speed decisioning.'
    },
    agriculture: {
      title: 'Agriculture & Agritech',
      problem: 'Low yields, waste and a lack of actionable farm intelligence.',
      solutions: ['Yield prediction', 'Satellite monitoring', 'Smart irrigation'],
      impact: 'Increase yields, reduce waste and improve farmer incomes.'
    },
    healthcare: {
      title: 'Healthcare & MedTech',
      problem: 'Fragmented data and resource constraints limiting quality of care.',
      solutions: ['Triage & diagnostics support', 'Workflow automation', 'Equipment monitoring'],
      impact: 'Improved diagnostics and more efficient clinics.'
    },
    manufacturing: {
      title: 'Manufacturing & Automation',
      problem: 'Unplanned downtime and inefficiency on production lines.',
      solutions: ['Predictive maintenance', 'Quality inspection', 'Process optimisation'],
      impact: 'Lower downtime and increased throughput.'
    },
    education: {
      title: 'Education & E-Learning',
      problem: 'Access and personalization gaps in learning.',
      solutions: ['Adaptive learning', 'Assessment automation', 'Content recommendation'],
      impact: 'Personalized learning at scale.'
    }
  };

  function closeAllInline() {
    industryCards.forEach(card => {
      const body = card.querySelector('.inline-body');
      body.classList.remove('open');
      body.setAttribute('aria-hidden', 'true');
    });
  }

  industryCards.forEach(card => {
    const key = card.dataset.key;
    const inline = card.querySelector('.inline-body');

    function openInline() {
      const info = industryData[key];
      if (!info) return;
      // render content
      inline.innerHTML = `
        <p><strong>Problem:</strong> ${info.problem}</p>
        <p><strong>Solutions:</strong></p>
        <ul>${info.solutions.map(s => `<li>${s}</li>`).join('')}</ul>
        <p><strong>Expected impact:</strong> ${info.impact}</p>
        <div style="margin-top:8px"><button class="cta primary inline-contact">Request Proposal</button>
        <button class="cta ghost inline-close" style="margin-left:8px">Close</button></div>
      `;
      // close others
      closeAllInline();
      inline.classList.add('open'); inline.setAttribute('aria-hidden', 'false');
      // attach handlers
      inline.querySelectorAll('.inline-close').forEach(b => b.addEventListener('click', () => { inline.classList.remove('open'); inline.setAttribute('aria-hidden','true'); }));
      inline.querySelectorAll('.inline-contact').forEach(b => b.addEventListener('click', () => { document.querySelector('.nav-btn[data-target=\"contact\"]').click(); }));
    }

    // click opens inline
    card.addEventListener('click', (e) => {
      // if click inside inline already, ignore
      if (e.target.closest('.inline-body')) return;
      const isOpen = inline.classList.contains('open');
      if (isOpen) { inline.classList.remove('open'); inline.setAttribute('aria-hidden','true'); }
      else openInline();
    });

    // keyboard
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') card.click(); });
  });
})();

/* ================== CONTACT form handler (demo) ================== */
(function () {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  function showToast(message) {
    toast.textContent = message; toast.style.display = 'block'; toast.setAttribute('aria-hidden', 'false');
    setTimeout(() => { toast.style.display = 'none'; toast.setAttribute('aria-hidden', 'true'); }, 4200);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();
      if (!name || !email || !message) { showToast('Please complete name, email and message.'); return; }
      // Demo: show success; replace with API call
      showToast('Thanks — we received your request. We will follow up via email.');
      form.reset();
      // go home after submit
      document.querySelector('.nav-btn[data-target="home"]').click();
    });
  }

  const cancel = document.getElementById('contactCancel');
  if (cancel) cancel.addEventListener('click', () => { document.querySelector('.nav-btn[data-target="home"]').click(); });
})();
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});


