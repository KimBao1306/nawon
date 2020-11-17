export default function MfpModule() {
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
}
