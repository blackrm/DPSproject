!(function (d) {
  // These variables target the base class, get carousel items, count the carousel items, set the slide to 0 (current frame), and set motion to true, disabling interactivity.
  var itemClassName = "carousel__photo";
  items = d.getElementsByClassName(itemClassName),
    totalItems = items.length,
    slide = 0,
    moving = true;

  // Initializes the carousel by updating the DOM with classes
  function setInitialClasses() {

    // Target the last, initial, and next items and give them the relevant class.
    // This assumes there are three or more items.
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
  }

  // Sets click events to navigation buttons

  function setEventListeners() {
    var next = d.getElementsByClassName('carousel__button--next')[0],
      prev = d.getElementsByClassName('carousel__button--prev')[0];

    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
  }

  // Disable interaction by setting 'moving' to true for the same duration as the transition
  function disableInteraction() {
    moving = true;

    setTimeout(function () {
      moving = false
    }, 500);
  }

  function moveCarouselTo(slide) {

    // Check if carousel is moving, and, if not, allow interaction
    if (!moving) {

      // temporarily disables interactivity
      disableInteraction();

      // Set variables for the current next and previous slide, as well as the potential next or previous slide.
      var newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;

      // Checks to see if carousel has more than three items
      if ((totalItems - 1) > 3) {

        // Checks to see if the new potential slide is out of bounds and sets slide numbers
        if (newPrevious <= 0) {
          oldPrevious = (totalItems - 1);
        } else if (newNext >= (totalItems - 1)) {
          oldNext = 0;
        }

        // Check to see if current slide is at the beginning or end and sets slide numbers
        if (slide === 0) {
          newPrevious = (totalItems - 1);
          oldPrevious = (totalItems - 2);
          oldNext = (slide + 1);
        } else if (slide === (totalItems - 1)) {
          newPrevious = (slide - 1);
          newNext = 0;
          oldNext = 1;
        }

        // Triggering the carousel's transitions by adding/removing classes

        // Based on the current slide, reset to default classes.
        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;

        // Add the new classes
        items[newPrevious].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[newNext].className = itemClassName + " next";
      }
    }
  }

  // Next navigation handler
  function moveNext() {

    // Check if moving
    if (!moving) {

      // If it's the last slide, reset to 0, else +1
      if (slide === (totalItems - 1)) {
        slide = 0;
      } else {
        slide++;
      }

      // Move carousel to new slide
      moveCarouselTo(slide);
    }
  }

  // Previous navigation handler
  function movePrev() {

    // Check if moving
    if (!moving) {

      // If it's the first slide, set as the last slide, else -1
      if (slide === 0) {
        slide = (totalItems - 1);
      } else {
        slide--;
      }

      // Move carousel to new slide
      moveCarouselTo(slide);
    }
  }

  // Initialise carousel
  function initCarousel() {
    setInitialClasses();
    setEventListeners();

    // Set moving to false because the carousel is ready
    moving = false;
  }

  // Time to CAROUSEL
  initCarousel();

}(document));