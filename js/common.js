windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
windowHeight = window.innerHeight ? window.innerHeight : $(window).height();

if(desktop === false) {
	$('body').removeClass('desktop');
	$('body').addClass('device');
}

if(opera12 === true) {
	$('body').addClass('opera12');
}

if(isAndroid()) {
	$('body').addClass('android');
}

if(apple === true) {
	$('body').addClass('apple');
}

if(desktop === true) {
	$('body').addClass('desktop');
}

if(tablet === true && mobile === false) {
	$('body').addClass('tablet');
}

if(mobile === true) {
	$('body').addClass('mobile');
}

$(window).scroll(function() {
	scrolltop = $(window).scrollTop();
});

function resizeHandler() {
	windowWidth = (document.documentElement.clientWidth) ? document.documentElement.clientWidth: $(window).width();
	windowHeight = (document.documentElement.clientHeight) ? document.documentElement.clientHeight: $(window).height();
}

$(window).resize(function(){
	resizeHandler();
});

if(desktop === false) {
	window.addEventListener("orientationchange", function() {
		resizeHandler();
	});
}

WebFont.load({
	google: {families: ['Open Sans:300,400,600,700:cyrillic,cyrillic-ext']},
	classes: false,
	active: function() {
		setTimeout(function(){
			$stage1.isotope('layout');
			$stage2.isotope('layout');
			$stage3.isotope('layout');
		}, 500);
	}
});

var stickNav = function() {
	var layout  = $(LAYOUT),
		aside   = $(ASIDE),
		nav     = $(NAV),
		options = {
			offset_top: 60,
			parent: 'body',
			bottoming: false,
		};

	nav.stick_in_parent(options)
	.on("sticky_kit:stick", function(e) {
		console.log("has stick!", e.target);
	});
};


//merge

var $stage1;
var $tabs1;
var $stage2;
var $tabs2;
var $stage3;
var $tabs3;

var infoLayout = function() {

	$stage1 = $('.js-infoblock-1 .tab__content');
	$tabs1  = $('.js-tabs-1');
	$stage2 = $('.js-infoblock-2 .tab__content');
	$tabs2  = $('.js-tabs-2');
	$stage3 = $('.js-infoblock-3 .tab__content');
	$tabs3  = $('.js-tabs-3');

	$stage1.isotope({
		itemSelector: '.tab-item',
		transitionDuration: 0,
		stagger: 0,
		masonry: {
			gutter: 0
		}
	});

	$stage2.isotope({
		itemSelector: '.tab-item',
		transitionDuration: 0,
		stagger: 0,
		masonry: {
			gutter: 0
		}
	});

	$stage3.isotope({
		itemSelector: '.tab-item',
		transitionDuration: 0,
		stagger: 0,
		masonry: {
			gutter: 0
		}
	});

	$tabs1.on('click', 'a', function(event) {
		event.preventDefault();
		var el  = $(this),
			num = el.attr('href');

		el.parent().addClass('active').siblings().removeClass('active');
		$stage1.isotope({filter: num});
	});

	$tabs2.on('click', 'a', function(event) {
		event.preventDefault();
		var el  = $(this),
			num = el.attr('href');

		el.parent().addClass('active').siblings().removeClass('active');
		$stage2.isotope({filter: num});
	});

	$tabs3.on('click', 'a', function(event) {
		event.preventDefault();
		var el  = $(this),
			num = el.attr('href');

		el.parent().addClass('active').siblings().removeClass('active');
		$stage3.isotope({filter: num});
	});

	$tabs1.find('li').eq(0).find('a').click();
	$tabs2.find('li').eq(0).find('a').click();
	$tabs3.find('li').eq(0).find('a').click();

	$(window).on("debouncedresize", function( event ) {
		setTimeout(function(){
			$stage1.isotope('layout');
			$stage2.isotope('layout');
			$stage3.isotope('layout');
		}, 500);
	});
};



var layoutStick = function() {

	$("[data-sticky-column]:visible").stick_in_parent({
		parent: "[data-sticky-parent]",
		offset_top: 60,
		recalc_every: 100
	})
	.on('sticky_kit:detach', function(event) {

		console.log('column sticky detach');

	}).on('sticky_kit:recalc', function(event) {

		console.log('column sticky recalc');

	});

};

var layoutRecalc = function() {

	// console.log(windowWidth + ' layoutRecalc');

	if (windowWidth < 768) {

		$("[data-sticky-column]").trigger("sticky_kit:detach");

	} else {
		layoutStick();
	}

};

$(window).on("debouncedresize", function(event) {
	layoutRecalc();
});



if ($('.promo__slider').length > 0) {
	var $promo__slider = $('.promo__slider .owl-carousel');

	$promo__slider.owlCarousel({
		items: 1,
		nav: false,
		dots: true,
		autoHeight: true,
		lazyLoad: true,
		stageElement: 'ul',
		itemElement: 'li',
		onInitialized: function(event) {
			setTimeout(function(){
				layoutRecalc();
			},500);
			
		},
		onChanged: function(event) {
			setTimeout(function(){
				layoutRecalc();
			},500);
			
		},
		onLoadedLazy: function(event) {
			setTimeout(function(){
				layoutRecalc();
			},500);
		}
		
	});
}

var setOwlStageHeight = function(event) {

	var $files = $('.p-list--slider');

	if ($files.length) {
		$('.owl-item', $files).matchHeight({
			byRow: true, property: 'height', target: null, remove: false
		});
	}

	/*20170303*/
	// var maxHeight = 0;
	// $('.owl-item.active', $p_slider).each(function () {
	// 	var thisHeight = parseInt( $(this).height() );
	// 	maxHeight=(maxHeight>=thisHeight?maxHeight:thisHeight);
	// });
	// $('.owl-item.active .p-item', $p_slider).css('height', maxHeight );
	// $('.owl-carousel', $p_slider).css('height', maxHeight );
	// $('.owl-stage-outer', $p_slider).css('height', maxHeight );
	// console.log(maxHeight);
};

if ($('.p-list--slider').length > 0) {
	var $p_slider = $('.p-list--slider .owl-carousel');

	$p_slider.owlCarousel({
		items: 4,
		slideBy: 4,
		dots: true,
		lazyLoad: true,
		// autoHeight: true,
		onInitialized: setOwlStageHeight,
		onResized: setOwlStageHeight,
		onTranslated: setOwlStageHeight,
		stageElement: 'div',
		nav: true,
		navText: [
		'<svg class="owl-svg" enable-background="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M11.262,16.714l9.002,8.999  c0.395,0.394,1.035,0.394,1.431,0c0.395-0.394,0.395-1.034,0-1.428L13.407,16l8.287-8.285c0.395-0.394,0.395-1.034,0-1.429  c-0.395-0.394-1.036-0.394-1.431,0l-9.002,8.999C10.872,15.675,10.872,16.325,11.262,16.714z" fill="#000" fill-rule="evenodd"/></svg>',
		'<svg class="owl-svg" enable-background="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M21.698,15.286l-9.002-8.999  c-0.395-0.394-1.035-0.394-1.431,0c-0.395,0.394-0.395,1.034,0,1.428L19.553,16l-8.287,8.285c-0.395,0.394-0.395,1.034,0,1.429  c0.395,0.394,1.036,0.394,1.431,0l9.002-8.999C22.088,16.325,22.088,15.675,21.698,15.286z" fill="#000" fill-rule="evenodd"/></svg>'
		],
		responsive: {
			0: {
				items: 1,
				slideBy: 1
			},
			480: {
				items: 2,
				slideBy: 2
			},
			767: {
				items: 3,
				slideBy: 3
			},
			991: {
				items: 2,
				slideBy: 2
			},
			1100: {
				items: 3,
				slideBy: 3
			}
		}
	});
	
}



if ($.fn.mmenu) {
	var $html = $('html');
	var API = $('.js-nav')
		.mmenu({
			extensions: ['multiline','widescreen', 'effect-menu-slide'],
			navbar: {
				title: 'Все разделы'
			},
			onClick: {
				setSelected: false
			}
		})
		.data('mmenu');

	var $menuToggle = $('.js-menu-toggle')
		.on('click',
			function(e) {
				e.preventDefault();
				if ($html.hasClass('mm-opened')) {
					API.close();
				} else {
					API.open();
				}
			}
		);

	API.bind('closed', function() {
		setTimeout(function() {
			$menuToggle.removeClass('is-active');
		}, 100);
	});

	API.bind('opened', function() {
		setTimeout(function() {
			$menuToggle.addClass('is-active');
		}, 100);
	});
}



var $stats_scroll = {};

var statsScrollCustom =  function() {

	$('.js-stats-list').on('click', '.js-stats-item a', function(event) {
		event.preventDefault();
		var el = $(this).parent();

		if (el.next().is(':visible')) {
			el.addClass('stats-item--closed');
			el.removeClass('stats-item--opened');
		} else {
			el.addClass('stats-item--opened');
			el.removeClass('stats-item--closed');
		}

		el.next().slideToggle(100, function(){
			layoutRecalc();
			if (desktop === true) {
				$stats_scroll.reload();
				scrollVisibility();
			}
		});
	});


	if (desktop === true) {
		var $scrollbar = $('.js-stats-list').parent().find('.scrollbar');
		var options = {
			scrollBy: 100,
			speed: 200,
			easing: 'easeOutQuart',
			scrollBar: $scrollbar,
			dynamicHandle: 1,
			dragHandle: 1,
			clickBar: 1,
			touchDragging: 1,
			releaseSwing: 1,
			scrollTrap: false
		};

		$stats_scroll = new Sly($('.js-stats-list'), options);

		$stats_scroll.init();
		$stats_scroll.reload();

		var sContent = 0;
		var sWrap    = 0;

		var scrollVisibility = function() {

			//console.log('scrollVisibility');

			sContent = $scrollbar.height();
			sWrap    = $('.handle').height();

			if (sWrap < sContent) {
				$('.handle').removeClass('handle-is-hidden');
				//console.log('handle visible');
			} else {
				$('.handle').addClass('handle-is-hidden');
				//console.log('handle hidden');
			}

		};

		scrollVisibility();

		$(window).on('debouncedresize', function(event) {
			$stats_scroll.reload();
			scrollVisibility();

			if (windowWidth < 768) {
				if ($stats_scroll.initialized === 1) {
					// console.log('$stats_scroll destroy');
					$stats_scroll.destroy(false);
				}
			} else {
				if ($stats_scroll.initialized === 0) {
					// console.log('$stats_scroll reinit here');
					$stats_scroll.init();
				}
			}
		});

		$stats_scroll.on('moveStart', function(event) {
			$scrollbar.addClass('scrolling');
		});

		$stats_scroll.on('moveEnd', function(event) {
			$scrollbar.removeClass('scrolling');
		});
	}
};

var toggleGain = function() {

	if ($('#gaincss').length > 0) {
		$('#gaincss').remove();
		Cookies.set('gain', "false");
	} else {
		$("<link/>", {
			rel: "stylesheet",
			type: "text/css",
			href: "css/contrast.css",
			id: "gaincss"
		}).appendTo("body");
		Cookies.set('gain', "true");
	}
};

$('.js-topnav-gain').on('click', function(event) {
	event.preventDefault();
	toggleGain();
});

var checkGainCookie = function() {
	if (Cookies.get('gain') === "true") {
		toggleGain();
	}
}();




$('.js-digest').on('click', '.js-digest-toggle', function(event) {
	event.preventDefault();
	var el = $(this).parent();

	if (el.next().is(':visible')) {
		console.log('visible');
		el.removeClass('digest--opened');
	} else {
		el.addClass('digest--opened');
	}

	el.next().slideToggle(300);
});


$('.js-digest').on('click', '.js-digest-expand', function(event) {
	event.preventDefault();
	var el = $(this);

	if (el.prev().is(':visible')) {
		console.log('visible');
		el.removeClass('digest--opened');
	} else {
		el.addClass('digest--opened');
	}

	el.prev().slideToggle(300);
	el.slideToggle(300);
});



var blockList = function() {

	var el = $('.js-block-list'),
		toggle = $('.block-title a', el);

	el.find('.active').next().show(0);

	toggle.on('click', function(event) {
		event.preventDefault();

		var el = $(this),
			parent = el.parent();

		parent.toggleClass('active');
		parent.next().slideToggle(300);
	});
}



$(document).ready(function() {

	// stickNav();
	
	//SmoothScroll({ stepSize: 100 });

	infoLayout();

	if (!Modernizr.objectfit) {
		objectFitImages();
	}

	if ($('.js-stats-list').length > 0) {
		statsScrollCustom();
	}

	layoutStick();

	layoutRecalc();

	if ($('.js-block-list').length > 0) {
		blockList();
	}

	if ($('.input').length > 0) {
		inputEffect();
	}
});





if ($('form').length > 0) {

	Parsley.addMessages('ru', {
		defaultMessage: "Некорректное значение.",
		type: {
			email:        "Введите адрес электронной почты.",
			url:          "Введите URL адрес.",
			number:       "Введите число.",
			integer:      "Введите целое число.",
			digits:       "Введите только цифры.",
			alphanum:     "Введите буквенно-цифровое значение."
		},
		notblank:       "Заполните поле.",
		required:       "Обязательное поле.",
		pattern:        "Это значение некорректно.",
		min:            "Это значение должно быть не менее чем %s.",
		max:            "Это значение должно быть не более чем %s.",
		range:          "Это значение должно быть от %s до %s.",
		minlength:      "Это значение должно содержать не менее %s символов.",
		maxlength:      "Это значение должно содержать не более %s символов.",
		length:         "Это значение должно содержать от %s до %s символов.",
		mincheck:       "Выберите не менее %s значений.",
		maxcheck:       "Выберите не более %s значений.",
		check:          "Выберите от %s до %s значений.",
		equalto:        "Это значение должно совпадать.",
		dateiso:  "Это значение должно быть корректной датой (ГГГГ-ММ-ДД).",
		minwords: "Это значение должно содержать не менее %s слов.",
		maxwords: "Это значение должно содержать не более %s слов.",
		words:    "Это значение должно содержать от %s до %s слов.",
		gt:       "Это значение должно быть больше.",
		gte:      "Это значение должно быть больше или равно.",
		lt:       "Это значение должно быть меньше.",
		lte:      "Это значение должно быть меньше или равно.",
		notequalto: "Это значение должно отличаться."
	});

	Parsley.setLocale('ru');



	var Regform = {

		userCheck: function(el) {

			//var result = Math.random() > 0.5 ? true : false;

			return true;
		}

	};


	$('form').parsley({
		trigger: 'keypress',
		errorClass: 'input__error',
		successClass: 'input__success',
		errorsWrapper: '<span class="input__note note__error color--red"></span>',
		errorTemplate: '<span></span>'
	});

	if ($('.form-section').length > 0) {
		$(function () {
			var $sections = $('.form-section');

			function navigateTo(index) {
				$sections.removeClass('current').slideUp('300');
				$sections.eq(index).addClass('current').slideDown('300');

				$('.form-navigation .js-reg-prev').toggle(index > 0);

				var atTheEnd = index >= $sections.length - 1;

				$('.form-navigation .js-reg-next').toggle(!atTheEnd);

				$('.form-navigation .js-reg-submit').toggle(atTheEnd);

				$('.js-reg-steps').find('.step').removeClass('step--current').eq(index).addClass('step--current');
			}

			function curIndex() {
				return $sections.index($sections.filter('.current'));
			}

			$('.form-navigation .js-reg-prev').on('click', function(event) {
				event.preventDefault();
				navigateTo(curIndex() - 1);
			});

			$('.form-navigation .js-reg-next').on('click', function(event) {
				event.preventDefault();
				if ($('.js-reg-form').parsley().validate({group: 'block-' + curIndex()}))
					navigateTo(curIndex() + 1);
			});

			$.each($sections, function(index, section) {
				$(section).find(':input').attr('data-parsley-group', 'block-' + index);
			});

			navigateTo(0);

			$('.form-navigation').show();

			Parsley.addValidator('usernameFree', {
				requirementType: 'boolean',
				validateString: function() {
					return Regform.userCheck();
				},
				messages: {
					ru: 'Логин занят'
				}
			});
		});
	}

	if ($('.input-date').length > 0) {
		var cleave = new Cleave('.input-date', {
			delimiter: '.',
			date: true,
			datePattern: ['d', 'm', 'Y']
		});
	}

	if ($('.select').length) {
		$('.select select').selectize({
			allowEmptyOption: true,
			onInitialize: function() {

				var check = $(this)[0].$input[0].firstChild.value;

				if (check !== '') {
					$(this)[0].$wrapper.addClass('has-content');
				}
			},
			onChange: function() {
				$(this)[0].$wrapper.addClass('has-content');
			}
		});
	}
}



var inputEffect = function() {
	$.each($(".input input, .input textarea"), function(index, val) {
		if($(this).val().length !== 0){
			$(this).addClass("has-content");
		}
	});

	$(".input input, .input textarea").off('focusout');

	$(".input input, .input textarea").on('focusout', function(){
		if($(this).val().length !== 0){
			$(this).addClass("has-content");
		}else{
			$(this).removeClass("has-content");
		}
	});
};

$(document).ready(function() {
	"use strict";

	function rollSides($altSide, $container) {
		$container.on("mousemove vmousemove touchmove", function (e) {

			var wrapperLeftPos = $container.offset().left,
				wrapperWidth = $container.outerWidth(),
				maxRightPos = wrapperLeftPos + wrapperWidth,
				leftValue = (e.pageX || e.originalEvent.touches[0].pageX);

			$altSide.addClass("resizable");

			leftValue < wrapperLeftPos ? leftValue = wrapperLeftPos : leftValue > maxRightPos && (leftValue = maxRightPos);

			var widthValue = 100 * (leftValue - wrapperLeftPos) / wrapperWidth + "%";

			$(".resizable").css("width", widthValue);

		}).on("mouseleave vmouseup touchend", function () {
			$altSide.removeClass("resizable");
		});

		$(window).on('load debouncedresize', function () {
			$altSide.children('div').css('width', $altSide.parent().outerWidth());
		})
	}

	var $jsContainer = $(".js-roll")
	if ($jsContainer) {
		$jsContainer.each(function () {
			var $thisBox=$(this),
				$segment=$thisBox.find(".js-roll-side");
			rollSides($segment, $thisBox)
		})
	}

	/*css object fit fixed for ie 9*/
	function objectfitContainFixed($img) {
		var imgUrl = $img.prop('src');
		if (imgUrl) {
			$img.parent()
				.css('backgroundImage', 'url(' + imgUrl + ')')
				.addClass('fit-contain');
		}
	}

	if ( !Modernizr.objectfit ) {
		var $subjectPreviewImg = $('.subject-preview__img img');
		if ($subjectPreviewImg.length) {
			$subjectPreviewImg.each(function () {
				var $thisImg = $(this);
				objectfitContainFixed($thisImg);
			});
		}

		var $coinMemorySliderImg = $('.coin-memory__slider img');
		if ($coinMemorySliderImg.length) {
			$coinMemorySliderImg.each(function () {
				var $thisImg = $(this);
				objectfitContainFixed($thisImg);
			});
		}
	}
	/*css object fit fixed for ie 9 end*/

	/*subjects slider*/
	var $subjectSlider = $('.subject-slider-js');
	if ($subjectSlider.length > 0) {

		$subjectSlider.each(function (){
			var $currentSlider = $(this);

			$currentSlider.owlCarousel({
				items: 1,
				slideBy: 1,
				dots: false,
				lazyLoad: false,
				loop: 1,
				// onInitialized: functionName,
				// onResized: functionName,
				// onTranslated: functionName,
				stageElement: 'div',
				navContainer: $currentSlider,
				navText: ['<span>Предыдущий слайд</span><i></i>', '<span>Следующий слайд</span><i></i>'],
				nav: true
				// navText: [
				// 	'<svg class="owl-svg" enable-background="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M11.262,16.714l9.002,8.999  c0.395,0.394,1.035,0.394,1.431,0c0.395-0.394,0.395-1.034,0-1.428L13.407,16l8.287-8.285c0.395-0.394,0.395-1.034,0-1.429  c-0.395-0.394-1.036-0.394-1.431,0l-9.002,8.999C10.872,15.675,10.872,16.325,11.262,16.714z" fill="#000" fill-rule="evenodd"/></svg>',
				// 	'<svg class="owl-svg" enable-background="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M21.698,15.286l-9.002-8.999  c-0.395-0.394-1.035-0.394-1.431,0c-0.395,0.394-0.395,1.034,0,1.428L19.553,16l-8.287,8.285c-0.395,0.394-0.395,1.034,0,1.429  c0.395,0.394,1.036,0.394,1.431,0l9.002-8.999C22.088,16.325,22.088,15.675,21.698,15.286z" fill="#000" fill-rule="evenodd"/></svg>'
				// ],
				// responsive: {
				// 	0: {
				// 		items: 1,
				// 		slideBy: 1
				// 	}
				// }
			});
		})

	}

	var coinsSize = [
		{
			'1k': 15.00,
			'2k': 17.50,
			'5k': 19.80,
			'10k': 17.70,
			'20k': 20.35,
			'50k': 22.25,
			'1r': 21.50,
			'2r': 23.50
		}
		// ,{
		// 	'ipbm-middle': 45.00,
		// 	'ipbm-small': 23.50,
		// 	'ipbm-large': 53.00,
		// 	'ipbm-largest': 135.00
		// }
	];

	function proportionCoin() {

		var maxSizeCoin = 0;

		for(var i = 0; i < coinsSize.length; i++) {

			var coinsSizeItem = coinsSize[i];

			for (var denomination in coinsSizeItem) {
				var coinsSizeCurrent = coinsSizeItem[denomination];
				if (maxSizeCoin < coinsSizeCurrent) {
					maxSizeCoin = coinsSizeCurrent;
				}
			}

			for (var coin in coinsSizeItem) {
				var scaleSize = Math.round(coinsSizeItem[coin]/maxSizeCoin*1000)/1000;

				$('[data-coin = ' + coin + ']').css({
					'-webkit-transform' : 'scale(' + scaleSize + ')',
					'-ms-transform'     : 'scale(' + scaleSize + ')',
					'transform'         : 'scale(' + scaleSize + ')'
				});

				console.log("scaleSize: ", scaleSize);
				console.log("coinSize[denomination]: ", coin + ': ' + coinsSize[coin]);
			}

			// Math.round(x)
		}

	}

	proportionCoin();

	/*simple accordion*/
	function simpleAccordion($hand, $panel, animateSpeed) {
		if ($panel.hasClass('is-open')) {
			$panel.toggle().prev().addClass('active');
		}

		$hand.on('click', function (e) {
			e.preventDefault();

			$(this).toggleClass('active');
			$panel.stop().slideToggle(animateSpeed);
		})
	}

	var $simpleAccordionHand = $('.simple-accordion-head-js');
	if ($simpleAccordionHand.length) {
		$simpleAccordionHand.each(function () {
			var $thisHand = $(this);

			simpleAccordion($thisHand, $thisHand.next(), 200);
		})
	}

});