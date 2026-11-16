const { ga4, googleAds, metaPixel, clarity } = __TRACKING_IDS__;
const googleIds = [ga4, googleAds].filter(Boolean);
const interactionEvents = ['pointerdown', 'keydown', 'wheel', 'click'];

function loadScript(src) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.append(script);
}

function startTracking(event) {
  if (!event.isTrusted || (event.type === 'keydown' && ['Alt', 'Control', 'Meta', 'Shift'].includes(event.key))) return;
  interactionEvents.forEach(type => window.removeEventListener(type, startTracking, true));

  if (googleIds.length) {
    window.dataLayer ||= [];
    window.gtag ||= function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    googleIds.forEach(id => window.gtag('config', id));
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${googleIds[0]}`);
  }

  if (metaPixel) {
    const pixel = window.fbq ||= function () {
      if (pixel.callMethod) pixel.callMethod.apply(pixel, arguments);
      else pixel.queue.push(arguments);
    };
    window._fbq ||= pixel;
    pixel.push = pixel;
    pixel.loaded = true;
    pixel.version = '2.0';
    pixel.queue ||= [];
    pixel('init', metaPixel);
    pixel('track', 'PageView');
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
  }

  if (clarity) {
    window.clarity ||= function () { (window.clarity.q ||= []).push(arguments); };
    loadScript(`https://www.clarity.ms/tag/${clarity}`);
  }
}

export function deferTracking() {
  if (googleIds.length || metaPixel || clarity) {
    interactionEvents.forEach(type => window.addEventListener(type, startTracking, { capture: true, passive: true }));
  }
}
