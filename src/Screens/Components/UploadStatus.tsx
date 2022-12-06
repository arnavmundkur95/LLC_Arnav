import React from 'react';

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

const styles: { [key: string]: React.CSSProperties } = {
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

export default UploadStatus;
