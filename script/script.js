document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE NAVIGATION
  ========================= */

  const nav = document.getElementById("mainNav");
  const menu = document.querySelector(".menu-toggle");

  if (menu && nav) {
    menu.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* =========================
     SCROLL REVEAL ANIMATION
  ========================= */

  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  reveals.forEach(element => {
    revealObserver.observe(element);
  });


  /* =========================
     ANIMATED STAT COUNTERS
  ========================= */

  const counters = document.querySelectorAll("[data-count]");
  const statsPanel = document.querySelector(".stats-panel");

  let countersStarted = false;

  function animateCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

      const target = Number(counter.dataset.count);
      const duration = 1400;
      const startTime = performance.now();

      function updateCounter(currentTime) {

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth easing
        const easedProgress =
          1 - Math.pow(1 - progress, 3);

        const currentValue =
          Math.floor(target * easedProgress);

        counter.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  if (statsPanel) {

    const statsObserver = new IntersectionObserver(
      entries => {

        if (entries[0].isIntersecting) {

          animateCounters();

          statsObserver.disconnect();
        }
      },
      {
        threshold: 0.35
      }
    );

    statsObserver.observe(statsPanel);
  }


  /* =========================
     SPACE HERO PARALLAX
  ========================= */

  const hero = document.querySelector(".hero");
  const astronaut = document.querySelector(".astronaut");
  const satellite = document.querySelector(".satellite");
  const earth = document.querySelector(".planet-earth");

  if (
    hero &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    hero.addEventListener("mousemove", event => {

      const rect = hero.getBoundingClientRect();

      const mouseX =
        (event.clientX - rect.left) / rect.width - 0.5;

      const mouseY =
        (event.clientY - rect.top) / rect.height - 0.5;

      if (astronaut) {
        astronaut.style.marginLeft =
          `${mouseX * 18}px`;
      }

      if (satellite) {
        satellite.style.marginLeft =
          `${mouseX * -25}px`;
      }

      if (earth) {
        earth.style.marginTop =
          `${mouseY * 15}px`;
      }
    });

    hero.addEventListener("mouseleave", () => {

      if (astronaut) {
        astronaut.style.marginLeft = "";
      }

      if (satellite) {
        satellite.style.marginLeft = "";
      }

      if (earth) {
        earth.style.marginTop = "";
      }
    });
  }


  /* =========================
     TESTIMONIAL SLIDER
  ========================= */

  const testimonials = [

    {
      quote:
        "Your genuine client testimonial can go here.",
      author:
        "Client Name",
      service:
        "Service"
    },

    {
      quote:
        "Add another genuine client result or testimonial here.",
      author:
        "Client Name",
      service:
        "Service"
    },

    {
      quote:
        "Show real feedback from your best projects here.",
      author:
        "Client Name",
      service:
        "Service"
    }

  ];

  const quoteElement =
    document.getElementById("quote");

  const authorElement =
    document.getElementById("author");

  const serviceElement =
    document.getElementById("service");

  const dots =
    document.querySelectorAll(".dots button");

  let activeTestimonial = 0;


  function showTestimonial(index) {

    activeTestimonial = index;

    if (quoteElement) {
      quoteElement.textContent =
        testimonials[index].quote;
    }

    if (authorElement) {
      authorElement.textContent =
        testimonials[index].author;
    }

    if (serviceElement) {
      serviceElement.textContent =
        testimonials[index].service;
    }

    dots.forEach((dot, i) => {

      if (i === index) {
        dot.style.background = "#00ffe0";
      } else {
        dot.style.background = "#315858";
      }

    });
  }


  dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {
      showTestimonial(index);
    });

  });


  if (dots.length > 1) {

    setInterval(() => {

      const next =
        (activeTestimonial + 1) %
        testimonials.length;

      showTestimonial(next);

    }, 5000);
  }


  /* =========================
     CONTACT FORM
  ========================= */

  const contactForm =
    document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const formData =
          new FormData(contactForm);

        const name =
          formData.get("name") || "";

        const email =
          formData.get("email") || "";

        const phone =
          formData.get("phone") || "";

        const selectedService =
          formData.get("service") || "";

        const message =
          formData.get("message") || "";


        const subject =
          encodeURIComponent(
            `New project request from ${name}`
          );


        const body =
          encodeURIComponent(

`Hello Goldy,

I would like help with:

Service: ${selectedService}

Name: ${name}
Email: ${email}
Phone / WhatsApp: ${phone}

Project details:

${message}

Thank you.`
          );


        window.location.href =
          `mailto:contact@goldymehra.com?subject=${subject}&body=${body}`;

      }
    );
  }


  /* =========================
     CURRENT YEAR
  ========================= */

  const year =
    document.getElementById("year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  /* =========================
     ACTIVE NAVIGATION
  ========================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".main-nav a"
    );


  const sectionObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          navLinks.forEach(link => {

            const isActive =
              link.getAttribute("href") ===
              `#${entry.target.id}`;

            link.classList.toggle(
              "active",
              isActive
            );

          });

        });

      },
      {
        rootMargin:
          "-35% 0px -55% 0px"
      }
    );


  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* =========================
     SMOOTH SCROLL
  ========================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* =========================
     SPACE STAR EFFECT
  ========================= */

  const starContainer =
    document.querySelector(".stars");

  if (starContainer) {

    let lastScroll = 0;

    window.addEventListener(
      "scroll",
      () => {

        const scrollY =
          window.scrollY;

        const difference =
          scrollY - lastScroll;

        lastScroll = scrollY;

        const currentTransform =
          `translateY(${scrollY * 0.03}px)`;

        starContainer.style.transform =
          currentTransform;

      },
      {
        passive: true
      }
    );
  }


  /* =========================
     INITIAL TESTIMONIAL
  ========================= */

  if (testimonials.length > 0) {
    showTestimonial(0);
  }

});
