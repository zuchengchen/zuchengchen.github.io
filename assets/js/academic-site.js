(function () {
  "use strict";

  var STORAGE_KEY = "academic-site-language";
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function preferredLanguage() {
    var saved = window.localStorage && window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "zh") return saved;

    var languages = [];
    if (navigator.languages && navigator.languages.length) {
      languages = languages.concat(Array.prototype.slice.call(navigator.languages));
    }
    if (navigator.language) languages.push(navigator.language);
    if (navigator.userLanguage) languages.push(navigator.userLanguage);
    if (window.Intl && Intl.DateTimeFormat) {
      var locale = Intl.DateTimeFormat().resolvedOptions().locale;
      if (locale) languages.push(locale);
    }
    return languages.some(function (language) {
      return /^zh\b/i.test(language);
    }) ? "zh" : "en";
  }

  function applyLanguage(lang) {
    var next = lang === "zh" ? "zh" : "en";
    document.documentElement.setAttribute("lang", next === "zh" ? "zh-CN" : "en");
    document.documentElement.setAttribute("data-lang", next);

    var nodes = document.querySelectorAll("[data-i18n-en], [data-i18n-zh]");
    Array.prototype.forEach.call(nodes, function (node) {
      var value = node.getAttribute("data-i18n-" + next);
      if (value !== null) node.textContent = value;
    });

    var toggles = document.querySelectorAll("[data-language-toggle]");
    Array.prototype.forEach.call(toggles, function (toggle) {
      var buttons = toggle.querySelectorAll("[data-lang-option]");
      Array.prototype.forEach.call(buttons, function (button) {
        var active = button.getAttribute("data-lang-option") === next;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
    });
  }

  function bindLanguageToggle() {
    document.addEventListener("click", function (event) {
      var button = event.target.closest && event.target.closest(".language-toggle [data-lang-option]");
      if (!button) return;
      var lang = button.getAttribute("data-lang-option");
      if (window.localStorage) window.localStorage.setItem(STORAGE_KEY, lang);
      applyLanguage(lang);
    });
  }

  function canvasVisible(canvas) {
    var rect = canvas.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function initSpacetimeCanvas() {
    var canvas = document.querySelector("[data-spacetime-canvas]");
    if (!canvas || !canvas.getContext) return;

    var context = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width = 0;
    var height = 0;
    var animationFrame = null;
    var time = 0;
    var stars = [];
    var grid = [];

    function reset() {
      var rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      var starCount = width < 700 ? 70 : 130;
      stars = [];
      for (var i = 0; i < starCount; i += 1) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.35 + 0.2,
          a: Math.random() * 0.55 + 0.18,
          drift: Math.random() * 0.25 + 0.05
        });
      }

      grid = [];
      var columns = width < 700 ? 14 : 22;
      var rows = width < 700 ? 8 : 12;
      for (var y = 0; y <= rows; y += 1) {
        var row = [];
        for (var x = 0; x <= columns; x += 1) {
          row.push({
            x: (x / columns - 0.5) * width * 1.22,
            y: (y / rows - 0.5) * height * 0.85,
            phase: Math.random() * Math.PI * 2
          });
        }
        grid.push(row);
      }
    }

    function project(point, t) {
      var horizon = height * 0.62;
      var centerX = width * 0.56;
      var centerY = height * 0.68;
      var wave = Math.sin(point.x * 0.012 + t * 0.55 + point.phase) * 15;
      var sag = Math.cos(point.y * 0.015 + t * 0.32) * 9;
      var radial = Math.sqrt(point.x * point.x + point.y * point.y);
      var lens = Math.sin(radial * 0.008 - t * 0.45) * 12;
      var depth = 1 + (point.y + height * 0.35) / height * 0.8;
      return {
        x: centerX + point.x * depth * 0.78 + lens,
        y: horizon + point.y * depth * 0.55 + wave + sag
      };
    }

    function drawBackground(t) {
      var gradient = context.createRadialGradient(
        width * 0.62,
        height * 0.18,
        height * 0.04,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      gradient.addColorStop(0, "#43220f");
      gradient.addColorStop(0.28, "#111827");
      gradient.addColorStop(0.68, "#06080d");
      gradient.addColorStop(1, "#020306");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = "screen";
      stars.forEach(function (star) {
        var flicker = reduceMotion ? 0 : Math.sin(t * star.drift + star.x) * 0.13;
        context.beginPath();
        context.fillStyle = "rgba(238, 242, 248," + Math.max(0.05, star.a + flicker) + ")";
        context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        context.fill();
      });
      context.restore();
    }

    function drawGrid(t) {
      context.save();
      context.lineWidth = 1;
      context.strokeStyle = "rgba(201, 169, 106, 0.27)";
      context.shadowColor = "rgba(201, 169, 106, 0.22)";
      context.shadowBlur = 8;

      grid.forEach(function (row) {
        context.beginPath();
        row.forEach(function (point, index) {
          var p = project(point, t);
          if (index === 0) context.moveTo(p.x, p.y);
          else context.lineTo(p.x, p.y);
        });
        context.stroke();
      });

      for (var column = 0; column < grid[0].length; column += 1) {
        context.beginPath();
        for (var rowIndex = 0; rowIndex < grid.length; rowIndex += 1) {
          var projected = project(grid[rowIndex][column], t);
          if (rowIndex === 0) context.moveTo(projected.x, projected.y);
          else context.lineTo(projected.x, projected.y);
        }
        context.stroke();
      }

      context.restore();
    }

    function drawWave(t) {
      context.save();
      context.strokeStyle = "rgba(145, 197, 213, 0.68)";
      context.lineWidth = 1.4;
      context.shadowColor = "rgba(145, 197, 213, 0.38)";
      context.shadowBlur = 10;
      context.beginPath();
      var base = height * 0.33;
      for (var x = 0; x <= width; x += 6) {
        var envelope = Math.sin((x / width) * Math.PI);
        var y = base +
          Math.sin(x * 0.035 - t * 1.1) * 13 * envelope +
          Math.sin(x * 0.009 + t * 0.36) * 19 * envelope;
        if (x === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();
      context.restore();
    }

    function draw() {
      if (!canvasVisible(canvas)) return;
      time += reduceMotion ? 0 : 0.012;
      drawBackground(time);
      drawGrid(time);
      drawWave(time);
    }

    function tick() {
      draw();
      if (!reduceMotion) animationFrame = window.requestAnimationFrame(tick);
    }

    function start() {
      reset();
      draw();
      if (!reduceMotion) animationFrame = window.requestAnimationFrame(tick);
    }

    window.addEventListener("resize", function () {
      window.cancelAnimationFrame(animationFrame);
      start();
    });

    start();
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindLanguageToggle();
    applyLanguage(preferredLanguage());
    initSpacetimeCanvas();
  });
}());
