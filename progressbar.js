function CircleProgressBar (element) {
  /* we need to build the dom structure to create the progress bar
     that'll looks like this:

      <div class="progressbar">
        <div class="side right">
          <div class="mask">
            <div class="bar"></div>
          </div>
        </div>

        <div class="side left">
          <div class="mask">
            <div class="bar"></div>
          </div>
        </div>
      </div>
  */
  var progressbarEl = document.createElement('div')
  progressbarEl.className = 'progressbar'
  element.appendChild(progressbarEl)

  var sideLeftEl = document.createElement('div')
  sideLeftEl.className = 'side left'
  progressbarEl.appendChild(sideLeftEl)

  var maskLeftEl = document.createElement('div')
  maskLeftEl.className = 'mask'
  sideLeftEl.appendChild(maskLeftEl)

  var barLeftEl = document.createElement('div')
  barLeftEl.className = 'bar'
  maskLeftEl.appendChild(barLeftEl)

  var sideRightEl = document.createElement('div')
  sideRightEl.className = 'side right'
  progressbarEl.appendChild(sideRightEl)

  var maskRightEl = document.createElement('div')
  maskRightEl.className = 'mask'
  sideRightEl.appendChild(maskRightEl)

  var barRightEl = document.createElement('div')
  barRightEl.className = 'bar'
  maskRightEl.appendChild(barRightEl)

  // we'll just use these elements to manipulate the rotation
  this.right = element.querySelector('.right').querySelector('.mask')
  this.left = element.querySelector('.left').querySelector('.mask')

  // this is the method we use to set the degrees with, it can be accessed
  // directly or used by another one of the methods
  this.setDegrees = function (degrees) {
    // ensure value is within 0˚ to 360˚
    degrees = degrees % 360

    // figure out how much each half has to rotate (from 0)
    if (degrees > 180) {
      var rightDegrees = 180
      var leftDegrees = degrees - 180
    } else {
      var rightDegrees = degrees
      var leftDegrees = 0
    }

    // figure in the -180˚ rotation that is our real 0
    var rightDegrees = rightDegrees - 180
    var leftDegrees  = leftDegrees - 180

    // rotatin' time!
    this.right.style.transform = 'rotate('+rightDegrees+'deg)'
    this.left.style.transform  = 'rotate('+leftDegrees+'deg)'
  }


  // for easier use, here's a method which will do the math for you,
  // that way you can set for instance 10 hours out of 12 hours, and it
  // will take care of figuring out how many degrees it is, and set it
  this.setProgressOfTotal = function (progress, total) {
    var factor = 360 / total
    this.setDegrees(progress * factor)
  }
}
