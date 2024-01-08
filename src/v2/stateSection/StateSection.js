import { Card, Box, Stack, CardContent } from '@mui/material'
import React from 'react'
import SidebarFilter from './SidebarFilter'
import ChartCard from '../chart/ChartCard'


function StateSection({state}) {
    return (
        <Card elevation={0}>
            <CardContent>
                <Stack direction="row">
                    <SidebarFilter location={state}/>
                    <ChartCard/>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default StateSection