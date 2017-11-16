/**
 * Required params : element, footer, contentElement, headerElement | spaceTop
 * Example of params
 * var params = { element : '#sidebar', footer: '#footer', contentElement: '#content', spaceTop: 30, headerElement: '#header', smooth: 0.3 };
 */
function StickySidebar(params){
    this.spaceTop =  typeof params.headerElement !== 'undefined' ? ($(params.contentElement).offset().top - $(params.headerElement).offset().top - $(params.headerElement).outerHeight()) : params.spaceTop;
    this.initialOffsetTop= $(params.element).offset().top;
    this.footerOffsetTop= $(params.footer).offset().top;
    this.element= $(params.element);
    this.contentElement= $(params.contentElement);
    this.smooth = typeof params.smooth !== 'undefined' ? params.smooth : false;

    this.resetSticky = function () {
        /**
         * To do
         */
    };

    this.setupSticky = function () {
      if(this.smooth){
          this.element.css({'transition' : 'all,' + this.smooth + 's ease-in-out'});
      }
    };

    this.setupSticky();
    var that = this;

    document.addEventListener('scroll', function () {
        console.log('reset');
        var scrollBarScrollTop = $(document).scrollTop();
        var elementHeight = that.element.outerHeight();
        var movement = (scrollBarScrollTop -  that.initialOffsetTop + that.spaceTop);
        var footerMarginTop = that.footerOffsetTop - that.contentElement.outerHeight() - that.contentElement.offset().top;
        if(scrollBarScrollTop > (that.initialOffsetTop - that.spaceTop)){
            if(((that.initialOffsetTop + elementHeight + movement) <= that.footerOffsetTop - footerMarginTop)){
                that.element.css('top', movement + 'px');
            } else {
                that.element.css('top', (that.footerOffsetTop - elementHeight - that.initialOffsetTop - footerMarginTop) + 'px');
            }
        } else {
            that.element.css('top', '0px');
        }
    });

    return this;
}