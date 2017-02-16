$(document).ready(function(){
	$('#fullpage').fullpage({
		responsiveWidth : 770,
		autoScrolling : true,
		fitToSection : false,
		scrollBar : true,
		normalScrollElements: '#section7',
		bigSectionsDestination : 'bottom'
	});
	
	// плавная промотка из хедера
	$('nav a[href*="#"]:not([href="#"]), .intro a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000, function() {
		        	target.focus();
		        });
				return false;
			}
		}
	});

});



// =заглушка для IE
//event listener: DOM ready
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
//call plugin function after DOM ready
addLoadEvent(function(){
	outdatedBrowser({
		bgColor: '#f25648',
		color: '#ffffff',
		lowerThan: 'transform',
		languagePath: '/outdatedbrowser/lang/ru.html'
	})
});
// =/заглушка для IE
