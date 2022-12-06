import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const fieldData = localStorage.getItem('field_data');
  const speciesData = localStorage.getItem('species_data');

  let navigate = useNavigate();

  const getHighestTreeInYear = (year: number) => {};

  const getBestGrowingMethodForSpecies = (species: string) => {};

  const getAverageHeightPerSpecies = () => {};

  // Navigate back to the first page if missing data
  React.useEffect(() => {
    if (!fieldData || !speciesData) {
      navigate('/');
    }
  }, []);

  return <div style={styles.mainContainer}>Dashboard</div>;
};

export default Dashboard;

const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#cbccbc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};
