import { useState } from 'react';
import style from './ListaSensores.module.css';
import ModalModoEscuro from '../Modal/ModalModoEscuro';

function ListaSensores({ isOpenLS, setOpenList, itens }) {
    const [openModoEscuro, setOpenModoEscuro] = useState(false);

    if (isOpenLS) 

    return (
        <>
            <div className={style.listaSensores}>
                {itens.map((item, index) => (
                    <div key={index} className={style.sensorItem}>
                        <span className={style.circulo}></span>
                        <p>{item}</p>
                    </div>
                ))}

                {/* Botão para fechar a lista */}
            <div>
                <button
                    className={style.closeButton} onClick={() => setOpenList(false)}>
                      Fechar
                </button>
            </div>

                {/* Botão para abrir o Modal */}
                <div className={style.botaoEscuro}>
                    <button className={style.escuro} onClick={() => setOpenModoEscuro(true)}>
                        Modo Escuro
                    </button>
                </div>
                
            </div>

            {/* Modal dentro da Lista */}
            <ModalModoEscuro
                isOpen={openModoEscuro}
                setOpen={setOpenModoEscuro}
            />

        
        </>
    );
    else {
        return null
    }
}

export default ListaSensores;