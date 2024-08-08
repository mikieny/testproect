import React from 'react';

function CitizenFilter({ filter, setFilter }) {
    return (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Фильтрация Граждан</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
            type="text"
            placeholder="Имя"
            value={filter.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            className="p-2 border border-gray-300 rounded"
            />
            <input
            type="date"
            placeholder="Дата Рождения"
            value={filter.dob}
            onChange={(e) => setFilter({ ...filter, dob: e.target.value })}
            className="p-2 border border-gray-300 rounded"
            />
            <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="p-2 border border-gray-300 rounded"
            >
            <option value="">Все Статусы</option>
            <option value="Активный">Активный</option>
            <option value="Неактивный">Неактивный</option>
            </select>
            <button
            type="button"
            onClick={() => setFilter({ name: '', dob: '', status: '' })}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
            Очистить
            </button>
        </form>
        </div>
    );
}

export default CitizenFilter;
