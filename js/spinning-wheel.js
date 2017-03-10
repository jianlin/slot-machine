
function SpinningWheel(id, numPanels, arrImageData, initialSpinVelocity, getRandomDeceleration) {

    var i,
        elementSelf = $(id),
        carousel,
        timeInterval = 33,
        numTimeIntervalToFineAdjust = 17;

    for (i = 0; i < numPanels; i++) {
        elementSelf.append('<figure style="transform: rotateX(' + i * 40 + 'deg) translateZ(192px); background-image: url(\'' + arrImageData[i % arrImageData.length].path + '\')"></figure>');
    }

    carousel = new Carousel3D( elementSelf[0] );
    carousel.panelCount = numPanels;
    carousel.modify();

    this.spin = function() {
        var self = this;
        var deferred = $.Deferred();
        var currentTime = (new Date()).getTime(), preTime = currentTime;
        var velocity = initialSpinVelocity;
        var deceleration = getRandomDeceleration();  console.log("DECELERATION", deceleration);
        var offBy;

        var timerID = setInterval(function() {
            currentTime = (new Date()).getTime();
            carousel.rotation -= velocity;
            velocity -= deceleration;
            if (velocity < 0) {
                velocity = 0;
                clearInterval(timerID);

                // now the spin wheel might be "off" a little, so
                // adjust it back by rounding it off to the nearest panel
                offBy = carousel.rotation % carousel.theta;
                var fineAdjustmentAmount, countTimeIntervalToFineAdjust = 0;
                if (-offBy > carousel.theta / 2) {
                    fineAdjustmentAmount = (carousel.theta + offBy) / numTimeIntervalToFineAdjust;
                } else {
                    fineAdjustmentAmount = offBy / numTimeIntervalToFineAdjust;
                }

                // to make the fine adjustment not abrupt, do it in a few times
                // instead of in just one shot
                var fineAdjustTimerID = setInterval(function() {
                    //console.log(offBy, carousel.rotation, carousel.theta);

                    //console.log(carousel.rotation % carousel.theta, carousel.rotation, carousel.theta);
                    carousel.rotation -= fineAdjustmentAmount;
                    carousel.transform();

                    if (++countTimeIntervalToFineAdjust === numTimeIntervalToFineAdjust) {
                        clearInterval(fineAdjustTimerID);
                        // if it is a little bit off due to floating point, correct it:
                        carousel.rotation = Math.round(carousel.rotation / carousel.theta) * carousel.theta;
                        //console.log("FINAL", carousel.rotation % carousel.theta, carousel.rotation, carousel.theta);
                        carousel.transform();
                        console.log("RESULT", Math.round(carousel.rotation / carousel.theta), Math.round(carousel.rotation / carousel.theta) % arrImageData.length, self.getResultType());
                        deferred.resolve(self.getResultType());
                    }
                }, timeInterval);

            }
            carousel.transform();

            //console.log("theta, panelCount", carousel.theta, carousel.panelCount, carousel.rotation % carousel.theta, carousel, currentTime - preTime, velocity );
            preTime = currentTime;
        }, timeInterval);

        return deferred.promise();
    };

    this.getResultType = function() {
        var index = -(Math.round(carousel.rotation / carousel.theta) % arrImageData.length);
        console.log(Math.round(carousel.rotation / carousel.theta), arrImageData[index].type);
        return arrImageData[index].type
    };

}
