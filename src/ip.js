var countries = []
var ips = []


Pusher.logToConsole = true;

var pusher = new Pusher('d3f96738bc8f4a369b91', {
    cluster: 'us2'
});

var channel = pusher.subscribe('abuseipdb');
channel.bind('message', function(data) {
    var node = document.createElement("p");
    
    var api_url = "https://ipapi.co/"+data.message+"/json/";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const jsonip = this.responseText 
            var ip = JSON.parse(jsonip)
            ips.push(ip)
            var country = ip.country_name
            countries.push(country)
            var code = ip.country_code
            var flag = "<img src='https://www.countryflags.io/"+code+"/shiny/32.png' />"
            var message = flag+" Unauthorized connection attempt detected from "+data.message+" to port 22 ("+country+")<br>"

            $("p").append(message);
        }
    }
    xhttp.open("GET", api_url, true);
    xhttp.send();
})
channel.bind('http', function(data) {
    var node = document.createElement("p");
    
    var api_url = "https://ipapi.co/"+data.message+"/json/";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const jsonip = this.responseText 
            var ip = JSON.parse(jsonip)
            ips.push(ip)
            var country = ip.country_name
            countries.push(country)
            var code = ip.country_code
            var flag = "<img src='https://www.countryflags.io/"+code+"/shiny/32.png' />"
            var message = flag+" HTTP hacking attempt from "+data.message+" ("+country+") <br>"
            $("p").append(message);
        }
    }
    xhttp.open("GET", api_url, true);
    xhttp.send();
})
