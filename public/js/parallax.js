(function() {
  $(function() {

    var $window = $(window);

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
