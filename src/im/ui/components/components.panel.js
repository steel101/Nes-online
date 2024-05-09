(function (odd) {
    var utils = odd.utils,
        css = utils.css,
        events = odd.events,
        EventDispatcher = events.EventDispatcher,
        GlobalEvent = events.GlobalEvent,
        IM = odd.IM,
        UI = IM.UI,
        components = UI.components,

        CLASS_PANEL = 'im-panel';

    function Panel(name, kind, logger) {
        var args = Array.prototype.slice.call(arguments, 3);
        EventDispatcher.apply(this, [kind || 'Panel', { logger: logger }].concat(args).concat([[GlobalEvent.VISIBILITYCHANGE]]));

        var _this = this,
            _name,
            _logger = logger,
            _container,
            _content,
            _data;

        function _init() {
            _name = name;
            _data = {};

            _container = utils.createElement('div', CLASS_PANEL + ' ' + _name);
            _content = utils.createElement('div');
            _container.appendChild(_content);
        }

        _this.update = function (data) {
            switch (utils.typeOf(data)) {
                case 'object':
                    _data = utils.extendz(_data, data);

                    var text = '';
                    utils.forEach(_data, function (key, value) {
                        text += (text ? '\n' : '') + key + ': ' + value;
                    });
                    _content.innerHTML = text;
                    break;
                case 'string':
                    _content.innerHTML = text;
                    break;
                default:
                    _content.innerHTML = '';
                    _content.appendChild(data);
                    break;
            }
        };

        _this.clear = function () {
            _data = {};
            _content.innerHTML = '';
        };

        _this.show = function () {
            if (_container.style.display === 'inline-block') {
                _this.hide();
                return;
            }
            css.style(_container, {
                display: 'inline-block',
            });
            _this.dispatchEvent(GlobalEvent.VISIBILITYCHANGE, { name: _name, state: 'visible' });
        };

        _this.hide = function () {
            css.style(_container, {
                display: 'none',
            });
            _this.dispatchEvent(GlobalEvent.VISIBILITYCHANGE, { name: _name, state: 'hidden' });
        };

        _this.element = function () {
            return _container;
        };

        _this.resize = function (width, height) {

        };

        _init();
    }

    Panel.prototype = Object.create(EventDispatcher.prototype);
    Panel.prototype.constructor = Panel;
    Panel.prototype.kind = 'Panel';

    components.Panel = Panel;
})(odd);

