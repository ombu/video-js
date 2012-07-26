/* HD Toggle - Switch between HD/SD
================================================================================ */
_V_.HdToggle = _V_.Button.extend({

  buttonText: 'HD',

  init: function(player, options) {
    this._super(player, options);

    // Remove hdToggle if there is only one source type (hd or sd).
    var hd = false;
    var sd = false;
    for (var i=0,j=player.options.techOrder;i<j.length;i++) {
      var techName = j[i],
        tech = _V_[techName];
      // tech = _V_.tech[techName];

      // Check if the browser supports this technology
      if (tech.isSupported()) {

        // Loop through each source object
        for (var a=0,b=player.options.sources;a<b.length;a++) {
          var source = b[a];

          // Check if source can be played with this technology and that it is 
          // in the correct mode
          if (tech.canPlaySource.call(player, source)) {
            if (source.mode == 'hd') {
              hd = true;
            }
            else {
              sd = true;
            }
          }
        }
      }
    }

    if (!hd || !sd) {
      this.hide();
    }
  },

  buildCSSClass: function() {
    if (typeof this.player.options.mode == 'undefined') {
      this.player.options.mode = 'sd';
    }
    var cl = 'vjs-hd-control-' + this.player.options.mode;
    this.player.addClass(cl);
    return 'vjs-hd-control ' + cl + ' ' + this._super();
  },

  // OnClick - Toggle between play and pause
  onClick: function(event) {
    this.player.pause();
    this.player.options.mode = this.player.options.mode == 'sd' ? 'hd' : 'sd';
    if (this.player.options.mode == 'sd') {
      this.player.removeClass('vjs-hd-control-hd');
      this.player.addClass('vjs-hd-control-sd');
      this.removeClass('vjs-hd-control-hd');
      this.addClass('vjs-hd-control-sd');
    }
    else {
      this.player.removeClass('vjs-hd-control-sd');
      this.player.addClass('vjs-hd-control-hd');
      this.removeClass('vjs-hd-control-sd');
      this.addClass('vjs-hd-control-hd');
    }
    this.player.src(this.player.options.sources);
    window.setTimeout(this.proxy(this.restartPlaying), 0);
  },

  restartPlaying: function () {
    this.player.play();
  }

});
