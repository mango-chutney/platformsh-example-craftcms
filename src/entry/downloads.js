import $ from 'jquery';

if ($('.downloads-tab').length) {
  $('.downloads-tab').click(event => {
    event.preventDefault();

    $('.downloads-tab').removeClass('active');
    $('.downloads-files').removeClass('active');

    const value = $(event.currentTarget).data('downloads-id');
    $(event.currentTarget).addClass('active');
    $(`#${value}`).addClass('active');
    $('#downloads-select').val(value);
  });

  $('#downloads-select').change(event => {
    const value = $(event.currentTarget).val();

    $('.downloads-tab').removeClass('active');
    $('.downloads-files').removeClass('active');

    $(`.downloads-tab[data-downloads-id="${value}"]`).addClass('active');
    $(`.downloads-files#${value}`).addClass('active');
  });
}
