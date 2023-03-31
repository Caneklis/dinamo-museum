const readMoreLess = function () {

  /**
  * Element.closest() polyfill
  * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
  */
  if (!Element.prototype.closest) {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    Element.prototype.closest = function (s) {
      const el = this;
      const ancestor = this;
      if (!document.documentElement.contains(el)) return null;
      do {
        if (ancestor.matches(s)) return ancestor;
        ancestor = ancestor.parentElement;
      } while (ancestor !== null);
      return null;
    };
  }


  //
  // Settings
  //
  const settings = {
    speed: 300,
    activeClass: 'is-active',
    selector: '[data-more]',
    selectorFooter: '[data-more-footer]',
    selectorTrigger: '[data-more-trigger]',
    selectorContent: '[data-more-content]',
  };


  //
  // Methods
  //

  // Show
  const show = function (trigger, target, parent) {

    // Get the natural height of the element
    const getHeight = function () {
      const height = target.scrollHeight + 'px'; // Get it's height
      return height;
    };

    const height = getHeight(); // Get the natural height
    parent.classList.add(settings.activeClass); // Add active class to the parent element
    target.style.height = height; // Update the max-height

    // Update the text
    const textLess = trigger.dataset.moreTextLess;
    trigger.textContent = textLess;

    // Once the transition is complete, remove the inline max-height so the content can scale responsively
    window.setTimeout(function () {
      target.style.height = '';
    }, settings.speed);

  };

  // Hide
  const hide = function (trigger, target, parent) {

    const heightDefined = target.dataset.moreHeight;

    // Give the element a height to change from
    target.style.height = target.scrollHeight + 'px';
    parent.classList.remove(settings.activeClass);  // Remove active class to the parent element

    // Update the text
    const textMore = trigger.dataset.moreTextMore;
    trigger.textContent = textMore;

    // Set the height back to defined height
    window.setTimeout(function () {
      target.style.height = heightDefined + 'px';
    }, 1);

  };

  // Toggle
  const toggleContent = function (event, trigger) {

    // Variables
    const parent = event.target.closest(settings.selector),
      target = parent.querySelector(settings.selectorContent);

    // If the element is visible, hide it
    if (parent.classList.contains(settings.activeClass)) {
      hide(trigger, target, parent);
      return;
    }

    // Otherwise, show it
    show(trigger, target, parent);

  };

  // Destroy. When the content is shorter, reset height to auto and remove footer button
  const destroy = function (elem) {
    for (let i = 0; i < elem.length; i++) {
      const el = contentElements[i],
        height = el.scrollHeight,
        heightDefined = el.dataset.moreHeight,
        parent = el.closest(settings.selector),
        footer = parent.querySelector(settings.selectorFooter);

      if (height > 0 && height == heightDefined) {
        el.style.height = 'auto';
        footer.style.display = 'none';
      }
    }
  };

  // Click Handler
  const clickHandler = function (event) {

    // Only run if clicked element matches our selector
    const trigger = event.target.closest(settings.selectorTrigger);
    if (trigger) {

      // Prevent default link behavior
      event.preventDefault();

      // Toggle Content
      toggleContent(event, trigger);
    }

  };


  //
  // Inits & Event Listeners
  //

  // Toggle content on click
  document.addEventListener('click', clickHandler, false);

  // Destroy when the real content is shorter than defined height
  const contentElements = document.querySelectorAll(settings.selectorContent);
  destroy(contentElements);


};

export { readMoreLess };
