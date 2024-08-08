import React, { useState } from 'react';

function AddCitizenModal({ onClose, onAddCitizen }) {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [occupation, setOccupation] = useState('');
    const [status, setStatus] = useState('Активный');
    const [family, setFamily] = useState([{ name: '', relation: '' }]);
    const [education, setEducation] = useState([{ institution: '', degree: '', year: '' }]);

    const handleAddCitizen = () => {
        const newCitizen = {
        id: Date.now().toString(),
        name,
        dob,
        occupation,
        status,
        family: family.filter(member => member.name && member.relation),
        education: education.filter(edu => edu.institution && edu.degree && edu.year)
        };
        onAddCitizen(newCitizen);
    };

    const handleFamilyChange = (index, field, value) => {
        const updatedFamily = [...family];
        updatedFamily[index][field] = value;
        setFamily(updatedFamily);
    };

    const handleEducationChange = (index, field, value) => {
        const updatedEducation = [...education];
        updatedEducation[index][field] = value;
        setEducation(updatedEducation);
    };

    const addFamilyMember = () => {
        setFamily([...family, { name: '', relation: '' }]);
    };

    const addEducationEntry = () => {
        setEducation([...education, { institution: '', degree: '', year: '' }]);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Добавить Гражданина</h2>
            <div className="mb-4">
            <label className="block text-gray-700">Имя</label>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700">Дата Рождения</label>
            <input
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700">Профессия</label>
            <input
                type="text"
                value={occupation}
                onChange={e => setOccupation(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700">Статус</label>
            <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
            >
                <option value="Активный">Активный</option>
                <option value="Неактивный">Неактивный</option>
            </select>
            </div>

            {/* Поля для добавления членов семьи */}
            <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-700">Члены Семьи</h3>
            {family.map((member, index) => (
                <div key={index} className="mb-2">
                <input
                    type="text"
                    value={member.name}
                    onChange={e => handleFamilyChange(index, 'name', e.target.value)}
                    placeholder="Имя"
                    className="w-full mt-1 p-2 border rounded mb-1"
                />
                <input
                    type="text"
                    value={member.relation}
                    onChange={e => handleFamilyChange(index, 'relation', e.target.value)}
                    placeholder="Родственник (например, Сын)"
                    className="w-full mt-1 p-2 border rounded"
                />
                </div>
            ))}
            <button
                type="button"
                onClick={addFamilyMember}
                className="text-blue-600 hover:underline mt-2"
            >
                Добавить Члена Семьи
            </button>
            </div>

            {/* Поля для добавления образования */}
            <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-700">Образование</h3>
            {education.map((edu, index) => (
                <div key={index} className="mb-2">
                <input
                    type="text"
                    value={edu.institution}
                    onChange={e => handleEducationChange(index, 'institution', e.target.value)}
                    placeholder="Учебное Заведение"
                    className="w-full mt-1 p-2 border rounded mb-1"
                />
                <input
                    type="text"
                    value={edu.degree}
                    onChange={e => handleEducationChange(index, 'degree', e.target.value)}
                    placeholder="Степень (например, Бакалавр)"
                    className="w-full mt-1 p-2 border rounded mb-1"
                />
                <input
                    type="text"
                    value={edu.year}
                    onChange={e => handleEducationChange(index, 'year', e.target.value)}
                    placeholder="Год Окончания"
                    className="w-full mt-1 p-2 border rounded"
                />
                </div>
            ))}
            <button
                type="button"
                onClick={addEducationEntry}
                className="text-blue-600 hover:underline mt-2"
            >
                Добавить Образование
            </button>
            </div>

            <div className="flex justify-end">
            <button
                onClick={handleAddCitizen}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mr-2"
            >
                Добавить
            </button>
            <button
                onClick={onClose}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
                Отмена
            </button>
            </div>
        </div>
        </div>
    );
}

export default AddCitizenModal;
