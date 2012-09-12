/* Download Menu
================================================================================ */
_V_.DownloadButton = _V_.Button.extend({
  
  init: function(player, options){
    this._super(player, options);

    this.downloads = player.options.downloads;

    if (this.downloads) {
      this.menu = this.createMenu();
    } else {
      this.hide();
    }
  },

  createMenu: function(){
    var menu = new _V_.Menu(this.player);

    // Add a title list item to the top
    menu.el.appendChild(_V_.createElement("li", {
      className: "vjs-menu-title",
      innerHTML: "Downloads"
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
    this.each(this.downloads, function(download){
      var item = new _V_.DownloadMenuItem(this.player, {
        download: download
      });
      items.push(item);
    });
    return items;
  },

  buildCSSClass: function(){
    return "vjs-menu-button vjs-download-control " + this._super();
  }

});

/* Size menu item
================================================================================ */
_V_.DownloadMenuItem = _V_.MenuItem.extend({

  init: function(player, options){
    var download = this.download = options.download;

    // Modify options for parent MenuItem class's init.
    options.label = '<a target="_blank" href="' + download.link + '">' + download.label + '</a>';
    this._super(player, options);
  },

  onClick: function(){
  }

});

_V_.merge(_V_.ControlBar.prototype.options.components, {
  "downloadButton": {}
});
