import { useState } from "react";
import style from "./ListaSensores.module.css";
import ModalModoEscuro from "./ModalModoEscuro";

function ListaSensores({ isOpenLS, setOpenList, itens, className }) {
  // Estados
  const [statusSensores] = useState(itens.map(() => false));
  const [openModoEscuro, setOpenModoEscuro] = useState(false);

  if (!isOpenLS) return null;

  return (
    <>
      <div className={`${style.listaSensores} ${className || ""}`}>

        {/* Lista de Sensores */}
        {itens.map((item, index) => (
          <div key={index} className={style.sensorItem}>
            <span
              className={`${style.circulo} ${
                statusSensores[index] ? style.ativo : style.inativo
              }`}
            ></span>
            <p>{item}</p>
          </div>
        ))}

        {/* Botão Fechar */}
        <button
          className={style.closeButton}
          onClick={() => setOpenList(false)}
        >
          Fechar
        </button>

        {/* Botão Abrir Modo Escuro */}
        <button
          className={style.escuro}
          onClick={() => setOpenModoEscuro(true)}
        >
          Modo Escuro
        </button>
      </div>

      {/* Modal */}
      <ModalModoEscuro 
        isOpen={openModoEscuro} 
        setOpen={setOpenModoEscuro} 
      />
    </>
  );
}

export default ListaSensores;
