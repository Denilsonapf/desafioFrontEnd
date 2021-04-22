
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/sidebar'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, DistanceMatrixService} from '@react-google-maps/api';
import Geocode, { fromAddress } from 'react-geocode';
import './maps.css';


function Listar(){

    Geocode.setApiKey("AIzaSyDPpvEHPjxbQ3fCQFWghr74kYXulGO1pQY");

    Geocode.setLanguage("pt-BR");


    Geocode.setRegion("br");

    Geocode.setLocationType("ROOFTOP");



    const from = useSelector(state => state.from);
    const to = useSelector(state =>state.to);
    const [response, setResponse] = useState(false);
    const [latitudeOrigin, setLatitudeOrigin] = useState('');
    const [longitudeOrigin, setLongitudeOrigin] = useState('');
    const [latitudeDestination, setLatitudeDestination] = useState('');
    const [longitudeDestination, setLongitudeDestination] = useState('');
    const [tempoRota, setTempoRota] = useState('');
    const [distancia, setDistancia] = useState('');
    const [mapRender, setMapRender] = useState(true);


    const mapsOption = {
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        draggableCursor: null,
        disableDefaultUI: true,
    }

    const directionsCallback = (response) => {
        console.log(response)
        if (response!=null){
            if(response.status === 'OK'){
               setResponse(response)
               
            }if (response.status === 'NOT_FOUND' && mapRender===true){
                setMapRender(false)
                alert("Endereço incorreto")
            } 
        } 
    }

    async function fromAddres(address){
        await Geocode.fromAddress(address).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            if(address === from){
                setLatitudeOrigin(lat)
                setLongitudeOrigin(lng)
            } else{
                setLatitudeDestination(lat)
                setLongitudeDestination(lng)
            }
           
          },
          (error) => {
            console.error(error);
          }
        );
        
        return null;
        }
  
    useEffect(()=>{
  
        fromAddres(from);
        fromAddres(to);
    },[]);
    
    
   

    return(
        <div><Sidebar />
            <center>
           <LoadScript
                id='monitoring-map'
                googleMapsApiKey="AIzaSyDPpvEHPjxbQ3fCQFWghr74kYXulGO1pQY"
            >   { mapRender!== false ?
                <GoogleMap
                    id='direction'
                    mapContainerStyle={{
                        height: '60vh',
                        width: '80%',
                        marginTop:'60px',
                        justifySelf:'center'
                    }}
                    options={mapsOption}
                    zoom={10}
                >
                    <DirectionsService
                        options={{
                            destination:from,
                            origin:to,
                            travelMode:'DRIVING'
                        }}
                        callback={directionsCallback}
                    />
                    {response ?
                    <DistanceMatrixService
                        options={{
                            origins: [{lng: longitudeOrigin, lat:latitudeOrigin}],
                            destinations: [{lng: longitudeDestination, lat: latitudeDestination}],
                            travelMode:'DRIVING'
                        }}
                        origins={fromAddres(from)}
                        callback={(response) => {setTempoRota(response?.rows[0].elements[0].duration?.text)
                            setDistancia(response?.rows[0].elements[0].distance?.text)
                        }}
                        />
                        : null
                        
                    }
                        {response!=null ?
                         <DirectionsRenderer
                            options={{
                                directions:response
                            }}
                         />
                            : null
                        }

                </GoogleMap>
            :null

            }

          </LoadScript>
          
            <div id="text" class="layout-span">
                <div>
                    <span>Tempo Estimado: {tempoRota}</span>
                </div>
                <div>
                    <span>Distância: {distancia}</span>
                </div>
            </div>  
           
          </center>
            

        </div>
    )
}
export default Listar;