export default function CounterModule() {
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
}
