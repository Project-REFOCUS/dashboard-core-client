import { Card, Box, Stack, CardContent } from '@mui/material'
import React from 'react'
import SidebarFilter from './SidebarFilter'
import ChartCard from '../chart/ChartCard'
import ChartCardExtendable from '../chart/ChartCardExtendable'
import { Geography } from '../common/types'

interface Props {
    state: Geography;
}

function StateSection({state} : Props) {
    return (
        <Card elevation={0}>
            <Stack spacing={1}>
                <Stack direction="row" spacing={1}>
                    <SidebarFilter geography={state}/>
                    <ChartCard titleBreadcrumbs={[["New York"],["Queens"]]} secondary handleExpandOnClick={()=>{}}/>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Box className="sidebar-spacer flex-left-ratio"></Box>
                    <Box id="chart-sidebar-panel" className="flex-right-ratio">
                        <Card className="inner-card" elevation={0}>
                            <ChartCardExtendable filterName={state.type} titleBreadcrumbs={[["New York"],["Queens"]]} geography={state} handleExpandOnClick={()=>{}}/>
                        </Card>
                    </Box>
                </Stack>
            </Stack>
        </Card>
    )
}

export default StateSection