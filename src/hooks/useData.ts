import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldData, RawFieldData, RawSpeciesData, SpeciesData } from '../types';

const useData = (): {
  cleanFieldData: (rawData: any[]) => {
    data: FieldData[];
    yearLow: number;
    yearHigh: number;
  };
  cleanSpeciesData: (rawData: any[]) => SpeciesData[];
} => {
  let rawFieldData: RawFieldData[];
  if ('raw_field_data' in localStorage) {
    rawFieldData = JSON.parse(localStorage.getItem('raw_field_data')!);
  }

  let rawSpeciesData: RawSpeciesData[];
  if ('raw_species_data' in localStorage) {
    rawSpeciesData = JSON.parse(localStorage.getItem('raw_species_data') ?? '');
  }

  let navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const convertStringToNumber = (value: string) => {
    const hasNumber = /\d/;

    if (hasNumber.test(value)) {
      return Number.parseInt(value);
    }
    return -1;
  };

  const cleanFieldData = (
    rawData: any[]
  ): {
    data: FieldData[];
    yearLow: number;
    yearHigh: number;
  } => {
    let lowBound: number = 90000000;
    let highBound: number = 0;
    let cleanFieldData: FieldData[] = [];

    rawData.forEach((dataEntry: RawFieldData) => {
      const yearMonitored = convertStringToNumber(dataEntry.year_monitored);
      if (yearMonitored < lowBound) {
        lowBound = yearMonitored;
      } else if (yearMonitored > highBound) {
        highBound = yearMonitored;
      }

      cleanFieldData.push({
        individual_tree_id: convertStringToNumber(dataEntry.individual_tree_id),
        species_id: convertStringToNumber(dataEntry.species_id),
        method: dataEntry.method ?? 'none',
        year_monitored: yearMonitored,
        years_after_planting: convertStringToNumber(
          dataEntry.years_after_planting
        ),
        height: convertStringToNumber(dataEntry.height),
        health: convertStringToNumber(dataEntry.health),
      } as FieldData);
    });

    return { data: cleanFieldData, yearLow: lowBound, yearHigh: highBound };
  };

  const cleanSpeciesData = (rawData: any[]): SpeciesData[] => {
    let cleanedSpeciesData: SpeciesData[] = [];

    rawData.forEach((dataEntry: RawSpeciesData) => {
      if (dataEntry.latin_name) {
        cleanedSpeciesData.push({
          ...dataEntry,
          tree_species_id: convertStringToNumber(dataEntry.tree_species_id),
        });
      }
    });

    return cleanedSpeciesData;
  };

  return {
    cleanFieldData,
    cleanSpeciesData,
  };
};

export default useData;
