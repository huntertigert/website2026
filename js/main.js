/* Progressive enhancement only — the page is fully readable without this file. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Email address ----
     Shown as plain text, but assembled here instead of sitting in the HTML, so simple
     scrapers don't harvest it. Without JS the link falls back to LinkedIn. */
  var mail = document.getElementById("email-link");
  if (mail && mail.dataset.m) {
    var addr = "";
    try { addr = atob(mail.dataset.m); } catch (e) {}
    if (addr) {
      mail.href = "mailto:" + addr + "?subject=Project%20inquiry";
      mail.textContent = addr;
      mail.removeAttribute("data-m");
      var copy = document.getElementById("mail-copy");
      if (copy && navigator.clipboard && navigator.clipboard.writeText) {
        copy.hidden = false;
        copy.addEventListener("click", function () {
          navigator.clipboard.writeText(addr).then(function () {
            copy.textContent = "Copied!";
            setTimeout(function () { copy.textContent = "Copy"; }, 2000);
          }, function () {});
        });
      }
    }
  }

  /* ---- Theme toggle (initial theme is set by the inline script in <head>) ---- */
  var toggle = document.getElementById("theme-toggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  function paintTheme() {
    var dark = root.getAttribute("data-theme") === "dark";
    if (toggle) toggle.setAttribute("aria-pressed", dark ? "true" : "false");
    if (themeMeta) themeMeta.setAttribute("content", dark ? "#17181C" : "#FAFAF9");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      paintTheme();
    });
  }
  paintTheme();

  /* ---- Typing effect in the code card (decorative; static text is the fallback) ---- */
  var typed = document.getElementById("typed");
  if (typed && !reduce) {
    var line = typed.textContent, i = 0, timer;
    var tick = function () {
      i++;
      typed.textContent = line.slice(0, i);
      if (i < line.length) { timer = setTimeout(tick, 55); }
      else { timer = setTimeout(function () { i = 0; typed.textContent = ""; timer = setTimeout(tick, 400); }, 2200); }
    };
    typed.textContent = "";
    timer = setTimeout(tick, 400);
  }

  /* ---- Pointer tilt on the 3D card ---- */
  var stage = document.getElementById("ring-stage");
  var ring = stage && stage.firstElementChild;
  if (ring && !reduce && window.matchMedia("(hover: hover)").matches) {
    var frame = 0;
    stage.addEventListener("pointermove", function (e) {
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        var r = stage.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        ring.style.setProperty("--ry", (px * 24).toFixed(1) + "deg");
        ring.style.setProperty("--rp", (-py * 18).toFixed(1) + "deg");
      });
    });
    stage.addEventListener("pointerleave", function () {
      ring.style.removeProperty("--ry");
      ring.style.removeProperty("--rp");
    });
  }
})();
