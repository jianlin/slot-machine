
function SlotMachine(selectorForSpin, selectorForResultMessage, initialSpinVelocity, arrSpinningWheelData, winLoseMessages) {
    var self = this, i, data, arrSpinningWheels = [], arrResults = {};

    for (i = 0; i < arrSpinningWheelData.length; i++) {
        data = arrSpinningWheelData[i];
        arrSpinningWheels.push(
                                new SpinningWheel(
                                                   data.id,
                                                   data.numPanels,
                                                   data.imageData,
                                                   initialSpinVelocity,
                                                   // the following is deceleration. Note that
                                                   // it is made so that initial spin wheel decelerate faster
                                                   0.02 + 0.12 * (arrSpinningWheelData.length - i) + (Math.random() * 0.02 - 0.01) // plus or minus 0.01
                                                 )
                              );
    }

    function pickOne(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    $(selectorForSpin).click(function() {
        var promise, arrPromises = [];

        $(selectorForSpin).prop("disabled", true);
        $(selectorForResultMessage).fadeOut(2000);
        self.clearResults();
        for (i = 0; i < arrSpinningWheels.length; i++) {
            promise = arrSpinningWheels[i].spin();
            promise.done(function(result) {
                self.tallyUpResults(result);
            });
            arrPromises.push(promise);
        }
        // when all spinning wheels have stopped:
        $.when.apply($, arrPromises).done(function() {
            var message;
            $(selectorForSpin).prop("disabled", false);
            if (self.getMaximumLineUp() === self.getNumberOfSpinningWheels()) {
                message = pickOne(winLoseMessages.win).replace("{0}", arrSpinningWheels[0].getResultType);
            } else if (self.getMaximumLineUp() === self.getNumberOfSpinningWheels() - 1) {
                message = pickOne(winLoseMessages.almost);
            } else {
                message = pickOne(winLoseMessages.lose);
            }
            $(selectorForResultMessage).html(message).fadeIn(2000);
            console.log("ALL DONE", self.getMaximumLineUp());
        });
    });

    this.clearResults = function() {
        arrResults = {};
    };

    this.tallyUpResults = function(result) {
        console.log("Got a result", result);
        arrResults[result] = (arrResults[result] || 0) + 1;
        console.log("arrResults", arrResults, $.map(arrResults, function(v, k) { return v; }));
        console.log(self.getMaximumLineUp());
    }

    this.getMaximumLineUp = function() {
        console.log("MaximumLineUp", Math.max.apply(null, $.map(arrResults, function(v, k) { return v; })));
        return Math.max.apply(null, $.map(arrResults, function(v, k) { return v; }));
    }

    this.getNumberOfSpinningWheels = function() {
        return arrSpinningWheelData.length;
    }

}
