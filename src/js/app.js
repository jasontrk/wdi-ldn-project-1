$(() => {

  const $slider = $('input[type="range"]');
  const $distance = $('.distance');
  const $events = $('.events');
  const userId = $('[data-id]').data('id');
  console.log(userId);

  if($('*[data-location]').length > 0){

    getEvents();
  }

  $slider.on('change', getEvents);


  function getEvents() {

    // Grab current value from range
    const radius = $slider.val();
    $distance.text(radius);

    // Empty out events div first
    $events.empty();

    // Grab the location (lat and lng) from the data attribute
    const location = $('h3').data('location');
    // Adding the radius to the location object
    location.radius = radius;


    $.ajax({
      url: '/event',
      method: 'GET',
      data: location
    })
    .then((data) => {
      data.results.forEach((event) => {
        const formHTML = userId ? `<form action="/registrations/${userId}/events" method="POST">
        <input type="hidden" name="name" value="${event.eventname}">
        <input type="hidden" name="venue" value="${event.venue.name}">
        <input type="hidden" name="location" value="${event.venue.address}">
        <input type="hidden" name="description" value="${event.description}">
        <input type="hidden" name="category" value="${event.venue.type}">
        <input type="submit" value="Add to MyEvents">
        </form>` : '';

        console.log(event);
        $events.prepend(`
          <div class="col-md-6">
          <div class="card">
          <div class="card-block">
          <h4 class="card-title">${event.eventname}</h4>
          <p class="card-text">${event.venue.name}</p>
          <p class="card-text">${event.venue.type}</p>
          <p class="card-text">${event.description}</p>
          <a href="${event.link}" class="btn btn-primary">More Info</a>
          ${formHTML}
          </div>
          </div>
          </div>
          `);
      });
    });
  }
});
