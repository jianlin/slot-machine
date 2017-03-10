

function SpinningWheel(id, arrImages) {

    var i,
        elementSelf = $(id);

    for (i = 0; i < 9; i++) {
        elementSelf.append('<figure style="transform: rotateX(' + i * 40 + 'deg) translateZ(192px); background-image: url(\'' + arrImages[i % arrImages.length] + '\')"></figure>');
    }

}


new SpinningWheel("#carousel1", ['images/coffee-maker.png', 'images/teapot.png', 'images/espresso-machine.png']);

new SpinningWheel("#carousel2", ['images/coffee-filter.png', 'images/tea-strainer.png', 'images/espresso-tamper.png']);

new SpinningWheel("#carousel3", ['images/coffee-grounds.png', 'images/tea-leaf.png', 'images/espresso-ground-beans.png']);
