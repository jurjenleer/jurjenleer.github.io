var imageUrls = []
var titles = []
var objectIDs = []

function fetchPainting() {
    search();
    return false; // Required for the button not to reload the page!
}

//get data
function search() {
    var toSearchFor = $('#query').val();

    var url = "https://www.rijksmuseum.nl/api/nl/collection?q=" + toSearchFor + "&key=d2M3wI6w&format=json";

    var jsonRequested = $.getJSON(url)
        .done(function (data) {
            console.log(data);
            $("#gallery").remove();

            var linkDiv = $('<div />').attr('id', 'gallery').attr('style', 'display:none');

            // create a row for each art object found
            $.each(data.artObjects, function (index, object) {
                console.log(object);
                if (object.webImage != null) {
                    var image = $('<img />').attr('src', object.webImage.url)
                        .attr('alt', object.title)
                        .attr('data-image', object.webImage.url)
                        .attr('data-description', object.title);

                    linkDiv.append(image);

                    imageUrls.push(object.webImage.url);
                    titles.push(object.title);
                    objectIDs.push(object.id);
                }

            })
            console.log(linkDiv);

            $('body').append(linkDiv);
            $("#gallery").unitegallery({
                tiles_type: "nested"
            });

            console.log(imageUrls);
            console.log(objectIDs);
            console.log(titles);
        })
        .fail(function () {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        })
        .always(function () {
            console.log("complete");
        });
}


