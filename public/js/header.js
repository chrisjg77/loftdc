(function() {
  $(function() {

    var $window       = $(window)
      , $nav          = $('nav.nav')
      , $brand        = $('.brand.nav')
      , switchPoint   = 400
      ;


    var header = {

      init: function() {
        this.setElements();
        $window.scroll(this.updatePage);
      },

      setElements: function() {
        $('.brand.nav').addClass('ready');
      },

      updatePage: function() {
        if ($window.scrollTop() > switchPoint) {
          $nav.addClass('condensed');
        }
        else {
          $nav.removeClass('condensed');
        }
      }
    }

    header.init();

  })
}).call(this);
