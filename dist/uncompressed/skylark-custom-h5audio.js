/**
 * skylark-custom-h5audio - A version of custom-html5-vedio that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-custom-h5audio/player',[
  "skylark-langx",
  "skylark-domx-styler",
  "skylark-domx-noder",
  "skylark-domx-eventer",
  "skylark-domx-query",
  "skylark-domx-plugins-base"
],function(langx,styler,noder, eventer,$ , plugins) {

  'use strict'

    var aphtml =
    '  <div class="ap-inner">'+
    '    <div class="ap-panel">'+
    '      <div class="ap-item ap--playback">'+
    '        <button class="ap-controls ap-prev-btn">'+
    '          <i class="material-icons md-dark">skip_previous</i>'+
    '        </button>'+
    '        <button class="ap-controls ap-toggle-btn">'+
    '            <i class="material-icons md-dark ap--play">play_arrow</i>'+
    '            <i class="material-icons md-dark ap--pause">pause</i>'+
    '        </button>'+
    '        <button class="ap-controls ap-next-btn">'+
    '          <i class="material-icons md-dark">skip_next</i>'+
    '        </button>'+
    '      </div>'+
    '      <div class="ap-item ap--track">'+
    '        <div class="ap-info">'+
    '          <div class="ap-title">Unknown</div>'+
    '          <div class="ap-time">'+
    '            <span class="ap-time--current">--</span>'+
    '            <span> / </span>'+
    '            <span class="ap-time--duration">--</span>'+
    '          </div>'+
    ''+
    '          <div class="ap-progress-container">'+
    '            <div class="ap-progress">'+
    '              <div class="ap-bar"></div>'+
    '              <div class="ap-preload-bar"></div>'+
    '            </div>'+
    '          </div>'+
    ''+
    '        </div>'+
    '      </div>'+
    '      <div class="ap-item ap--settings">'+
    '        <div class="ap-controls ap-volume-container">'+
    '          <button class="ap-controls ap-volume-btn">'+
    '              <i class="material-icons md-dark ap--volume-on">volume_up</i>'+
    '              <i class="material-icons md-dark ap--volume-off">volume_mute</i>'+
    '          </button>'+
    '          <div class="ap-volume">'+
    '            <div class="ap-volume-progress"><div class="ap-volume-bar"></div></div>'+
    '          </div>'+
    '        </div>'+
    '        <button class="ap-controls ap-repeat-btn">'+
    '          <i class="material-icons md-dark">repeat</i>'+
    '        </button>'+
    '        <button class="ap-controls ap-shuffle-btn">'+
    '          <i class="material-icons md-dark">shuffle</i>'+
    '        </button>'+
    '        <button class="ap-controls ap-playlist-btn">'+
    '          <i class="material-icons md-dark">queue_music</i>'+
    '        </button>'+
    '      </div>'+
    '    </div>'+
    '  </div>';


  function create(el, attr) {
    var element = document.createElement(el);
    if(attr) {
      for(var name in attr) {
        if(element[name] !== undefined) {
          element[name] = attr[name];
        }
      }
    }
    return element;
  }

  Element.prototype.offset = function() {
    var el = this.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
      top: el.top + scrollTop,
      left: el.left + scrollLeft
    };
  };

  Element.prototype.css = function(attr) {
    if(typeof attr === 'string') {
      return getComputedStyle(this, '')[attr];
    }
    else if(typeof attr === 'object') {
      for(var name in attr) {
        if(this.style[name] !== undefined) {
          this.style[name] = attr[name];
        }
      }
    }
  };


  var CustomHtml5Audio = plugins.Plugin.inherit({
    klassName : "CustomHtml5Audio",

    pluginName : "intg.custom_html5_audio",

    options : {
      volume   : 0.5,
      autoPlay : false,
      notification: false,
      playList : []
    },

    _construct: function(elm, options) {
      //this.options = options
      plugins.Plugin.prototype._construct.call(this,elm,options);

      this._index = 0;
      this._repeating = false;
      this._shuffling = null;
      this._played = [];
      this._seeking = false;
      this._rightClick = false;
      this._apActive = false;


      let $el = this.$(),
          selectors = this.options.selectors;

      this._player = create('div', {
        'className': 'ap',
        'id': 'ap',
        'innerHTML': aphtml
      });

      if(this._apActive || this._player === null) {
        return;
      }

      let settings = this.options;

      this._elm.appendChild(this._player);

      // get player elements
      this._playBtn        = this._player.querySelector('.ap-toggle-btn');
      this._prevBtn        = this._player.querySelector('.ap-prev-btn');
      this._nextBtn        = this._player.querySelector('.ap-next-btn');
      this._repeatBtn      = this._player.querySelector('.ap-repeat-btn');
      this._shuffleBtn     = this._player.querySelector('.ap-shuffle-btn');
      this._volumeBtn      = this._player.querySelector('.ap-volume-btn');
      this._plBtn          = this._player.querySelector('.ap-playlist-btn');
      this._curTime        = this._player.querySelector('.ap-time--current');
      this._durTime        = this._player.querySelector('.ap-time--duration');
      this._trackTitle     = this._player.querySelector('.ap-title');
      this._progressBar    = this._player.querySelector('.ap-bar');
      this._progressBarContaner    = this._player.querySelector('.ap-progress-container');
      this._preloadBar     = this._player.querySelector('.ap-preload-bar');
      this._volumeBar      = this._player.querySelector('.ap-volume-bar');
      this._volumeBarContaner    = this._player.querySelector('.ap-volume-container');

      this._playList = settings.playList;


      this.listenTo($(this._playBtn),'click', this.playToggle);
      this.listenTo($(this._volumeBtn),'click', this.volumeToggle);
      this.listenTo($(this._repeatBtn),'click', this.repeatToggle);
      this.listenTo($(this._shuffleBtn),'click', this.shuffleToggle);

      this.listenTo($(this._progressBarContaner),'mousedown', this.handlerBar);
      this.listenTo($(this._progressBarContaner),'mousemove', this.seek);
      this.listenTo($(document),'mouseup', this.seekingFalse);

      this.listenTo($(this._volumeBarContaner),'mousedown', this.handlerVol);
      this.listenTo($(this._volumeBarContaner),'mousemove', this.setVolume);
      this.listenTo($(document),'mouseup', this.seekingFalse);

      this.listenTo($(this._prevBtn),'click', this.prev);
      this.listenTo($(this._nextBtn),'click', this.next);

      this._imageDiv = create('div', {
        'className': 'ap-image'
      })
      this._elm.appendChild(this._imageDiv)

      this._apActive = true;

      // Create playlist
      this.renderPL();
      this.listenTo($(this._plBtn),'click', this.plToggle);

      // Create audio object
      this._audio = new Audio();
      this._audio.volume = settings.volume;



      if(this.isEmptyList()) {
        this.empty();
        return;
      }

      this._audio.src = this._playList[this._index].file;
      this._audio.preload = 'auto';
      this._trackTitle.innerHTML = this._playList[this._index].title;
      this._volumeBar.style.height = this._audio.volume * 100 + '%';
      this._volumeLength = this._volumeBar.css('height');

      this.listenTo($(this._audio),'error', this.error);
      this.listenTo($(this._audio),'timeupdate', this.update);
      this.listenTo($(this._audio),'ended', this.doEnd);
      this.listenTo($(this._audio),'play', () => {
        this._playBtn.classList.add('playing');
      }, false)
      this.listenTo($(this._audio),'pause', () => {
        this._playBtn.classList.remove('playing');
      }, false)

      if(settings.autoPlay) {
        this._audio.play();
        this._plLi[this._index].classList.add('pl-current');
      }



    },


    /**
     *  PlayList methods
     */
    renderPL : function () {
      var html = [];
      var tpl =
        '<li data-track="{count}">'+
          '<div class="pl-number">'+
            '<div class="pl-count">'+
              '<i class="material-icons">audiotrack</i>'+
            '</div>'+
            '<div class="pl-playing">'+
              '<div class="eq">'+
                '<div class="eq-bar"></div>'+
                '<div class="eq-bar"></div>'+
                '<div class="eq-bar"></div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="pl-title">{title}</div>'+
          '<button class="pl-remove">'+
              '<i class="material-icons">delete</i>'+
          '</button>'+
        '</li>';

      this._playList.forEach(function(item, i) {
        html.push(
          tpl.replace('{count}', i).replace('{title}', item.title)
        );
      });

      this._pl = create('div', {
        'className': 'pl-container hide',
        'id': 'pl',
        'innerHTML': !this.isEmptyList() ? '<ul class="pl-list">' + html.join('') + '</ul>' : '<div class="pl-empty">PlayList is empty</div>'
      });

      this._elm.insertBefore(this._pl, this._player.nextSibling);

      this._plLi = this._pl.querySelectorAll('li');

      this.listenTo($(this._pl),'click', this.listHandler);
    },

    listHandler : function (evt) {
      evt.preventDefault();
      if(evt.target.className === 'pl-title') {
        var current = parseInt(evt.target.parentNode.getAttribute('data-track'), 10);
        this._index = current;
        this.play();
        this.plActive();
      }
      else {
        var target = evt.target;
        while(target.className !== this._pl.className) {
          if(target.className === 'pl-remove') {
            var isDel = parseInt(target.parentNode.getAttribute('data-track'), 10);

            this._playList.splice(isDel, 1);
            target.parentNode.parentNode.removeChild(target.parentNode);

            this._plLi = this._pl.querySelectorAll('li');

            [].forEach.call(this._plLi, function(el, i) {
              el.setAttribute('data-track', i);
            });

            if(!this._audio.paused) {

              if(this._isDel === this._index) {
                this.play();
              }

            }
            else {
              if(this.isEmptyList()) {
                this.empty();
              }
              else {
                // audio.currentTime = 0;
                this._audio.src = this._playList[index].file;
                document.title = this._trackTitle.innerHTML = this._playList[index].title;
                this._progressBar.style.width = 0;
              }
            }
            if(this._isDel < this._index) {
              this._index--;
            }

            return;
          }
          target = target.parentNode;
        }

      }
    },

    plActive : function () {
      if(this._audio.paused) {
        this._plLi[index].classList.remove('pl-current');
        return;
      }
      var current = this._index;
      for(var i = 0, len = this._plLi.length; len > i; i++) {
        this._plLi[i].classList.remove('pl-current');
      }
      this._plLi[current].classList.add('pl-current');

      this._imageDiv.innerHTML = ''
      if (this._playList[current].icon) {
        let image = create('img', {
          src: this._playList[current].icon
        })
        this._imageDiv.appendChild(image)
      }
    },


  /**
   *  Player methods
   */
    error : function () {
      if (!this.isEmptyList()){
        this.next();
      } 
    },


   play : function () {

      this._index = (this._index > this._playList.length - 1) ? 0 : this._index;
      if(this._index < 0) this._index = this._playList.length - 1;

      if(this.isEmptyList()) {
        this.empty();
        return;
      }

      this._played.push(this._index)

      this._audio.src = this._playList[this._index].file;
      this._audio.preload = 'auto';
      document.title = this._trackTitle.innerHTML = this._playList[this._index].title;
      this._audio.play();
      ///notify(playList[index].title, {
      ///  icon: playList[index].icon,
      ///  body: 'Now playing',
      ///  tag: 'music-player'
      ///});
      this.plActive();
    },

    prev : function () {
      if (this._played.length > 1) {
        this._index = this._played.splice(-2)[0];
      } else {
        this._index = 0;
      }

      this.play();
    },

    next : function (interactive) {
      if (this._shuffling) {
        if (this._shuffling.length === 0) {
          if (this._repeating || this._interactive) {
            this._shuffling = [...Array(this._playList.length).keys()]
          } else {
            this._audio.pause();
            this.plActive();
            
            return;
          }
        }

        let i = Math.floor(Math.random() * this._shuffling.length);
        this._index = this._shuffling.splice(i, 1)[0];
      } else {
        if (this._index === this._playList.length - 1 && (!this._repeating && !this._interactive)) {
          this._audio.pause();
          this.plActive();
          this._playBtn.classList.remove('playing');
          return;
        }

        this._index = (this._index === this._playList.length - 1) ? 0 : this._index + 1;
      }

      this.play();
    },

    isEmptyList : function () {
      return this._playList.length === 0;
    },

    empty : function () {
      this._audio.pause();
      this._audio.src = '';
      this._trackTitle.innerHTML = 'queue is empty';
      this._curTime.innerHTML = '--';
      this._durTime.innerHTML = '--';
      this._progressBar.style.width = 0;
      this._preloadBar.style.width = 0;
      this._pl.innerHTML = '<div class="pl-empty">PlayList is empty</div>';
    },

    playToggle : function () {
      if(this.isEmptyList()) {
        return;
      }
      if(this._audio.paused) {
        this._audio.play();
        //notify(playList[index].title, {
        //  icon: playList[index].icon,
        //  body: 'Now playing'
        //});
        this._playBtn.classList.add('playing');
      }
      else {
        this._audio.pause();
        this._playBtnclassList.remove('playing');
      }
      this.plActive();
    },

    volumeToggle : function () {
      if(this._audio.muted) {
        if(parseInt(this._volumeLength, 10) === 0) {
          this._volumeBar.style.height = '100%';
          this._audio.volume = 1;
        }
        else {
          this._volumeBar.style.height = this._volumeLength;
        }
        this._audio.muted = false;
        this._volumeBtn.classList.remove('muted');
      }
      else {
        this._audio.muted = true;
        this._volumeBar.style.height = 0;
        this._volumeBtn.classList.add('muted');
      }
    },

    repeatToggle : function () {
      var repeat = this._repeatBtn.classList;
      if(repeat.contains('ap-active')) {
        this._repeating = false;
        repeat.remove('ap-active');
      }
      else {
        this._repeating = true;
        repeat.add('ap-active');
      }
    },

    shuffleToggle :function () {
      var shuffle = this._shuffleBtn.lassList;
      if(shuffle.contains('ap-active')) {
        shuffling = null;
        shuffle.remove('ap-active');
      }
      else {
        shuffling = [...Array(this._playList.length).keys()]
        shuffle.add('ap-active');
      }
    },

    plToggle : function () {
      this._pl.classList.toggle('ap-active');
      this._pl.classList.toggle('hide');
    },

    update : function () {
      if(this._audio.readyState === 0) return;

      var barlength = Math.round(this._audio.currentTime * (100 / this._audio.duration));
      this._progressBar.style.width = barlength + '%';

      var
      curMins = Math.floor(this._audio.currentTime / 60),
      curSecs = Math.floor(this._audio.currentTime - curMins * 60),
      mins = Math.floor(this._audio.duration / 60),
      secs = Math.floor(this._audio.duration - mins * 60);
      (curSecs < 10) && (curSecs = '0' + curSecs);
      (secs < 10) && (secs = '0' + secs);

      this._curTime.innerHTML = curMins + ':' + curSecs;
      this._durTime.innerHTML = mins + ':' + secs;

      var buffered = this._audio.buffered;
      if(buffered.length) {
        var loaded = Math.round(100 * buffered.end(0) / this._audio.duration);
        this._preloadBar.style.width = loaded + '%';
      }
    },

    doEnd : function () {

      this.next(false);

    },

    moveBar : function (evt, el, dir) {
      var value;
      if(dir === 'horizontal') {
        value = Math.round( ((evt.clientX - el.offset().left) + window.pageXOffset) * 100 / el.parentNode.offsetWidth);
        el.style.width = value + '%';
        return value;
      }
      else {
        var offset = (el.offset().top + el.offsetHeight)  - window.pageYOffset;
        value = Math.round((offset - evt.clientY));
        if(value > 100) value = 100;
        if(value < 0) value = 0;
        this._volumeBar.style.height = value + '%';
        return value;
      }
    },

    handlerBar : function (evt) {
      this._rightClick = (evt.which === 3) ? true : false;
      this._seeking = true;
      this.seek(evt);
    },

    handlerVol : function (evt) {
      this._rightClick = (evt.which === 3) ? true : false;
      this._seeking = true;
      this.setVolume(evt);
    },

    seek : function (evt) {
      if(this._seeking && this._rightClick === false && this._audio.readyState !== 0) {
        var value = this.moveBar(evt, this._progressBar, 'horizontal');
        this._audio.currentTime = this._audio.duration * (value / 100);
      }
    },

    seekingFalse : function () {
      this._seeking = false;
    },

    setVolume : function (evt) {
      this._volumeLength = this._volumeBar.css('height');
      if(this._seeking && this._rightClick === false) {
        var value = this.moveBar(evt, this._volumeBar.parentNode, 'vertical') / 100;
        if(value <= 0) {
          this._audio.volume = 0;
          this._volumeBtn.classList.add('muted');
        }
        else {
          if(this._audio.muted) this._audio.muted = false;
          this._audio.volume = value;
          this._volumeBtn.classList.remove('muted');
        }
      }
    },



    /* Destroy method. Clear All */
    destroy : function () {
      if(!this._apActive) return;


      noder.remove(this._player);
      noder.remove(this._pl);

      this._audio.pause();
      this._apActive = false;
    }

  });

  plugins.register(CustomHtml5Audio);


  return CustomHtml5Audio;

});

define('skylark-custom-h5audio/main',[
	"./player"
],function(AudioPlayer){
	return AudioPlayer;
});
define('skylark-custom-h5audio', ['skylark-custom-h5audio/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-custom-h5audio.js.map
