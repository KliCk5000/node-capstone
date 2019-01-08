/* eslint-disable no-undef */
/* eslint-disable func-names */
(function () {
  const $content = $('#location').detach(); // Grab content from html file under #location

  $('.test-modal').on('click', () => {
    modal.open({ content: $content, width: 340, height: 300 });
  });
}());
