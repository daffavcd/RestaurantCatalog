'use strict';

import { async } from 'regenerator-runtime';
import '../styles/main.scss';

import 'regenerator-runtime'; /* for async await transpile */

import '@fontsource/poppins';
import '@fontsource/open-sans';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/all';

import data_resto from '../DATA.json';

import RestaurantDicoding from './data/restaurant-dicoding';
import ApiEndpoint from './globals/api-endpoint';
import App from './views/app';
import swRegister from './utils/sw-register';

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
