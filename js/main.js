!(function() {

    $(function() {
        new SlotMachine("#slot-machine button.spin", [
            { id: "#carousel1", numPanels: 9, images: ['images/coffee-maker.png', 'images/teapot.png', 'images/espresso-machine.png'] },
            { id: "#carousel2", numPanels: 9, images: ['images/coffee-filter.png', 'images/tea-strainer.png', 'images/espresso-tamper.png'] },
            { id: "#carousel3", numPanels: 9, images: ['images/coffee-grounds.png', 'images/tea-leaf.png', 'images/espresso-ground-beans.png'] }
        ]);
    });

}());
