
function SlotMachine(arrSpinningWheelData) {
    var i, data;

    for (i = 0; i < arrSpinningWheelData.length; i++) {
        data = arrSpinningWheelData[i];
        new SpinningWheel(data.id, data.images);
    }
}
