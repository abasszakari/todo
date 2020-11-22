window.addEventListener("load", () => {
    let long;
    let lat;

    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDescription = document.querySelector('.temperature-description');
    let degreeSection = document.querySelector('.degree-section');
    const dateElement = document.querySelector('.date');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let cors = 'http://cors-anywhere.herokuapp.com/'

            const api = `${cors}https://api.darksky.net/forecast/0e10c539dc6523c357f5486132a9d5ba/${lat},${long}`;
            fetch(api)
                .then((response) => response.json())
                .then((data) => {
                    const { temperature, summary, icon } = data.currently;
                    const timezone = data.timezone;
                    temperatureDegree.textContent = Math.round(((temperature - 32) * 5) / 9);
                    document.querySelector('.degree-unit').textContent = "°C";
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = timezone;
                    setIcon(icon, document.querySelector('.icon'));

                    degreeSection.addEventListener('click', () => {
                        if (document.querySelector('.degree-unit').textContent === "°C") {
                            temperatureDegree.textContent = Math.round(temperature);
                            document.querySelector('.degree-unit').textContent = "°F";
                        } else {
                            temperatureDegree.textContent = Math.round(((temperature - 32) * 5) / 9);
                            document.querySelector('.degree-unit').textContent = "°C";
                        }
                    })
                })
        });
    } else {

    }

    function setIcon(icon, iconId) {
        const skycon = new Skycons({ 'color': "white", "resizeClear": true });
        // the icon from the api need to be changed into upper case and the dashes need to be replaced with underscores before passing into Skycons
        const iconFromApi = icon.replace(/-/g, "_").toUpperCase();
        skycon.play();
        return skycon.set(iconId, Skycons[iconFromApi]);
    }

    //show today's date
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    };
    const today = new Date();
    dateElement.innerHTML = today.toLocaleDateString("en-GB", options);
});