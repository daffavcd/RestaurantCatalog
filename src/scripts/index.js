'use strict';

import '../styles/main.scss';
import '/src/scripts/main.js';

import 'regenerator-runtime'; /* for async await transpile */

import '@fontsource/poppins';
import '@fontsource/open-sans';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/all';

import data_resto from '../DATA.json';

let html = '';
data_resto.restaurants.forEach((resto) => {
  html += `
  <article class="card explore-image">
  <a href="/detail.html">
  <div class="row relative">
    <img style="height: 315px;"
      src="${resto.pictureId}"
      alt="${resto.name}"
    />
    <div class="image-badge">${resto.city} State</div>
  </div>
  <div class="card-body">
    <div class="row inline-block">
      <div class="left"><h4>${resto.name}</h4></div>
      <div class="right flex mt-20">
        <div>
          <img
            src="./images/heros/star.png"
            alt="Star"
            style="width: 21px"
          />
        </div>
        <font class="b-18">
          &nbsp${resto.rating}<font class="f-12">/5 </font>
        </font>
      </div>
    </div>
    <p style="margin-top: -10px">${limit(resto.description, 200)}...</p>
  </div>
  </a>
  </article>
  `;
  document.getElementById('explore-content').innerHTML = html;
});

function limit(string = '', limit = 0) {
  return string.substring(0, limit);
}
