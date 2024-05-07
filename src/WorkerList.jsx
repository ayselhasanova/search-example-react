import React, { useState, useEffect } from 'react';

const WorkerList = () => {
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  useEffect(() => {
    fetch('https://5ea5ca472d86f00016b4626d.mockapi.io/brotherhood')
      .then(response => response.json())
      .then(data => {
        setWorkers(data);
      })
      .catch(error => {
        console.error('Error fetching workers:', error);
      });
  }, []);

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
    (filterDepartment === '' || worker.department === filterDepartment)
  );

  return (
    <div>
      <div className='search-filter'>
      <input
        type="text"
        placeholder="Search by worker name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        />
      <select
        value={filterDepartment}
        onChange={e => setFilterDepartment(e.target.value)}
        >
        <option value="">All Departments</option>
        <option value="Management">Management</option>
        <option value="Recruitment">Recruitment</option>
        <option value="Security">Security</option>
      </select>
        </div>
      <ul>
        {filteredWorkers.map(worker => (
          <li key={worker.id}>
            {worker.name} - {worker.department}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerList;
