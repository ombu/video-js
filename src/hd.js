/* HD Toggle - Switch between HD/SD
================================================================================ */
_V_.HdToggle = _V_.Button.extend({

  buttonText: 'HD',

  init: function(player, options) {
    this._super(player, options);
  },

  buildCSSClass: function() {
    if (typeof this.player.options.mode == 'undefined') {
      this.player.options.mode = 'sd';
    }
    return 'vjs-hd-control vjs-hd-control-' + this.player.options.mode + ' ' +
  this._super();
  },

  // OnClick - Toggle between play and pause
  onClick: function() {
    this.player.pause();
    this.player.options.mode = this.player.options.mode == 'sd' ? 'hd' : 'sd';
    if (this.player.options.mode == 'sd') {
      this.removeClass('vjs-hd-control-hd');
      this.addClass('vjs-hd-control-sd');
    }
    else {
      this.removeClass('vjs-hd-control-sd');
      this.addClass('vjs-hd-control-hd');
    }
    this.player.src(this.player.options.sources);
    this.player.play();
  }

});
