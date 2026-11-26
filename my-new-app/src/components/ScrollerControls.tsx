import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export interface ScrollerControlsProps {
  id: string | undefined,
  changeLyricsSize: (buttonPressed: string) => void
}

export function ScrollerControls({ id, changeLyricsSize }: ScrollerControlsProps) {
  const animationFrameId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const scroller = document.scrollingElement;
    if (scroller) {
      scroller.scrollTop = 0;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Space') {
        event.preventDefault();
        stopScrolling();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (animationFrameId.current !== undefined) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  function startAutoScroll(pixelsPerSecond: number) {
    stopScrolling();
    let previousTimestamp = performance.now();
    let pendingPixels = 0;

    function scrollFrame(timestamp: number) {
      const scroller = document.scrollingElement;
      if (scroller === null) {
        stopScrolling();
        return;
      }

      const elapsedSeconds = Math.min((timestamp - previousTimestamp) / 1000, 0.1);
      previousTimestamp = timestamp;
      pendingPixels += pixelsPerSecond * elapsedSeconds;

      const maxScrollTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      const wholePixels = Math.floor(pendingPixels);
      if (wholePixels > 0) {
        scroller.scrollTop = Math.min(scroller.scrollTop + wholePixels, maxScrollTop);
        pendingPixels -= wholePixels;
      }

      if (scroller.scrollTop >= maxScrollTop) {
        stopScrolling();
        return;
      }

      animationFrameId.current = requestAnimationFrame(scrollFrame);
    }

    animationFrameId.current = requestAnimationFrame(scrollFrame);
  }

  function stopScrolling() {
    if (animationFrameId.current !== undefined) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = undefined;
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
        <button onClick={() => startAutoScroll(15)} className=" btn btn-outline-primary rounded">Velocidad 1.0</button>
        <button onClick={() => startAutoScroll(45/2)} className=" btn btn-outline-primary rounded">Velocidad 2.0</button>
        <button onClick={() => startAutoScroll(30)} className=" btn btn-outline-primary rounded">Velocidad 2.5</button>
        <button onClick={() => startAutoScroll(45)} className=" btn btn-outline-primary rounded">Velocidad 3.0</button>
        <button onClick={stopScrolling} className=" btn btn-danger rounded mr-1">Detener</button>
      </div>
    </div>
  </>
}