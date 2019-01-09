/* eslint-disable func-names */
const modal = (function () {
  const $window = $(window);
  const $modal = $('<div class="modal" />');
  const $content = $('<div class="modal-content"/>');
  const $close = $('<button role="button" class="modal-close">close</button>');
  const addClientForm = `
  <form class="client-add-form">
        <fieldset>
          <legend>Add a client</legend>
          <label for="client-firstName">
            First Name <span class="required"> (required) </span>
            <input
              id="client-firstName"
              name="client-firstName"
              required=""
              type="text"
            />
          </label>
          <label for="client-lastName">
            Last Name <span class="required"> (required) </span>
            <input
              id="client-lastName"
              name="client-lastName"
              required=""
              type="text"
            />
          </label>
          <label for="client-company">
            Company
            <input id="client-company" name="client-company" type="text" />
          </label>
          <label for="client-address">
            Address
            <input id="client-address" name="client-address" type="text" />
          </label>
          <label for="client-phoneNumber">
            Phone Number
            <input
              id="client-phoneNumber"
              name="client-phoneNumber"
              type="text"
            />
          </label>
          <label for="client-email">
            Email <input id="client-email" name="client-email" type="text" />
          </label>
          <label for="client-add-submit">
            <input type="submit" value="Add Client" />
          </label>
        </fieldset>
      </form>`;
  const updateClientForm = `
  <form class="client-update-form">
        <fieldset>
          <legend>Update a client</legend>
          <label for="client-firstName">
            First Name <span class="required"> (required) </span>
            <input
              id="client-firstName"
              name="client-firstName"
              required=""
              type="text"
            />
          </label>
          <label for="client-lastName">
            Last Name <span class="required"> (required) </span>
            <input
              id="client-lastName"
              name="client-lastName"
              required=""
              type="text"
            />
          </label>
          <label for="client-company">
            Company
            <input id="client-company" name="client-company" type="text" />
          </label>
          <label for="client-address">
            Address
            <input id="client-address" name="client-address" type="text" />
          </label>
          <label for="client-phoneNumber">
            Phone Number
            <input
              id="client-phoneNumber"
              name="client-phoneNumber"
              type="text"
            />
          </label>
          <label for="client-email">
            Email <input id="client-email" name="client-email" type="text" />
          </label>
          <label for="client-update-submit">
            <input type="submit" value="Update Client" />
          </label>
        </fieldset>
      </form>`;

  $modal.append($content, $close);

  $close.on('click', (event) => {
    event.preventDefault();
    modal.close();
  });

  return {
    center() {
      const top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
      const left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;
      $modal.css({
        top: top + $window.scrollTop(),
        left: left + $window.scrollLeft(),
      });
    },
    open(settings) {
      switch (settings.content) {
        case 'add':
          $content.empty().append(addClientForm);
          break;
        case 'update':
          $content.empty().append(updateClientForm);
          break;
        default:
          throw new Error('Didnt supply modal content type');
      }

      $modal
        .css({
          width: settings.width || 'auto',
          height: settings.height || 'auto',
        })
        .appendTo('body');

      modal.center();
      $(window).on('resize', modal.center);
    },
    close() {
      $content.empty();
      $modal.detach();
      $(window).off('resize', modal.center);
    },
  };
}());
