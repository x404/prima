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
				$('.modal-email').show();
				$link.addClass('active');
				$('.modal-email').find('.modal-title, form').show();
			},
			closeMenu = function(e){
				e.preventDefault();
				$('.modal-email').hide();
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
	thankTxt = '<div class="thank"> Ваше сообщение успешно отправлено </div>';
	$('#quickemail-form').validate({
		submitHandler: function(form){
			strSubmit=$(form).serialize();
			$.ajax({type: 'POST',url: '/ajax/callback.ajax.php',data: strSubmit,
				success: function(){
					// posthank('callback');
				}
			}).fail(function(error){
					$('.modal-email').append(thankTxt);
					$('.modal-email').find('.modal-title, form').hide();
					startClock('quickemail-form');

				// alert(errorTxt)
			});
		}
	});	

});


var timer;
var sec = 4;

function showTime(form){
	sec = sec-1;
	if (sec <=0) {
		stopClock();
		if (form == 'quickemail-form'){ // форма быстрого сообщения
			$('.modal-email').fadeOut('normal', function(){
				$('.thank').remove();
				$('.modal-email').removeClass('show');
				$('.social .email').removeClass('active');
			})
		}
	}
}

function stopClock(){
	window.clearInterval(timer);
	timer = null;
	sec = 4;
}

function startClock(form){
	if (!timer)
	timer = window.setInterval("showTime('"+form+"')",1000);
}



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
