import React from 'react';
import { Link } from 'react-router-dom';

type ProceedButtonProps = {
  hasFieldData: boolean;
  hasSpeciesData: boolean;
};

const ProceedButton = (props: ProceedButtonProps) => {
  return (
    <Link to={'/dashboard'} style={styles.proceedButtonWrapper}>
      <div
        onClick={() => {}}
        style={{
          ...styles.proceedButtonContainer,
          backgroundColor: `${
            !props.hasFieldData || !props.hasSpeciesData ? 'grey' : '#3e4437'
          }`,
          border: `1px solid ${
            !props.hasFieldData || !props.hasSpeciesData ? 'grey' : '#3e4437'
          }`,
        }}>
        Proceed
      </div>
    </Link>
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

export default ProceedButton;
