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

document.querySelectorAll('.hero-ctas .cta').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');

    // 1 — Switch tabs/pages
    const page = document.querySelector(`.page#${target}`);
    if (page) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      page.classList.add('active');
    }

    // 2 — Highlight correct navbar button
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(nav => {
      nav.classList.remove('active');
      if (nav.getAttribute('data-target') === target) {
        nav.classList.add('active');
      }
    });

    // 3 — Smooth scroll inside page
    const section = document.getElementById(target);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 30);
    }
  });
});
