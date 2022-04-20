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

    //IF ELSE BANNER
    if (url == '/') {
      this._banner.innerHTML = await page.renderBanner();
    } else {
      this._banner.innerHTML = null;
    }

    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
