var transformProp = Modernizr.prefixed('transform');

function Carousel3D ( el ) {
    this.element = el;

    this.rotation = 0;
    this.panelCount = 0;
    this.totalPanelCount = this.element.children.length;
    this.theta = 0;

    this.isHorizontal = false;

}

Carousel3D.prototype.modify = function() {

    var panel, angle, i;

    this.panelSize = this.element[ this.isHorizontal ? 'offsetWidth' : 'offsetHeight' ];
    this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
    this.theta = 360 / this.panelCount;

    // do some trig to figure out how big the carousel
    // is in 3D space
    this.radius = Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );

    for ( i = 0; i < this.panelCount; i++ ) {
        panel = this.element.children[i];
        angle = this.theta * i;
        panel.style.opacity = 1;
        panel.style.backgroundColor = 'hsla(' + angle + ', 100%, 50%, 0.9)';
        // rotate panel, then push it out in 3D space
        panel.style[ transformProp ] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
    }

    // hide other panels
    for (  ; i < this.totalPanelCount; i++ ) {
        panel = this.element.children[i];
        panel.style.opacity = 0;
        panel.style[ transformProp ] = 'none';
    }

    // adjust rotation so panels are always flat
    this.rotation = Math.round( this.rotation / this.theta ) * this.theta;

    this.transform();

};

Carousel3D.prototype.transform = function() {
    // push the carousel back in 3D space,
    // and rotate it
    this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
};



var init = function() {


    var carousel = new Carousel3D( document.getElementById('carousel1') ),
    carousel2 = new Carousel3D( document.getElementById('carousel2') ),
    carousel3 = new Carousel3D( document.getElementById('carousel3') ),
    panelCountInput = document.getElementById('panel-count'),
    axisButton = document.getElementById('toggle-axis'),
    navButtons = document.querySelectorAll('#navigation button'),

    onNavButtonClick = function( event ){
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
    };

    // populate on startup
    carousel.panelCount = parseInt( panelCountInput.value, 10);
    carousel.modify();

    carousel2.panelCount = parseInt( panelCountInput.value, 10);
    carousel2.modify();

    carousel3.panelCount = parseInt( panelCountInput.value, 10);
    carousel3.modify();

    axisButton.addEventListener( 'click', function(){
        carousel.isHorizontal = !carousel.isHorizontal;
        carousel.modify();
    }, false);

    panelCountInput.addEventListener( 'change', function( event ) {
        carousel.panelCount = event.target.value;
        carousel.modify();
    }, false);

    for (var i=0; i < 2; i++) {
        navButtons[i].addEventListener( 'click', onNavButtonClick, false);
    }

    document.getElementById('toggle-backface-visibility').addEventListener( 'click', function(){
        carousel.element.toggleClassName('panels-backface-invisible');
    }, false);

    setTimeout( function(){
        document.body.addClassName('ready');
    }, 0);

};

window.addEventListener( 'DOMContentLoaded', init, false);
