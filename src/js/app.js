$(() => {


  const $events = $('.events');

  if($('*[data-location]').length > 0){
    getEvents();
  }



  function getEvents() {


    // Empty out events div first
    $events.empty();

    // Grab the location (lat and lng) from the data attribute
    const location = $('h3').data('location');
    // Adding the radius to the location object


    $.ajax({
      url: '/event',
      method: 'GET',
      data: location
    })
      .then((data) => {
        console.log(data);
        // data.results.forEach((event) => {
        //   $events.append(`
        //     <div class="col-md-6">
        //       <div class="card">
        //         <div class="card-block">
        //           <h4 class="card-title">${event.eventname}</h4>
        //           <p class="card-text">${event.venue.name}</p>
        //           <p class="card-text">${event.venue.type}</p>
        //           <p class="card-text">${event.description}</p>
        //           <a href="${event.link}" class="btn btn-primary">More Info</a>
        //         </div>
        //       </div>
        //     </div>
        //   `);
        // });
      });
  }

});
