import React from 'react'
import { 
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'

//#6C60FF

const listItemSX = {
    gap: '7.4px',
    padding: '0',
}

const ListLabelDot = ({title, color }) => {
    return (
        <ListItem sx={listItemSX}>
            <ListItemIcon sx={{ minWidth: "min-content"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="7.93213" cy="7.70801" r="7" fill={color}/>
                </svg>
            </ListItemIcon>
            <ListItemText
                primary={title}
            />
        </ListItem>
    )
}

export default ListLabelDot