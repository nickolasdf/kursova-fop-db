import React from "react";
import Avatar from "../Avatar";
import SmallTitle from "../SmallTitle";
import Field from "../Field";
import SelectField from "../SelectFieled";
import "./style.scss";
import PlusIcon2 from "../PlusIcon2";
import AdditionalInfoFields from "../AdditionalInfoFields";
import Editor from "../Editor";

const WhiteContainer = () => (
    <div className="white-container">
        <div className="white-container__wrapper">
            <div className="white-container__main-info">
                <div className="white-container__avatar-container">
                    <Avatar />
                </div>

                <div className="white-container__main-info__text">
                    <SmallTitle title="Основна інформація" />
                    <div className="white-container__main-info__fields">
                        <Field label="Ім'я" />
                        <Field label="Прізвище" />
                        <Field label="По-Батькові" />
                        <SelectField
                            label="Стать"
                            data={["Чоловіча", "Жіноча"]}
                        />
                        <div className="birthday-group">
                            <div className="birthday-group__label">
                                Дата народження
                            </div>
                            <SelectField data={[1, 2, 3, 4, 5]} />
                            <SelectField
                                data={["Січень", "Лютий", "Березень"]}
                            />
                            <SelectField data={[1992, 1875, 2053]} />
                        </div>
                        <SelectField
                            label="Сімейний стан"
                            data={[
                                "В активному пошуку",
                                "Режим ждуна",
                                "Ой, всьо"
                            ]}
                        />
                        <Field label="E-mail" />
                        <Field label="Номер мобільного" />
                        <SelectField
                            label="Місто проживання"
                            data={["Рівне", "Луцьк", "Жмеринка", "Офіс"]}
                        />
                        <SelectField
                            label="Можливий переїзд у"
                            data={["Луцьк", "Рівне", "Офіс"]}
                        />
                        <SelectField
                            label="Освіта"
                            data={["Вища", "Незакінчена", "Нижча"]}
                        />
                        <SelectField
                            label="Профіль освіти"
                            data={["IT", "не IT", "Авіаційний"]}
                        />
                        <SelectField
                            label="Бажана посада"
                            data={[
                                "Менеджер із клінінгу",
                                "Менеджер із закупівель",
                                "Керівник відділу відбірних жартів"
                            ]}
                        />
                        <div className="salary-group">
                            <div className="salary-group__label">
                                Бажана зарплата
                            </div>
                            <Field />
                            <SelectField
                                data={[
                                    "USD",
                                    "EUR",
                                    "UAH",
                                    "Буханки хліба",
                                    "Піца (штук)"
                                ]}
                            />
                        </div>
                        <SelectField
                            label="Досвід роботи"
                            data={["5 років", "3 роки", "over 100500"]}
                        />
                        <SelectField
                            label="Вид зайнятості"
                            data={[
                                "Повна зайнятість",
                                "Часткова зайнятість",
                                "Тимчасова зайнятість"
                            ]}
                        />
                        <SelectField
                            label="Поточне місце роботи"
                            data={[
                                "Rivo Agency",
                                "The Best Company in the whole world",
                                "Гребець"
                            ]}
                        />
                        <SelectField
                            label="Поточна посада"
                            data={[
                                "IT менеджер",
                                "Перспективний молодий розробник",
                                "COO"
                            ]}
                        />
                    </div>
                </div>
            </div>

            <div className="white-container__additional-info">
                <div className="white-container__additional-info__small-title-container">
                    <SmallTitle title="Додаткова інформація" />
                </div>
                <div className="white-container__additional-info__selection-group">
                    <AdditionalInfoFields label="Соціальні мережі" />
                    <AdditionalInfoFields label="Мови" />
                    <AdditionalInfoFields label="Навички" />
                </div>
                <div className="white-container__additional-info__editor-container">
                    <Editor />
                </div>
            </div>
        </div>
    </div>
);

export default WhiteContainer;
