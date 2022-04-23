'use strict';
import '../styles/main.scss';

import 'regenerator-runtime'; /* for async await transpile */

import '@fontsource/poppins';
import '@fontsource/open-sans';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/all';

import App from './views/app';
import swRegister from './utils/sw-register';
import 'js-loading-overlay';

JsLoadingOverlay.setOptions({
  overlayBackgroundColor: '#666666',
  overlayOpacity: 0.6,
  spinnerIcon: 'ball-triangle-path',
  spinnerColor: '#FEB139',
  spinnerSize: '2x',
  overlayIDName: 'overlay',
  spinnerIDName: 'spinner',
  offsetX: 0,
  offsetY: 0,
  containerID: null,
  lockScroll: false,
  overlayZIndex: 9998,
  spinnerZIndex: 9999,
});

const app = new App({
  button: document.querySelector('#hamburger-btn'),
  drawer: document.querySelector('#myLinks'),
  content: document.querySelector('#main-content'),
  banner: document.querySelector('#headBanner'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
