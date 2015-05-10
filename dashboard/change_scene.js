'use strict';

var panel = $bundle.filter('.change_scene');

cs_struct = {
    update_button: panel.find('.change_scene_btn'),
    scene_select: panel.find('#scene_select'),
    scene_display: panel.find('.cur-scene'),

    obs: new OBSRemote(),
}

cs_struct.obs.onConnectionOpened = function () {
    cs_struct.obs.getSceneList(function (current_scene, scenes) {
        cs_struct.scene_select.empty();
        for(var i = 0; i < scenes.length; i++) {
            var scene = scenes[i];
            console.log("found scene: " + scene.name);
            var el = document.createElement("option");
            el.textContent = scene.name;
            el.value = scene.name;
            cs_struct.scene_select.append(el);
        }
        cs_struct.scene_select.val(current_scene);
        cs_struct.scene_display.text(current_scene);
    });
};
cs_struct.obs.onSceneSwitched = function (scene) {
    cs_struct.scene_display.text(scene);
};
cs_struct.obs.connect();

cs_struct.update_button.click(function () {
    console.log("swap panel button pressed");
    cs_struct.obs.setCurrentScene(cs_struct.scene_select.val());
});

console.log(cs_struct.scene_display)
console.log("swap panel loaded");