document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  menuBtn?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const sections = document.querySelectorAll("section, header");
  const dots = document.querySelectorAll(".dot-nav a");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        dots.forEach((dot) => dot.classList.toggle("active", dot.getAttribute("href") === `#${entry.target.id}`));
      });
    },
    { threshold: 0.42 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const progressBar = document.getElementById("progressBar");
  const cursorGlow = document.querySelector(".cursor-glow");

  window.addEventListener("scroll", () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });

  window.addEventListener("mousemove", (event) => {
    if (!cursorGlow) return;
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll(".glass-card, .service-card, .price-card, .project-card, .audit-form").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -5;
      const rotateY = ((x / rect.width) - 0.5) * 5;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  const handleForm = (formId, successText, resetText) => {
    const form = document.getElementById(formId);
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector("button");
      button.textContent = successText;
      if (window.gtag) {
        gtag("event", formId === "auditForm" ? "free_audit_request" : "project_enquiry", {
          event_category: "lead",
          event_label: formId
        });
      }
      setTimeout(() => {
        button.textContent = resetText;
        form.reset();
      }, 2200);
    });
  };

  handleForm("contactForm", "Enquiry Sent", "Start My Project");
  handleForm("auditForm", "Audit Requested", "Request Free Audit");
});
