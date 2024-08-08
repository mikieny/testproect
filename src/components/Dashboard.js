import React from 'react';

function Dashboard() {
    return (
        <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Обзор Метрик Граждан</h1>
        <div className="grid grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Всего Граждан</h2>
            <p className="text-3xl font-semibold text-blue-700">125,000</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Активные Запросы</h2>
            <p className="text-3xl font-semibold text-blue-700">2,540</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Решённые Дела</h2>
            <p className="text-3xl font-semibold text-blue-700">98,750</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ожидающие Одобрения</h2>
            <p className="text-3xl font-semibold text-blue-700">120</p>
            </div>
        </div>
        </div>
    );
}

export default Dashboard;
