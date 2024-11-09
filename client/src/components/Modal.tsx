import React from "react"

export type ModalProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    children: React.JSX.Element;
}

export const Modal = ({showModal, setShowModal, title, children}: ModalProps) => {
        return(
            <>
                {
                    showModal &&
                    <section
                        className="modal flex flex-col gap-4 min-w-[300px]">
                        <button
                            onClick={() => setShowModal(false)}
                            className='absolute top-2 right-4'>
                            X
                        </button>
                        <header>
                            <span className='font-medium text-xl'>{title}</span>
                        </header>
                        {children}
                    </section>
                }
            </>
        )
}