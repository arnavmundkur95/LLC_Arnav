export type RawSpeciesData = {
  tree_species_id: string;
  latin_name: string;
};

export type SpeciesData = {
  tree_species_id: number;
  latin_name: string;
};

export type RawFieldData = {
  individual_tree_id: string;
  species_id: string;
  method: string;
  year_monitored: string;
  years_after_planting: string;
  health: string;
  height: string;
};

export type FieldData = {
  individual_tree_id: number;
  species_id: number;
  method: string;
  year_monitored: number;
  years_after_planting: number;
  health: number;
  height: number;
};
