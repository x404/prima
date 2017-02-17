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


	$('.modal-email').each(function(){
		var $this = $(this),
			$link = $('.social .email'),
			$close = $this.find('.close'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				$('.modal-email').addClass('show');
				$link.addClass('active');
			},
			closeMenu = function(e){
				e.preventDefault();
				$('.modal-email').removeClass('show');
				$link.removeClass('active');
			};
		init();
	});


	// validation
	$('#quickemail-form .submit').click(function(){
		$('#quickemail-form').submit();
		return false;
	});
	
	errorTxt = 'Ошибка отправки';
	$('#quickemail-form').validate({
		submitHandler: function(form){
			strSubmit=$(form).serialize();
			$.ajax({type: 'POST',url: '/ajax/callback.ajax.php',data: strSubmit,
				success: function(){
					// posthank('callback');
				}
			}).fail(function(error){alert(errorTxt)});
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
