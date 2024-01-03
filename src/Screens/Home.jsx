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
    const [selectedWeatherDescription, setSelectedWeatherDescription] = useState("");
    const backgroundOpacity = 0.2;
    const [forecast, setForecast] = useState([]);

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
            const requestForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${inputText}&appid=${apiKey}&lang=es&units=Metric`
            const response = await fetch(request);
            const responseForecast = await fetch(requestForecast);
            const result = await response.json(); 
            const result2 = await responseForecast.json();
            console.log("resultado ",result2.list);
            setForecast(result2.list);
            setTemp(result.main.temp);
            setDataWeather(result.weather);
            setCityName(result.name);

        } catch (error) {
            console.error('Error at fetching data:', error);
            showAlert();
            setShowWeather(false)
        }finally {
            setIsLoading(false); 
            
        }

    }


    const handleSearchCity = () => {
        fetchData();
        setShowWeather(true);
    }


    return(
        <div style={{flex: 1}}>
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
                            width: '100%'
                        }}
                    >
                        <h3>Ciudad: {cityName}</h3>
                        <p><b>Temperatura actual:</b> {temp}°</p> 
                        <ul>
                            <h4>Clima: </h4>
                            {dataWeather.map((item, id) => (
                            <li key={id} style={{listStyle: "none"}}>
                                {item.description}
                            </li>
                           
                            ))}
                        </ul>
                        <h3>Pronóstico</h3>
                        <br />
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Día</th>
                                    <th>Hora</th>
                                    <th>Temperatura</th>
                                    <th>Descripción del clima</th>
                                </tr>
                            </thead>
                            <tbody>
                                {forecast && Array.isArray(forecast) && forecast.length > 0 ? (
                                    forecast.map((item, id) => {
                                        const fechaConAnio = new Date(item.dt_txt);
                                        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                                        const diaSemana = diasSemana[fechaConAnio.getDay()];
                                        const horas = fechaConAnio.getHours() + ':' + fechaConAnio.getMinutes();
                                        const fecha = fechaConAnio.getDate();

                                        return (
                                            <tr key={id}>
                                                <td>{diaSemana} {fecha}</td>
                                                <td>{horas}</td>
                                                <td>{item.main.temp}°</td>
                                                <td>{item.weather[0].description}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="4">No hay datos de pronóstico disponibles.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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