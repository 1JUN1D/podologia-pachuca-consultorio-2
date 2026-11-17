/* Podóloga Aurora · comportamiento compartido.
   Todo es mejora progresiva: sin este archivo, los enlaces de WhatsApp, el menú (abierto en escritorio),
   las preguntas (details) y el contenido siguen funcionando y visibles. */
(function () {
    'use strict';
    var WA = 'https://wa.me/527298756439?text=';
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* Menú en celular */
    var nav = document.querySelector('[data-nav]');
    if (nav) {
        var toggle = nav.querySelector('.nav-toggle');
        var close = function () { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        nav.querySelectorAll('.nav-menu a').forEach(function (a) { a.addEventListener('click', close); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { close(); toggle.focus(); } });
    }

    /* ¿Está abierto ahora? Hora de Pachuca (America/Mexico_City), lunes a domingo de 8 a 18 */
    var hourNow = function () {
        try {
            var parts = new Intl.DateTimeFormat('es-MX', { timeZone: 'America/Mexico_City', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
            var h = +parts.find(function (p) { return p.type === 'hour'; }).value;
            var m = +parts.find(function (p) { return p.type === 'minute'; }).value;
            return h + m / 60;
        } catch (e) { return null; }
    };
    var now = hourNow();
    var status = document.querySelector('[data-open-status]');
    if (status && now !== null) {
        var txt = status.querySelector('[data-open-text]');
        if (now >= 8 && now < 18) {
            txt.textContent = 'Abierto ahora, atendemos hasta las 6:00 p.m.';
        } else {
            status.classList.add('is-closed');
            txt.textContent = now < 8 ? 'Abrimos hoy a las 8:00 a.m., escríbenos y te apartamos lugar' : 'Ya cerramos por hoy, abrimos mañana a las 8:00 a.m.';
        }
    }

    /* Arma tu cita: servicio + día → precio real y mensaje de WhatsApp armado */
    var cita = document.querySelector('[data-cita]');
    var links = document.querySelectorAll('[data-wa-link]');
    if (cita) {
        var out = cita.querySelector('[data-cita-price]');
        var todayPill = cita.querySelector('[data-today]');
        if (todayPill && now !== null) {
            if (now >= 18) {
                todayPill.textContent = 'Hoy ya cerramos';
                var hoy = todayPill.previousElementSibling, man = cita.querySelector('input[name="dia"][value="manana"]');
                hoy.disabled = true; hoy.checked = false; if (man) man.checked = true;
            } else if (now >= 17) {
                todayPill.textContent = 'Hoy, antes de las 6';
            }
        }
        var update = function () {
            var s = cita.querySelector('input[name="servicio"]:checked');
            var d = cita.querySelector('input[name="dia"]:checked');
            if (!s || !d) return;
            out.innerHTML = s.dataset.price + '<small>' + s.dataset.note + '</small>';
            var msg = 'Hola Aurora, ' + s.dataset.msg + ' y quisiera una cita ' + d.dataset.msg + '. ¿Qué horario tienen disponible?';
            var href = WA + encodeURIComponent(msg);
            links.forEach(function (a) { a.href = href; });
        };
        cita.addEventListener('change', update);
        update();
    }

    /* Revelado al entrar: título, luego texto, luego imagen, una sola vez */
    var items = document.querySelectorAll('[data-reveal]');
    if (!reduce.matches && 'IntersectionObserver' in window) {
        /* el arco se recorta con clip-path, así que se observa a su contenedor */
        var watch = new Map();
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                (watch.get(e.target) || []).forEach(function (el) { el.classList.add('is-in'); });
                io.unobserve(e.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        items.forEach(function (el) {
            var t = el.classList.contains('arch') ? el.parentElement : el;
            if (!watch.has(t)) { watch.set(t, []); io.observe(t); }
            watch.get(t).push(el);
        });
        /* Seguro: si algo no entró en 4 s, se muestra igual */
        setTimeout(function () { items.forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in'); }); }, 4000);
    } else {
        items.forEach(function (el) { el.classList.add('is-in'); });
    }

    /* Videos: solo corren cuando se ven; con movimiento reducido quedan en su póster */
    var videos = document.querySelectorAll('[data-video]');
    var loadSrc = function (v) {
        if (!v.hasAttribute('data-lazy-video')) return;
        v.querySelectorAll('source[data-src]').forEach(function (s) { s.src = s.dataset.src; s.removeAttribute('data-src'); });
        v.removeAttribute('data-lazy-video'); v.load();
    };
    if (reduce.matches) {
        videos.forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
    } else if ('IntersectionObserver' in window) {
        var vo = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                var v = e.target;
                if (e.isIntersecting) { if (v.dataset.userPaused === '1') return; loadSrc(v); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
                else { v.pause(); }
            });
        }, { threshold: 0.2 });
        videos.forEach(function (v) { vo.observe(v); });
    }

    /* Cada video lleva su botón de pausa (WCAG 2.2.2) */
    videos.forEach(function (v) {
        var fig = v.closest('figure'); if (!fig) return;
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'video-toggle';
        var paint = function () { var on = !v.paused; b.setAttribute('aria-label', on ? 'Pausar video' : 'Reproducir video'); b.dataset.state = on ? 'playing' : 'paused'; };
        b.addEventListener('click', function () {
            if (v.paused) { loadSrc(v); v.dataset.userPaused = ''; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
            else { v.pause(); v.dataset.userPaused = '1'; }
        });
        v.addEventListener('play', paint); v.addEventListener('pause', paint); paint();
        fig.appendChild(b);
    });

    /* El sol que sale: arcos con data-rise suben mientras cruzan la pantalla */
    var risers = document.querySelectorAll('[data-rise]');
    if (risers.length && !reduce.matches) {
        var rt = false;
        var rise = function () {
            if (rt) return; rt = true;
            requestAnimationFrame(function () {
                risers.forEach(function (el) {
                    var r = el.getBoundingClientRect();
                    var t = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height * 0.4)));
                    el.style.transform = 'translateY(' + ((1 - t) * 14).toFixed(2) + '%)';
                });
                rt = false;
            });
        };
        addEventListener('scroll', rise, { passive: true }); addEventListener('resize', rise); rise();
    }

    /* La palabra del cierre sube con el último tramo del scroll */
    var word = document.querySelector('.footer-word');
    if (word && !reduce.matches) {
        var ticking = false;
        var onScroll = function () {
            if (ticking) return; ticking = true;
            requestAnimationFrame(function () {
                var r = word.getBoundingClientRect();
                var t = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.9)));
                word.style.setProperty('--rise', ((1 - t) * 18).toFixed(1) + '%');
                ticking = false;
            });
        };
        addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
})();
