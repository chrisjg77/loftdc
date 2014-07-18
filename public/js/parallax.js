(function() {
  $(function() {

    var $window = $(window)
      , properties = ['translateY','translateX','scale','opacity']
      , relScrollTop
      , keyframes = [
        {
          'wrapper': 'header',
          'offset': 0,
          'animations': [
            {
              'selector': '.brand',
              'translateY': [0,150],
              'opacity': [1,0],
              'background_position': [0,0],
              'duration': 500
            }
          ]
        },
        {
          'wrapper': 'section:eq(1)',
          'offset': -900,
          'animations': [
            {
              'selector': '.banner.parallax',
              'opacity': [1,1],
              'translateY': [0,500],
              'background_position': [0,0],
              'duration': 1500
            }
          ]
        },
        {
          'wrapper': 'section:eq(2)',
          'offset': -900,
          'animations': [
            {
              'selector': '.banner.parallax',
              'opacity': [1,1],
              'translateY': [0,500],
              'background_position': [0,0],
              'duration': 1500
            },
          ]
        },
        {
          'wrapper': 'section:eq(4)',
          'offset': -900,
          'animations': [
            {
              'selector': '.banner.parallax',
              'opacity': [1,1],
              'translateY': [0,500],
              'background_position': [0,0],
              'duration': 1500
            }
          ]
        }
      ]



    var lax = {

      init: function() {
        $window.scroll(this.doParallax);
      },

      doParallax: function() {
        for(i=0;i<keyframes.length;i++) {

          var $wrapper = $(keyframes[i].wrapper);
          var top = $wrapper.offset().top+keyframes[i].offset;
          var bottom = $wrapper.offset().top + $wrapper.height();
          relScrollTop = $window.scrollTop() - top;

          if($window.scrollTop() > top && $window.scrollTop() < bottom) {

            // if (keyframes[i].animations[0]) {
            //   var $elem = $(keyframes[i].wrapper + ' ' + keyframes[i].animations[0].selector);
            // }

            for(j=0;j<keyframes[i].animations.length;j++) {

              var $elem = $(keyframes[i].wrapper + ' ' + keyframes[i].animations[j].selector);

              var animation = keyframes[i].animations[j];
              var duration = keyframes[i].animations[j].duration;

              opacity = calcValues(animation,'opacity',duration);
              translateY = calcValues(animation,'translateY',duration);
              background_position = calcValues(animation,'background_position',duration);

              if ($window.scrollTop() > bottom) {
                $elem.hide();
              }
              else {
                $elem.show();
              }

              $elem.css({
                'opacity': opacity,
                'background-position': 'center '+background_position+'px',
                '-webkit-transform': 'translateY('+translateY+'px)',
                '-moz-transform': 'translateY('+translateY+'px)',
                'transform': 'translateY('+translateY+'px)'
              });

            }
          }
        }
      }
    },

    calcValues = function(animation,property,duration) {

      var value = animation[property];
      if (property === 'translateY') {
        return Math.round(easeInOutQuad(relScrollTop,value[0],value[1]-value[0],duration).toFixed(2));
      }
      else {
        return easeInOutQuad(relScrollTop,value[0],value[1]-value[0],duration).toFixed(2);
      }

    },

    easeInOutQuad = function (t, b, c, d) {
      //sinusoadial in and out
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    }

    lax.init();

  })
}).call(this);
