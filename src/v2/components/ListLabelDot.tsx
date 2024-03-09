import React from 'react'
import { 
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'

//#6C60FF

interface Props {
    title: string;
    color: string;
}

const listItemSX = {
    gap: '7.4px',
    padding: '0',
}

const ListLabelDot = ({title, color} : Props) => {
    return (
        <ListItem sx={listItemSX}>
            <ListItemIcon sx={{ minWidth: "min-content"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="7.93213" cy="7.70801" r="7" fill={color}/>
                </svg>
            </ListItemIcon>
            <ListItemText
                primary={title}
                sx={{ fontFamily: "Open Sans, sans-serif", fontSize: '14px', fontWeight: 400 }}
            />
        </ListItem>
    )
}

export default ListLabelDot