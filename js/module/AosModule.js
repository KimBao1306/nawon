export default function AosModule() {
	/** ANIMATION ON SCROLL */
	AOS.init({
		startEvent: 'load',
		offset: 0,
		duration: 600,
		delay: '200',
		easing: 'ease-in-sine',
		once: true,
		mirror: true,
		anchorPlacement: 'top-bottom',
		disable: function () {
			return $(window).width() <= 768;
		},
	});
	/** ANIMATION ON SCROLL - END */
}
