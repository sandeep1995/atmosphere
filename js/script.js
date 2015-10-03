/*
* Auto Scroll function
*/
var scrollY = 0;
var distance = 10;
var speed = 2;
function autoScrollTo(el) {
	var currentY = window.pageYOffset;
	var targetY = document.getElementById(el).offsetTop;
	var bodyHeight = document.body.offsetHeight;
	var yPos = currentY + window.innerHeight;
	// recursively calling with speed
	var animator = setTimeout('autoScrollTo(\''+el+'\')',speed);
	if(yPos > bodyHeight){
		clearTimeout(animator);
	} else {
		if(currentY < targetY-distance){
		    scrollY = currentY+distance;
		    window.scroll(0, scrollY);
	    } else {
		    clearTimeout(animator);
	    }
	}
}
function resetScroller(el){
	var currentY = window.pageYOffset;
    var targetY = document.getElementById(el).offsetTop;
	var animator = setTimeout('resetScroller(\''+el+'\')',speed);
	if(currentY > targetY){
		scrollY = currentY-distance;
		window.scroll(0, scrollY);
	} else {
		clearTimeout(animator);
	}
	if (currentY == 0) {
		// if we reach to the top of the page then clear the timeout
		clearTimeout(animator);
	}
	
	window.addEventListener("keypress",function(){
		clearTimeout(animator);	
	});
	window.addEventListener("click",function(){
		clearTimeout(animator);	
	});
}

/*
* sandeepTabs
*/
;( function( window ) {
	'use strict';
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function sandeepTabs( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
  		extend( this.options, options );
  		this._init();
	}

	sandeepTabs.prototype.options = {
		start : 0
	};

	sandeepTabs.prototype._init = function() {
		this.tabs = [].slice.call( this.el.querySelectorAll( 'nav > ul > li' ) );
		this.items = [].slice.call( this.el.querySelectorAll( '.content > section' ) );
		this.current = -1;
		this._show();
		this._initEvents();
	};

	sandeepTabs.prototype._initEvents = function() {
		var self = this;
		this.tabs.forEach( function( tab, idx ) {
			tab.addEventListener( 'click', function( ev ) {
				ev.preventDefault();
				self._show( idx );
			} );
		} );
	};

	sandeepTabs.prototype._show = function( idx ) {
		if( this.current >= 0 ) {
			this.tabs[ this.current ].className = '';
			this.items[ this.current ].className = '';
		}
		this.current = idx != undefined ? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
		this.tabs[ this.current ].className = 'tab-current';
		this.items[ this.current ].className = 'content-current';
	};

	// adding to global namespace
	window.sandeepTabs = sandeepTabs;

})( window );

new sandeepTabs( document.getElementById( 'section1' ) );