import { useState } from 'react';
import style from './ListaSensores.module.css';
import ModalModoEscuro from './ModalModoEscuro';

function ListaSensores({ isOpenLS, setOpenList, itens, className }) {
    
    const [openModoEscuro, setOpenModoEscuro] = useState(false);

    if (!isOpenLS) return null;

    return (
        <>
            <div className={`${style.listaSensores} ${className || ''}`}>
                {itens.map((item, index) => (
                    <div key={index} className={style.sensorItem}>
                        <span className={style.circulo}></span>
                        <p>{item}</p>
                    </div>
                ))}

                {/* Botão para fechar a lista */}
                <div>
                    <button
                        className={style.closeButton} 
                        onClick={() => setOpenList(false)}
                    >
                        Fechar
                    </button>
                </div>

                {/* Botão para abrir o Modal */}
                <div className={style.botaoEscuro}>
                    <button 
                        className={style.escuro} 
                        onClick={() => setOpenModoEscuro(true)}
                    >
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
}

export default ListaSensores;
