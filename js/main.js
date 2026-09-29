/* Progressive enhancement only — the page is fully readable without this file. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Email link ----
     The address is not in the HTML (keeps it from scrapers); it is assembled here.
     If no mail app takes the mailto: link, reveal a fallback with the address after a click. */
  var mail = document.getElementById("email-link");
  var fb = document.getElementById("mail-fallback");
  if (mail && mail.dataset.m) {
    var addr = "";
    try { addr = atob(mail.dataset.m); } catch (e) {}
    if (addr) {
      var subject = "Project%20inquiry";
      mail.href = "mailto:" + addr + "?subject=" + subject;
      mail.removeAttribute("data-m");
      if (fb) {
        mail.addEventListener("click", function () {
          var left = false;
          var mark = function () { left = true; };
          window.addEventListener("blur", mark, { once: true });
          document.addEventListener("visibilitychange", mark, { once: true });
          setTimeout(function () {
            window.removeEventListener("blur", mark);
            document.removeEventListener("visibilitychange", mark);
            if (left || !fb.hidden) return;
            document.getElementById("mail-address").textContent = addr;
            document.getElementById("mail-gmail").href =
              "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(addr) + "&su=" + subject;
            fb.hidden = false;
          }, 1500);
        });
        var copy = document.getElementById("mail-copy");
        copy.addEventListener("click", function () {
          var done = function () { copy.textContent = "Copied!"; setTimeout(function () { copy.textContent = "Copy address"; }, 2000); };
          if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(addr).then(done, function () {}); }
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
