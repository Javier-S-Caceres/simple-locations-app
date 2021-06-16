import React, {useState, useEffect} from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const AutoComplete = ({ onAdd }) => {
  const[alias, setAlias] = useState("");
  const[address, setAddress] = useState("");
  const[coordinates, setCoordinates] = useState({lat: null, lng: null});
  const[finalLocation, setFinalLocation] = useState(null);
  const[existError, setExistError] = useState(false);

  useEffect(() => {
    const url = 'https://simple-locations-api.herokuapp.com/locations/create';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalLocation)
    };
    if(finalLocation) {
      fetch(url,options)
      .then(resp => resp.json() )
      .then( data => {
        setAlias("");
        setAddress("");
        onAdd(data);
      })
    }
  }, [finalLocation, onAdd])

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  }

  const handleAliasChange = async (e) => {
    setAlias(e.target.value);
  }

  const createLocation = async () => {
    if(alias !== "" && address !== ""){
      setExistError(false);
      const newLocation = {
        coordinates: [
          {
            lat: coordinates.lat,
            lng: coordinates.lng
          }
        ],
        alias: alias,
        address: address,
      }
      setFinalLocation(newLocation);
    } else {
      setExistError(true);
    }
    
  }

  return (
    <div>
      <input type="text" value={alias} placeholder="Alias" onChange={handleAliasChange} />
      <PlacesAutocomplete 
        value={address} 
        onChange={setAddress} 
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Type address" })} />

            <div>
              {loading ? <div>Cargando...</div>: null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                }
                return <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <br/>
      <button type="button" className="btn btn-primary" onClick={() => createLocation() }>
        Agregar Direccion
      </button>
      { existError ? <div className="error">Debe inbresar alias y direccion.</div> : <></> }
      <br/>
    </div>
  )
}

export default AutoComplete
