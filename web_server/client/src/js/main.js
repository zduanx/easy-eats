export const loadImage = (id, targetId) => {
  // Either an <img>, or an element with a "data-image" attribute
  var el = document.getElementById(id);

  // Either the same element as above, or the targetId element
  var targetEl = targetId ? document.getElementById(targetId) : el;

  // Either the loaded <img>, or the path specified by the "data-image" attribute
  var imageToLoad;

  if (el.dataset.image) {
    imageToLoad = el.dataset.image;
  } else {
    imageToLoad = el.src;
  }

  if (imageToLoad) {
    var img = new Image();
    img.src = imageToLoad;
    img.onload = function() {
      targetEl.classList.add('is-loaded');
    };
  }
};