import React from 'react';
import Dashboard from './Dashboard/Dashboard';
import Papa from 'papaparse';
import { Outlet, Link } from 'react-router-dom';

const Application = () => {
  const [hasFieldData, setHasFieldData] = React.useState<boolean>(false);
  const [hasSpeciesData, setHasSpeciesData] = React.useState<boolean>(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach(async (file: File) => {
        const validFile =
          file.name.includes('field_data') || file.name.includes('species');

        if (validFile) {
          const fileContent = await file.text();

          const parsedData: { data: any[] } = Papa.parse(fileContent, {
            header: true,
          });

          if (parsedData.data.length) {
            if (file.name.includes('field_data')) {
              setHasFieldData(true);
              localStorage.setItem(
                'field_data',
                JSON.stringify(parsedData.data)
              );
            } else {
              setHasSpeciesData(true);
              localStorage.setItem(
                'species_data',
                JSON.stringify(parsedData.data)
              );
            }
          }
        }
      });
    }
  };

  type UploadStatusProps = {
    name: string;
    value: boolean;
  };

  const UploadStatus = (props: UploadStatusProps) => {
    return (
      <div style={styles.uploadStatusContainer}>
        <p style={styles.uploadStatusFile}>{props.name}</p>
        <div
          style={{
            ...styles.uploadStatus,
            backgroundColor: `${props.value ? '#d4c9c1' : 'transparent'}`,
          }}
        />
      </div>
    );
  };

  const FormUpload = () => {
    return (
      <div style={styles.formUploadContainer}>
        <h3 style={styles.title}>Welcome to the Land Life Dashboard</h3>
        <p style={{ marginBottom: 25 }}>
          Please upload the species and field data csv files to get started!
        </p>

        <div style={styles.fileUploadContainer}>
          <div>
            <UploadStatus name='Field data' value={hasFieldData} />
            <UploadStatus name='Species data' value={hasSpeciesData} />
          </div>
          <input
            type={'file'}
            name='file'
            accept='.csv'
            multiple
            onChange={handleUpload}
          />
        </div>

        <ProceedButton />
      </div>
    );
  };

  const ProceedButton = () => {
    return (
      <Link to={'/dashboard'} style={styles.proceedButtonWrapper}>
        <div
          onClick={() => {}}
          style={{
            ...styles.proceedButtonContainer,
            backgroundColor: `${
              !hasFieldData || !hasSpeciesData ? 'grey' : '#3e4437'
            }`,
            border: `1px solid ${
              !hasFieldData || !hasSpeciesData ? 'grey' : '#3e4437'
            }`,
          }}>
          Proceed
        </div>
      </Link>
    );
  };

  return (
    <div style={styles.mainContainer}>
      <FormUpload />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cbccbc',
  },
  formUploadContainer: {
    boxShadow: '1px 2px 9px #3e4437',
    borderRadius: 4,
    backgroundColor: '#a2ac94',
    padding: 20,
  },
  proceedButtonContainer: {
    borderRadius: 15,
    width: '50%',
    textAlign: 'center',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 40,
  },
  proceedButtonWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecorationLine: 'none',
  },
  fileUploadContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { textAlign: 'center', marginBottom: 50 },
  uploadStatusContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadStatusFile: {
    width: 100,
    fontSize: 15,
    marginRight: 20,
  },
  uploadStatus: {
    height: 20,
    width: 20,
    borderRadius: 100,
    border: `1px solid #3e4437`,
  },
};

export default Application;
