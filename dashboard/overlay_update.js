'use strict';

var panel = $bundle.filter('.overlay_update');
var o_struct = {
    mode: 'doubles',
    game_name: 'ssbm',

    panel: panel,

    singles_button: panel.find('.singles_btn'),
    doubles_button: panel.find('.doubles_btn'),
    melee_button: panel.find('.melee_btn'),
    pm_button: panel.find('.pm_btn'),
    swap_left_button: panel.find('.swapleft_btn'),
    swap_right_button: panel.find('.swapright_btn'),
    swap_button: panel.find('.swap_btn'),
    update_button: panel.find('.update_btn'),
    sprites_button: panel.find('.sprites_btn'),

    title: panel.find('#title'),
    round: panel.find('#round'),
    player_left1: panel.find('#player_left1'),
    player_left2: panel.find('#player_left2'),
    player_right1: panel.find('#player_right1'),
    player_right2: panel.find('#player_right2'),
    score_left: panel.find('#score_left'),
    score_right: panel.find('#score_right'),
    player_cam: panel.find('#player_cam'),
    commentators: panel.find('#commentators'),
    bracket_link: panel.find('#bracket_link'),

    chars: [panel.find('#char_left_1'), panel.find('#char_left_2'),
            panel.find('#char_right_1'), panel.find('#char_right_2')],

    doubles_rows: panel.find('.doubles_row'),
};

nodecg.declareSyncedVar({
    name: 'game',
    initialValue: {
        singles: 1,
        game: 0,
        title: 'UMD Smash',
        round: '',
        players: ['Left player 1', 'Left player 2', 'Right player 1', 'Right player 2'],
        score_left: 0,
        score_right: 0,
        player_cam: '',
        commentators: '',
        bracket_link: '',
        chars: []
    },
    setter: function(newVal) {}
});
nodecg.declareSyncedVar({ name: 'ssbm_sprites', initialValue: [] });
nodecg.declareSyncedVar({ name: 'pm_sprites', initialValue: [] });

// Update the overlay text.
function update() {
    var game = {};
    if (o_struct.mode == 'singles') {
        game.singles = 1;
    } else {
        game.singles = 0;
    }
    if (o_struct.game_name == 'ssbm') {
        game.game = 0;
    } else {
        game.game = 1;
    }
    game.title = o_struct.title.val();
    game.round = o_struct.round.val();
    game.players = ["", "", "", ""];
    game.players[0] = o_struct.player_left1.val();
    game.players[1] = o_struct.player_left2.val();
    game.players[2] = o_struct.player_right1.val();
    game.players[3] = o_struct.player_right2.val();
    game.score_left = o_struct.score_left.val();
    game.score_right = o_struct.score_right.val();
    game.player_cam = o_struct.player_cam.val();
    game.commentators = o_struct.commentators.val();
    game.bracket_link = o_struct.bracket_link.val();
    game.chars = ["", "", "", ""];
    for (var i = 0; i < 4; i ++) {
        game.chars[i] = o_struct.chars[i].val();
    }
    nodecg.variables.game = game;
    console.log(game);
    console.log("overlay updated");
}

// Swap singles and doubles mode.
function toggle_mode() {
    if (o_struct.mode == 'singles') {
        o_struct.mode = 'doubles';
        o_struct.singles_button.removeClass('active');
        o_struct.doubles_button.addClass('active');
    } else {
        o_struct.mode = 'singles';
        o_struct.singles_button.addClass('active');
        o_struct.doubles_button.removeClass('active');
    }
    var len = o_struct.doubles_rows.length;
    for (var i = 0; i < len; i++) {
        $(o_struct.doubles_rows[i]).toggle();
    }
}

// Grab the sprite list.
function fill_sprites(type, sprites) {
    for (var i = 0; i < 4; i ++) {
        o_struct.chars[i].empty();
    }
    for (var j = 0; j < 4; j ++) {
        var blank_el = document.createElement("option");
        blank_el.textContent = '';
        blank_el.value = 'none';
        o_struct.chars[j].append(blank_el);
        for(var i = 0; i < sprites.length; i++) {
            var el = document.createElement("option");
            el.textContent = sprites[i];
            el.value = sprites[i];
            o_struct.chars[j].append(el);
        }
    }
    console.log(type + ' sprite names loaded');
}
nodecg.listenFor('SSBMSpritesLoaded',
    function (data, callback) { fill_sprites('SSBM', nodecg.variables.ssbm_sprites);});
nodecg.listenFor('PMSpritesLoaded',
    function (data, callback) { fill_sprites('PM', nodecg.variables.pm_sprites);});

function swap_values(el1, el2) {
    var temp = el1.val();
    el1.val(el2.val());
    el2.val(temp);
}

// Button handlers.
o_struct.singles_button.click(
    function () {
        if (o_struct.mode == 'doubles') {
            toggle_mode();
        }
    });
o_struct.doubles_button.click(
    function () {
        if (o_struct.mode == 'singles') {
            toggle_mode();
        }
    });
o_struct.melee_button.click(
    function () {
        if (o_struct.game_name == 'pm') {
            o_struct.game_name = 'ssbm';
            o_struct.melee_button.addClass('active');
            o_struct.pm_button.removeClass('active');
            nodecg.sendMessage('GetSSBMSprites');
        }
    });
o_struct.pm_button.click(
    function () {
        if (o_struct.game_name == 'ssbm') {
            o_struct.game_name = 'pm';
            o_struct.melee_button.removeClass('active');
            o_struct.pm_button.addClass('active');
            nodecg.sendMessage('GetPMSprites');
        }
    });
o_struct.swap_left_button.click(
    function () {
        swap_values(o_struct.player_left1, o_struct.player_left2);
        update();
    });
o_struct.swap_right_button.click(
    function () {
        swap_values(o_struct.player_right1, o_struct.player_right2);
        update();
    });
o_struct.swap_button.click(
    function () {
        swap_values(o_struct.player_left1, o_struct.player_right1);
        swap_values(o_struct.player_left2, o_struct.player_right2);
        update();
    });
o_struct.update_button.click(function () {update();});
o_struct.sprites_button.click(function () {
        if (o_struct.game_name == 'ssbm') {
            nodecg.sendMessage('GetSSBMSprites');
        } else {
            nodecg.sendMessage('GetPMSprites');
        }
    });

// If the page gets refreshed, don't reset the overlay.
setTimeout(function () {
    if (typeof nodecg.variables.game != "undefined") {
        game = nodecg.variables.game;
        o_struct.title.val(game.title);
        o_struct.round.val(game.round);
        o_struct.player_left1.val(game.players[0]);
        o_struct.player_left2.val(game.players[1]);
        o_struct.player_right1.val(game.players[2]);
        o_struct.player_right2.val(game.players[3]);
        o_struct.score_left.val(game.score_left);
        o_struct.score_right.val(game.score_right);
        o_struct.player_cam.val(game.player_cam);
        o_struct.commentators.val(game.commentators);
        o_struct.bracket_link.val(game.bracket_link);
        for (var i = 0; i < 4; i ++) {
            o_struct.chars[i].val(game.chars[i]);
        }
        console.log('restored overlay labels');
    } else {
        console.log('could not restore overlay labels');
    }
}, 1000);
    
toggle_mode();
nodecg.sendMessage('GetSSBMSprites');
console.log("overlay labels panel loaded");