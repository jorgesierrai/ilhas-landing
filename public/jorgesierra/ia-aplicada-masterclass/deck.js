/* Deck de la masterclass — vanilla, cero dependencias.
   Sale del export .dc.html de Claude Design. Se le quitó el runtime de
   React 18 + ReactDOM + Babel standalone (≈1.5 MB desde unpkg.com, compilado
   en el navegador en cada carga) porque las 51 diapositivas ya son HTML
   estático y el guión de abajo nunca tuvo JSX. Lo único que hacía el runtime
   era llamar a componentDidMount y pasar this.props: eso son las diez líneas
   del final de este archivo. */
(function () {
  "use strict";

class Deck {
  componentDidMount() {
    this.root = document.getElementById('deck');
    this.stage = document.getElementById('stage');
    if (!this.root) return;
    this.all = Array.prototype.slice.call(this.root.querySelectorAll('[data-slide]'));
    this.i = 0;
    this.step = 0;
    this._key = (e) => {
      var k = e.key;
      if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'Enter') { e.preventDefault(); this.next(); }
      else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); this.prev(); }
      else if (k === 'ArrowDown') { e.preventDefault(); this.go(this.i + 1); }
      else if (k === 'ArrowUp') { e.preventDefault(); this.go(this.i - 1); }
      else if (k === 'Home') { e.preventDefault(); this.go(0); }
      else if (k === 'End') { e.preventDefault(); this.go(this.list().length - 1); }
    };
    this._res = () => this.fit();
    this._hash = () => this.readHash();
    window.addEventListener('keydown', this._key);
    window.addEventListener('resize', this._res);
    window.addEventListener('hashchange', this._hash);
    var p = document.getElementById('navPrev');
    var n = document.getElementById('navNext');
    if (p) p.onclick = () => this.prev();
    if (n) n.onclick = () => this.next();
    this.fit();
    this.readHash();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._key);
    window.removeEventListener('resize', this._res);
    window.removeEventListener('hashchange', this._hash);
  }

  componentDidUpdate() { if (this.root) { this.fit(); this.paint(); } }

  list() {
    var hide = this.props.showBackup === false;
    return this.all.filter(function (s) { return !(hide && s.dataset.backup === '1'); });
  }

  fit() {
    if (!this.stage) return;
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    this.stage.style.transform = 'translate(-50%,-50%) scale(' + s + ')';
  }

  readHash() {
    var m = /^#(\d+)$/.exec(window.location.hash || '');
    var n = m ? parseInt(m[1], 10) - 1 : 0;
    var L = this.list();
    this.i = Math.max(0, Math.min(L.length - 1, isNaN(n) ? 0 : n));
    this.step = 0;
    this.paint();
  }

  go(n) {
    var L = this.list();
    n = Math.max(0, Math.min(L.length - 1, n));
    if (n !== this.i) {
      this.i = n;
      this.step = 0;
      try { history.replaceState(null, '', '#' + (this.i + 1)); } catch (e) { }
    }
    this.paint();
  }

  maxStep(el) {
    var m = 0;
    el.querySelectorAll('[data-frag],[data-dim]').forEach(function (f) {
      m = Math.max(m, parseInt(f.dataset.frag || 0, 10) || 0, parseInt(f.dataset.dim || 0, 10) || 0);
    });
    return m;
  }

  next() {
    var cur = this.list()[this.i];
    if (cur && this.props.revealAll !== true && this.step < this.maxStep(cur)) { this.step++; this.paint(); }
    else this.go(this.i + 1);
  }

  prev() {
    if (this.step > 0 && this.props.revealAll !== true) { this.step--; this.paint(); }
    else this.go(this.i - 1);
  }

  paint() {
    var L = this.list();
    var cur = L[this.i];
    this.all.forEach(function (s) {
      var on = s === cur;
      s.style.opacity = on ? '1' : '0';
      s.style.pointerEvents = on ? 'auto' : 'none';
    });
    if (!cur) return;
    var st = this.props.revealAll === true ? 999 : this.step;
    cur.querySelectorAll('[data-frag]').forEach(function (f) {
      var on = (parseInt(f.dataset.frag, 10) || 0) <= st;
      f.style.opacity = on ? '1' : '0';
      f.style.transform = on ? 'none' : 'translateY(12px)';
    });
    cur.querySelectorAll('[data-dim]').forEach(function (f) {
      if ((parseInt(f.dataset.dim, 10) || 0) <= st) f.style.opacity = '0.28';
    });
    var dark = cur.dataset.dark === '1';
    var fn = document.getElementById('fnum');
    var fh = document.getElementById('fhandle');
    var fw = document.getElementById('fword');
    var ft = document.getElementById('footer');
    var nb = document.getElementById('navbar');
    if (ft) ft.style.color = dark ? 'rgba(248,250,255,0.5)' : 'rgba(60,60,68,0.55)';
    if (fn) fn.textContent = (cur.dataset.fnum || '') + ' · ' + (cur.dataset.flabel || '');
    if (fh) fh.textContent = this.props.handle || '@soyjorgesierra';
    if (fw) fw.style.color = dark ? '#F8FAFF' : '#0E0E0F';
    if (nb) nb.style.color = dark ? 'rgba(248,250,255,0.55)' : 'rgba(60,60,68,0.5)';
    if (fn) fn.title = (this.i + 1) + ' / ' + L.length;
  }
}

  var deck = new Deck();
  deck.props = {"handle": "@soyjorgesierra", "showBackup": true, "revealAll": false};

  function arranca() {
    deck.componentDidMount();

    /* Añadido al montarlo en el sitio: deslizar con el dedo. Los botones ‹ ›
       ya venían, pero nadie pasa una presentación picándole a un círculo de
       42 px. Umbral de 45 px para no confundir un toque con un arrastre. */
    var x0 = null, y0 = null;
    addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) { deck.next(); } else { deck.prev(); }
      }
    }, { passive: true });
  }

  if (document.readyState === "loading") {
    addEventListener("DOMContentLoaded", arranca);
  } else {
    arranca();
  }
})();
