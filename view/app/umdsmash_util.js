function addFade(tl, el) {
    tl.to(el.children('.textFitted'), 0.3,
        { left: '30px', opacity: '0', ease: Power1.easeIn,
        onComplete: function() { el.text(''); }}, '0');
}

function addSlideAnimation(tl, el, newText) {
    if (el.css('text-align') == 'right') {
        tl.to(el.children('.textFitted'), 0.3, {
            right: '-30px', opacity: '0', ease: Power1.easeIn,
            onComplete: function() {
                el.text(newText);
                textFit(el, { multiLine: false, alignVert: true, maxFontSize: parseInt(el.css('font-size')) });
                tl.from(el.children('.textFitted'), 0.3, {
                    right: '30px', opacity: '0', ease: Power1.easeOut
                }, '0.3');
            }
        }, '0');
    } else {
        tl.to(el.children('.textFitted'), 0.3, {
            left: '30px', opacity: '0', ease: Power1.easeIn,
            onComplete: function() {
                el.text(newText);
                textFit(el, { multiLine: false, alignVert: true, maxFontSize: parseInt(el.css('font-size')) });
                tl.from(el.children('.textFitted'), 0.3, {
                    left: '-30px', opacity: '0', ease: Power1.easeOut
                }, '0.3');
            }
        }, '0');
    }
}

function addBackgroundSlideAnimation(tl, el, newBG) {
    tl.to(el, 0.3, {
        left: '30px', opacity: '0', ease: Power1.easeIn,
        onComplete: function() {
            console.log(newBG);
            el.css('background-image', newBG);
            el.css('left', '-30px');
            tl.to(el, 0.3, {
                left: '0', opacity: '1', ease: Power1.easeOut
            }, '0.3');
        }
    }, '0');
}

function addFancyAnimation(tl, el, newText, startTime, minSize) {
    el.text(newText);
    textFit(el, { multiLine: true, alignVert: true, minFontSize: minSize, maxFontSize: parseInt(el.css('font-size')) });
    var splits = new SplitText(el.children('.textFitted'), {type:"chars"});
    tl.staggerFrom(splits.chars, 0.8, {opacity:0, scale:0, y:80, rotationX:180,
        transformOrigin:"0% 50% -50",  ease:Back.easeOut}, 0.01, startTime);
}