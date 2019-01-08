/* eslint-disable func-names */
const modal = (function () {
  const $window = $(window);
  const $modal = $('<div class="modal" />');
  const $content = $('<div class="modal-content"/>');
  const $close = $('<button role="button" class="modal-close">close</button>');

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
      $content.empty().append(settings.content);

      $modal.css({
        width: settings.width || 'auto',
        height: settings.height || 'auto',
      }).appendTo('body');

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
