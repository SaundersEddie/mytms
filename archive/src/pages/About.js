// Return the About of our app, this should be a modal

import React from 'react';
import { Typography } from '@material-ui/core';

const About = () => {
    return (
        <button type="button" onClick={handleOpen}>
            Open Modal
        </button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
        {body}
      </Modal>
    )
}