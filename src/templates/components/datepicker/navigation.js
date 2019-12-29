(function() {
  const template = '' +
      '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div>' +
      '<div class="datepicker--nav-title">#{title}</div>' +
      '<div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>';
  const buttonsContainerTemplate = '<div class="datepicker--buttons"></div>';
  const button = '<span class="datepicker--button" data-action="#{action}">#{label}</span>';
  const datepicker = $.fn.datepicker;
  const dp = datepicker.Constructor;

  datepicker.Navigation = function(d, opts) {
    this.d = d;
    this.opts = opts;

    this.$buttonsContainer = '';

    this.init();
  };

  datepicker.Navigation.prototype = {
    init: function() {
      this._buildBaseHtml();
      this._bindEvents();
    },

    _bindEvents: function() {
      this.d.$nav.on('click', '.datepicker--nav-action', $.proxy(this._onClickNavButton, this));
      this.d.$nav.on('click', '.datepicker--nav-title', $.proxy(this._onClickNavTitle, this));
      this.d.$datepicker.on('click', '.datepicker--button', $.proxy(this._onClickNavButton, this));
    },

    _buildBaseHtml: function() {
      if (!this.opts.onlyTimepicker) {
        this._render();
      }
      this._addButtonsIfNeed();
    },

    _addButtonsIfNeed: function() {
      if (this.opts.todayButton) {
        this._addButton('today');
      }
      if (this.opts.clearButton) {
        this._addButton('clear');
      }
    },

    _render: function() {
      const title = this._getTitle(this.d.currentDate);
      const html = dp.template(template, $.extend({title: title}, this.opts));
      this.d.$nav.html(html);
      if (this.d.view == 'years') {
        $('.datepicker--nav-title', this.d.$nav).addClass('-disabled-');
      }
      this.setNavStatus();
    },

    _getTitle: function(date) {
      return this.d.formatDate(this.opts.navTitles[this.d.view], date);
    },

    _addButton: function(type) {
      if (!this.$buttonsContainer.length) {
        this._addButtonsContainer();
      }

      const data = {
        action: type,
        label: this.d.loc[type],
      };
      const html = dp.template(button, data);

      if ($('[data-action=' + type + ']', this.$buttonsContainer).length) return;
      this.$buttonsContainer.append(html);
    },

    _addButtonsContainer: function() {
      this.d.$datepicker.append(buttonsContainerTemplate);
      this.$buttonsContainer = $('.datepicker--buttons', this.d.$datepicker);
    },

    setNavStatus: function() {
      if (!(this.opts.minDate || this.opts.maxDate) || !this.opts.disableNavWhenOutOfRange) return;

      const date = this.d.parsedDate;
      const m = date.month;
      const y = date.year;
      const d = date.date;

      switch (this.d.view) {
        case 'days':
          if (!this.d._isInRange(new Date(y, m - 1, 1), 'month')) {
            this._disableNav('prev');
          }
          if (!this.d._isInRange(new Date(y, m + 1, 1), 'month')) {
            this._disableNav('next');
          }
          break;
        case 'months':
          if (!this.d._isInRange(new Date(y - 1, m, d), 'year')) {
            this._disableNav('prev');
          }
          if (!this.d._isInRange(new Date(y + 1, m, d), 'year')) {
            this._disableNav('next');
          }
          break;
        case 'years':
          var decade = dp.getDecade(this.d.date);
          if (!this.d._isInRange(new Date(decade[0] - 1, 0, 1), 'year')) {
            this._disableNav('prev');
          }
          if (!this.d._isInRange(new Date(decade[1] + 1, 0, 1), 'year')) {
            this._disableNav('next');
          }
          break;
      }
    },

    _disableNav: function(nav) {
      $('[data-action="' + nav + '"]', this.d.$nav).addClass('-disabled-');
    },

    _activateNav: function(nav) {
      $('[data-action="' + nav + '"]', this.d.$nav).removeClass('-disabled-');
    },

    _onClickNavButton: function(e) {
      const $el = $(e.target).closest('[data-action]');
      const action = $el.data('action');

      this.d[action]();
    },

    _onClickNavTitle: function(e) {
      if ($(e.target).hasClass('-disabled-')) return;

      if (this.d.view == 'days') {
        return this.d.view = 'months';
      }

      this.d.view = 'years';
    },
  };
})();
