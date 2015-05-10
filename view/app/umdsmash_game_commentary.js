var coming_up = $('#coming_up');

nodecg.declareSyncedVar({
    name: 'up_next',
    setter: function(newUpNext) {
        if (typeof newUpNext == 'undefined') { return; }
    
        console.log(newUpNext);
        var tl = new TimelineLite({ paused: true });
        if (newUpNext.length == 0) {
            addFade(tl, coming_up);
        } else if (coming_up.text().trim() != newUpNext[0]) {
            addFancyAnimation(tl, coming_up, newUpNext[0], '0');
        }
        
        tl.play();
        console.log('view updated');
    }
});

console.log('game/commentary view started');