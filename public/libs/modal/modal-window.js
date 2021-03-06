const modal = (function () {
  const $window = $(window);
  const $modalOverlay = $('<div class="modal-overlay" />');
  const $modal = $('<div class="modal" />');
  const $content = $('<div class="modal-content"/>');
  const $close = $('<button role="button" class="modal-close">close</button>');
  const addClientForm = `
  <form class="client-add-form">
        <fieldset>
          <legend>Add a client</legend>
          <img class="add-client-image" alt="Add Client Icon" src="img/icons8-user-male.svg" />
          <div class="form-questions">
            <div class="form-row">  
              <label for="client-firstName">
                First Name
                <input
                  id="client-firstName"
                  name="client-firstName"
                  required=""
                  type="text"
                />
              </label>
              <label for="client-lastName">
                Last Name
                <input
                  id="client-lastName"
                  name="client-lastName"
                  required=""
                  type="text"
                />
              </label>
              </div>
            <div class="form-row">
              <label for="client-company">
                Company
                <input id="client-company" name="client-company" type="text" />
              </label>
            </div>
            <div class="form-row">
              <label for="client-address">
                Address
                <input id="client-address" name="client-address" type="text" />
              </label>
            </div>
            <div class="form-row">
              <label for="client-phoneNumber">
                Phone Number
                <input
                  id="client-phoneNumber"
                  name="client-phoneNumber"
                  type="text"
                />
              </label>
            </div>
            <div class="form-row">
              <label for="client-email">
                Email <input id="client-email" name="client-email" type="text" />
              </label>
            </div>
          </div>
        <label for="client-add-random">
          <input name="client-add-random" class="client-add-random" type="button" value="Random Info" />
        </label>
          <label for="client-add-submit">
            <input type="submit" value="Add Client" />
          </label>
        </fieldset>
      </form>`;
  const updateClientForm = `
  <form class="client-update-form">
        <fieldset>
          <legend>Update client</legend>
          <img class="update-client-image" alt="Update Client Logo" src="img/icons8-synchronize.svg" />
          <div class="form-questions">
          <div class="form-row">
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
          </div>
          <div class="form-row">
            <label for="client-company">
              Company
              <input id="client-company" name="client-company" type="text" />
            </label>
          </div>
          <div class="form-row">
            <label for="client-address">
              Address
              <input id="client-address" name="client-address" type="text" />
            </label>
          </div>
          <div class="form-row">
            <label for="client-phoneNumber">
              Phone Number
              <input
                id="client-phoneNumber"
                name="client-phoneNumber"
                type="text"
              />
            </label>
          </div>
          <div class="form-row">
            <label for="client-email">
              Email <input id="client-email" name="client-email" type="text" />
            </label>
          </div>
          </div>
          <label for="client-update-submit">
            <input id="client-update-submit" name="client-update-submit" type="submit" value="Update Client" />
          </label>
        </fieldset>
      </form>`;
  const addNoteForm = `
  <form class="note-add-form">
  <fieldset>
    <legend>Add a note</legend>
    <div class="form-questions">
      <div class="form-row">
        <label for="note-description">
          Description <span class="required"> (required) </span>
          <input
            id="note-description"
            name="note-description"
            required=""
            type="text"
          />
        </label>
      </div>
      <div class="form-row">
        <label for="note-noteBody">
          Note Body <span class="required"> (required) </span>
          <input
            id="note-noteBody"
            name="note-noteBody"
            required=""
            type="text"
          />
        </label>
      </div>
    </div>
    <label for="note-add-submit">
      <input type="submit" id="note-add-submit" value="Add Note" />
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
    },
    open(settings) {
      switch (settings.content) {
        case 'add':
          $content.empty().append(addClientForm);
          break;
        case 'update':
          $content.empty().append(updateClientForm);
          break;
        case 'add-note':
          $content.empty().append(addNoteForm);
          break;
        default:
          throw new Error('Didnt supply modal content type');
      }

      $modalOverlay
        .appendTo('body');

      $modal
        .appendTo('body');

      modal.center();
      $(window).on('resize', modal.center);
    },
    close() {
      $content.empty();
      $modalOverlay.detach();
      $modal.detach();
      $(window).off('resize', modal.center);
    },
  };
}());
