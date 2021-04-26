function getIconUrl(weatherArr){
	if(weatherArr == undefined) return ""

	let icon = weatherArr[0].icon
	return "http://openweathermap.org/img/wn/"+icon+"@2x.png"
}

function callApi(){
	let api = "20ac85b823908fb36a6dfb9a8b5bc8a1"
	let lat="50.4134087"
	let lon="2.5438093"
	let part=""
	return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${api}&lang=fr&units=metric`
}
const dateOption = {
	full:{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
	dayLong:{ weekday: 'long'},
	dayShort:{ weekday: 'short'},
	dayAndDate:{ weekday: 'short',  month: 'numeric', day: 'numeric' },
}
function convertDate(timestamp,dayDateOptions){
	if(timestamp==undefined) return ""

	let tempDate = new Date(timestamp*1000)

	return tempDate.toLocaleDateString('fr-FR', dayDateOptions)
}

function getTime(timestamp){
	let tempDate = new Date(timestamp*1000)
	return tempDate.getHours()+":"+(tempDate.getMinutes()<10?'0':'') + tempDate.getMinutes()
	
}
function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
    return arr[(val % 16)];
}
function calcWindAngle(angle){
	let rotationAngle = 90+angle
	return "transform: rotate("+rotationAngle+"deg)"
}
function weatherData() {
	return {
		dataFetched: false,
		current: {},
		daily: [],
		fetchData() { 
			fetch(callApi())
				.then(response => response.json())
				.then(json => {
					this.dataFetched = true;
					this.current ={...json.current}
					this.daily=[...json.daily]
					console.log(json)
				})
		}
	}
}



