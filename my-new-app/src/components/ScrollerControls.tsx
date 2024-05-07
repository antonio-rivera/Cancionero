import { IDProps } from "../../interface";
import { Link } from "react-router-dom";

export function ScrollerControls({ id }: IDProps) {
  window.scrollTo(0, 0);
  let clearId: string | number | NodeJS.Timeout;
  let startedScrolling: boolean = false;

  function startAutoScroll(interval: number) {
    let changeSpeed = true;
    let velocity = 1;
    stopScrolling();
    startedScrolling = true;
    let scrollAmount = window.scrollY;
    clearId = setInterval(() => {
      if (changeSpeed && window.scrollY >= Math.floor(window.innerHeight / 2)) {
        interval = interval - 50;
        changeSpeed = false;
      }
      let prevScrollY = window.scrollY;
      scrollAmount = scrollAmount + velocity;
      window.scrollTo(0, scrollAmount)

      if (prevScrollY !== window.scrollY - velocity) {
        clearInterval(clearId);
        startedScrolling = false;
      }
    }, interval)
  }

  function stopScrolling() {
    if (startedScrolling && clearId !== undefined) {
      clearInterval(clearId);
      startedScrolling = false;
    }
  }
  return <>
    <div id="song-footer" className="d-flex justify-content-center align-items-center">
      <Link to={`/edit/${id}`}><button id="edit-btn" className="mx-1 btn btn-success">Editar Canción</button> </Link>
      <div className="h4 text-dark text-center mr-3">Empezar desplazamiento: </div>
      <button onClick={() => startAutoScroll(150)} className=" btn btn-outline-dark rounded">Velocidad 1.0</button>
      <button onClick={() => startAutoScroll(100)} className=" btn btn-outline-dark rounded">Velocidad 2.0</button>
      <button onClick={() => startAutoScroll(50)} className=" btn btn-outline-dark rounded">Velocidad 3.0</button>
      <button onClick={stopScrolling} className=" btn btn-danger rounded">Detener desplazamiento</button>
    </div>
  </>
}