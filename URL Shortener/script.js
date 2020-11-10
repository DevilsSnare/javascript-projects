var endpoint = "https://www.jsonstore.io/8ba4fd855086288421f770482e372ccb5a05d906269a34da5884f39eed0418a1";

const form = document.getElementById('form').addEventListener('submit', shortenURL);
function shortenURL() {
    var longURL = getURL();
    genHash();
    requestShorten(longURL);
}
function getURL() {
    var longURL = document.getElementById('longURL').value;
    var protocolOkay = longURL.startsWith("http://") || longURL.startsWith("https://") || longURL.startsWith("ftp://");
    if(protocolOkay) {
        return longURL;
    } else {
        var newURL = "http://" + longURL;
        return newURL;
    }
}
function genHash() {
    if(window.location.hash == "") {
        window.location.hash = getRandom();
    }
}
function getRandom() {
    var randomString = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);
    return randomString;
}
function requestShorten(longURL) {
    this.url = longURL;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contenType': 'application/json; charset=utf-8'
    })
}

var hashx = window.location.hash.substr(1);
if(window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashx, function (data) {
    data = data["result"];
        if (data!=null) {
            window.location.href = data;
        }
    });
}
