import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import TravelForm from './components/TravelForm';
import TravelList from './components/TravelList';

function App() {

  /* useState */
  const [travels, setTravels] = useState(() => {
    const saved = localStorage.getItem('travels');

    if (saved) {
      return JSON.parse(saved);
    }

    return [];
  });

  const [editingTravel, setEditingTravel] = useState(null);



  /* localStorage 저장 */
  useEffect(() => {
    localStorage.setItem('travels', JSON.stringify(travels));
  }, [travels]);



  /* 여행지 추가 */
  const handleAdd = (newTravel) => {
    setTravels([...travels, newTravel]);
  }



  /* 여행지 수정 */
  const handleUpdate = (updatedTravel) => {
    setTravels(travels.map(travel => (
      travel.id === updatedTravel.id ? updatedTravel : travel
    )));

    setEditingTravel(null);
  }


  /* 여행지 수정 시작 */
  const handleEdit = (travel) => {
    setEditingTravel(travel);
    window.scrollTo( { top: 0, behavior: 'smooth' } );
  }


  /* 여행지 수정 취소 */
  const handleCancelEdit = () => {
    setEditingTravel(null);
  }


  /* 여행지 삭제 */
  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setTravels(travels.filter(travel => (
        travel.id !== id
      )))
    }
  }


    /* 통계 계산 */
    const totalCountries = new Set(travels.map(travel => travel.country)).size;



  return (
      <div className="App">

        <h1>여행 기록</h1>

        {/* Header */}
        <Header
          totalTrips={travels.length}
          totalCountries={totalCountries}
        />

        {/* Travel Form */}
        <TravelForm
          onAdd={handleAdd}
          editingTravel={editingTravel}
          onUpdate={handleUpdate}
          onCancelEdit={handleCancelEdit}
        />

        {/* Travel List */}
        <TravelList 
          travels={travels}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>
  );
}
export default App;