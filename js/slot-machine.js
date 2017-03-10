
function SlotMachine(selectorForSpin, arrSpinningWheelData) {
    var i, data;

    for (i = 0; i < arrSpinningWheelData.length; i++) {
        data = arrSpinningWheelData[i];
        new SpinningWheel(data.id, data.images);
    }

    var carousel = new Carousel3D( document.getElementById('carousel1') ),
    carousel2 = new Carousel3D( document.getElementById('carousel2') ),
    carousel3 = new Carousel3D( document.getElementById('carousel3') );

    // populate on startup
    carousel.panelCount = 9;
    carousel.modify();

    carousel2.panelCount = 9;
    carousel2.modify();

    carousel3.panelCount = 9;
    carousel3.modify();


        setTimeout( function(){
            document.body.addClassName('ready');
        }, 0);

    $(selectorForSpin).click(function( event ){

        var increment = parseInt( event.target.getAttribute('data-increment') );
        var currentTime = (new Date()).getTime(), preTime = currentTime;
        var velocity = 16, deceleration = 0.18 + (Math.random() * 0.2 - 0.1); // plus or minus 0.1
        var velocity2 = 17, deceleration2 = 0.15 + (Math.random() * 0.2 - 0.1); // plus or minus 0.1
        var velocity3 = 18, deceleration3 = 0.12 + (Math.random() * 0.2 - 0.1); // plus or minus 0.1
        var timerID = setInterval(function() {
            // carousel.rotation += carousel.theta * increment * -1;
            currentTime = (new Date()).getTime();
            carousel.rotation -= velocity;
            carousel2.rotation -= velocity2;
            carousel3.rotation -= velocity3;
            velocity -= deceleration;
            velocity2 -= deceleration2;
            velocity3 -= deceleration3;
            if (velocity < 0) {
                velocity = 0;
            } else {
                carousel.transform();
            }
            if (velocity2 < 0) {
                velocity2 = 0;
            } else {
                carousel2.transform();
            }
            if (velocity3 < 0) {
                velocity3 = 0;
            } else {
                carousel3.transform();
            }
            if (velocity <= 0 && velocity2 <= 0 && velocity3 <= 0) {
                clearInterval(timerID);
            }
            //
            // carousel2.transform();
            // carousel3.transform();
            console.log("theta, panelCount", carousel.theta, carousel.panelCount, carousel, currentTime - preTime, velocity );
            preTime = currentTime;
        }, 33);
        // carousel.rotation += carousel.theta * increment * -1;
        // carousel.transform();
    });


}
