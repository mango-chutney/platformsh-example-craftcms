import $ from 'jquery';

if ($('.faq-item-container .faq-item').length) {
  $('.faq-item-container .faq-item').on('click', event => {
    event.stopPropagation();
    const question = event.target;
    $(question)
      .parent()
      .toggleClass('active');
  });

  const $faqSearchForm = $('.search-faq-form');
  let $faqListing;

  if ($faqSearchForm.length) {
    const $faqSearchInput = $faqSearchForm.find('.js-keywords');
    $faqListing = $('.js-faq-listing > dd');
    const $faqListingContainer = $('.js-faq-listing');

    $faqSearchForm.on('submit', e => {
      e.preventDefault();
      $faqListingContainer.addClass('loading');

      $faqListing.attr('data-state', 'hidden');

      let keywords = $faqSearchInput.val();
      keywords = keywords.toLowerCase();
      keywords = keywords.split(' ');

      let $matching = $();

      // Check to see if input field is empty

      if (keywords.length) {
        let matches = false;

        // eslint-disable-next-line func-names
        $faqListing.each(function() {
          const $element = $(this);
          matches = true;

          // eslint-disable-next-line consistent-return
          $.each(keywords, (index, keyword) => {
            if (
              !(
                $element
                  .find('a')
                  .text()
                  .toLowerCase()
                  .match(keyword) ||
                $element
                  .find('p')
                  .text()
                  .toLowerCase()
                  .match(keyword)
              )
            ) {
              matches = false;
            }

            if (matches !== true) {
              return false;
            }
          });

          if (matches === true) {
            $matching = $matching.add($element);
          }
        });

        $matching.attr('data-state', 'showing');
        $faqListingContainer.addClass('loading');
      } else {
        // reset listing
      }
    });

    $faqSearchInput.on('keyup', () => {
      setTimeout(() => {
        $faqSearchForm.trigger('submit');
        $('.js-keywords').focus();
      }, 500);
    });
  }
}
