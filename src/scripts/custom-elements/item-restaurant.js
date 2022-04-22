import 'regenerator-runtime';
import { html, css, LitElement } from 'lit';
export class ItemRestaurant extends LitElement {
  static get properties() {
    return {
      myrestoString: { type: Object },
      name: { type: String },
      myresto: { type: Object, attribute: false },
    };
  }

  render() {
    console.log(this.myresto);
    // console.log(JSON.parse(this.myresto));
    // console.log(JSON.stringify(this.myresto));
    console.log(this.name);
    // return html`
    //   <article class="card explore-image">
    //     <a href="#/detail/${this.resto.id}">
    //       <div class="row relative">
    //         <img
    //           style="height: 315px;"
    //           src="${API_ENDPOINT.IMAGE_MEDIUM(this.resto.pictureId)}"
    //           alt="${this.resto.name}"
    //         />
    //         <div class="image-badge">${this.resto.city} State</div>
    //       </div>
    //       <div class="card-body">
    //         <div class="row inline-block">
    //           <div class="left"><h4>${this.resto.name}</h4></div>
    //           <div class="right flex mt-20">
    //             <div>
    //               <img
    //                 src="./images/heros/star.png"
    //                 alt="Star"
    //                 style="width: 21px"
    //               />
    //             </div>
    //             <font class="b-18">
    //               &nbsp${this.resto.rating}<font class="f-12">/5 </font>
    //             </font>
    //           </div>
    //         </div>
    //         <p style="margin-top: -10px">
    //           ${limit(this.resto.description, 200)}...
    //         </p>
    //       </div>
    //     </a>
    //   </article>
    // `;
    // return html`<h5>${this.resto}</h5>`;
  }

  limit(string = '', limit = 0) {
    return string.substring(0, limit);
  }
}
customElements.define('item-restaurant', ItemRestaurant);
