export default function HeaderModule() {
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
}
