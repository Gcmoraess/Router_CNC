import { useState } from "react";
import style from "./ListaSensores.module.css";
import ModalModoEscuro from "./ModalModoEscuro";

const sensoresDaRouter = [
    'Sensor X AV',
    'Sensor X RC',
    'Sensor Y AV',
    'Sensor Y RC',
    'Sensor Z RC',
    'Home Y',
    'Home Z',
    'Home X'
];

function ListaSensores() {

  const [statusSensores] = useState(sensoresDaRouter.map(() => false));

  const [openModoEscuro, setOpenModoEscuro] = useState(false);

  return (
    <>
      <div className={style.listaSensores}>

        {sensoresDaRouter.map((item, index) => (

          <div key={index} className={style.sensorItem}>

            <span
              className={`${style.circulo} ${
                statusSensores[index]
                  ? style.ativo
                  : style.inativo
              }`}
            ></span>

            <p>{item}</p>

          </div>
        ))}

        <button
          className={style.escuro}
          onClick={() => setOpenModoEscuro(true)}
        >
          Modo Escuro
        </button>

      </div>

      <ModalModoEscuro
        isOpen={openModoEscuro}
        setOpen={setOpenModoEscuro}
      />
    </>
  );
}

export default ListaSensores;