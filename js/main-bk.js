jQuery(document).ready(function ($) {
	if ($('.header').length) {
		/** MENU FIXED WHEN SCROLL */
		const header = $('.header');
		const headerHeight = header.outerHeight();
		const headerOffsetTop = header.offset().top;
		if (scrollY >= headerOffsetTop + headerHeight) {
			header.addClass('--fixed');
			header.next().css('margin-top', headerHeight);
		} else {
			header.removeClass('--fixed');
			header.next().css('margin-top', 0);
		}
		$(window).on('scroll', function () {
			if (scrollY >= headerOffsetTop + headerHeight) {
				header.addClass('--fixed');
				header.next().css('margin-top', headerHeight);
			} else {
				header.removeClass('--fixed');
				header.next().css('margin-top', 0);
			}
		});
		/** MENU FIXED WHEN SCROLL - END */
		/** MENU IN MOBILE */
		$('.header__list  .dropdown').each(function () {
			const dropdown = $(this);
			const arrows = $('<i></i>');
			arrows.addClass('fa fa-angle-down');

			dropdown.find('a').eq(0).append(arrows);
			const subMenu = dropdown.children('.sub-menu');

			arrows.on('click', function (e) {
				e.preventDefault();
				dropdown.toggleClass('--show');
				$(this).parent().next('ul').stop().slideToggle();
				$(this).toggleClass('--active');
			});
		});
		/** MENU IN MOBILE - END */
	}

	/** MENU BUTTON */
	if (
		$('.header .hamburger-btn').length &&
		$('.header__list-wrap').length &&
		$('.overlay').length
	) {
		$('.header .hamburger-btn').on('click', function () {
			$(this).toggleClass('--active');
			$('.header__list-wrap').toggleClass('--active');
			// $('body').css('overflow', 'hidden');
		});

		$('.overlay').on('click', function () {
			$('.hamburger-btn').removeClass('--active');
			$('.header__list-wrap').removeClass('--active');
			// $('body').css('overflow', '');
		});
	}
	/** MENU BUTTON - END*/

	/** MENU BUTTON BANNER */
	if (
		$('.banner__menu .hamburger-btn').length &&
		$('.banner__menu-wrap').length &&
		$('.overlay').length
	) {
		$('.banner__menu .hamburger-btn').on('click', function () {
			$(this).toggleClass('--active');
			$('.banner__menu-wrap').toggleClass('--active');
			// $('body').css('overflow', 'hidden');
		});

		$('.overlay').on('click', function () {
			$('.banner__menu .hamburger-btn').removeClass('--active');
			$('.banner__menu-wrap').removeClass('--active');
			// $('body').css('overflow', '');
		});
	}
	/** MENU BUTTON BANNER - END*/

	/** ANIMATION HEADER */
	function animationHeader() {
		const $ul = $('.header__list');
		const $arrAnchor = $ul.find('> li');
		const $currentAnchor = $ul.find('> li.current-menu-item');
		let dot = $('<span></span>'),
			w,
			l;

		$(dot).addClass('dot');
		$ul.append(dot);

		runDot($currentAnchor);

		$arrAnchor.each(function () {
			$(this).on('mouseenter', function () {
				runDot(this);
			});
			$(this).on('mouseleave', function () {
				runDot($currentAnchor);
			});
		});

		function runDot(e) {
			const {w, l} = findPosition(e);
			moving(w, l);
		}

		function findPosition(e) {
			w = $(e).outerWidth();
			l = $(e).position().left;
			return {w, l};
		}

		function moving(width, left) {
			$(dot).css('left', `${left + width / 2}px`);
			$(dot).css('opacity', 1);
		}
	}
	$('.header__list').length && animationHeader();
	/** ANIMATION HEADER - END*/

	/** SCROLL TO TOP */
	if ($('.scroll-top').length) {
		$('.scroll-top').on('click', function (e) {
			e.preventDefault();
			$('html, body').animate(
				{
					// scrollTop: $("#to").offset().top //scroll đến vị trí #to
					scrollTop: 0,
				},
				500
			);
			return false;
		});

		$(window).on('scroll', function () {
			if ($(this).scrollTop() >= 10) {
				$('.scroll-top').addClass('--show');
			} else {
				$('.scroll-top').removeClass('--show');
			}
		});
	}
	/** SCROLL TO TOP - END*/
	/** TAB */
	$(window).on('click', (e) => {
		if (e.target.closest('.tab-link')) {
			const tabLink = e.target.closest('.tab-link');
			$(tabLink).addClass('--active').siblings().removeClass('--active');
			const tabContent = $(tabLink.getAttribute('data-tabs'));
			$(tabContent).addClass('--active').siblings().removeClass('--active');
		}
	});
	/** TAB - END */
	/** COUNTER */
	if ($('.counter').length) {
		const counters = $('.counter .num');
		counters.each(function (_, e) {
			const endVl = +e.dataset.num;
			const delay = 1000;
			const numAnim = new countUp.CountUp(e, endVl, {
				separator: '.',
				duration: 2,
			});
			$(e).waypoint({
				handler: function (direction) {
					numAnim.start();
				},
				offset: '90%',
			});
		});
	}
	/** COUNTER - END */
	/** LIGHTGALLERY */
	if ($('.is-lightgallery').length) {
		const $lg = $('.is-lightgallery');
		$('.is-lightgallery .cf__img').on('click', function () {
			$lg.lightGallery({
				thumbnail: true,
			});
		});
		$lg.on('onBeforeClose.lg', function () {
			$lg.data('lightGallery').destroy(true);
		});
	}
	/** LIGHTGALLERY - END*/
	/** MAGNIFICPOPUP */
	if ($('.open-popup-btn').length) {
		$('.open-popup-btn').magnificPopup({
			type: 'inline',
			preloader: false,
			modal: true,
			midClick: true,
			removalDelay: 500,
			callbacks: {
				beforeOpen: function () {
					this.st.mainClass = 'mfp-zoom-in';
				},
			},
		});
	}
	if ($('.video-btn').length) {
		$('.video-btn').parent().magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-zoom-in',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false,
		});
	}
	/** MAGNIFICPOPUP - END*/
	/** SWIPER */
	function swiper(el, callback = null) {
		const $this = $(el);
		const $swiper = $this.find('.swiper-container');
		const nextBtn = $this.find('.swiper-button-next');
		const prevBtn = $this.find('.swiper-button-prev');
		const pagination = $this.find('.swiper-pagination');
		const isLoop = $this.hasClass('--loop') || false;
		const isParallax = $this.hasClass('--parallax') || false;
		const isAuto =
			($this.hasClass('--auto') && {
				speed: 6000,
				delay: 5000,
				disableOnInteraction: false,
			}) ||
			false;

		const swiper_common = new Swiper($swiper, {
			speed: 1200,
			// autoHeight: false,
			autoplay: isAuto,
			slidesPerView: 'auto',
			watchSlidesProgress: true,

			pagination: {
				el: pagination,
				clickable: true,
			},
			navigation: {
				nextEl: nextBtn,
				prevEl: prevBtn,
			},
			parallax: isParallax,
			loop: isLoop,
			on: {
				slideChange: function () {
					callback && callback.call(this);
				},
			},
		});
	}
	const animationSlide = (parent, child) => {
		return function () {
			const i = this.activeIndex;
			const $content = $(`${parent} .swiper-wrapper`);
			$content.find(`${child}`).removeClass('--active');
			setTimeout(function () {
				$content.find(`${child}`).eq(i).addClass('--active');
			}, 1000);
		};
	};
	// ABOUT
	function aboutSlider() {
		const i = this.activeIndex;
		Array.from(this.slides).forEach((s) => (s.style.filter = 'blur(5px)'));
		this.slides[i].style.filter = 'blur(0)';
	}
	$('.about-who__slider .is-slider').length &&
		swiper('.about-who__slider .is-slider', aboutSlider);
	// BANNER HOME
	$('.banner-home .is-slider').length &&
		swiper('.banner-home .is-slider', animationSlide('.banner-home', '.wrap'));
	// HOME PROCESS
	$('.home-slider .is-slider').length &&
		swiper(
			'.home-slider .is-slider',
			animationSlide('.home-slider', '.home-slider__item')
		);

	// PORTFOLIO DETAIL
	$('.pf-banner .is-slider').length &&
		swiper(
			'.pf-banner .is-slider',
			animationSlide('.pf-banner', '.pf-banner__item')
		);

	// MENU BANNER
	$('.banner__menu').length && swiper($('.banner__menu .is-slider'));
	// HOME PRODUCT IN MOBILE
	let homeProductSwiper = [];
	function homeProduct() {
		var screenWidth = $(window).width();
		if (screenWidth > 768 && homeProductSwiper.length !== 0) {
			homeProductSwiper.map((s) => s.destroy());
			homeProductSwiper = [];
			$('.swiper-wrapper').removeAttr('style');
			$('.swiper-slide').removeAttr('style');
		} else if (screenWidth <= 768 && homeProductSwiper.length === 0) {
			$('.home-pd .is-slider').each(function () {
				const $this = $(this);
				const $swiper = $this.find('.swiper-container');
				const nextBtn = $this.find('.swiper-button-next');
				const prevBtn = $this.find('.swiper-button-prev');
				const pagination = $this.find('.swiper-pagination');
				const isLoop = $this.hasClass('--loop') || false;
				const isParallax = $this.hasClass('--parallax') || false;
				const isAuto =
					($this.hasClass('--auto') && {
						speed: 6000,
						delay: 5000,
						disableOnInteraction: false,
					}) ||
					false;
				const tempSwiper = new Swiper($swiper, {
					speed: 1200,
					// autoHeight: false,
					autoplay: isAuto,
					slidesPerView: 'auto',
					watchSlidesProgress: true,
					// TRIGGER SWIPER RUN ASYNCHRONOUS
					observer: true,
					observeParents: true,
					observeSlideChildren: true,
					pagination: {
						el: pagination,
						clickable: true,
					},
					navigation: {
						nextEl: nextBtn,
						prevEl: prevBtn,
					},
					parallax: isParallax,
					loop: isLoop,
				});
				homeProductSwiper.push(tempSwiper);
			});
		}
	}
	$('.home-pd .is-slider').length && homeProduct();
	$(window).on('resize', function () {
		$('.home-pd .is-slider').length && homeProduct();
	});
	/** SWIPER - END*/
	/** CATEGORY SEE MORE BUTTON  */
	if ($('.tabs__see-more').length) {
		$('.tabs__see-more').on('click', function () {
			$(this).prev().toggleClass('--show');
		});
	}
	/** CATEGORY SEE MORE BUTTON -  END */
});
