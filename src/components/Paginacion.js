import React from 'react'

export default function Paginacion(props) {
    return (
        <div className="py-3">
            <button onClick={props.paginaAnterior} className="btn btn-info mr-1">&larr; Anterior</button>
            <button onClick={props.paginaSiguiente} className="btn btn-info mr-1">Siguiente &rarr;</button>
        </div>
    )
}
