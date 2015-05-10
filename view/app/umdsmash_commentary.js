var commentators = $('#commentators');
var coming_up = $('.coming_up');

nodecg.declareSyncedVar({
    name: 'game',
    setter: function(newGame) {
        if (typeof newGame == 'undefined') { return; }

        var tl = new TimelineLite({ paused: true });
        if (commentators.text() != newGame.commentators) {
            addSlideAnimation(tl, commentators, newGame.commentators);
        }

        tl.play();
        console.log('view updated');
    }
});

nodecg.declareSyncedVar({
    name: 'up_next',
    setter: function(newUpNext) {
        if (typeof newUpNext == 'undefined') { return; }

        var tl = new TimelineLite({ paused: true });
        var first_changed = -1;
        for (var i = 0; i < 6; i ++) {
            if (i < newUpNext.length) {
                if ($(coming_up[i]).text().trim() != newUpNext[i]) {
                    if (newUpNext[i] == '') {
                        addFade(tl, $(coming_up[i]));
                    } else {
                        if (first_changed == -1) {
                            first_changed = i;
                        }
                        addFancyAnimation(tl, $(coming_up[i]), newUpNext[i], (.1*(i-first_changed)).toString(), 30);
                    }
                }
            } else {
                addFade(tl, $(coming_up[i]));
            }
        }

        tl.play();
        console.log('view updated');
    }
});

console.log('commentary view started');