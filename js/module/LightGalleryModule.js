export default function LightGalleryModule() {
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
}
