import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export interface ScrollerControlsProps {
  id: string | undefined,
  changeLyricsSize: (buttonPressed: string) => void
}

export function ScrollerControls({ id, changeLyricsSize }: ScrollerControlsProps) {
  const intervalId = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    const scroller = document.scrollingElement;
    if (scroller) {
      scroller.scrollTop = 0;
    }

    return () => {
      if (intervalId.current !== undefined) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  function startAutoScroll(interval: number) {
    const velocity = 1;
    stopScrolling();
    const scroller = document.scrollingElement;
    if (!scroller) {
      return;
    }
    intervalId.current = setInterval(() => {
      // Spacebar should stop scrolling, so we check if the user is pressing it
      document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      // Optional: prevents the page from scrolling down
      event.preventDefault(); 
      stopScrolling();
      return;
  }
});


      const previousScrollTop = scroller.scrollTop;
      scroller.scrollTop = previousScrollTop + velocity;

      if (scroller.scrollTop <= previousScrollTop) {
        stopScrolling();
      }
    }, interval)
  }

  function stopScrolling() {
    if (intervalId.current !== undefined) {
      clearInterval(intervalId.current);
      intervalId.current = undefined;
    }
  }
  return <>
    <div id="song-footer" className="d-flex container-fluid justify-content-center align-items-center">
      <Link to={`/edit/${id}`}><button id="edit-btn" className="mx-1 btn btn-success">Editar Canción</button> </Link>
      <div className="m-2 font-buttons container text-center text-white">
        <h3 className="h5 text-dark">Agrandar o Achicar Letra</h3>
        <button onClick={() => changeLyricsSize("Up")} className="btn btn-outline-success rounded">Agrandar</button>
        <button onClick={() => changeLyricsSize("Down")} className="btn btn-outline-success rounded">Achicar</button>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="h5 text-center mr-3">Desplazamiento: </div>
        <button onClick={() => { stopScrolling(); if (document.scrollingElement) document.scrollingElement.scrollTop = 0 }} className=" btn btn-warning rounded">Reiniciar</button>
        <button onClick={() => startAutoScroll(150)} className=" btn btn-outline-primary rounded">Velocidad 1.0</button>
        <button onClick={() => startAutoScroll(100)} className=" btn btn-outline-primary rounded">Velocidad 2.0</button>
        <button onClick={() => startAutoScroll(75)} className=" btn btn-outline-primary rounded">Velocidad 2.5</button>
        <button onClick={() => startAutoScroll(50)} className=" btn btn-outline-primary rounded">Velocidad 3.0</button>
        <button onClick={stopScrolling} className=" btn btn-danger rounded mr-1">Detener</button>
      </div>
    </div>
  </>
}