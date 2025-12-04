/* ================== SPA NAVIGATION ================== */
(function () {
  const navBtns        = Array.from(document.querySelectorAll('.nav-btn'));
  const pages          = Array.from(document.querySelectorAll('.page'));
  const mobileLinks    = Array.from(document.querySelectorAll('.mobile-link'));
  const mobileMenu     = document.getElementById('mobileMenu');
  const hamburger      = document.getElementById('hamburger');
  const requestDesktop = document.getElementById('requestProposalDesktop');
  const requestMobile  = document.getElementById('requestProposalMobile');

  function showPage(id) {
    pages.forEach(p => p.classList.toggle('active', p.id === id));
    navBtns.forEach(b => b.classList.toggle('active', b.dataset.target === id));

    if (mobileMenu) {
      mobileMenu.classList.remove("open");
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  navBtns.forEach(btn =>
    btn.addEventListener('click', () => showPage(btn.dataset.target))
  );

  mobileLinks.forEach(ml =>
    ml.addEventListener('click', () => showPage(ml.dataset.target))
  );

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.classList.toggle("open");
      mobileMenu.setAttribute("aria-hidden", expanded ? "true" : "false");
    });
  }

  if (requestDesktop)
    requestDesktop.addEventListener('click', () => showPage('contact'));
  if (requestMobile)
    requestMobile.addEventListener('click', () => showPage('contact'));
  // Hero CTA buttons on the home hero
  const heroCtas = document.querySelectorAll('.hero-ctas .cta');
  heroCtas.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target) showPage(target);
    });
  });
  showPage('home');
})();

/* ================== SERVICES ACCORDION ================== */
(function () {
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));

  function closeOthers(except) {
    serviceCards.forEach(card => {
      if (card !== except) {
        card.classList.remove("open");
        const body = card.querySelector(".card-body");
        if (body) body.classList.remove("open");
        card.style.opacity = "1";
      }
    });
  }

  serviceCards.forEach(card => {
    const toggle   = card.querySelector('.toggle-open');
    const body     = card.querySelector('.card-body');
    const closeBtn = card.querySelector('.close-card');

    if (!toggle || !body || !closeBtn) return;

    toggle.addEventListener('click', () => {
      const isOpen = card.classList.contains("open");

      if (isOpen) {
        card.classList.remove("open");
        body.classList.remove("open");
        serviceCards.forEach(c => {
          c.style.opacity = "1";
          c.style.pointerEvents = "auto";
        });
      } else {
        closeOthers(card);
        card.classList.add("open");
        body.classList.add("open");
        serviceCards.forEach(c => { 
          if (c !== card) {
            c.style.opacity = "0.5";
            c.style.pointerEvents = "none";
          }
        });
      }
    });

    closeBtn.addEventListener('click', () => {
      card.classList.remove("open");
      body.classList.remove("open");
      serviceCards.forEach(c => {
        c.style.opacity = "1";
        c.style.pointerEvents = "auto";
      });
    });
  });
})();

/* ================== INDUSTRIES INLINE ================== */
(function () {
  const industryCards = Array.from(document.querySelectorAll('.industry-card'));

  const industryData = {
    fintech: {
      problem: "Low financial inclusion, high fraud rates and fragmented payment systems.",
      solutions: [
        "AI credit scoring using mobile money data",
        "Real-time fraud detection for digital payments",
        "Unified payment gateways combining multiple payment methods"
      ],
      impact: "Safer transactions, better credit access, and streamlined payments across Africa."
    },
    agriculture: {
      problem: "Low yields, weak market access and lack of real-time farm intelligence.",
      solutions: [
        "Precision farming platforms using satellite & sensor data",
        "Mobile apps connecting farmers directly to buyers",
        "Crop disease detection using phone cameras + AI"
      ],
      impact: "Higher yields, reduced losses, and direct market access for farmers."
    },
    education: {
      problem: "Limited access to personalised learning and outdated school admin.",
      solutions: [
        "Adaptive learning platforms tailored to each student",
        "Mobile-first apps for practical & vocational skills",
        "School management systems for admin automation"
      ],
      impact: "Better learning outcomes and reduced admin load for schools."
    },
    healthcare: {
      problem: "Limited access to medical expertise, poor diagnostic capacity and medication shortages.",
      solutions: [
        "Telemedicine platforms for remote consultations",
        "AI diagnostic tools for medical imaging",
        "Drug inventory tracking systems for clinics"
      ],
      impact: "Earlier diagnosis, wider access to care, and reduced stock-outs."
    },
    manufacturing: {
      problem: "Unplanned downtime, slow production and poor supply chain visibility.",
      solutions: [
        "Production monitoring systems using IoT sensors",
        "Predictive maintenance tools for factory equipment",
        "Supply chain tracking platforms from factory to customer"
      ],
      impact: "Higher output, fewer breakdowns, and full supply chain transparency."
    }
  };

  function closeAllInline() {
    industryCards.forEach(card => {
      const body = card.querySelector('.inline-body');
      if (!body) return;
      body.classList.remove("open");
      body.setAttribute("aria-hidden", "true");
    });
  }

  industryCards.forEach(card => {
    const key    = card.dataset.key;
    const inline = card.querySelector('.inline-body');
    if (!key || !inline) return;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.inline-body')) return;

      const open = inline.classList.contains("open");

      if (open) {
        inline.classList.remove("open");
        inline.setAttribute("aria-hidden", "true");
        return;
      }

      const info = industryData[key];
      if (!info) return;

      inline.innerHTML = `
        <div class="space-y-5 py-2">
          <p class="text-slate-700 leading-relaxed"><strong class="text-primary font-bold">Problem:</strong> ${info.problem}</p>
          <div>
            <p class="text-slate-700 mb-3 font-semibold"><strong class="text-primary">Solutions:</strong></p>
            <ul class="list-disc pl-6 space-y-2 text-slate-600">${info.solutions.map(s => `<li class="leading-relaxed">${s}</li>`).join('')}</ul>
          </div>
          <p class="text-slate-700 leading-relaxed"><strong class="text-primary font-bold">Impact:</strong> ${info.impact}</p>
          <div class="flex flex-wrap gap-3 pt-4">
            <button class="cta primary inline-contact px-6 py-3 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-bold rounded-xl transition-all transform hover:-translate-y-1 shadow-lg">Request Proposal</button>
            <button class="cta ghost inline-close px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl border border-slate-300 transition-all">Close</button>
          </div>
        </div>
      `;

      closeAllInline();
      inline.classList.add("open");
      inline.setAttribute("aria-hidden", "false");

      inline.querySelector(".inline-close").addEventListener("click", () => {
        inline.classList.remove("open");
        inline.setAttribute("aria-hidden", "true");
      });

      inline.querySelector(".inline-contact").addEventListener("click", () => {
        const contactBtn = document.querySelector('.nav-btn[data-target="contact"]');
        if (contactBtn) contactBtn.click();
      });
    });
  });
})();

/* ================== FORMS → WEB3FORMS + TOAST ================== */
(function () {
  const talentForm  = document.getElementById('talentForm');
  const contactForm = document.getElementById('contactForm');
  const toast       = document.getElementById('toast');

  function showToast(message, type = 'success') {
    if (!toast) {
      alert(message);
      return;
    }

    toast.textContent = message;
    toast.style.display = 'block';
    toast.style.background =
      type === 'success'
        ? 'rgba(22,163,74,0.95)'
        : 'rgba(220,38,38,0.95)';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 4000);
  }

  function wireForm(form) {
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          showToast('Thank you for your submission. We will be in touch soon.', 'success');
          form.reset();
        } else {
          showToast('Something went wrong. Please try again.', 'error');
        }
      } catch (err) {
        showToast('Network error. Please try again later.', 'error');
      }
    });
  }

  wireForm(talentForm);
  wireForm(contactForm);
})();

/* ================== HERO CTA SWITCHING ================== */
document.querySelectorAll('.hero-ctas .cta').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');

    const page = document.querySelector(`.page#${target}`);
    if (page) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      page.classList.add('active');
    }

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(nav => {
      nav.classList.remove('active');
      if (nav.getAttribute('data-target') === target) {
        nav.classList.add('active');
      }
    });

    const section = document.getElementById(target);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 30);
    }
  });
});
