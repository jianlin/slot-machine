
function SpinningWheel(id, arrImages) {

    var i,
        elementSelf = $(id);

    for (i = 0; i < 9; i++) {
        elementSelf.append('<figure style="transform: rotateX(' + i * 40 + 'deg) translateZ(192px); background-image: url(\'' + arrImages[i % arrImages.length] + '\')"></figure>');
    }

}
