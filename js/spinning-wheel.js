
function SpinningWheel(id, numPanels, arrImages, initialSpinVelocity, deceleration) {

    var i,
        elementSelf = $(id),
        carousel;

    for (i = 0; i < numPanels; i++) {
        elementSelf.append('<figure style="transform: rotateX(' + i * 40 + 'deg) translateZ(192px); background-image: url(\'' + arrImages[i % arrImages.length] + '\')"></figure>');
    }

    carousel = new Carousel3D( elementSelf[0] );
    carousel.panelCount = numPanels;
    carousel.modify();

    this.spin = function() {

        var currentTime = (new Date()).getTime(), preTime = currentTime;
        var velocity = initialSpinVelocity;

        var timerID = setInterval(function() {
            currentTime = (new Date()).getTime();
            carousel.rotation -= velocity;
            velocity -= deceleration;
            if (velocity < 0) {
                velocity = 0;
                clearInterval(timerID);
            }
            carousel.transform();

            console.log("theta, panelCount", carousel.theta, carousel.panelCount, carousel, currentTime - preTime, velocity );
            preTime = currentTime;
        }, 33);

    };
}
