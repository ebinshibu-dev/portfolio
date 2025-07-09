// --- Page Loader and Nav Animation ---
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loaded");
    window.scrollTo(0, 0);

    setTimeout(() => {
      const headerText = document.querySelector(".animate-header-text");
      if (headerText) {
        headerText.classList.add("reveal");
      }
    }, 600);
  }, 2000);
});

// --- Animate elements on scroll ---
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll, .project-title')
    .forEach(el => observer.observe(el));
});



// --- Menu Toggle ---
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  menu.classList.toggle('open');
});

// --- Close menu when clicking menu links ---
const menuLinks = document.querySelectorAll('.menu-link');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    menu.classList.remove('open');
  });
});

// --- Smooth scrolling for .nav-scroll links ---
document.querySelectorAll('.nav-scroll').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const container = document.querySelector('.main-container') || document.documentElement;
      const targetPosition = targetElement.offsetTop;
      const startPosition = container.scrollTop;
      const distance = targetPosition - startPosition;
      const duration = 300;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        container.scrollTop = startPosition + distance * ease(progress);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      requestAnimationFrame(animation);
    }
  });
});

// --- Video restart on hover out ---
document.querySelectorAll('.project-item').forEach(item => {
  const videos = item.querySelectorAll('video');
  item.addEventListener('mouseleave', () => {
    videos.forEach(video => {
      if (video.readyState >= 2) {
        video.currentTime = 0;
        video.play();
      } else {
        video.addEventListener('loadeddata', () => {
          video.currentTime = 0;
          video.play();
        }, { once: true });
      }
    });
  });
});

// --- One Scroll = One Section ---
document.addEventListener("DOMContentLoaded", () => {
  const sections = Array.from(document.querySelectorAll("section"));
  let isScrolling = false;
  let currentSection = 0;

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: "smooth" });
    currentSection = index;
    setTimeout(() => isScrolling = false, 400);
  }

  window.addEventListener("wheel", (e) => {
    if (isScrolling) return;

    const width = window.innerWidth;
    const skillsSection = document.querySelector("#skills");
    const projectsItems = document.querySelectorAll("#projects .project-item");

    const skillsTop = skillsSection?.getBoundingClientRect().top;
    const skillsVisible = skillsTop < window.innerHeight && skillsTop > 0;

    if (skillsVisible && e.deltaY < 0 && width <= 705 && projectsItems[2]) {
      isScrolling = true;
      projectsItems[2].scrollIntoView({ behavior: "smooth" });
      currentSection = sections.findIndex(s => s.id === "projects");
      setTimeout(() => isScrolling = false, 400);
      return;
    }

    const currentSectionId = sections[currentSection]?.id;
    if (currentSectionId === "projects" || currentSectionId === "skills") return;

    if (e.deltaY > 0) {
      scrollToSection(currentSection + 1);
    } else if (e.deltaY < 0) {
      scrollToSection(currentSection - 1);
    }
  });

  window.addEventListener("load", () => {
    scrollToSection(0);
  });
});
