import React, { useState, useEffect } from 'react';
import './WidgetPropierties.css';
import DeleteIcon from '../../../assets/icons/delete.png';
import { RgbaColorPicker } from "react-colorful";

export default function WidgetPropierties({ slot, onChange }) {
  // Status for Slot Background Color
  // Estado para el color del Fondo del Slot
  const [slotcolor, setSlotColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  // Status for Text Color
  // Estado para el color del Texto del Widget
  const [textcolor, setTextColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  // Status for Button Color
  // Estado para el color del boton
  const [buttonColor, setButtonColor] = useState({ r: 255, g: 255, b: 255, a: 1})
  // Status for Text Button Color
  // Estado para el color del texto del boton
  const [buttontextColor, setButtonTextColor] = useState({ r: 0, g: 0, b: 0, a: 1 })
  //Direction of where the page is going
  //Direccion de hacia donde va la pagina
  const [page, setPage] = useState('')

  //Function to update the FoTo property of the button
  //Funcion para actualizar la propiedad GoTo del button
  const changeGotTo = (e) => {
    updateWidget('GoTo', e.target.value)
  } 

  //Function to delete the widget
  //Funcion para eliminar el widget  
  const deleteWidget = () => {
    onChange({...slot, widget:[]});
  }

  // Synchronize colors when the selected slot changes
  // Sincronizar los colores cuando el slot seleccionado cambia
  useEffect(() => {
    if (slot) {
      setSlotColor({
        r: slot.backgroundColor[0],
        g: slot.backgroundColor[1],
        b: slot.backgroundColor[2],
        a: slot.backgroundColor[3]
      });

      if (slot.widget.length > 0 && slot.widget[0].type === 'text') {
        const c = slot.widget[0].color;
        setTextColor({ r: c[0], g: c[1], b: c[2], a: c[3] });
      }
    }
  }, [slot.id]); // It runs every time you change slots - Se ejecuta cada vez que cambias de slot 

  // Function to update the slot background
  // Función para actualizar el fondo del slot
  const updateSlotBackground = (newColor) => {
    setSlotColor(newColor);
    const colorArray = [newColor.r, newColor.g, newColor.b, newColor.a];
    onChange({ ...slot, backgroundColor: colorArray });
  };

  // Function to update widget properties using key:value
  // Función para actualizar propiedades del widget con clave:valor
  const updateWidget = (key, value) => {
    const updatedWidgets = slot.widget.map((w, index) => {
      if (index === 0) return { ...w, [key]: value };
      return w;
    });
    onChange({ ...slot, widget: updatedWidgets });
  };

  // Specific function for text color
  // Función específica para el color del texto
  const handleTextColorChange = (newColor) => {
    setTextColor(newColor);
    const colorArray = [newColor.r, newColor.g, newColor.b, newColor.a];
    updateWidget('color', colorArray);
  };

  //Function to change the button color
  //Funcion para cambiar el color del boton
  const handleButtonColorChange = (newColor) => {
    setTextColor(newColor);
    const colorArray = [newColor.r, newColor.g, newColor.b, newColor.a];
    updateWidget('backgroundColor', colorArray);
  };

  //Function to change the color of the button text
  //Funcion para cambiar el color del texto del boton
  const handleTextButtonColorChange = (newColor) => {
    setTextColor(newColor);
    const colorArray = [newColor.r, newColor.g, newColor.b, newColor.a];
    updateWidget('textColor', colorArray);
  };
    //Check if a widget exists in the slot
    //Verificacion si existe un widget en el slot
  const data_slot = () => {
    if (slot.widget.length === 0) {
      return (
        <div>
          <h1 className='tittle-propiertie'>No widget data</h1>
        </div>
      );
    } 

    const propiertiesSlot = slot.widget[0];
    const minSize = 1;

    if (propiertiesSlot.type === 'text') {
      return ( 
        <div className='text-propierties'>
          <div className='tittle-propierties row-data'>
            <h2>WIDGET PROPIERTIES</h2>
            <img src={DeleteIcon} alt="Delete" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={deleteWidget}/>
          </div>
          <h1 className='tittle-propiertie'>Font Size</h1>
          <input
            type="number"
            min={minSize}
            value={propiertiesSlot.fontsize}
            onChange={(e) => {
              let val = parseInt(e.target.value, 10) || minSize;
              updateWidget('fontsize', val);
            }}
            style={{ marginLeft: '10px' }}
          />
          
          <h1 className='tittle-propiertie'>Text</h1>
          <textarea
            value={propiertiesSlot.text}
            onChange={(e) => updateWidget('text', e.target.value)}
            rows={7}
            style={{ marginLeft: '10px', width: '90%' }}
          />

          <h1 className='tittle-propiertie'>Text Color</h1>
          <RgbaColorPicker 
            style={{ marginLeft: '10px' }} 
            color={textcolor} 
            onChange={handleTextColorChange} 
          />
        </div>
      );
    }

    if (propiertiesSlot.type === 'image') {
      return (
        <div className='text-propierties'>
          <div className='tittle-propierties row-data'>
            <h2>WIDGET PROPIERTIES</h2>
            <img src={DeleteIcon} alt="Delete" style={{ width: '30px', height: '30px', cursor: 'pointer' } } onClick={deleteWidget}/>
          </div>
          <h1 className='tittle-propiertie'>Source (Only web images)</h1>
          <input 
            type="text" 
            value={propiertiesSlot.source || ''}
            onChange={(e) => updateWidget('source', e.target.value)}
            style={{ marginLeft: '10px' }} 
          />
        </div>
      );
    }

    if (propiertiesSlot.type === 'button') {
      return (
        <div className='text-propierties'>
          <div className='tittle-propierties row-data'>
            <h2>WIDGET PROPIERTIES</h2>
            <img src={DeleteIcon} alt="Delete" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={deleteWidget}/>
          </div>
          <h1 className='tittle-propiertie'>Text</h1>
          <input 
            type="text" 
            value={propiertiesSlot.text || ''}
            onChange={(e) => updateWidget('text', e.target.value)}
            style={{ marginLeft: '10px' }} 
          />
          <h1 className='tittle-propiertie'>Button color</h1>
          <RgbaColorPicker 
            style={{ marginLeft: '10px', marginTop: '10px'}} 
            color={buttonColor} 
            onChange={handleButtonColorChange} 
          />
          <h1 className='tittle-propiertie'>Text color</h1>
          <RgbaColorPicker 
            style={{ marginLeft: '10px', marginTop: '10px'}} 
            color={buttontextColor} 
            onChange={handleTextButtonColorChange} 
          />
          <h1 className='tittle-propiertie'>Go To</h1>
          <select style={{ marginLeft: '10px'}} onChange={changeGotTo} value={propiertiesSlot.GoTo}>
            <option>Page 1</option>
            <option>Page 2</option>
            <option>Page 3</option>
          </select>
        </div>
      );
    }
  };

  return (
    <div className='sidebar-propierties'>
      <div className='tittle-propierties'>
        <h2>SLOT PROPIERTIES</h2>
      </div>
      <div className='slot-propiertie'>
        <RgbaColorPicker color={slotcolor} onChange={updateSlotBackground} />
      </div>
      
      {data_slot()}
    </div>
  );
}
