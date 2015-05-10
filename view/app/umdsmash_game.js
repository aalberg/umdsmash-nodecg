var spritePaths = ['img/SSBMsprites/', 'img/PMsprites/'];

var title = $('#title');
var round = $('#round');
var player_left = $('#player_left');
var player_right = $('#player_right');
var score_left = $('#score_left');
var score_right = $('#score_right');
var char_containers = $('.char-container');
var characters = $('.char-image');
var player_cam = $('#player_cam');
var bracket_link = $('#bracket_link');

// Really bad way to handle layout of the names/character faces. Don't judge me ~_~
var singlesMode = 1;
var game = 0;
var ttm = [
    {width: '465px', left: '15px', right: '557px', opacity: '1'}, // melee doubles
    {width: '500px', left: '25px', right: '567px', opacity: '0'}, // melee singles
    {width: '550px', left: '24px', right: '567px', opacity: '1'}, // pm doubles
    {width: '485px', left: '25px', right: '567px', opacity: '0'}]; // pm singles
var ttg = [
    {bottom: '62px', height: '60px', left: '55px', right: '602px'}, // melee
    {bottom: '67px', height: '43px', left: '84px', right: '627px'}]; // pm
function changeMode(tl, s, g) {
    if (s != singlesMode || g != game) {
        singlesMode = s;
        tl.to(player_left, 0.3, { width: ttm[s+2*g].width, ease: Power1.easeIn}, '0');
        tl.to(player_right, 0.3, { width: ttm[s+2*g].width, ease: Power1.easeIn}, '0');
        tl.to($(char_containers[0]), 0.3, { left: ttm[s+2*g].left, ease: Power1.easeIn}, '0');
        tl.to($(char_containers[1]), 0.3, { opacity: ttm[s+2*g].opacity, ease: Power1.easeIn}, '0');
        tl.to($(char_containers[2]), 0.3, { opacity: ttm[s+2*g].opacity, ease: Power1.easeIn}, '0');
        tl.to($(char_containers[3]), 0.3, { right: ttm[s+2*g].right, ease: Power1.easeIn}, '0');
    }
    if (g != game) {
        game = g;
        for (var i = 0; i < 4; i ++) {
            tl.to($(characters[i]), 0.3, { height: ttg[g].height, ease: Power1.easeIn}, '0');
            tl.to($(char_containers[i]), 0.3, { bottom: ttg[g].bottom, ease: Power1.easeIn}, '0');
        }
        tl.to($(char_containers[1]), 0.3, { bottom: ttg[g].bottom, left: ttg[g].left, ease: Power1.easeIn}, '0');
        tl.to($(char_containers[2]), 0.3, { bottom: ttg[g].bottom, right: ttg[g].right, ease: Power1.easeIn}, '0');
    }
}

function cleanURL(url) {
    return url.replace(/^.*[\\\/]/, '').replace(')', '');
}

function getBackgroundFilename(el) {
    var bg = el.css('background-image');
    return cleanURL(bg);
}

function fileToURL(path, file) {
    if (file == 'none') {
        return 'none';
    }
    return  'url(' + path + file + ')';
}

function generatePlayerEntry(tl, pel, cels, ps, cs, path, singles, left) {
    var newText = ps[0];
    var newBGs = ['none', 'none'];
    newBGs[1-left] = fileToURL(path, cs[0]);
    if (singles != 1) {
        if (ps[0].length > 0 && ps[1].length > 0) {
            newText = ps[0] + ' & ' + ps[1];
            newBGs[0] = fileToURL(path, cs[0]);
            newBGs[1] = fileToURL(path, cs[1]);
        } else if (ps[0].length == 0) {
            newText = ps[1];
            newBGs[0] = 'none';
            newBGs[1] = fileToURL(path, cs[1]);
        }
    }
    if (pel.text().trim() != newText) {
        addFancyAnimation(tl, pel, newText, '0', 1);
    }
    if (getBackgroundFilename(cels[1-left]) != cleanURL(newBGs[0])) {
        addBackgroundSlideAnimation(tl, cels[1-left], newBGs[0]);
    }
    if (getBackgroundFilename(cels[left]) != cleanURL(newBGs[1])) {
        addBackgroundSlideAnimation(tl, cels[left], newBGs[1]);
    }
}
// End really bad code. Begin mostly okay code.

nodecg.declareSyncedVar({
    name: 'game',
    setter: function(newGame) {
        if (typeof newGame == 'undefined') { return; }

        var tl = new TimelineLite({ paused: true });
        console.log(newGame);
        if (title.text() != newGame.title) {
            addSlideAnimation(tl, title, newGame.title);
        }
        if (round.text() != newGame.round) {
            addSlideAnimation(tl, round, newGame.round);
        }
        changeMode(tl, newGame.singles, newGame.game);
        generatePlayerEntry(tl, player_left, [$(characters[0]), $(characters[1])],
            [newGame.players[0],newGame.players[1]],
            [newGame.chars[0], newGame.chars[1]],
            spritePaths[newGame.game] , newGame.singles, 1);
        generatePlayerEntry(tl, player_right, [$(characters[3]), $(characters[2])],
            [newGame.players[2],newGame.players[3]],
            [newGame.chars[2], newGame.chars[3]],
            spritePaths[newGame.game] , newGame.singles, 0);
        if (score_left.text() != newGame.score_left) {
            addSlideAnimation(tl, score_left, newGame.score_left);
        }
        if (score_right.text() != newGame.score_right) {
            addSlideAnimation(tl, score_right, newGame.score_right);
        }
        
        if (player_cam.text() != newGame.player_cam) {
            addSlideAnimation(tl, player_cam, newGame.player_cam);
        }

        tl.play();
        console.log('game screen updated');
    }
});

console.log('game view started');