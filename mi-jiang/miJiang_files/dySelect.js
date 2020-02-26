function selectSwiper(obj) {
    var _self = this;
    _self.el = $(obj.el); // 根元素
    _self.selectSwiper = null; // swiper对象
    _self.swiperData = {}; // swiper数据对象
    _self.swiperData.mustSelect = obj.mustSelect || false; // 是否必选
    _self.swiperData.activeIndex = (typeof obj.activeIndex === 'number' && obj.activeIndex >= -1) ? obj.activeIndex : -1;// 激活索引
    _self.swiperData.oldIndex = _self.swiperData.activeIndex; // 旧索引，取消返回上一次索引
    _self.swiperData.data = obj.data || []; // swiper数据

    _self.swiperData.okFun = obj.okFun; // OK按钮执行函数
    // _self.swiperData.okFunUndefind = obj.okFunUndefind || function () {
    // }; // 选择说明项-'请选择'
    _self.swiperData.closeFun = obj.closeFun || function () {
    }; // 取消按钮执行函数
    _self.swiperData.init = obj.init; // 初始化
    var hgSelect = `
        <div class="swiper-select-box">
            <span class="swiper-select-close">取消</span>
            <span class="swiper-select-ok">确定</span>
            <div class="selectData">
                <div class="swiper-container">
                    <div class="swiper-select-cloth"></div>
                    <div class="swiper-wrapper">
                    </div>
                </div>
            </div>
        </div>
    `;
    _self.init = function () { // 初始化
        _self.el.html(hgSelect);
        _self.el.addClass('click_no'); // 取消移动端点击阴影
        _self.selectSwiper = new Swiper(obj.el + ' .swiper-container', {
            direction: 'vertical',
            slidesPerView: 5,//可视区域数目
            centeredSlides: true,//激活项居中
            slideToClickedSlide: true,//点击切换
            onInit: function (swiper) {
                swiper.removeSlide(0);
                var data = _self.swiperData.data;
                var s = [];
                // s[0] = '<div class="swiper-slide">请选择</div>';
                for (i = 0; i < data.length; i++) {
                    s[i] = '<div class="swiper-slide">' + data[i] + '</div>';
                }
                swiper.appendSlide(s);
                _self.swiperData.init(_self.swiperData.activeIndex);

            },
            onSlideChangeEnd: function (swiper) {
                _self.swiperData.activeIndex = swiper.activeIndex;
            },
        });
        _self.el.find('.swiper-select-ok').on('click', _self.okSelectSwiper);
        _self.el.find('.swiper-select-close').on('click', function () {
            _self.swiperData.activeIndex = _self.swiperData.oldIndex;
            _self.swiperData.closeFun();
            _self.closeSelectSwiper();
        });
        _self.el.on('click', function () {
            _self.el.find('.swiper-select-close').trigger('click');
        });
        $('.swiper-select-box').on('click', function (e) {//阻止选择区域关闭select
            e.stopPropagation();
        });
    };
    _self.openSelectSwiper = function () {
        var _self = this;
        _self.el.addClass('swiper-select-yes');
        _self.selectSwiper.update();
        _self.selectSwiper.slideTo(_self.swiperData.activeIndex, 0);
    };
    _self.okSelectSwiper = function () {
        // if (_self.swiperData.mustSelect && _self.swiperData.activeIndex === -1) {
        //     // _self.swiperData.okFunUndefind();
        // } else {
        _self.swiperData.okFun(_self.swiperData.activeIndex);
        _self.swiperData.oldIndex = _self.swiperData.activeIndex;
        _self.closeSelectSwiper();
        // }
    };
    _self.closeSelectSwiper = function () {
        _self.el.removeClass('swiper-select-yes');
    };
    _self.init();
}

