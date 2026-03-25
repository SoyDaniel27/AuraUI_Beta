import { useState } from 'react'
import './RowPropierties.css'

/**
 * Panel de propiedades para configurar una fila (Row) dentro del editor.
 * Permite gestionar el número de columnas (slots) y la altura de la fila.
 */
export default function RowPropierties({ data, onUpdate, onDelete }) {
  // Configuración de límites para la rejilla
  const min = 1;
  const max = 4;

  /**
   * Maneja el cambio en el número de columnas.
   * Sincroniza el arreglo de 'slots' para añadir nuevos objetos o eliminar sobrantes
   * manteniendo la integridad de los datos existentes.
   */
  const handleChange = (e) => {
    let newValue = parseInt(e.target.value, 10);
    
    // Validación de límites (Clamping)
    if (newValue > max) newValue = max;
    if (newValue < min || isNaN(newValue)) newValue = min;

    const slots = data.slots;
    const newdata = [];

    // Ajustamos la estructura de los slots basándonos en el nuevo valor de columnas
    for (let i = 0; i < newValue; i++) {
      if (i < slots.length) {
        // Preservamos el slot existente para no perder su configuración
        newdata.push(slots[i]);
      } else {
        // Inicializamos un nuevo slot con valores por defecto
        newdata.push({
          id: Date.now() + i, 
          value: `Slot ${i + 1}`,
          backgroundColor: [255, 255, 255, 255], 
          widget: []
        });
      }
    }

    onUpdate({ ...data, columns: newValue, slots: newdata });
  }

  /**
   * Actualiza la altura de la fila en píxeles.
   * @default 10px si el valor ingresado es inválido.
   */
  const handleHeightChange = (e) => {
    let newHeight = parseInt(e.target.value, 10);
    onUpdate({ ...data, height: isNaN(newHeight) ? 10 : newHeight });
  }

  return (
    <div className='row-propierties'>
      <div className='tittle-row'>
        <h2>PROPERTIES: {data.name}</h2>
      </div>
      <div className='propierties'>
        <h1 className='tittle-propiertie'>Number of columns</h1>
        <input 
          type="number" 
          min={min}
          max={max}
          value={data.columns} 
          onChange={handleChange} 
        />
        
        <h1 className='tittle-propiertie'>Height (px)</h1>
        <input 
          type="number" 
          value={data.height} 
          onChange={handleHeightChange}
        />
        <button className='delete-button' onClick={onDelete}>
          Delete Row
        </button>
      </div>
    </div>
  )
}