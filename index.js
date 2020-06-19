var bird = {
    skyPosition : 0,
    skyStep:2 ,
    birdTop:220,
    startColor:'blue',
    birdPosition:0,
    startFlag:false,
    birdStepY:0,
    minTop:0,
    maxTop:570,
    // birdStep:30,
    init:function () {
        this.initDate();
        this.animate();
        this.handle();
        this.judgeKnock();
    },
    initDate: function () {
        this.el = document.getElementById('game');
        this.oBird = this.el.getElementsByClassName('bird')[0];
        this.oStart = this.el.getElementsByClassName('start')[0];
        this.oScore = this.el.getElementsByClassName('score')[0];
        this.oMask = this.el.getElementsByClassName('mask')[0];
        this.oEnd = this.el.getElementsByClassName('end')[0];



    },
    animate: function () {
        var count = 0;
        var self = this;
        this.timer = setInterval(function() {
            self.skyMove();
            if(self.startFlag) {
                self.birdDrop();
            }
            // self.birdDrop();
            if(++ count % 10 === 0) {
                if(!self.startFlag){
                self.birdJump();
                self.startBound();
                }
                self.birdFly(count);
            }  
        },30);
        this.birdFly();
        this.startBound();
    },
    skyMove: function () {
        this.skyPosition -= this.skyStep;
        this.el.style.backgroundPositionX = this.skyPosition + 'px'; 
    },
    birdJump: function () {
        console.log(this.oBird.style.top)
        this.birdTop = this.birdTop === 220 ? 260 : 220;
        this.oBird.style.top = this.birdTop + 'px';
    },
    birdFly: function (count) {
        this.oBird.style.backgroundPositionX = count % 3 * -30 + 'px';
    },
    birdDrop:function () {
        this.birdTop += ++ this.birdStepY;
        this.oBird.style.top = this.birdTop + 'px';
        this.judgeKnock();
    },
    startBound: function () {
        var preColor = this.startColor;
        this.startColor = preColor ==='blue' ? 'white' : 'blue';
        this.oStart.classList.remove('start-' + preColor);
        this.oStart.classList.add('start-' + this.startColor);
    },
    judgeKnock:function () {
        this.judgeBoundary();
        this.judgePipes();
        // console.log(111)
    },
    judgeBoundary:function () {
        if(this.birdTop < this.minTop || this.birdTop > this .maxTop) {
            this.failGame();
        }
    },
    judgePipes:function () {},
    handle:function () {
        this.handleStart();
    },
    handleStart:function () {
        var self = this;
        this.oStart.onclick = function () {
            self.startFlag = true;
            self.oStart.style.display = 'none';
            self.oScore.style.display = 'block';
            self.skyStep = 5;
            self.oBird.style.left = '30px';
            // self.judgeKnock();
        }
    },
    failGame:function () {
        clearInterval(this.timer);
        this.oMask.style.display = 'block';
        this.oEnd.style.display = 'block';
        this.oBird.style.display = 'none';
        this.oScore.style.display = 'none';
    }
}
// bird.animate();