/* global $, SpinningWheel */

function SlotMachine(selectorForSpinTrigger, selectorForResultMessage, initialSpinVelocity, arrSpinningWheelData, winLoseMessages) {
    var self = this, i, data, arrSpinningWheels = [], arrResults = {};

    for (i = 0; i < arrSpinningWheelData.length; i++) {
        data = arrSpinningWheelData[i];
        arrSpinningWheels.push(
                                new SpinningWheel(
                                                   data.selector,
                                                   data.numPanels,
                                                   data.imageData,
                                                   initialSpinVelocity,
                                                   // the following is deceleration. Note that
                                                   // it is made so that the left spinning wheels decelerate faster than the right ones.
                                                   // Use a closure to capture the value of i using local scope:
                                                   (function(i) {
                                                       return function getRandomDeceleration() {
                                                           return 0.02 + 0.08 * (arrSpinningWheelData.length - i) + (Math.random() * 0.02 - 0.01); // plus or minus 0.01
                                                       };
                                                   }(i))

                                                 )
                              );
    }

    function pickOne(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    $(selectorForSpinTrigger).click(function() {
        var promise, arrPromises = [];

        $(selectorForSpinTrigger).prop("disabled", true);
        $(selectorForResultMessage).fadeOut(1200);
        self.clearResults();
        for (i = 0; i < arrSpinningWheels.length; i++) {
            promise = arrSpinningWheels[i].spin();
            promise.done(function(result) {
                self.tallyUpResults(result);
            });
            arrPromises.push(promise);
        }
        // when all spinning wheels have stopped:
        // (we could use the fact that the rightmost spinning wheel will stop last,
        //  but just to handle any case no matter how the spinning wheels behave,
        //  we use promises to see for all spinning wheels have stopped)
        $.when.apply($, arrPromises).done(function() {
            var message;
            $(selectorForSpinTrigger).prop("disabled", false);
            if (self.getNumberOfLineUp() === self.getNumberOfSpinningWheels()) {
                message = pickOne(winLoseMessages.win).replace("{0}", arrSpinningWheels[0].getResultType);
            } else if (self.getNumberOfLineUp() === self.getNumberOfSpinningWheels() - 1) {
                message = pickOne(winLoseMessages.almost);
            } else {
                message = pickOne(winLoseMessages.lose);
            }
            $(selectorForResultMessage).html(message).fadeIn(2000);
        });
    });

    this.clearResults = function() {
        arrResults = {};
    };

    this.tallyUpResults = function(result) {
        arrResults[result] = (arrResults[result] || 0) + 1;
    };

    this.getNumberOfLineUp = function() {
        return Math.max.apply(null, $.map(arrResults, function(v, k) { return v; }));
    };

    this.getNumberOfSpinningWheels = function() {
        return arrSpinningWheelData.length;
    };

}
