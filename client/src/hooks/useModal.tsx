import React from "react"
import { createPortal } from "react-dom";

export const useModal = (
    title: string, 
    children: (props?: { cancelCallback?: () => void }) => React.ReactNode,  // children as a function
    confirmCallback: any,
    cancelCallback?: () => void,
    footerElement?: React.ReactNode
    ) => {
    const [showModal, setShowModal] = React.useState(false);

    const ModalElement = showModal ? (
        createPortal(
            <>
                {
                    showModal &&
                    <section
                        className="modal flex flex-col gap-4 min-w-[300px]">
                        <button
                            onClick={() => {
                                setShowModal(false);
                                if (cancelCallback) {
                                    cancelCallback();
                                }
                            }} 
                            className='absolute top-2 right-4'>
                            X
                        </button>
                        <header>
                            <span className='font-medium text-xl'>{title}</span>
                        </header>
                        {children({cancelCallback})}
                        <section
                            className="flex justify-end">
                            <button
                                onClick={confirmCallback}
                                className="btn">
                                Confirm
                            </button>
                        </section>
                        {footerElement}
                    </section>
                }
            </>,
            document.body
        )
    ) : null;
    return {showModal, setShowModal, ModalElement}
}