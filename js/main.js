/* global $, SlotMachine */

!(function() {

    $(function() {
        new SlotMachine("#slot-machine button.spin", "#slot-machine .result-message .message", 22, [
            { selector: "#carousel1", numPanels: 9, imageData: [{ path: 'images/coffee-maker.png', type: "coffee" }, { path: 'images/teapot.png', type: "tea" }, { path: 'images/espresso-machine.png', type: "espresso" }] },
            { selector: "#carousel2", numPanels: 9, imageData: [{ path: 'images/coffee-filter.png', type: "coffee" }, { path: 'images/tea-strainer.png', type: "tea" }, { path: 'images/espresso-tamper.png', type: "espresso" }] },
            { selector: "#carousel3", numPanels: 9, imageData: [{ path: 'images/coffee-grounds.png', type: "coffee" }, { path: 'images/tea-leaf.png', type: "tea" }, { path: 'images/espresso-ground-beans.png', type: "espresso" }] }
        ],
        {
            win: ["You won a free {0}!", "A free {0} is in order!", "Let's make you a free {0}."],
            almost: ["You almost made it... too bad...", "You just missed by a single item!", "That was so close!"],
            lose: ["You missed by 1000 mile.", "I am sorry. No beverage for you!", "Please try again tomorrow."]
        });

        // the carousel library required this:
        setTimeout( function(){
            document.body.addClassName('ready');
        }, 0);
    });

}());
