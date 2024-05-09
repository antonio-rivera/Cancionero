import { IDProps } from "../../interface";
import { Link } from "react-router-dom";

export function ScrollerControls({ id }: IDProps) {
  window.scrollTo(0, 0);
  let clearId: string | number | NodeJS.Timeout;
  let startedScrolling: boolean = false;

  function startAutoScroll(interval: number, changeSpeed = true) {
    let velocity = 1;
    stopScrolling();
    startedScrolling = true;
    let scrollAmount = window.scrollY;
    const rootHeight = document.getElementById("root").scrollHeight;
    const avgHeight = Math.floor(rootHeight + window.innerHeight) / 2
    clearId = setInterval(() => {
      if (changeSpeed && window.scrollY >= Math.ceil(avgHeight / 2)) {
        console.log("Changed speed");

        switch (interval) {
          case 150:
            startAutoScroll(interval - 40, false);
            break;
          case 100:
            startAutoScroll(interval - 30, false);
            break;
          case 50:
            startAutoScroll(interval - 25, false);
            break;
          default:
            break;
        }
        return;
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
    <div id="song-footer" className="d-flex justify-content-between align-items-center">
      <Link to={`/edit/${id}`}><button id="edit-btn" className="mx-1 btn btn-success">Editar Canción</button> </Link>
      <div className="d-flex justify-content-center align-items-center">
        <div className="h5 text-dark text-center mr-3">Desplazamiento: </div>
        <button onClick={() => startAutoScroll(150)} className=" btn btn-outline-dark rounded">Velocidad 1.0</button>
        <button onClick={() => startAutoScroll(100)} className=" btn btn-outline-dark rounded">Velocidad 2.0</button>
        <button onClick={() => startAutoScroll(50)} className=" btn btn-outline-dark rounded">Velocidad 3.0</button>
        <button onClick={stopScrolling} className=" btn btn-danger rounded mr-1">Detener</button>
      </div>
    </div>
  </>
}