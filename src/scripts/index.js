'use strict';
import '../styles/main.scss';

import 'regenerator-runtime'; /* for async await transpile */

import '@fontsource/poppins';
import '@fontsource/open-sans';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faPlus,
  faMinus,
  faCoffee,
  faCutlery,
  faPaperPlane,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add(faBars,faPlus, faMinus, faCoffee, faCutlery, faPaperPlane, faUserCircle);
dom.watch();
import App from './views/app';
import swRegister from './utils/sw-register';
import 'js-loading-overlay';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

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
