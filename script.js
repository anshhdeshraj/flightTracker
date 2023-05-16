document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  
  document.getElementById('spinner-container').innerHTML = `<div id="loader"><div id="cutoff"></div></div>`
  function fetchSearch() {

    const flight_iata = document.getElementById("searchBox").value;
   
    const API_KEY = "YOUR_API_KEY";
    fetch(
      `https://airlabs.co/api/v9/flight?flight_icao=${flight_iata}&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        document.getElementById('loader').style.display = 'none';
        document.getElementById('error-container').style.display = 'none';
         arr_iata = data.response.arr_iata;
         dep_iata = data.response.dep_iata;
         arr_time = data.response.arr_time;
         dep_time = data.response.dep_time;
         duration = data.response.duration;
         status = data.response.status;
         duration = (duration/60);
         duration = String(duration)
        hours = duration[0];
        minutes = duration.slice(2, 4);
        arr_time = arr_time.slice(11, 16);
        dep_time = dep_time.slice(11, 16);
        const status_txt = document.getElementById('status');
        const status_container = document.getElementById('status-container');
        document.getElementById('timings-container-1').style.display = 'flex';
        document.getElementById('timings-container-2').style.display = 'flex';
        status_container.style.display = 'block';
        if (status == 'scheduled'){
          status_container.style.backgroundColor = 'rgb(5, 201, 5)';
        }
        else if(status == 'delayed'){
          status_container.style.backgroundColor = 'red';
        }
        else{
          status_container.style.backgroundColor = 'rgb(238, 205, 18)';
        }
        status_txt.innerHTML = `${status}`;
        status_container.style.display = 'block';
        function arrivalName(){
          fetch(`https://airlabs.co/api/v9/airports?iata_code=${dep_iata}&api_key=${API_KEY}`)
          .then(res => res.json())
          .then(data => {
             const dep_name = data.response[0].name;
            document.getElementById('arrow-icon').style.display = 'flex';
            document.getElementById('flight-data-header').style.display = 'block';
            document.getElementById('arr-name').innerHTML = `${dep_name}`;
            document.getElementById('arr-time').innerHTML = `${arr_time}`;
            document.getElementById('dep-time').innerHTML = `${dep_time}`;
            document.getElementById('duration-of-flight').innerHTML = ` ${hours} hours ${minutes} minutes`
          })
          .catch(err => console.log(err));
        }
        function departureName(){
          fetch(`https://airlabs.co/api/v9/airports?iata_code=${arr_iata}&api_key=${API_KEY}`)
          .then(res => res.json())
          .then(data => {
             const arr_name = data.response[0].name;
             document.getElementById('dep-name').innerHTML = `${arr_name}`
          })
          .catch(err => console.log(err));
        }


        arrivalName();
        departureName();

      })
      .catch((err) => console.log(err));
  }
  fetchSearch();
})
