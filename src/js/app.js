$(() => {


  $.get(' https://newsapi.org/v1/articles?source=mtv-news-uk&sortBy=top&apiKey=77552393d57b4f59945d8062a09deaf6')
  .done((news) => {
    for(let i = 0; i < 6; i++){
      if(!news.articles[i]) continue;
      $('.news').append(`<br><h4 href='${news.articles[i].url} 'target="_blank"<br>${news.articles[i].title}</h4><p>${news.articles[i].description}</p>`);
    }
  });

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

    // function hidebutton () {
    //   if(locals.isAuthenticated){
    //     $('.changedisplay').addClass('hidden');
    //   } else {
    //     $('.changedisplay').removeClass('hidden');
    //   }
    // }

    // hidebutton();

    $.ajax({
      url: '/event',
      method: 'GET',
      data: location
    })
    .then((data) => {
      data.results.forEach((event) => {
        // Ternary Operator. If comparison arguement is true then do the truthy arguement. If false, do the falsey arguement. Here I am saying, if userID is present, have hidden event details on page and add to the myevents page
        const formHTML = userId ? `
        <form action="/registrations/${userId}/events" method="POST">
          <input type="hidden" name="name" value="${event.eventname}">
          <input type="hidden" name="venue" value="${event.venue.name}">
          <input type="hidden" name="location" value="${event.venue.address}">
          <input type="hidden" name="description" value="${event.description}">
          <input type="hidden" name="category" value="${event.venue.type}">
          <input type="submit" class="btn btn-info" value="Add to MyEvents">
        </form>` : '<a href="/login" id="hidebtn" class="btn btn-info changedisplay">Login to add to MyEvents</a>';

        console.log(event);
        $events.prepend(`
          <div class="col-md-6">
          <div class="card">
          <div class="card-block">
          <h4>${event.eventname}</h4>
          <p><i>${event.date} (${event.openingtimes.doorsopen}-${event.openingtimes.doorsclose})</i></p>
          <p>${event.venue.name} (${event.EventCode})</p>
          <p>${event.description}.</p>
          <a href="${event.link}" target="_blank" class="btn btn-info">More Info</a>
          ${formHTML}
          </div>
          </div>
          </div>
          `);
        });
      });
    }
  });
