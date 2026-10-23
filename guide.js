/*
  "Talk to me": a button in the corner that opens a small contact card.
  Edit the three settings below. Leave EMAIL empty to show LinkedIn only.
*/

(function () {
  const EMAIL = "holinesskerandi@gmail.com";   // e.g. "you@example.com" (a personal address keeps working after graduation)
  const LINKEDIN = "https://www.linkedin.com/in/holiness-kerandi";
  const RESUME = "img/Holiness_Kerandi_Resume.pdf";

  const root = document.createElement("div");
  root.className = "guide";
  root.innerHTML = `
    <div class="guide-panel" id="guide-panel" role="dialog" aria-label="Contact Holiness" hidden>
      <div class="guide-header">
        <img src="img/avatars/data_front.png" alt="" class="guide-header-avatar">
        <div>
          <div class="guide-name">Let's talk</div>
          <div class="guide-status">Open to data engineering roles</div>
        </div>
        <button class="guide-close" type="button" aria-label="Close">×</button>
      </div>
      <div class="guide-body">
        <p class="guide-msg guide-msg-guide">Hi! The best way to reach me is below. I'd love to hear from you.</p>
        ${EMAIL ? `
        <div class="contact-row">
          <span class="contact-label">Email</span>
          <div class="contact-actions">
            <a class="btn-small" href="mailto:${EMAIL}">Email me →</a>
            <button class="contact-copy" type="button">Copy</button>
          </div>
        </div>` : ""}
        <div class="contact-row">
          <span class="contact-label">LinkedIn</span>
          <div class="contact-actions">
            <a class="btn-small" href="${LINKEDIN}" target="_blank" rel="noopener">Connect on LinkedIn →</a>
          </div>
        </div>
      </div>
    </div>
    <button class="guide-toggle" type="button" aria-expanded="false" aria-controls="guide-panel">
      <img src="img/avatars/data_front.png" alt="">
      <span class="guide-toggle-text">Talk to me</span>
    </button>
  `;
  document.body.appendChild(root);

  const panel = root.querySelector(".guide-panel");
  const toggle = root.querySelector(".guide-toggle");
  const closeBtn = root.querySelector(".guide-close");
  const copyBtn = root.querySelector(".contact-copy");

  function open() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.classList.add("is-open");
    panel.querySelector("a, button.contact-copy").focus();
  }

  function close() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.classList.remove("is-open");
    toggle.focus();
  }

  toggle.addEventListener("click", function () { panel.hidden ? open() : close(); });
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) close();
  });
  // Click outside the card closes it
  document.addEventListener("click", function (e) {
    if (!panel.hidden && !root.contains(e.target)) close();
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const done = function () {
        copyBtn.textContent = "Copied!";
        setTimeout(function () { copyBtn.textContent = "Copy"; }, 1800);
      };
      // Older method, used if the modern clipboard is missing or refuses
      const fallback = function () {
        const t = document.createElement("textarea");
        t.value = EMAIL;
        t.setAttribute("readonly", "");
        t.style.position = "fixed";
        t.style.opacity = "0";
        document.body.appendChild(t);
        t.select();
        let ok = false;
        try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
        t.remove();
        if (ok) { done(); } else { copyBtn.textContent = "Select the email above"; }
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(EMAIL).then(done, fallback);
      } else {
        fallback();
      }
    });
  }
})();