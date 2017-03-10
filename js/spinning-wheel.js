/* global $, Carousel3D */

function SpinningWheel(selectorForSpinningWheel, numPanels, arrImageData, initialSpinVelocity, getRandomDeceleration) {

    var i,
        elementSelf = $(selectorForSpinningWheel),
        carousel,
        timeInterval = 33,
        numTimeIntervalToFineAdjust = 17;

    for (i = 0; i < numPanels; i++) {
        elementSelf.append('<figure style="transform: rotateX(' + i * (360 / numPanels)  + 'deg) translateZ(192px); background-image: url(\'' + arrImageData[i % arrImageData.length].path + '\')"></figure>');
    }

    carousel = new Carousel3D( elementSelf[0] );
    carousel.panelCount = numPanels;

    // rotate the spinning wheel randomly when the spinning wheel is created
    carousel.rotation = -Math.floor(Math.random() * numPanels) * (360 / numPanels);
    carousel.modify();

    this.getResultType = function() {
        var index = -(Math.round(carousel.rotation / carousel.theta) % arrImageData.length);
        return arrImageData[index].type;
    };

    this.spin = function() {
        var self = this,
            deferred = $.Deferred(),
            velocity = initialSpinVelocity,
            deceleration = getRandomDeceleration(),
            offBy,
            timerID;

        timerID = setInterval(function() {

            var fineAdjustmentAmount, countTimeIntervalToFineAdjust, fineAdjustTimerID;

            carousel.rotation -= velocity;
            velocity -= deceleration;
            if (velocity < 0) {
                velocity = 0;
                clearInterval(timerID);

                // now the spin wheel might be "off" a little, so
                // adjust it back by rounding it off to the nearest panel
                offBy = carousel.rotation % carousel.theta;

                countTimeIntervalToFineAdjust = 0;
                if (-offBy > carousel.theta / 2) {
                    fineAdjustmentAmount = (carousel.theta + offBy) / numTimeIntervalToFineAdjust;
                } else {
                    fineAdjustmentAmount = offBy / numTimeIntervalToFineAdjust;
                }

                // to make the fine adjustment not abrupt, do it in a few times
                // instead of in just one shot
                fineAdjustTimerID = setInterval(function() {
                    carousel.rotation -= fineAdjustmentAmount;
                    carousel.transform();

                    if (++countTimeIntervalToFineAdjust === numTimeIntervalToFineAdjust) {
                        clearInterval(fineAdjustTimerID);
                        // if it is a little bit off due to floating point, correct it:
                        carousel.rotation = Math.round(carousel.rotation / carousel.theta) * carousel.theta;
                        carousel.transform();
                        deferred.resolve(self.getResultType());
                    }
                }, timeInterval);

            }
            carousel.transform();

        }, timeInterval);

        return deferred.promise();
    };



}
