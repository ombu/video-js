/* Slides button - Download PDF
================================================================================ */
_V_.SlidesButton = _V_.Button.extend({

  buttonText: 'Slides',

  init: function(player, options) {
    this.slide_link = player.options.slide_link;

    this._super(player, options);

    if (!this.slide_link) {
      this.hide();
    }
  },

  createElement: function() {
    return this._super("div", {
      innerHTML: '<div><a target="_blank" title="Download Slides" href="' + this.slide_link + '" class="vjs-control-text">' + this.buttonText + '</a></div>'
    });
  },

  buildCSSClass: function() {
    return 'vjs-slides-control ' + this._super();
  }

});

_V_.merge(_V_.ControlBar.prototype.options.components, {
  "slidesButton": {}
});
