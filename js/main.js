import HeaderModule from './module/HeaderModule.js';
import AosModule from './module/AosModule.js';
import CounterModule from './module/CounterModule.js';
import LightGalleryModule from './module/LightGalleryModule.js';
import MfpModule from './module/MfpModule.js';
import SwiperModule from './module/SwiperModule.js';
import TabModule from './module/TabModule.js';

jQuery(document).ready(function ($) {
	AosModule();
	HeaderModule();
	CounterModule();
	LightGalleryModule();
	MfpModule();
	SwiperModule();
	TabModule();
});
