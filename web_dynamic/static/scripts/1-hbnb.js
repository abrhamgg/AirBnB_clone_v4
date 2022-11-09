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
});