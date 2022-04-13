(function () {
  var myNav = document.getElementById('my-header');
  var listku1 = document.getElementById('my-list1');
  var listku2 = document.getElementById('my-list2');
  var listku3 = document.getElementById('my-list3');
  window.onscroll = function () {
    'use strict';
    if (
      document.body.scrollTop >= 280 ||
      document.documentElement.scrollTop >= 280
    ) {
      myNav.classList.add('white');
      listku1.classList.add('black');
      listku2.classList.add('black');
      listku3.classList.add('black');
    } else {
      myNav.classList.remove('white');
      listku1.classList.remove('black');
      listku2.classList.remove('black');
      listku3.classList.remove('black');
    }
  };
})();
