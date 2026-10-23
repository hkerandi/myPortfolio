/*
  Small behaviours, nothing that competes with the work:
    1. the nav highlights the section you're reading
    2. a little car drives a road through the page as you scroll, past a checkpoint for each
       section, changing colour to match the section it's in. Same car, different outfits.
       Wide screens: a road down the left margin. Smaller screens: a strip under the nav.
*/

(function () {
  // ---------- 1. Active section in the nav ----------
  const links = Array.from(document.querySelectorAll(".masthead-links a"));
  const navSections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && navSections.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-current", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navSections.forEach(function (s) { observer.observe(s); });
  }

  // ---------- 2. The road and the car ----------
  const road = document.querySelector(".page-road");
  const car = road && road.querySelector(".road-car");
  const main = document.getElementById("main");
  if (!road || !car || !main) return;

  // Each section's outfit: the colour the car wears there, and its checkpoint label
  const OUTFITS = {
    "top":            { colour: "#c9a24a", label: "01" },
    "data-in-motion": { colour: "#ff7a00", label: "02" },
    "experiences":    { colour: "#e8a0b8", label: "03" },
    "research":       { colour: "#3aa88f", label: "04" },
    "magazine":       { colour: "#f3ead9", label: "05" },
    "engineering":    { colour: "#c9a24a", label: "06" },
    "about":          { colour: "#ff9a3c", label: "✦" },
    "contact":        { colour: "#f3ead9", label: "🏁" },
  };

  const sections = Object.keys(OUTFITS)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  const wide = window.matchMedia("(min-width: 1360px)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let checkpoints = [];
  let lastY = window.scrollY;

  function buildCheckpoints() {
    checkpoints.forEach(function (c) { c.remove(); });
    checkpoints = sections.map(function (sec) {
      const cp = document.createElement("span");
      cp.className = "road-checkpoint";
      cp.textContent = OUTFITS[sec.id].label;
      cp.style.setProperty("--cp", OUTFITS[sec.id].colour);
      road.appendChild(cp);
      return cp;
    });
  }

  function layout() {
    const mainTop = main.getBoundingClientRect().top + window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    road.classList.toggle("is-vertical", wide.matches);
    road.classList.toggle("is-strip", !wide.matches);
    // the strip sits just under the nav, whatever height the nav has on this screen
    const masthead = document.querySelector(".masthead");
    road.style.top = (!wide.matches && masthead) ? masthead.offsetHeight + "px" : "";
    sections.forEach(function (sec, i) {
      const secTop = sec.getBoundingClientRect().top + window.scrollY;
      if (wide.matches) {
        checkpoints[i].style.top = (secTop - mainTop + 40) + "px";
        checkpoints[i].style.left = "";
      } else {
        const frac = Math.min(Math.max(secTop / Math.max(docH, 1), 0), 1);
        checkpoints[i].style.left = "calc(" + (frac * 100) + "% - " + (frac * 24) + "px)";
        checkpoints[i].style.top = "";
      }
    });
    drive();
  }

  function currentSection() {
    const line = window.innerHeight * 0.5;
    let current = sections[0];
    sections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top <= line) current = sec;
    });
    return current;
  }

  function drive() {
    const y = window.scrollY;
    const goingUp = y < lastY;
    if (y !== lastY) car.classList.toggle("is-reversing", goingUp);
    lastY = y;

    const outfit = OUTFITS[currentSection().id];
    car.style.color = outfit.colour;

    if (wide.matches) {
      const mainTop = main.getBoundingClientRect().top + y;
      const travel = road.offsetHeight - car.offsetHeight;
      const pos = Math.min(Math.max(y + window.innerHeight * 0.5 - mainTop, 0), travel);
      car.style.transform = "translateY(" + pos + "px)" + (car.classList.contains("is-reversing") ? "" : " rotate(180deg)");
    } else {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const frac = Math.min(Math.max(y / Math.max(docH, 1), 0), 1);
      const travel = road.offsetWidth - car.offsetWidth;
      car.style.transform = "translateX(" + (frac * travel) + "px) rotate(" + (car.classList.contains("is-reversing") ? -90 : 90) + "deg)";
    }
  }

  buildCheckpoints();
  layout();
  window.addEventListener("scroll", reduceMotion ? function () { car.style.color = OUTFITS[currentSection().id].colour; } : drive, { passive: true });
  window.addEventListener("resize", layout);
  window.addEventListener("load", layout);          // fonts and images change section positions
  if (wide.addEventListener) wide.addEventListener("change", layout);
})();