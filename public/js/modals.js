const modals = {
  init: () => {
    modals.addListenerOnButtons();
  },

  addListenerOnButtons: () => {
    document.querySelectorAll('.js-modal-trigger').forEach(button => {
      const modal = button.dataset.target;
      const target = document.getElementById(modal);

      button.addEventListener('click', () => {
        modals.openModal(target);
      });
    });

    document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button').forEach(button => {
      const target = button.closest('.modal');

      button.addEventListener('click', () => {
        modals.closeModal(target);
      });
    });
  },

  openModal: (modal) => {
    modal.classList.add('is-active');
  },

  closeModal: (modal) => {
    modal.classList.remove('is-active');
  },

};

document.addEventListener('DOMContentLoaded', modals.init );
