import React, {useState, useEffect} from 'react'
import Map from './map/Map'
import ListLocations from './ListLocations'
import AutoComplete from './map/Autocomplete'

const MainPage = () => {
  const [locationsList, setLocationsList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [loading, setLoading] = useState(false);
  const deleteList = [];
  const url = 'https://simple-locations-api.herokuapp.com/locations/'

  useEffect(() => {
    const options = {
      method: 'GET'
    }
    fetch(url, options)
    .then(resp => resp.json() )
    .then( data => {
      setLocationsList(data);
      setSelectedLocation(data[0])
      
    })
  }, [])


  const handleRemoveMany = (deleteList) => {
    let newList = [];
    deleteList.forEach(element => {
      newList.push(element._id);
    });
    console.log('En Delete many'+JSON.stringify(newList))
  }

  const handleSelect = (location) => {
    setLoading(true);
    const newLocation = location;
    setSelectedLocation(newLocation);

  }

  const handleAdd = (location) => {
    let newList = locationsList;
    newList.push(location);
    setLocationsList(newList);
  }

  const handleDeleteOne = (location) => {
    let newList = locationsList;
    const index = newList.map(function(item) { return item._id; }).indexOf(location._id);
    if (index !== -1) newList.splice(index, 1);
    setLocationsList(newList);
  }
  
  return (
    <div className="App">
      {
        !loading ? <Map locations={selectedLocation} /> : <></>
      }
      <AutoComplete onAdd={handleAdd} />
      {
        locationsList.length !== 0 ?
        <ListLocations
          locationsList={locationsList} 
          deleteList={deleteList} 
          onRemove={handleRemoveMany} 
          onSelect={handleSelect}
          onDeleteOne={handleDeleteOne}
        />
        : <></>
      }
    </div>
  );
}


export default MainPage;
