import { useState } from 'react'
import Topbar from './components/topbar/Topbar'
import Widgets from './components/sidebar/widgets/Widgets';
import WidgetPropierties from './components/sidebar/widgets_propierties/WidgetPropierties';
import RowPropierties from './components/sidebar/row_propierties/RowPropierties';
import './App.css'

function App() {

  // Inicio del contrato JSON con las 3 paginas vacias
  const [pages, setPages] = useState({
    "Page 1": [],
    "Page 2": [],
    "Page 3": []
  });
  const [currentPage, setCurrentPage] = useState("Page 1"); //Inicio en Pagina 1
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Helper para obtener los divs de la página actual
  const currentDivs = pages[currentPage];

  // Manejador del Select
  const handlePageChange = (e) => {
    setCurrentPage(e.target.value);
    // Limpiar selección al cambiar de página
    setSelectedRow(null); 
    setSelectedSlot(null); 
  };

  // Actualizar addrow para que use el estado de páginas
  const addrow = () => {
    const newrow = {
      id: Date.now(), 
      name: `Row ${currentDivs.length + 1}`,
      columns: 1, 
      slots: [{ id: Date.now() + 2, value: 'Slot 1', backgroundColor: [255, 255, 255, 1], widget:[] }],
      height: 60,
      type: 'row'
    };
    
    setPages({
      ...pages,
      [currentPage]: [...currentDivs, newrow]
    });
  };
   
  // Selector para saber si se escogio un Row o un Slot
  const click_row = (row) => {

    if (row.type === 'row') {
      setSelectedRow(row);
      setSelectedSlot(null)
    }
  }

  const click_slot = (slot) => {
    setSelectedSlot(slot)
    setSelectedRow(null)
  }

  // Actualizar la informacion de la Row o del Slot
  const updateRowData = (updatedRow) => {
    const updatedDivs = currentDivs.map(d => d.id === updatedRow.id ? updatedRow : d);
    setPages({ ...pages, [currentPage]: updatedDivs });
    setSelectedRow(updatedRow);
  };

  const updateSlotData = (updatedSlot) => {
    const updatedDivs = currentDivs.map(row => ({
      ...row,
      slots: row.slots.map(s => s.id === updatedSlot.id ? updatedSlot : s)
    }));
    
    setPages({ ...pages, [currentPage]: updatedDivs });
    setSelectedSlot(updatedSlot);
  };

  // Elimar el Row 
  const deleteRow = (id) => {
    const updatedDivs = currentDivs.filter(row => row.id !== id);
    setPages({
      ...pages,
      [currentPage]: updatedDivs
    });

    // Limpiamos la selección si la fila eliminada era la que estaba seleccionada
    if (selectedRow?.id === id) {
      setSelectedRow(null);
    }
  }

  //Funcion para mostrar el slot con su informacion en codigo HTML 
  const data_slot = (slot) => {
    const currentslot = slot;
    //Si es un texto
    if (currentslot.widget[0].type == 'text'){
      return (
        <p style={{fontSize:currentslot.widget[0].fontsize, whiteSpace:'pre-wrap', wordBreak:'break-word', color: `rgba(${currentslot.widget[0].color[0]}, ${currentslot.widget[0].color[1]}, ${currentslot.widget[0].color[2]}, ${currentslot.widget[0].color[3]})`}}>{currentslot.widget[0].text}</p>
      )
    //Si es una imagen y verificar que su source esta vacia
    } else if (currentslot.widget[0].type == 'image' && currentslot.widget[0].source == ''){
      return (
        <p>Please provide the source of the image</p>
      )
    } else if (currentslot.widget[0].type == 'image' && currentslot.widget[0].source != ''){
      return(<img 
        src={currentslot.widget[0].source} 
        alt="Not Found" 
        style={{ objectFit:'contain', objectPosition:'center', height: '90%'}} // Opcional: ajustar el tamaño
      />)
     // Si es un boton 
    } else if (currentslot.widget[0].type == 'button') {
      return (
        <button style={{
          backgroundColor: `rgba(${currentslot.widget[0].backgroundColor[0]}, ${currentslot.widget[0].backgroundColor[1]}, ${currentslot.widget[0].backgroundColor[2]}, ${currentslot.widget[0].backgroundColor[3]})`,
          color: `rgba(${currentslot.widget[0].textColor[0]}, ${currentslot.widget[0].textColor[1]}, ${currentslot.widget[0].textColor[2]}, ${currentslot.widget[0].textColor[3]})`
        
        }}>{currentslot.widget[0].text}</button>
      )
    }
  }

  return (
    <div className='body'>
      <Topbar schema={pages}/>
      <div className='main'>
        {selectedRow && (
          <RowPropierties 
            data={selectedRow} 
            onUpdate={updateRowData} 
            onDelete={() => deleteRow(selectedRow.id)}
          />
        )}
        {selectedSlot && (
          <Widgets
            slot={selectedSlot}
            onUpdate={updateSlotData}
          />
        )}
        <div className='canvas'>
          <div className='canvas-topbar'>
            <select value={currentPage} onChange={handlePageChange}>
              <option>Page 1</option>
              <option>Page 2</option>
              <option>Page 3</option>
            </select>
          </div>
          <div className='work-area'>
            <div className='device'>
              {currentDivs.map((row) => (
                <div 
                  key={row.id} 
                  className='row' 
                  onClick={() => click_row(row)}
                  style={{ height: `${row.height}px`, border: selectedRow?.id === row.id ? '2px solid blue' : '1px solid gray' }}>
                  {row.slots.map((slot) => (
                    <div 
                      key={slot.id} 
                      className='slot' 
                      style={{
                        height: `${row.height}px`, 
                        flex: `0 0 ${(1 / row.columns) * 100}%`, 
                        maxWidth: `${(1 / row.columns) * 100}%`,  
                        border: '1px solid black', 
                        backgroundColor: `rgba(${slot.backgroundColor[0]}, ${slot.backgroundColor[1]}, ${slot.backgroundColor[2]}, ${slot.backgroundColor[3]})`,
                      }}>
                      {
                        slot.widget.length === 0 ? (
                          <div onClick={(e) => {e.stopPropagation(); click_slot(slot);}}>
                            <p>Add widget</p>
                            <div>+</div>
                          </div>
                        ) : (
                          <div onClick={(e) => {e.stopPropagation(); click_slot(slot);}}>
                            {data_slot(slot)}
                          </div>
                        )
                      }
                    </div>
                  ))}
                </div>
              ))}
              <button onClick={addrow}>Add Row</button>
            </div>
          </div>
        </div>
        {
          selectedSlot && (
            <WidgetPropierties
            slot={selectedSlot}
            onChange={updateSlotData}>
            </WidgetPropierties>
          )
        }
      </div>
    </div>
  )
}

export default App
