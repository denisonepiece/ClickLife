class Sidebar {
  constructor(sidebar) {
    this.sidebar = document.querySelector(sidebar);
    this.sidebarInner = this.sidebar.querySelector('.filter-aside__categories');

    this.direction = 'down';

    this.dimensions = {
      translateY: 0,
      topSpacing: 0,
      lastTopSpacing: 0,
      bottomSpacing: 0,
      lastBottomSpacing: 0,
      sidebarHeight: 0,
      sidebarWidth: 0,
      sidebarTop: 0,
      containerHeight: 0,
      viewportHeight: 0,
      viewportTop: 0,
      lastViewportTop: 0,
    };

    ['handleEvent'].forEach((method) => {
      this[method] = this[method].bind(this);
    });

    this.calcDimensions();

    this.init();
  }

  init() {
    this.bindEvents();

    console.log('Sidebar is init');
  }

  bindEvents() {
    window.addEventListener('scroll', this, {passive: true, capture: false});
    this.sidebar.addEventListener('update' + 'sidebar', this);
  }

  handleEvent(event) {
    this.updateSidebar(event);
  }


  calcDimensions() {
    var dims = this.dimensions;

    dims.topSpacing = document.querySelector('.wrap .container').offsetTop;
    dims.sidebarHeight = this.sidebarInner.offsetHeight;

    this._calcDimensionsWithScroll();
  }

  _calcDimensionsWithScroll() {
    var dims = this.dimensions;

    dims.sidebarTop = this.sidebarInner.offsetTop;
    dims.viewportTop = document.documentElement.scrollTop ||
        document.body.scrollTop

  }

  observeScrollDir() {
    let dims = this.dimensions;

    if (dims.lastViewportTop === dims.viewportTop) return;

    let furthest = 'down' === this.direction ? Math.min : Math.max;

    if (dims.viewportTop === furthest(dims.viewportTop, dims.lastViewportTop)) {
      this.direction = 'down' === this.direction ? 'up' : 'down';

      if(this.direction == 'up') {
        this.showSidebar();
      }

      if(this.direction == 'down') {
        this.fixedSidebar();
      }
    }
    this.sidebarPosition();


    dims.lastViewportTop = dims.viewportTop;
  }

  fixedSidebar() {
    this.sidebarInner.style.marginTop = this.sidebarInner.offsetTop - this.dimensions.topSpacing + 'px';
    this.sidebarInner.classList.remove('sticky');
  }

  showSidebar() {
    let dims = this.dimensions;

    if(window.pageYOffset > (dims.topSpacing + dims.sidebarHeight)) {
      this.sidebarInner.style.marginTop = dims.viewportTop - dims.sidebarHeight - dims.topSpacing + 'px';
    }

  }


  sidebarPosition() {
    let dims = this.dimensions;

    if(this.direction === "up") {
      if((dims.viewportTop + dims.topSpacing) <= dims.sidebarTop) {
        this.sidebarInner.classList.add('sticky');
        this.sidebarInner.style.top = this.dimensions.topSpacing + 'px';
      }
    }

    if(this.direction === "down") {

    }


  }

  updateSidebar(event = {}) {
    ((eventType) => {

      requestAnimationFrame(() => {
        switch (eventType) {
          case 'scroll':
            this._calcDimensionsWithScroll();
            this.observeScrollDir();
            break;

          default:
            this.calcDimensions();
            break;
        }
      });

    })(event.type);
  }
}

export default Sidebar;
