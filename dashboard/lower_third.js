'use strict';

var panel = $bundle.filter('.lower_third');
var lt_struct = {
    panel: panel,
    
    shown: 0,
    
    showhide_button: panel.find('.showhide_btn'),
    s10_button: panel.find('.s10_btn'),
    s20_button: panel.find('.s20_btn'),
    s30_button: panel.find('.s30_btn'),
    
    lower_third_title: panel.find('#lower_third_title'),
    lower_third_text: panel.find('#lower_third_text'),
};

nodecg.declareSyncedVar({
    name: 'lower_third',
    initialValue: {
        title: 'Lower Third Title',
        text: 'Lower Third Text',
        duration: -1
    },
    setter: function(newVal) {}
});

function show_lower_third(duration) {
    lt_struct.showhide_button.text('Hide');
    lt_struct.shown = 1;
    new_lower_third = {};
    new_lower_third.title = lt_struct.lower_third_title.val();
    new_lower_third.text = lt_struct.lower_third_text.val();
    new_lower_third.duration = duration;
    nodecg.variables.lower_third = new_lower_third;
    console.log('showing lower third');
}

nodecg.listenFor('HideLowerThird', function (data, callback) {
    lt_struct.showhide_button.text('Show');
    lt_struct.shown = 0;
    console.log('hiding lower third');
});

lt_struct.showhide_button.click(
    function () {
        if (lt_struct.shown == 0) {
            show_lower_third(-1);
        } else {
            nodecg.sendMessage('HideLowerThird');
        }
    });
lt_struct.s10_button.click( function () { show_lower_third(10); });
lt_struct.s20_button.click( function () { show_lower_third(20); });
lt_struct.s30_button.click( function () { show_lower_third(30); });

console.log('lower third panel loaded');