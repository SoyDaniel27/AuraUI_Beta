import { useState } from 'react'
import './RowPropierties.css'

/**
 * Properties panel for configuring a row within the editor.
 * Allows you to manage the number of columns (slots) and the row height.
 *
 * Panel de propiedades para configurar una fila (Row) dentro del editor.
 * Permite gestionar el número de columnas (slots) y la altura de la fila.
 */
export default function RowPropierties({ data, onUpdate, onDelete }) {
  // Configuración de límites para la rejilla
  const min = 1;
  const max = 4;

  /**
   * Handles changes in the number of columns.
   * Synchronizes the array of 'slots' to add new objects or remove excess ones.
   * Maintaining the integrity of existing data.
   *
   * Maneja el cambio en el número de columnas.
   * Sincroniza el arreglo de 'slots' para añadir nuevos objetos o eliminar sobrantes
   * manteniendo la integridad de los datos existentes.
   */
  const handleChange = (e) => {
    let newValue = parseInt(e.target.value, 10);
    // Limit Validation (Clamping)
    // Validación de límites (Clamping)
    if (newValue > max) newValue = max;
    if (newValue < min || isNaN(newValue)) newValue = min;

    const slots = data.slots;
    const newdata = [];
    // Adjust the slot structure based on the new column value.
    // Ajustamos la estructura de los slots basándonos en el nuevo valor de columnas
    for (let i = 0; i < newValue; i++) {
      if (i < slots.length) {
        // We preserved the existing slot so as not to lose its configuration
        // Preservamos el slot existente para no perder su configuración
        newdata.push(slots[i]);
      } else {
        // We initialize a new slot with default values
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
   * Updates the row height in pixels.
   * @default 10px if the entered value is invalid.
   *
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
