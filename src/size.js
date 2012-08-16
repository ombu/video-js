/* Size Selector Menu
================================================================================ */
_V_.SizeButton = _V_.Button.extend({

  init: function(player, options){
    this._super(player, options);

    this.menu = this.createMenu();

    if (this.items.length === 0) {
      this.hide();
    }
  },

  createMenu: function(){
    var menu = new _V_.Menu(this.player);

    // Add a title list item to the top
    menu.el.appendChild(_V_.createElement("li", {
      className: "vjs-menu-title",
      innerHTML: "Size"
    }));

    this.items = this.createItems();

    // Add menu items to the menu
    this.each(this.items, function(item){
      menu.addItem(item);
    });

    // Add list to element
    this.addComponent(menu);

    return menu;
  },

  // Create a menu item for each text track
  createItems: function(){
    var items = [];
    this.each(new Array('small', 'large', 'fullscreen'), function(size){
      items.push(new _V_.SizeMenuItem(this.player, {
        size: size
      }));
    });
    return items;
  },

  buildCSSClass: function(){
    return this.className + " vjs-menu-button " + this._super();
  },

});

/* Size menu item
================================================================================ */
_V_.SizeMenuItem = _V_.MenuItem.extend({

  init: function(player, options){
    var size = this.size = options.size;

    // Modify options for parent MenuItem class's init.
    options.label = _V_.uc(size);
    this._super(player, options);

    this.player.on('sizechange', _V_.proxy(this, this.update));
  },

  onClick: function(){
    this.player.trigger('sizechange');
    this._super();

    this.player.removeClass('vjs-size-small');
    this.player.removeClass('vjs-size-large');

    if (this.size == 'fullscreen') {
      this.player.requestFullScreen();
    } else {
      this.player.cancelFullScreen();
      this.player.addClass('vjs-size-' + this.size);
    }
  },

  update: function() {
    this.selected(false);
  }

});

_V_.merge(_V_.ControlBar.prototype.options.components, {
  "sizeButton": {},
});
