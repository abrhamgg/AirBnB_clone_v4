$(document).ready(function () {
    const checkedAmenities = {};
    $(':checkbox').change(function () {
	if (this.checked) {
	    checkedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
	    //console.log(checkedAmenities);
	} else {
		delete checkedAmenities[$(this).attr('data-id')];
	}
	const values = Object.values(checkedAmenities);
	//console.log(values.length)
	//console.log(values);
	if (values.length > 0) {
		$('div.amenities > h4').text(values.join(', '))
	} else {
		$('div.amenities > h4').html('&nbsp');
	}
    });
    $('button').click(function(){
	$('article').remove();
	$.ajax({
		type: 'POST',
    	url: 'http://0.0.0.0:5001/api/v1/places_search/',
    	data: JSON.stringify({'amenities': Object.keys(checkedAmenities)}),
    	contentType: 'application/json',
		success: function (data) {
			for (let i = 0; i < data.length; i++) {
				$('section.places').append('<article><div class="title"><h2>' + data[i].name + '</h2><div class="price_by_night">' + data[i].price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + data[i].max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + data[i].number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + data[i].number_bathrooms + ' Bathroom</div></div><div class="description">' + data[i].description + '</div></article>');
			  }
		}
	})
	
    });
});

$.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
	console.log(data);
	if (data.status === 'OK') {
	    $('#api_status').addClass('available');
		$('#api_status').removeAttr('id');
	    console.log("i AM IN");
	} else {
	    $('#api_status').removeClass('available');
	}
});

$.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
	for (let currentPlace of data) {
	    $('.places').append('<article> <div class="title"> <h2>' + currentPlace.name + '</h2><div class="price_by_night">' + '$' + currentPlace.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPlace.max_guest + ' Guests</div><div class="number_rooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_rooms + ' Bedrooms</div><div class="number_bathrooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_bathrooms + ' Bathroom </div></div> <div class="user"></div><div class="description">' + '$' + currentPlace.description + '</div></article>');
	}
    }
});
