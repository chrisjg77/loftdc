(function() {
  $(function() {

    var $window = $(window)
      , keyframes = [
        {
          'wrapper': 'header',
          'duration': '100%',
          'animations': [
            {
              'selector': '.brand',
              'scale': 0,
              'opacity': 0
            }
          ]

        }
      ]



    var lax = {

      init: function() {
        $window.scroll(this.updatePage);
      },

      updatePage: function() {
        // console.log($window.scrollTop());
      }

    }

    lax.init();

  })
}).call(this);
