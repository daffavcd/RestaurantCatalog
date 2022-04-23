const DrawerInitiator = {
  init({ button, drawer, content, linkMenu }) {
    button.addEventListener('click', (event) => {
      if (drawer.classList.contains('block')) {
        drawer.classList.remove('block');
      } else {
        drawer.classList.add('block');
      }
    });

    content.addEventListener('click', (event) => {
      drawer.classList.remove('block');
    });
  },
};

export default DrawerInitiator;
