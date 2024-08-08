import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddCitizenModal from './AddCitizenModal';

function CitizenList() {
    const [citizens, setCitizens] = useState([
            {
                id: '1',
                name: 'Иван Иванов',
                dob: '1980-05-12',
                occupation: 'Инженер',
                status: 'Активный',
                family: [
                { name: 'Мария Иванова', relation: 'Жена' },
                { name: 'Сергей Иванов', relation: 'Сын' }
                ],
                education: [
                { institution: 'МГУ', degree: 'Бакалавр инженерии', year: 2002 }
                ]
            },
            {
                id: '2',
                name: 'Анна Смирнова',
                dob: '1990-07-24',
                occupation: 'Учитель',
                status: 'Активный',
                family: [
                { name: 'Алексей Смирнов', relation: 'Муж' },
                { name: 'Ирина Смирнова', relation: 'Дочь' }
                ],
                education: [
                { institution: 'СПбГУ', degree: 'Магистр педагогики', year: 2013 }
                ]
            },
    ]);
    const [filteredCitizens, setFilteredCitizens] = useState(citizens);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCitizen, setNewCitizen] = useState({
        name: '',
        dob: '',
        occupation: '',
        status: ''
    });

    const [filter, setFilter] = useState({
        name: '',
        status: ''
    });

    const handleAddCitizenClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCitizen((prev) => ({
        ...prev,
        [name]: value
        }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCitizen.name && newCitizen.dob && newCitizen.occupation && newCitizen.status) {
        const newId = (citizens.length + 1).toString();
        setCitizens([
            ...citizens,
            { id: newId, ...newCitizen }
        ]);
        setFilteredCitizens([
            ...citizens,
            { id: newId, ...newCitizen }
        ]); // Обновление отфильтрованных данных
        setNewCitizen({
            name: '',
            dob: '',
            occupation: '',
            status: ''
        });
        setIsModalOpen(false);
        }
    };

    const applyFilters = () => {
        const { name, status } = filter;
        const filtered = citizens.filter(citizen => 
        (name ? citizen.name.toLowerCase().includes(name.toLowerCase()) : true) &&
        (status ? citizen.status === status : true)
        );
        setFilteredCitizens(filtered);
    };

    return (
        <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Записи о Гражданах</h2>

        {/* Filter Form */}
        <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Фильтровать Граждан</h3>
            <form>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Имя</label>
                <input
                type="text"
                name="name"
                value={filter.name}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Статус</label>
                <select
                name="status"
                value={filter.status}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 p-2 rounded"
                >
                <option value="">Все</option>
                <option value="Активный">Активный</option>
                <option value="Неактивный">Неактивный</option>
                </select>
            </div>
            <button
                type="button"
                onClick={applyFilters}
                className="bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
                Применить Фильтр
            </button>
            </form>
        </div>

        <button
            onClick={handleAddCitizenClick}
            className="bg-blue-700 text-white py-2 px-4 rounded-lg mb-6 transition-transform transform hover:scale-105"
        >
            Добавить Гражданина
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCitizens.map((citizen) => (
            <Link key={citizen.id} to={`/citizens/${citizen.id}`} className="transition-transform transform hover:scale-105">
                <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{citizen.name}</h3>
                <p className="text-gray-600 mb-2">Дата Рождения: {citizen.dob}</p>
                <p className="text-gray-600 mb-2">Профессия: {citizen.occupation}</p>
                <p className="text-gray-600">Статус: {citizen.status}</p>
                </div>
            </Link>
            ))}
        </div>
        {isModalOpen && (
            <AddCitizenModal
            newCitizen={newCitizen}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onClose={handleModalClose}
            />
        )}
        </div>
    );
}

export default CitizenList;
