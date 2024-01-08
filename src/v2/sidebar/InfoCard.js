import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material';

const InfoCardSX = {
    borderBottom: '4px solid #BF3E96',
}

const TextSX = {
    color: '#636E72',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontFamily: 'Lato',
    fontSize: '0.75rem',
    fontWeight: 1000,
}

function InfoCard() {
    return (
        <Box fullWidth>
            <Card className='inner-card' elevation={0} sx={InfoCardSX}>
                <CardContent>
                    <Typography sx={TextSX}>
                        Please select a category and state to drill down
                        and access more detailed information about that state's
                        data and statistics.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default InfoCard;