
function SlotMachine(selectorForSpin, arrSpinningWheelData) {
    var i, data, arrSpinningWheels = [];

    for (i = 0; i < arrSpinningWheelData.length; i++) {
        data = arrSpinningWheelData[i];
        arrSpinningWheels.push(new SpinningWheel(data.id,
                                                 data.numPanels,
                                                 data.images,
                                                 22,
                                                 0.02 + 0.12 * (arrSpinningWheelData.length - i) + (Math.random() * 0.02 - 0.01) // plus or minus 0.01
                                                )
                              );
    }

    $(selectorForSpin).click(function() {
        for (i = 0; i < arrSpinningWheels.length; i++) {
            arrSpinningWheels[i].spin();
        }
    });

}
