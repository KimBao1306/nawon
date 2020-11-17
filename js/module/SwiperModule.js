export default function SwiperModule() {
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
}
