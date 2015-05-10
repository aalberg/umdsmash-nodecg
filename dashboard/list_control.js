'use strict';

var panel = $bundle.filter('.list_control');
var lc_struct = {
    panel: panel,

    list_col: panel.find('.list_col'),
    list_inputs: [],
    num_inputs: 0,
    
    add_button: panel.find('.add_btn'),
    update_button: panel.find('.update_btn'),
    cycle_button: panel.find('.cycle_btn'),
};
lc_struct.list_inputs = lc_struct.list_col.find('.list_input');
lc_struct.num_inputs = lc_struct.list_inputs.length;

nodecg.declareSyncedVar({ name: 'up_next', initialValue: {} });

function update_up_next() {
    var up_next = [];
    var len = lc_struct.num_inputs;
    for (var i = 0; i < len; i++) {
        up_next.push($(lc_struct.list_inputs[i]).val());
    }
    nodecg.variables.up_next = up_next;
    console.log("up next updated");
}
    
lc_struct.add_button.click(
    function () {
        lc_struct.num_inputs++;
        lc_struct.list_col.append('<input id="list_input_' + lc_struct.num_inputs +
            '" placeholder="' + lc_struct.num_inputs + '" class="list_input form-control" />');
        lc_struct.list_inputs = lc_struct.list_col.find('.list_input');
    });
lc_struct.update_button.click(function () {update_up_next();});
lc_struct.cycle_button.click(
    function () {
        if (lc_struct.num_inputs > 0) {
            console.log(lc_struct.list_inputs);
            console.log(lc_struct.num_inputs);
            var len = lc_struct.num_inputs;
            for (var i = 0; i < len-1; i++) {
                $(lc_struct.list_inputs[i]).val($(lc_struct.list_inputs[i+1]).val());
            }
            $(lc_struct.list_inputs[len-1]).remove();
            lc_struct.list_inputs = lc_struct.list_col.find('.list_input');
            lc_struct.num_inputs--;
            update_up_next();
        }
    });

setTimeout(function () {
    nodecg.up_next = [];
}, 1000);
console.log('list control panel loaded');