import React from 'react';
import { useParams } from 'react-router-dom';

function CitizenDetail({ citizens }) {
    const { id } = useParams();
    const citizen = citizens.find(citizen => citizen.id === id);

    if (!citizen) {
        return <div className="text-center text-red-600">Гражданин не найден</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Детали Гражданина</h2>
        <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{citizen.name}</h3>
            <p className="text-gray-600 mb-2">Дата Рождения: {citizen.dob}</p>
            <p className="text-gray-600 mb-2">Профессия: {citizen.occupation}</p>
            <p className="text-gray-600">Статус: {citizen.status}</p>
        </div>

        {/* Члены семьи */}
        <section className="mt-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Члены Семьи</h3>
            <ul className="list-disc list-inside">
            {citizen.family && citizen.family.length > 0 ? (
                citizen.family.map((member, index) => (
                <li key={index} className="text-gray-700">{member.name} ({member.relation})</li>
                ))
            ) : (
                <li className="text-gray-700">Нет данных о членах семьи</li>
            )}
            </ul>
        </section>

        {/* Образование */}
        <section className="mt-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Образование</h3>
            <ul className="list-disc list-inside">
            {citizen.education && citizen.education.length > 0 ? (
                citizen.education.map((degree, index) => (
                <li key={index} className="text-gray-700">{degree.institution}, {degree.degree}, {degree.year}</li>
                ))
            ) : (
                <li className="text-gray-700">Нет данных об образовании</li>
            )}
            </ul>
        </section>
        </div>
    );
}

export default CitizenDetail;
