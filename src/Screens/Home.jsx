import React from "react";
import { useState, useEffect } from "react";

const Home = () => {
    const [dataWeather, setDataWeather] = useState([]);
    const [showWeather, setShowWeather] = useState(false);
    const apiKey = "d9a6578b0d7f172fc32089f711b3618f";
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [temp, setTemp] = useState("");
    const [cityName, setCityName] = useState("");
    const [brackImage, setBackImage] = useState("");
    const [selectedWeatherDescription, setSelectedWeatherDescription] = useState("");
    const backgroundOpacity = 0.2;

    useEffect(() => {
        if (dataWeather.length > 0) {
            setSelectedWeatherDescription(dataWeather[0].main);
        }
    }, [dataWeather]);

    const showAlert = () => {
        window.alert("Ingrese una ciudad existente ");
    };

    const backgroundImage = selectedWeatherDescription == "Clouds"
    ? `url("./src/assets/cloudy1.jpg")`
    : selectedWeatherDescription == "Clear" ? `url("./src/assets/sunny1.jpg")`
    : `url("./src/assets/rain1.jpg")`
    console.log(selectedWeatherDescription)


    const fetchData = async () => {
        try {
            setIsLoading(true);
            console.log("Ciudad", inputText);
            const request = `http://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${apiKey}&lang=es&units=Metric`;
            console.log(request);
            const response = await fetch(request);
            const result = await response.json(); 
            setTemp(result.main.temp);
            setDataWeather(result.weather);
            setCityName(result.name);

        } catch (error) {
            console.error('Error at fetching data:', error);
            showAlert();
        }finally {
            setIsLoading(false); 
        }

    }


    const handleSearchCity = () => {
        fetchData();
        setShowWeather(true);
    }


    return(
        <div>
            <h2 style={{color: 'blue', marginBottom: 60}}>Información del clima</h2>

            <label>Ciudad:</label>
            <br />
            <input 
                type="text" 
                style={{marginBottom: 20}} 
                onChange={(event) => {
                    setInputText(event.target.value)
                }}
            />
            <br />
            <button 
                type="button" 
                onClick={handleSearchCity} 
                disabled={isLoading}
                style={{backgroundColor: "silver"}}
            >
                Consultar
            </button>

            
            {showWeather ? ( //Si aun no se presiona el boton buscar, solo mostrar imagen         
                <>
                    <div 
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, ${backgroundOpacity}), rgba(0, 0, 0, ${backgroundOpacity})), ${backgroundImage}`,
                            backgroundSize: 'cover', 
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            color: 'black', 
                            padding: '20px',
                            marginTop: 20,
                        }}
                    >
                        <h3>Cuidad: {cityName}</h3>
                        <p><b>Temperatura actual:</b> {temp}°</p> 
                        <ul>
                            <h4>Clima: </h4>
                            {dataWeather.map((item, id) => (
                            <li key={id} style={{listStyle: "none"}}>
                                {item.description}
                            </li>
                           
                            ))}
                        </ul>
                    </div>
                </>
                
            ) : (
                <>
                <p>Ingrese una ciudad</p>
                <img 
                src="./src//assets/home1.png" 
                style={{width: "60%" }}
                alt="" />
                </>    
            )}



        </div>

    );
}
export default Home