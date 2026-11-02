// Research filter on the start page and "Copy BibTeX" on paper pages.
// The page works without this script: all papers show, the BibTeX can be selected by hand.
(function () {
  var bar = document.querySelector(".filters");
  if (bar) {
    var cards = document.querySelectorAll(".card[data-type]");
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-f]");
      if (!btn) return;
      bar.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      var f = btn.getAttribute("data-f");
      cards.forEach(function (c) {
        c.hidden = !(f === "all" || c.getAttribute("data-type") === f);
      });
      document.querySelectorAll(".cluster").forEach(function (s) {
        s.hidden = !s.querySelector(".card:not([hidden])");
      });
    });
  }

  function select(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  document.querySelectorAll("button[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-copy"));
      var label = btn.textContent;
      var done = function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = label; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(el.textContent).then(done, function () { select(el); });
      } else {
        select(el);
      }
    });
  });
})();
