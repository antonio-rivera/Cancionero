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

  function startAutoScroll(interval: number, changeSpeed = true) {
    const velocity = 1;
    stopScrolling();
    const scroller = document.scrollingElement;
    if (!scroller) {
      return;
    }
    const rootHeight = document.getElementById("root")?.scrollHeight ?? scroller.scrollHeight;
    const avgHeight = Math.floor(rootHeight + window.innerHeight) / 2;
    intervalId.current = setInterval(() => {
      if (changeSpeed && scroller.scrollTop >= Math.ceil(avgHeight / 2)) {

        switch (interval) {
          case 150:
            startAutoScroll(interval - 40, false);
            break;
          case 100:
            startAutoScroll(interval - 30, false);
            break;
          case 75:
            startAutoScroll(interval - 20, false);
            break;
          case 50:
            startAutoScroll(interval - 25, false);
            break;
          default:
            break;
        }
        return;
      }
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