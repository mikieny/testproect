import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import AddCitizenModal from './components/AddCitizenModal';
import CitizenDetail from './components/CitizenDetail';
import CitizenFilter from './components/CitizenFilter';


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [citizens, setCitizens] = useState([
    { id: '1', name: 'Иван Иванов', dob: '1980-05-12', occupation: 'Инженер', status: 'Активный', education: 'Высшее', family: 'Женат' },
    { id: '2', name: 'Анна Смирнова', dob: '1990-07-24', occupation: 'Учитель', status: 'Активный', education: 'Высшее', family: 'Замужем' },
    { id: '3', name: 'Петр Петров', dob: '1985-09-15', occupation: 'Врач', status: 'Неактивный', education: 'Высшее', family: 'Холост' },
    { id: '4', name: 'Ольга Кузнецова', dob: '1978-11-30', occupation: 'Юрист', status: 'Активный', education: 'Высшее', family: 'Замужем' },
  ]);
  
  const [filter, setFilter] = useState({
    name: '',
    dob: '',
    status: ''
  });

  const filteredCitizens = citizens.filter(citizen => {
    return (
      (!filter.name || citizen.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (!filter.dob || citizen.dob === filter.dob) &&
      (!filter.status || citizen.status === filter.status)
    );
  });

  const totalCitizens = filteredCitizens.length;
  const activeRequests = filteredCitizens.filter(citizen => citizen.status === 'Активный').length;
  const resolvedCases = filteredCitizens.length - activeRequests;
  const pendingApprovals = 0;

  const data = {
    labels: ['Активные', 'Неактивные'],
    datasets: [{
      label: 'Статус граждан',
      data: [
        filteredCitizens.filter(citizen => citizen.status === 'Активный').length,
        filteredCitizens.filter(citizen => citizen.status === 'Неактивный').length,
      ],
      backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    }],
  };

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen p-10">
        <header className="flex justify-between items-center mb-12">
          <div className="text-2xl font-bold text-blue-800">Дашборд Граждан</div>
          <nav className="flex space-x-8">
            <Link to="/" className="text-gray-700">Обзор</Link>
            <Link to="/citizens" className="text-gray-700">Граждане</Link>
            <Link to="#" className="text-gray-700">Отчеты</Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
            >
              Добавить Гражданина
            </button>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <section className="mb-12">
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">Обзор Метрик Граждан</h1>
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Всего Граждан</h2>
                      <p className="text-3xl font-semibold text-blue-700">{totalCitizens}</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Активные Запросы</h2>
                      <p className="text-3xl font-semibold text-blue-700">{activeRequests}</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Решенные Дела</h2>
                      <p className="text-3xl font-semibold text-blue-700">{resolvedCases}</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Ожидающие Одобрения</h2>
                      <p className="text-3xl font-semibold text-blue-700">{pendingApprovals}</p>
                    </div>
                  </div>

                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Статус Граждан</h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                    </div>
                  </div>
                </section>
              </>
            } />

            <Route path="/citizens" element={
              <>
                <CitizenFilter filter={filter} setFilter={setFilter} />

                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Записи о Гражданах</h2>
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
                </section>
              </>
            } />

            <Route path="/citizens/:id" element={<CitizenDetail citizens={citizens} />} />
          </Routes>

          {isModalOpen && (
            <AddCitizenModal
              onClose={() => setIsModalOpen(false)}
              onAddCitizen={(newCitizen) => {
                setCitizens([...citizens, newCitizen]);
                setIsModalOpen(false);
              }}
            />
          )}
        </main>

        <footer className="mt-12">
          <p className="text-center text-gray-600">© 2024 Дашборд Граждан. Все права защищены.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
