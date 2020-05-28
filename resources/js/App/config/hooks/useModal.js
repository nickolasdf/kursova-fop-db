import { useState } from "react";

const useModal = () => {
    const [open, setOpenModal] = useState(false);

    const openModal = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false)
    };

    return { open, openModal, closeModal };
};

export default useModal;
