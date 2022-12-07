import React from 'react';

import Dropdown from 'react-dropdown';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { FieldData, SpeciesData } from '../../types';
import { useScrollBy } from 'react-use-window-scroll';

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
  const scrollBy = useScrollBy();
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
      <div style={styles.sectionContainer}>
        <h4 style={{ color: 'white' }}>
          Curious what the tallest 5 trees in a given year are?
        </h4>
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
            backgroundColor: year === undefined ? 'grey' : '#2b3b32',
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
        <div style={{ marginTop: 15 }}>
          {highestTrees &&
            highestTrees.map((tree) => (
              <div
                style={{
                  border: '1px solid black',
                  borderRadius: 5,
                  marginBottom: 5,
                  paddingLeft: 10,
                  backgroundColor: '#bcb494',
                }}>
                <p>
                  Species:{' '}
                  <span style={{ fontStyle: 'italic' }}>
                    {getSpeciesNameFromID(tree.species_id)}
                  </span>
                </p>
                <p>Height: {tree.height}cm</p>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const GrowingMethod = () => {
    const [species, setSpecies] = React.useState<string>('');
    const [method, setMethod] = React.useState<string>('');
    const options = speciesData
      ? speciesData
          .filter((s) => hasDataOnSpecies(s.latin_name))
          .map((s) => s.latin_name)
      : [];

    return (
      <div style={{ ...styles.sectionContainer, width: '40%' }}>
        <h4 style={{ color: 'white' }}>
          What is the best way to grow a certain species of tree?
        </h4>

        {speciesData && (
          <div
            style={{
              border: '1px solid grey',
              borderRadius: 6,
              padding: 10,
              color: 'white',
              marginBottom: 15,
            }}>
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
          <p style={{ color: 'white' }}>
            The best way to grow{' '}
            <span style={{ fontStyle: 'italic' }}>{species}</span> is using the{' '}
            "{method}" method.
          </p>
        )}
      </div>
    );
  };

  const getGrowingMethods = (): string[] => {
    const methods: { [key: string]: boolean } = {};
    fieldData.forEach((data) => {
      if (data.method && !methods[data.method]) {
        methods[data.method] = true;
      }
    });

    return Object.keys(methods);
  };

  const getBarChartData = (method: string): BarChartData[] => {
    const record: { [key: string]: { sum: number; count: number } } = {};
    const data = fieldData.filter((d) => d.method === method);
    const species: string[] = speciesData.map((s) => s.latin_name);
    const response: BarChartData[] = [];

    // Populating the record object with values for the chart data
    species.forEach((m: string) => {
      record[m] = { sum: 0, count: 0 };
    });

    data.forEach((dataPoint) => {
      const speciesName = getSpeciesNameFromID(dataPoint.species_id);
      if (speciesName && dataPoint.height) {
        if (record[speciesName]) {
          record[speciesName] = {
            sum: record[speciesName].sum + dataPoint.height,
            count: record[speciesName].count + 1,
          };
        }
      }
    });

    // Extracting values to the format rechart expects
    Object.keys(record).forEach((r) => {
      if (record[r].count) {
        response.push({ species: r, height: record[r].sum / record[r].count });
      }
    });

    return response;
  };

  type BarChartData = {
    species: string;
    height: number;
  };

  const Histogram = () => {
    const [method, setMethod] = React.useState<string>('');

    const options = React.useMemo(() => {
      return getGrowingMethods();
    }, []);

    const data: BarChartData[] = method ? getBarChartData(method) : [];

    return (
      <div
        style={{
          ...styles.sectionContainer,
          width: '80%',
          marginTop: 40,
          backgroundColor: '#bcb494',
        }}>
        <h3>Explore the data</h3>
        <p>
          Discover how the growing method affects the average height of each
          tree species.
        </p>
        {speciesData && (
          <div
            style={{
              border: '1px solid grey',
              borderRadius: 6,
              padding: 10,
              width: '30%',
              marginBottom: 30,
            }}>
            <Dropdown
              options={options}
              onChange={(change) => {
                setMethod(change.value);
              }}
              value={method}
              placeholder='Select a growing method'
            />
          </div>
        )}
        {!!data.length && (
          <BarChart
            width={window.innerWidth - window.innerWidth * 0.3}
            height={500}
            data={data}
            style={{ marginTop: 30, marginBottom: 20 }}>
            <XAxis
              name='Height (cm)'
              dataKey='species'
              style={{ color: 'black' }}
            />
            <YAxis
              label={{
                value: 'Height (cm)',
                position: 'insideLeft',
                angle: -90,
                dy: -10,
              }}
              style={{ color: 'black' }}
            />
            <Bar dataKey='height' fill='#404c24' />
          </BarChart>
        )}
      </div>
    );
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.innerContainer}>
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

        <Histogram />
      </div>
    </div>
  );
};

export default Dashboard;

const styles: { [key: string]: React.CSSProperties } = {
  outerContainer: {
    height: '100vh',
    width: '100%',
    backgroundColor: '#cbccbc',
    overflow: 'scroll',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionContainer: {
    backgroundColor: '#404c24',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
};
