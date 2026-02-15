// Shared localization logic for all Haggly pages
(function() {
  // Detect UI language: localStorage > navigator.language > 'en'
  function detectUILang() {
    const stored = localStorage.getItem('haggly-ui-lang');
    if (stored && UI_STRINGS[stored]) return stored;
    const browserLang = (navigator.language || '').split('-')[0];
    if (UI_STRINGS[browserLang]) return browserLang;
    return 'en';
  }

  let currentUILang = detectUILang();

  function t(key) {
    const strings = UI_STRINGS[currentUILang] || UI_STRINGS['en'];
    return strings[key] || (UI_STRINGS['en'] && UI_STRINGS['en'][key]) || key;
  }

  function applyLocalization() {
    // Nav links
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = t(key);
        } else {
          el.textContent = t(key);
        }
      }
    });
    // Title attribute
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.getAttribute('data-i18n-title'));
    });
  }

  function setUILang(lang) {
    currentUILang = lang;
    localStorage.setItem('haggly-ui-lang', lang);
    applyLocalization();
    // Update the globe button text
    const globeBtn = document.getElementById('langPickerBtn');
    if (globeBtn) {
      const langObj = LANGUAGES.find(l => l.code === lang);
      if (langObj) globeBtn.textContent = '🌐 ' + langObj.native;
    }
    // Fire custom event for pages that need extra updates
    document.dispatchEvent(new CustomEvent('haggly-lang-change', { detail: { lang } }));
  }

  // Build language picker dropdown
  function buildLangPicker() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'lang-picker-wrapper';
    wrapper.style.cssText = 'position:relative;margin-left:auto;';

    const btn = document.createElement('button');
    btn.id = 'langPickerBtn';
    btn.className = 'lang-picker-btn';
    const langObj = LANGUAGES.find(l => l.code === currentUILang);
    btn.textContent = '🌐 ' + (langObj ? langObj.native : 'English');
    btn.style.cssText = 'background:rgba(255,255,255,0.2);color:white;border:none;padding:6px 12px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;';

    const dropdown = document.createElement('div');
    dropdown.className = 'lang-picker-dropdown';
    dropdown.style.cssText = 'display:none;position:absolute;right:0;top:100%;margin-top:4px;background:white;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.15);z-index:1000;min-width:220px;max-height:400px;overflow-y:auto;padding:8px 0;';

    LANGUAGES.forEach(lang => {
      const item = document.createElement('button');
      item.style.cssText = 'display:block;width:100%;text-align:left;padding:10px 16px;border:none;background:none;font-size:15px;cursor:pointer;color:#1a1a1a;transition:background 0.15s;';
      item.textContent = lang.flag + ' ' + lang.native;
      item.addEventListener('mouseenter', () => item.style.background = '#FFF3EE');
      item.addEventListener('mouseleave', () => item.style.background = 'none');
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        setUILang(lang.code);
        dropdown.style.display = 'none';
      });
      dropdown.appendChild(item);
    });

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', () => { dropdown.style.display = 'none'; });

    wrapper.appendChild(btn);
    wrapper.appendChild(dropdown);

    // Insert before the last nav link or at end
    nav.appendChild(wrapper);
  }

  // TTS function
  window.speakText = function(text, langCode) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = BCP47_MAP[langCode] || langCode;
    speechSynthesis.speak(utterance);
  };

  // Expose globals
  window.hagglyI18n = { t, setUILang, getUILang: () => currentUILang, applyLocalization, detectUILang };

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { buildLangPicker(); applyLocalization(); });
  } else {
    buildLangPicker();
    applyLocalization();
  }
})();
