'use strict';

var fs = require('fs');
//var dir = "C:/Users/Bob/Documents/";
//var dir = "C:/Users/Jeffery/Streaming/";
var dir = "C:/Users/Alex/Dropbox/Projects/nodecg/";
var ssbm_dir = dir + "nodecg/bundles/umdsmash-nodecg/view/img/SSBMsprites";
var pm_dir = dir + "nodecg/bundles/umdsmash-nodecg/view/img/PMsprites";

module.exports = function(nodecg) {
    nodecg.declareSyncedVar({ name: 'ssbm_sprites' });
    nodecg.listenFor('GetSSBMSprites', function (data, callback) {
        var files = fs.readdirSync(ssbm_dir);
        nodecg.variables.ssbm_sprites = files;
        nodecg.sendMessage('SSBMSpritesLoaded');
        nodecg.log.info('Retrieved SSBM sprite names');
    });

    nodecg.declareSyncedVar({ name: 'pm_sprites' });
    nodecg.listenFor('GetPMSprites', function (data, callback) {
        var files = fs.readdirSync(pm_dir);
        nodecg.variables.pm_sprites = files;
        nodecg.sendMessage('PMSpritesLoaded');
        nodecg.log.info('Retrieved PM sprite names');
    });
};