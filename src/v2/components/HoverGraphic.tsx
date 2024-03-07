import React from 'react';
import { Popover, Typography } from '@mui/material';

interface Props {
    visible : boolean,
    anchorRef : HTMLElement | null,
    children: React.ReactNode,
    handleClose: () => void
}

const HoverGraphic = ({ visible, anchorRef, children, handleClose } : Props) => {
    return (
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: 'none',
                zIndex: 999,
                opacity: 0.9,
                // '&::before': {
                //     content: '""',
                //     // position: 'relative',
                //     // top: '-10px',
                //     left: '50%',
                //     border: '10px solid transparent',
                //     borderTop: 0,
                //     borderBottom: '15px solid #5494db',
                //     borderBottomColor: 'black',
                //     transform: 'translateX(-50%)',
                // },
            }}
            open={visible}
            anchorEl={anchorRef}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            onClose={handleClose}   // close event that happens during click on the backdrop element
            disablePortal
            disableScrollLock
            disableRestoreFocus
            // slotProps={{
            //     paper: {
            //         sx: {
            //             overflowX: "unset",
            //             overflowY: "unset",
            //             "&::after": {
            //                 content: '""',
            //                 position: "absolute",
            //                 marginRight: "-0.71em",
            //                 bottom: 0,
            //                 right: 0,
            //                 width: 10,
            //                 height: 10,
            //                 transform: "translate(-50%, 50%) rotate(135deg)",
            //                 clipPath: "polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))",
            //             },
            //         }
            //     },
            // }}
        >
            <Typography sx={{ p: 1 }}>{children}</Typography>
        </Popover>
    )
}

export default HoverGraphic