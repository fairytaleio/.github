(function () {
  'use strict';

  /* ─── Canvas mountain renderer ─── */

  var canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var W, H;

  var skyStops = [
    { pos: 0.00, color: '#0f0b14' },
    { pos: 0.35, color: '#2d1f33' },
    { pos: 0.65, color: '#5a3a4a' },
    { pos: 0.82, color: '#c45a4a' },
    { pos: 1.00, color: '#d47a5a' }
  ];

  var layers = [
    { color: '#3d2a3d', basePct: 0.68, ampPct: 0.13, segs: 40, freq: [3, 7, 15] },
    { color: '#2a1e30', basePct: 0.74, ampPct: 0.10, segs: 30, freq: [4, 9, 18] },
    { color: '#1c1624', basePct: 0.80, ampPct: 0.08, segs: 24, freq: [5, 11, 20] },
    { color: '#0f0b14', basePct: 0.86, ampPct: 0.05, segs: 16, freq: [6, 13, 22] }
  ];

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  function generatePoints(segs, baseY, amp, freq) {
    var pts = [];
    var segW = W / segs;
    for (var i = 0; i <= segs; i++) {
      var x = i * segW;
      var t = i / segs;
      var offset = 0;
      offset += Math.sin(t * Math.PI * freq[0]) * amp * 0.45;
      offset += Math.sin(t * Math.PI * freq[1] + 1.3) * amp * 0.30;
      offset += Math.sin(t * Math.PI * freq[2] + 4.7) * amp * 0.15;
      offset += (Math.random() - 0.5) * amp * 0.10;
      pts.push({ x: x, y: baseY - amp + offset });
    }
    return pts;
  }

  function drawMountains() {
    for (var l = 0; l < layers.length; l++) {
      var layer = layers[l];
      var baseY = layer.basePct * H;
      var amp = layer.ampPct * H;
      var pts = generatePoints(layer.segs, baseY, amp, layer.freq);

      ctx.beginPath();
      ctx.moveTo(0, H);
      for (var i = 0; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = layer.color;
      ctx.fill();
    }
  }

  function draw() {
    var grad = ctx.createLinearGradient(0, 0, 0, H);
    for (var i = 0; i < skyStops.length; i++) {
      grad.addColorStop(skyStops[i].pos, skyStops[i].color);
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    var cx = W * 0.5;
    var cy = H * 0.85;
    var rad = H * 0.4;
    var sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    sunGrad.addColorStop(0, 'rgba(232, 201, 166, 0.25)');
    sunGrad.addColorStop(0.4, 'rgba(196, 90, 74, 0.08)');
    sunGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, W, H);

    drawMountains();
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  });

  resize();

  /* ─── Typewriter ─── */

  function initTypewriter() {
    var el = document.getElementById('tagline-wrapper');
    if (!el) return;

    var text = 'Recordando aquellos momentos.';
    var i = 0;
    el.textContent = '';

    var cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    el.appendChild(cursor);

    setTimeout(function tick() {
      if (i < text.length) {
        var charNode = document.createTextNode(text[i]);
        el.insertBefore(charNode, cursor);
        i++;
        setTimeout(tick, 50 + Math.random() * 40);
      } else {
        el.classList.add('typewriter-done');
      }
    }, 800);
  }

  /* ─── Scroll reveal ─── */

  function initScrollReveal() {
    var sections = document.querySelectorAll('section:not(#hero)');
    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    for (var i = 0; i < sections.length; i++) {
      observer.observe(sections[i]);
    }
  }

  /* ─── Social status ─── */

  function initSocialStatus() {
    var dots = document.querySelectorAll('.status-dot');
    if (!dots.length) return;

    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.add('checking');
    }

    fetch('status.json')
      .then(function (res) {
        if (!res.ok) throw new Error('status.json not available');
        return res.json();
      })
      .then(function (data) {
        for (var i = 0; i < dots.length; i++) {
          dots[i].classList.remove('checking');
          var link = dots[i].closest('[data-platform]');
          if (!link) {
            dots[i].classList.add('offline');
            continue;
          }
          var platform = link.getAttribute('data-platform');
          if (data[platform] === 'online') {
            dots[i].classList.add('online');
          } else {
            dots[i].classList.add('offline');
          }
        }
      })
      .catch(function () {
        for (var i = 0; i < dots.length; i++) {
          dots[i].classList.remove('checking');
          dots[i].classList.add('offline');
        }
      });
  }

  /* ─── Boot ─── */

  initTypewriter();
  initScrollReveal();
  initSocialStatus();

})();
