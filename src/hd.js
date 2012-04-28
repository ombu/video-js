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
    var cl = 'vjs-hd-control-' + this.player.options.mode;
    this.player.addClass(cl);
    return 'vjs-hd-control ' + cl + ' ' + this._super();
  },

  // OnClick - Toggle between play and pause
  onClick: function() {
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
    this.player.play();
  }

});
