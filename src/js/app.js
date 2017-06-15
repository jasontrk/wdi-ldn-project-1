$(() => {

  $('.form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
    label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
        label.removeClass('active highlight');
      } else {
        label.addClass('active highlight');
      }
    } else if (e.type === 'blur') {
      if( $this.val() === '' ) {
        label.removeClass('active highlight');
      } else {
        label.removeClass('highlight');
      }
    } else if (e.type === 'focus') {

      if( $this.val() === '' ) {
        label.removeClass('highlight');
      }
      else if( $this.val() !== '' ) {
        label.addClass('highlight');
      }
    }

  });

  $('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);
    
  });

  $.get(' https://newsapi.org/v1/articles?source=mtv-news-uk&sortBy=top&apiKey=77552393d57b4f59945d8062a09deaf6')
  .done((news) => {
    for(let i = 0; i < 6; i++){
      $('.news').append(`<a href='${news.articles[i].url} 'target="_blank"<h2>${news.articles[i].title}</h2></a><p>${news.articles[i].description}</p>`);
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
          <h4>${event.eventname}</h4>
          <p><i>${event.date} (${event.openingtimes.doorsopen}-${event.openingtimes.doorsclose})</i></p>
          <p>${event.venue.name} (${event.EventCode})</p>
          <p>${event.description}.</p>
          <a href="${event.link}" class="btn btn-info">More Info</a>
          ${formHTML}
          </div>
          </div>
          </div>
          `);
        });
      });
    }
  });
