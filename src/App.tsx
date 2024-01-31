import React, { useState, FormEvent } from 'react';
import './App.css';

function App() {
  const [titulo, setTitulo] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');
  const [precio, setPrecio] = useState<number>(0);
  // * (NV1)
  const [seccion, setSeccion] = useState('remera'); // Agrega esta línea

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/articulos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, precio, seccion,categoria }), // Añade seccion al cuerpo de la solicitud
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Puedes hacer algo con la respuesta, como mostrar un mensaje al usuario
      } else {
        console.error('Error al enviar la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div>
      <h1>Panel de control de productos de tienda-practica</h1>

      <div className='jumbo'>
        <h1>Crear artículo</h1>
        <p>Formulario para crear un artículo</p>

        <form className='formulario' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='titulo'>TITULO</label>
            <input
              type='text'
              name='titulo'
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='precio'>Precio</label>
            <input
              type='number'
              name='precio'
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='precio'>categoria</label>
            <input
              type='text'
              name='categoria'
              value={categoria}
              onChange={(e) => setCategoria((e.target.value))}
            />
          </div>

      

          <div className='form-group'>
            <label htmlFor='seccion'>Sección</label>
            <select
              name='seccion'
              value={seccion}
              onChange={(e) => setSeccion(e.target.value)}
            >
              <option value='remera'>Remera</option>
              <option value='pantalon'>Pantalón</option>
              {/* Puedes agregar más opciones según tus secciones */}
            </select>
          </div>

          <input type='submit' value='Guardar' className='btn btn-success' />
        </form>
      </div>
    </div>
  );
}

export default App;
