export default function TabModule() {
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
	/** CATEGORY SEE MORE BUTTON  */
	if ($('.tabs__see-more').length) {
		$('.tabs__see-more').on('click', function () {
			$(this).prev().toggleClass('--show');
		});
	}
	/** CATEGORY SEE MORE BUTTON -  END */
}
