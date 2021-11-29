import React from 'react'

function NewPOIForm() {
  return (
    <div>
      <h1>Add a POI</h1>
      <p>You can add a POI here.</p>
    </div>
  )
}

function AddPOI({sidebarSetter}) {
  function showAddPOI() {
    sidebarSetter.setContent(<NewPOIForm />);
    sidebarSetter.setVisible(true);
  }

  return (
    <button className="add-POI" type="button" onClick={showAddPOI}>Add POI</button>
  )
}

export default AddPOI
