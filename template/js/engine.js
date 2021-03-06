$(document).ready(function(){

	$('#lightgallery').lightGallery(); 


	hs.graphicsDir = '/template/images/graphics/';
	hs.align = 'center';
	hs.transitions = ['expand', 'crossfade'];
	hs.outlineType = 'rounded-white';
	hs.fadeInOut = true;
	hs.creditsText = '';
	hs.loadingText = 'Загрузка';
	hs.restoreTitle = '';

	$('.lightbox').click(function(e){
		e.preventDefault();
		hs.align = "auto";
		hs.expand(this);
	});


	$('#fullpage').fullpage({
		responsiveWidth : 1024,
		responsiveHeight: 900,
		autoScrolling : true,
		fitToSection : false,
		scrollBar : true,
		normalScrollElements: '#section7',
		bigSectionsDestination : 'bottom',

		onLeave: function(index, newIndex, direction){
			if (newIndex == 3){
				$('.services ul li').addClass('fadeIn animated');
				$('.services .line > div').addClass('animated');
			}

			if (newIndex == 4){
				$('#section4').addClass('showbg')
			}

			if (newIndex == 5){
				$('#section5').addClass('showbg')
			}
		}
	});

	// плавная промотка из хедера
	$('nav a[href*="#"]:not([href="#"]), .intro a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('body').removeClass('o-menu');
				$('#navbar').css('height', 'auto');
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000, function() {
		        	target.focus();
		        });
				return false;
			}
		}
	});


	$(window).resize(function(){
		if ($('body').width() > 630) {
			$('body').removeClass('o-menu');
			$('#navbar').css('height', 'auto');
		}
	});


	// parallax
	$('body').parallax({
		'elements': [
			{
				// bushes
				'selector': 'div.bg4',
				'properties': {
					'x': {
						'background-position-x': {
						'initial': -95,
						'multiplier': 0.0018,
						'invert': true,
						'unit': '%'
						}
					},
					'y': {
						'background-position-y': {
							'initial': 150,
							'multiplier': 0.001,
							'invert': false,
							'unit': '%'
							}
						}
				}
			},	
			{
				// house
				'selector': 'div.bg3',
				'properties': {
					'x': {
						'background-position-x': {
						'initial': -95,
						'multiplier': 0.002,
						'invert': true,
						'unit': '%'
						}
					},
					'y': {
						'background-position-y': {
							'initial': 140,
							'multiplier': 0.00,
							'invert': false,
							'unit': '%'
							}
						}
				}
			},
			{
				// forest
				'selector': 'div.bg2',
				'properties': {
					'x': {
						'background-position-x': {
						'initial': -120,
						'multiplier': 0.01,
						'invert': true,
						'unit': '%'
						}
					},
					'y': {
						'background-position-y': {
							'initial': 80,
							'multiplier': 0.001,
							'invert': false,
							'unit': '%'
							}
						}
				}
			},		
			{
				// cloud
				'selector': 'div.bg1',
				'properties': {
					'x': {
						'background-position-x': {
						'initial': -40,
						'multiplier': 0.018,
						'invert': true,
						'unit': '%'
						}
					},
					'y': {
						'background-position-y': {
							'initial': 45,
							'multiplier': 0.01,
							'invert': false,
							'unit': '%'
							}
						}
				}
			}
		]
	});



	// scroll Page
	var panel = $('.header'),
		pos = panel.offset();

	$(window).scroll(function(){
		$this = $(this);

		if ($(this).scrollTop() > 200){
			$("#up").fadeIn();
		} else{
			$("#up").fadeOut();
		}


		h = $('.header').height() + 9;
		if($this.scrollTop() > h && panel.hasClass('default')) {
			panel.removeClass('default').addClass('fixed');
			$("body").addClass('bodyFixed');
		}
		else {
			if ($this.scrollTop() < h){
				if($this.scrollTop() <= pos.top && panel.hasClass('fixed')) {
					panel.removeClass('fixed').addClass('default');
					$("body").removeClass('bodyFixed');
				}
			}
		}
	});


	$('#up').click(function (e){
		e.preventDefault();
		$("body,html").animate({
			scrollTop:0
		}, 800);
		return false;
	});

	$('.callme').click(function(e){
		e.preventDefault();
		$(this).toggleClass('expand');
	})


	$('.modal-email').each(function(){
		var $this = $(this),
			$link = $('.social a.email'),
			$close = $this.find('.close'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				$('.modal-email').toggle();
				$link.toggleClass('active');
				$('.modal-email').find('.modal-title, form').show();
			},
			closeMenu = function(e){
				e.preventDefault();
				$('.modal-email').hide();
				$link.removeClass('active');
			};
		init();
	});



	// mobile-menu
	$('#navbar').each(function(){
		var $this = $(this),
			$link = $('.navbar-toggle'),
			$close = $('.header .close-menu'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				h = $(document).height();
				$('body').addClass('o-menu');
				$('#navbar').height(h);

			},
			closeMenu = function(e){
				e.preventDefault();
				$('body').removeClass('o-menu');
			};
		init();
	});	


	$('#navbar').hammer().on('panleft', function(){
		$('body').removeClass('o-menu');
	});


	// validation quick form
	$('#quickemail-form .submit').click(function(){
		$('#quickemail-form').submit();
		return false;
	});

	errorTxt = 'Ошибка отправки';
	thankTxt = '<div class="thank">Ваше сообщение успешно отправлено</div>';
	$('#quickemail-form').validate({
		submitHandler: function(form){
			strSubmit=$(form).serialize();
			$.ajax({type: 'POST',url: $('#quickemail-form').attr('action') ,data: strSubmit,
				success: function(){
					$('.modal-email').append(thankTxt);
					$('.modal-email').find('.modal-title, form').hide();
					startClock('quickemail-form');
				}
			}).fail(function(error){
				alert(errorTxt)
			});
		}
	});	



	// validation form in page Contact
	$('#feedback-form .submit').click(function(){
		$('#feedback-form').submit();
		return false;
	});

	$('#feedback-form').validate({
		submitHandler: function(form){
			strSubmit=$(form).serialize();
			$.ajax({type: 'POST',url: $('#feedback-form').attr('action'),data: strSubmit,
				success: function(){
					$('.feedback').append('<div class="thank"><b>Ваше сообщение успешно отправлено</b></div>');
					startClock('feedback-form');
				}
			}).fail(function(error){
				alert(errorTxt)
			});
		}
	});	
});


// google map
var map;
function initMap() {
var myLatlng = new google.maps.LatLng(48.4628101,35.0586645);
var mapOptions = {
	zoom: 18,
	center: myLatlng,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	scrollwheel : false
};
var styles = [{
	stylers: [
		{saturation: 0}
		]
	}];
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	map.setOptions({styles: styles});

	var image = '/template/images/balloon.png';
	var primna = new google.maps.Marker({
		position: {lat: 48.4628101, lng: 35.0586645},
		map: map,
		icon: image
	});
}


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
				$('#quickemail-form .form-control').val('');
			})
		}

		if (form == 'feedback-form'){ 
			$('.thank').fadeOut('normal', function(){
				$('#feedback-form .form-control').val('');
				$('.thank').remove();
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
