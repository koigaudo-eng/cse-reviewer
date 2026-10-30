/* Independent, persistent whole-site theme controller. */
(function () {
  const root = document.documentElement;
  const storageKey = 'cse_theme';
  function readTheme() {
    try { return localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light'; }
    catch (_) { return 'light'; }
  }
  function saveTheme(theme) {
    try { localStorage.setItem(storageKey, theme); } catch (_) {}
  }
  function applyTheme(theme) {
    const chosen = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', chosen);
    document.body && document.body.setAttribute('data-theme', chosen);
    saveTheme(chosen);
    const button = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    if (button) {
      const dark = chosen === 'dark';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      if (icon) icon.textContent = dark ? '☀' : '☾';
      if (label) label.textContent = dark ? 'Light mode' : 'Dark mode';
    }
  }
  window.toggleCSETheme = function () {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  };
  // Apply immediately, before the user sees the page, and bind safely after markup exists.
  applyTheme(readTheme());
  function bind() {
    const button = document.getElementById('themeToggle');
    if (button && !button.dataset.themeBound) {
      button.dataset.themeBound = 'true';
      button.addEventListener('click', function (event) {
        event.preventDefault();
        window.toggleCSETheme();
      });
    }
    applyTheme(root.getAttribute('data-theme') || readTheme());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
