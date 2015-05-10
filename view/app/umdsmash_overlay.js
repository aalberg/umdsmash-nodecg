var lower_third_struct = {
    shown: -1,
    container: $('#lower_third'),
    title: $('#lower_third_title'),
    text: $('#lower_third_text'),
    timeout: {},
};

function hideLowerThird() {
    if (lower_third_struct.shown == 0) { return; }

    var tl = new TimelineLite({ paused: true });
    tl.to(lower_third_struct.container, 0.5, {
            bottom: '-115%', ease: Power1.easeOut, onComplete: function() {
                lower_third_struct.title.text('');
                lower_third_struct.text.text('');
            }
        }, '0');

    tl.play();
    lower_third_struct.shown = 0;
    clearTimeout(lower_third_struct.timeout);
    console.log('lower third hidden');
}

nodecg.declareSyncedVar({
    name: 'lower_third',
    setter: function(newLowerThird) {
        if (lower_third_struct.shown == -1) {
            lower_third_struct.shown = 0;
            return;
        }
        else if (typeof newLowerThird == 'undefined' || lower_third_struct.shown == 1) { return; }

        lower_third_struct.title.text(newLowerThird.title);
        textFit(lower_third_struct.title,{ multiLine: true, alignVert: true,
            maxFontSize: parseInt(lower_third_struct.title.css('font-size')) });
        lower_third_struct.text.text(newLowerThird.text);
        textFit(lower_third_struct.text, { multiLine: true, alignVert: true,
            maxFontSize: parseInt(lower_third_struct.text.css('font-size')) });
        if (newLowerThird.duration > 0) {
            lower_third_struct.timeout = setTimeout(function () {
                hideLowerThird();
                nodecg.sendMessage('HideLowerThird');
            }, newLowerThird.duration*1000);
        }
        
        var tl = new TimelineLite({ paused: true });
        tl.to(lower_third_struct.container, 0.5, { bottom: '0%', ease: Power1.easeOut}, '0');

        tl.play();
        lower_third_struct.shown = 1;
        console.log('lower third shown');
    }
});

nodecg.listenFor('HideLowerThird', function (data, callback) {
    hideLowerThird();
});

console.log('overlay loaded');