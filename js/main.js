/* Progressive enhancement only — the page is fully readable without this file. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Contact form: submit in place (falls back to a normal POST without JS) ---- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form && status && window.fetch) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var label = btn.textContent;
      btn.disabled = true; btn.textContent = "Sending…";
      status.className = "form-status"; status.textContent = "";
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("bad response");
          form.reset();
          status.className = "form-status ok";
          status.textContent = "Thanks! Your message is on its way — I'll reply personally, usually within a day.";
        })
        .catch(function () {
          status.className = "form-status err";
          status.textContent = "Sorry, that didn't send. Please try again, or reach me on LinkedIn.";
        })
        .then(function () { btn.disabled = false; btn.textContent = label; });
    });
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
