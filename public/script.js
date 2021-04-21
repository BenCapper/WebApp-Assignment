
$(".deleteBuilding").click(() => confirm('Are you sure you want to delete this building?'));
$(".deleteCampus").click(() => confirm('Are you sure you want to delete this campus?'));
$(".deleteRoom").click(() => confirm('Are you sure you want to delete this room?'));
$(".deleteClass").click(() => confirm('Are you sure you want to delete this class?'));
function initMap() {
const home = { lat: 52.24297, lng: -6.95122 };
// The map, centered at Uluru
const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 15,
  center: home,
});

// The marker, positioned at Uluru
const marker = new google.maps.Marker({
  position: home,
  map: map,
});
}

  
