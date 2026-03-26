import { use, useEffect } from 'react'
import './Topbar.css'
import AuraUILogo from '../../assets/logo.png'

export default function Topbar({schema}) {
  const sendData = async () => {
    // Establish communication with the server on this line, move to your Python IP address with the host 0.0.0.0 in Flask
    // Hacer la comunicacion con el servidor en esta linea mover a su IP de python con el host 0.0.0.0 en flask
    try {
      const url = 'http://ip/project/save';
      //POST method to the server
      //Metodo POST al servidor
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schema) 
      });
      //If the project was uploaded successfully
      //Si se subio correctamente el proyecto
      if (response.ok) {
        const result = await response.json();
        console.log("Data saved successfully!", result);
        alert("Project saved successfully");
        //If there were errors
        //Si existieron errores
      } else {
        console.error("Error");
        alert("There was an error saving");
      }
    } catch (error) {
      console.error("Error de red o de servidor:", error);
      alert("Unable to connect to the server");
    }
  }
  return (
    
    <div className='topbar'>
        <div className='details-proyect'>
            <img src={AuraUILogo} alt="404" />
            <h2>Aura UI</h2>
            <div style={{height: '60%', borderLeft: '2px solid rgb(46, 46, 53)', width: '1px', marginLeft: '30px', marginRight: '30px'}}></div>
            <h3>AURA BETA TEST</h3>
        </div>
        <div className='actions'>
            <button onClick={sendData}>Render</button>
        </div>
    </div>
  )
}
