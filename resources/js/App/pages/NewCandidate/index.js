import React from "react";
import Frame from "../../components/Frame";
import MainTitle from "../../components/MainTitle";
import Button from "../../components/Button";
import "./style.scss";
import WhiteContainer from "../../components/WhiteContainer";

const NewCandidate = () => (
    <Frame>
        <MainTitle title="Новий кандидат" />
        <div className="new-candidate__btn-container">
            <div className="flex">
                <Button
                    title="Завантажити резюме"
                    styles="btn--padding-left"
                />
                <Button title="Вставити текст" />
                <Button title="Перенести резюме" />
            </div>
            <>
                <Button title="Зберегти" styles="btn--primary" />
            </>
        </div>
        <WhiteContainer />
    </Frame>
);

export default NewCandidate;
