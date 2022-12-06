import React from 'react';

import Dropdown from 'react-dropdown';
import { useNavigate } from 'react-router-dom';
import { FieldData, SpeciesData } from '../../types';

const Dashboard = () => {
  let fieldData: FieldData[];
  if ('field_data' in localStorage) {
    fieldData = JSON.parse(localStorage.getItem('field_data')!);
  }

  let speciesData: SpeciesData[];
  if ('species_data' in localStorage) {
    speciesData = JSON.parse(localStorage.getItem('species_data')!);
  }

  let yearLowBound: number;
  if ('year_low' in localStorage) {
    yearLowBound = JSON.parse(localStorage.getItem('year_low')!);
  }
  let yearHighBound: number;
  if ('year_high' in localStorage) {
    yearHighBound = JSON.parse(localStorage.getItem('year_high')!);
  }

  let navigate = useNavigate();

  const getHighestTreeInYear = (year: number): FieldData[] => {
    const result = fieldData
      .filter((tree) => tree.year_monitored === year)
      .sort((a, b) => b.height - a.height);

    return result.length > 5 ? result.splice(0, 5) : result;
  };

  const getSpeciesNameFromID = (id: number): string | undefined => {
    return speciesData.find((s) => s.tree_species_id === id)?.latin_name;
  };

  const getBestGrowingMethod = (species: string): string => {
    const result = fieldData
      .filter(
        (data: FieldData) => getSpeciesNameFromID(data.species_id) === species
      )
      .sort((a, b) => b.health - a.health)[0]?.method;

    fieldData
      .filter(
        (data: FieldData) => getSpeciesNameFromID(data.species_id) === species
      )
      .forEach((d) => console.log(d.health));

    return result;
  };

  const hasDataOnSpecies = (species: string): boolean => {
    const data = fieldData.filter(
      (s) => getSpeciesNameFromID(s.species_id) === species
    );

    return !!data.length;
  };

  const getAverageHeightPerSpecies = () => {};

  // Navigate back to the first page if missing data
  React.useEffect(() => {
    // if (!loading) {
    if (!fieldData) {
      console.log('this');
      navigate('/');
    } else if (!yearLowBound) {
      console.log('thisssss');
      navigate('/');
    }
    // }
  }, []);

  const HighestTree = () => {
    const [year, setYear] = React.useState<number>();
    const [highestTrees, setHighestTrees] = React.useState<FieldData[]>();

    return (
      <div>
        <p>Curious what the tallest 5 trees in a given year are?</p>
        <input
          type={'number'}
          min={yearLowBound}
          max={yearHighBound}
          style={{ width: 90, borderRadius: 4, marginRight: 10 }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setYear(Number.parseInt(e.target.value))
          }
          placeholder={'Pick a year'}
        />

        <button
          disabled={year === undefined}
          style={{
            border: 'none',
            backgroundColor: year === undefined ? 'grey' : '#404c24',
            paddingTop: 5,
            paddingBottom: 5,
            color: year === undefined ? 'darkGrey' : 'white',
            borderRadius: 3,
          }}
          onClick={() => {
            if (year) {
              const result = getHighestTreeInYear(year);
              setHighestTrees(result);
            }
          }}>
          Find out!
        </button>
        {highestTrees &&
          highestTrees.map((tree) => (
            <div>
              <p>{tree.species_id}</p>
              <p>{tree.height}</p>
            </div>
          ))}
      </div>
    );
  };

  const GrowingMethod = () => {
    const [species, setSpecies] = React.useState<string>('');
    const [method, setMethod] = React.useState<string>('');
    const options = speciesData
      .filter((s) => hasDataOnSpecies(s.latin_name))
      .map((s) => s.latin_name);

    return (
      <div style={{ width: '40%' }}>
        <p>What is the best way to grow a certain species of tree?</p>

        {speciesData && (
          <div
            style={{ border: '1px solid grey', borderRadius: 6, padding: 10 }}>
            <Dropdown
              options={options}
              onChange={(change) => {
                setSpecies(change.value);
                const result = getBestGrowingMethod(change.value);
                setMethod(result);
              }}
              value={species}
              placeholder='Select a species'
            />
          </div>
        )}

        {method && (
          <p>
            The best method to grow{' '}
            <span style={{ fontStyle: 'italic' }}>{species}</span> is using the{' '}
            {method} method.
          </p>
        )}
      </div>
    );
  };

  return (
    <div style={styles.mainContainer}>
      <h2>Welcome to the Land Life Dashboard</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '90%',
        }}>
        <HighestTree />
        <GrowingMethod />
      </div>
    </div>
  );
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
