import { useState, useEffect } from 'react';
import { Trash } from 'react-bootstrap-icons';

const ListLocations = ({ locationsList, deleteList, onRemoveMany , onSelect, onDeleteOne }) => {

  const [checkedState, setCheckedState] = useState(
    new Array(locationsList.length).fill(false)
  );

  const[toDeleteId, setToDeleteId] = useState(null);

  useEffect(() => {
    const url = 'https://simple-locations-api.herokuapp.com/locations/' +toDeleteId;
    const options = {
      method: 'DELETE',
    };
    if(toDeleteId) {
      fetch(url,options)
      .then(resp => resp.json() )
      .then( data => {
        onDeleteOne(data);
      })
    }
  }, [onDeleteOne, toDeleteId])

  const handleOnChange = (position, location) => {
    let existe = false;
    let number = 0;

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    deleteList.map((element, index) => {
      if (element === location) {
        existe = true;
        number = index;
      }
    });

    if(existe === false && updatedCheckedState[position]) {
      deleteList.push(location._id);
    } else if(!existe && !updatedCheckedState[position]) {
      deleteList.splice(number, 1);
    }
    
    setCheckedState(updatedCheckedState);
  };

  const handleRemoveMany = () => {
    onRemoveMany(deleteList);
  }
  
  return (
    <div>
      <div className="row">
        {
          locationsList.map( (location, index) => (
            <div className="card bg-light mb-3" key={location._id}>
              <div class="card-header">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name="location"
                  value={location}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index, location)}
                />
                {location.alias}
                <button type="button" className="btn" onClick={() => setToDeleteId(location._id) }>
                  <Trash />
                </button>
              </div>
              <div className="card-body">
                <p className="card-text">{location.address}</p>
                <button type="button" className="btn btn-primary" onClick={() => onSelect(location) }>
                  Seleccionar
                </button>
              </div>
            </div>
          ))
        }
      </div>
      <button type="button" className="btn btn-primary" onClick={handleRemoveMany}>
        Eliminar
      </button>
    </div>
  )
}

export default ListLocations
