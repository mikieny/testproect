import React from 'react';
import { Link } from 'react-router-dom';

function Header({ onAddCitizenClick }) {
    return (
        <header className="flex justify-between items-center mb-12">
        <div className="text-2xl font-bold text-blue-800">
            <Link to="/">Панель Управления Гражданами</Link>
        </div>
        <nav className="flex space-x-8">
            <Link to="/" className="text-gray-700">Обзор</Link>
            <Link to="/citizens" className="text-gray-700">Граждане</Link>
            <a href="#" className="text-gray-700">Отчёты</a>
            <button
            onClick={onAddCitizenClick}
            className="bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
            Добавить Гражданина
            </button>
        </nav>
        </header>
    );
}

export default Header;
