const menu = {
  init: () => {
    menu.addScrollListener();
  },

  addScrollListener: () => {  
    const autohide = document.querySelector('.autohide');
    
    // add padding-top to body (if necessary)
    const navbar_height = document.querySelector('.navbar').offsetHeight;
    document.body.style.paddingTop = navbar_height + 'px';
  
    if (autohide) {
      let last_scroll_top = 0;
      window.addEventListener('scroll', () => {
        let scroll_top = window.scrollY;
        if (scroll_top < last_scroll_top) {
            autohide.classList.remove('scrolled-down');
            autohide.classList.add('scrolled-up');
        } else {
            autohide.classList.remove('scrolled-up');
            autohide.classList.add('scrolled-down');
        }
        last_scroll_top = scroll_top;
      }); 
      // window.addEventListener
    } 
  }
};

document.addEventListener('DOMContentLoaded', menu.init );
