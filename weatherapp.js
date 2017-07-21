let command = require('./command')
let http = require('http')

var args = command.args //Returns command line arguments


var apikey = "&appid=278f253d08951e564ff22a06c3ed203f" //Personal API key for OpenWeatherAPI

var openweather = "http://api.openweathermap.org/data/2.5/forecast/daily?"

/*
    This method requires that a query is given in order to search for a location to find the weather for.
    This can either be given in terms of zipcode with the -z flag or city with the -c flag.
*/
function queryLocation(){
    if(args == null){
        console.log("Have not entered a location")
    }
    else{
        if(args[0] == "-z"){
        
        return "zip="+args[1]
        
    }
        else if(args[0] == "-c"){
        return "q="+args[1]
        }

        else{
            console.log("INVALID INPUT")
        }
        }
    }

var query = queryLocation()
var url = openweather+query+"&units=imperial"+apikey; //Creates a valid url to GET a http request from
var request = http.get(url, response => {
    var returned = ""
        //Writes the returned JSON as a string in available
        response.on("data", function(d){ 
            returned += d.toString()
        })

        response.on("error", function(e){
            console.error(e.message)
        })
        /*Once it ends, it will convert the string form of the JSON to a JSON object, then it will print out
        then it will print the Weather forcast in a human readable format.
        */
        response.on("end", () =>{
            if(returned != null){
            let jsonbody = JSON.parse(returned)
            for(i = 0; i < jsonbody.cnt; i++){
            var date =  new Date(jsonbody.list[i].dt * 1000)
            console.log(jsonbody.city.name + " on " + date.toDateString() + ": " + jsonbody.list[i].temp.day)
            }
            }
            else{
                console.log("Weather Report unavailable")
            }
        })
})

