/* ================== SPA NAVIGATION ================== */
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

    // Close mobile menu
    if (mobileMenu) {
      mobileMenu.classList.remove("open");
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Desktop navbar
  navBtns.forEach(btn =>
    btn.addEventListener('click', () => showPage(btn.dataset.target))
  );

  // Mobile navbar links
  mobileLinks.forEach(ml =>
    ml.addEventListener('click', () => showPage(ml.dataset.target))
  );

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.classList.toggle("open");
      mobileMenu.setAttribute("aria-hidden", expanded ? "true" : "false");
    });
  }

  // Request proposal buttons
  if (requestDesktop)
    requestDesktop.addEventListener('click', () => showPage('contact'));
  if (requestMobile)
    requestMobile.addEventListener('click', () => showPage('contact'));

  showPage('home');
})();


/* ================== SERVICES ACCORDION ================== */
(function () {
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));

  function closeOthers(except) {
    serviceCards.forEach(card => {
      if (card !== except) {
        card.classList.remove("open");
        card.querySelector(".card-body").classList.remove("open");
        card.style.opacity = "1";
      }
    });
  }

  serviceCards.forEach(card => {
    const toggle = card.querySelector('.toggle-open');
    const body = card.querySelector('.card-body');
    const closeBtn = card.querySelector('.close-card');

    toggle.addEventListener('click', () => {
      const isOpen = card.classList.contains("open");

      if (isOpen) {
        card.classList.remove("open");
        body.classList.remove("open");
        serviceCards.forEach(c => c.style.opacity = "1");
      } else {
        closeOthers(card);
        card.classList.add("open");
        body.classList.add("open");
        serviceCards.forEach(c => { if (c !== card) c.style.opacity = "0.5"; });
      }
    });

    closeBtn.addEventListener('click', () => {
      card.classList.remove("open");
      body.classList.remove("open");
      serviceCards.forEach(c => c.style.opacity = "1");
    });
  });
})();


/* ================== INDUSTRIES INLINE ================== */
(function () {
  const industryCards = Array.from(document.querySelectorAll('.industry-card'));

  const industryData = {
    fintech: {
      problem: 'Rising fraud, data complexity and pressure to automate.',
      solutions: ['Fraud detection', 'Cashflow forecasting', 'Credit scoring'],
      impact: 'Reduce manual fraud reviews by 60%+'
    },
    agriculture: {
      problem: 'Low yields & lack of real-time farm intelligence.',
      solutions: ['Yield prediction', 'Satellite monitoring', 'Smart irrigation'],
      impact: 'Increase yields and reduce waste'
    },
    healthcare: {
      problem: 'Fragmented data limiting quality of care.',
      solutions: ['Diagnostics support', 'Automation', 'Equipment monitoring'],
      impact: 'Better diagnostics, smoother workflows'
    },
    manufacturing: {
      problem: 'Unplanned downtime & inefficiency.',
      solutions: ['Predictive maintenance', 'Quality inspection', 'Optimisation'],
      impact: 'Lower downtime + higher output'
    },
    education: {
      problem: 'Personalization gaps in learning.',
      solutions: ['Adaptive learning', 'Assessment automation', 'Recommendations'],
      impact: 'Personalized learning at scale'
    }
  };

  function closeAllInline() {
    industryCards.forEach(card => {
      const body = card.querySelector('.inline-body');
      body.classList.remove("open");
      body.setAttribute("aria-hidden", "true");
    });
  }

  industryCards.forEach(card => {
    const key = card.dataset.key;
    const inline = card.querySelector('.inline-body');

    card.addEventListener('click', (e) => {
      if (e.target.closest('.inline-body')) return;

      const open = inline.classList.contains("open");

      if (open) {
        inline.classList.remove("open");
        inline.setAttribute("aria-hidden", "true");
        return;
      }

      const info = industryData[key];
      inline.innerHTML = `
        <p><strong>Problem:</strong> ${info.problem}</p>
        <p><strong>Solutions:</strong></p>
        <ul>${info.solutions.map(s => `<li>${s}</li>`).join('')}</ul>
        <p><strong>Impact:</strong> ${info.impact}</p>

        <button class="cta primary inline-contact">Request Proposal</button>
        <button class="cta ghost inline-close" style="margin-left:8px">Close</button>
      `;

      closeAllInline();
      inline.classList.add("open");
      inline.setAttribute("aria-hidden", "false");

      inline.querySelector(".inline-close").addEventListener("click", () => {
        inline.classList.remove("open");
        inline.setAttribute("aria-hidden", "true");
      });

      inline.querySelector(".inline-contact").addEventListener("click", () => {
        document.querySelector('.nav-btn[data-target="contact"]').click();
      });
    });
  });
})();


/* ================== CONTACT FORM ================== */
(function () {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    toast.textContent = msg;
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 3500);
  }

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = form.elements["name"].value.trim();
      const email = form.elements["email"].value.trim();
      const message = form.elements["message"].value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all required fields.");
        return;
      }

      showToast("Your request has been received!");
      form.reset();

      document.querySelector('.nav-btn[data-target="home"]').click();
    });
  }

  const cancel = document.getElementById("contactCancel");
  if (cancel) cancel.addEventListener("click", () => {
    document.querySelector('.nav-btn[data-target="home"]').click();
  });
})();
document.querySelectorAll('.hero-ctas .cta').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');

    // Step 1 — Activate the tab/page
    const page = document.querySelector(`.page#${target}`);
    if (page) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      page.classList.add('active');
    }

    // Step 2 — Scroll to the section INSIDE the page
    const section = document.getElementById(target);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 20);
    }
  });
});
document.querySelectorAll('.hero-ctas .cta').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');

    // 1 — Activate the correct page
    const page = document.querySelector(`.page#${target}`);
    if (page) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      page.classList.add('active');
    }

    // 2 — Update navbar active state
    const navLinks = document.querySelectorAll('nav a[data-target]');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-target') === target) {
        link.classList.add('active');
      }
    });

    // 3 — Scroll to the section inside the page
    const section = document.getElementById(target);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  });
});
