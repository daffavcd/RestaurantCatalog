import 'regenerator-runtime';
import API_ENDPOINT from '../globals/api-endpoint';
import { html, css, LitElement } from 'lit';

export class ItemRestaurant extends LitElement {
  static get styles() {
    return css`
      :host {
        background-color: aliceblue;
        flex: 1 0 31%;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: 32%;
        margin: 0px 10px 25px 10px;
      }

      .explore-image img {
        transition: transform 1s, filter 0.5s ease-out;
      }

      .explore-image:hover img {
        transform: scale(1.004);
      }

      .row {
        width: 100%;
      }
      .relative {
        position: relative;
      }

      .inline-block {
        display: inline-block;
      }
      .image-badge {
        position: absolute;
        top: 8px;
        left: 8px;
        background-color: #ffd36e;
        padding: 5px;
        border-radius: 1.5px;
        opacity: 0.9;
      }
      .card-body {
        padding: 2px 16px;
        background-color: #ffffff;
      }
      .left {
        float: left;
      }

      .right {
        float: right;
      }

      .mt-20 {
        margin-top: 20px;
      }

      .flex {
        display: flex;
      }

      .flex-wrap {
        flex-wrap: wrap;
      }
      .b-18 {
        font-weight: bold;
        font-size: 18px;
      }

      .f-12 {
        font-size: 12px;
        color: #9e9e9e;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        display: block;
      }

      @media screen and (max-width: 767px) {
        :host {
          flex: 1 0 100%;
          margin: 0px 10px 25px 0px;
        }
      }
    `;
  }

  static get properties() {
    return {
      id: { type: String },
      pictureId: { type: String },
      name: { type: String },
      city: { type: String },
      name: { type: String },
      rating: { type: String },
      description: { type: String },
    };
  }

  render() {
    return html`
      <article class="card explore-image">
        <a href="#/detail/${this.id}">
          <div class="row relative">
            <img
              style="height: 315px;object-fit: cover;"
              src="${API_ENDPOINT.IMAGE_MEDIUM(this.pictureId)}"
              alt="${this.name}"
            />
            <div class="image-badge">${this.city} State</div>
          </div>
          <div class="card-body">
            <div class="row inline-block">
              <div class="left"><h4>${this.name}</h4></div>
              <div class="right flex mt-20">
                <div>
                  <img
                    src="./images/heros/star.png"
                    alt="Star"
                    style="width: 21px"
                  />
                </div>
                <font class="b-18">
                  &nbsp${this.rating}<font class="f-12">/5 </font>
                </font>
              </div>
            </div>
            <p style="margin-top: -10px">
              ${this.limit(this.description, 200)}...
            </p>
          </div>
        </a>
      </article>
    `;
  }

  limit(string = '', limit = 0) {
    return string.substring(0, limit);
  }
}
customElements.define('item-restaurant', ItemRestaurant);
