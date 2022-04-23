import HeaderInitiator from '../utils/header-initiation';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, banner, content, linkMenu }) {
    this._button = button;
    this._drawer = drawer;
    this._banner = banner;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    HeaderInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    //  IF ELSE SCROLL TRANSPARENT

    const myNav = document.getElementById('my-header');
    const listku1 = document.getElementById('my-list1');
    const listku2 = document.getElementById('my-list2');
    const listku3 = document.getElementById('my-list3');
    window.onscroll = function () {
      'use strict';
      if (url === '/' || url === '') {
        console.log('scrolled!');
        if (
          document.body.scrollTop >= 280 ||
          document.documentElement.scrollTop >= 280
        ) {
          alert('scrolled!!');
          myNav.classList.add('white-nav');
          listku1.classList.add('black');
          listku2.classList.add('black');
          listku3.classList.add('black');
        } else {
          myNav.classList.remove('white-nav');
          listku1.classList.remove('black');
          listku2.classList.remove('black');
          listku3.classList.remove('black');
        }
      }
    };

    //  IF ELSE BANNER
    if (url == '/') {
      this._banner.innerHTML = await page.renderBanner();
    } else {
      this._banner.innerHTML = null;
    }

    try {
      this._content.innerHTML = await page.render();
      await page.afterRender();

      // SKIP TO CONTENT
      const skipLinkElem = document.querySelector('.skip-link');
      skipLinkElem.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#main-content').focus();
      });
    } catch (error) {
      alert('ouch somehow data cannot be retrieved! (500)');
    }
  }
}

export default App;
