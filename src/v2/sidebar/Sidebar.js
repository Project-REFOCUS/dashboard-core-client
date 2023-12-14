import React from 'react';
import { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Typography,
    TextField
} from '@mui/material';
import { getIndicatorCategories } from '../common/services';

import '../styles/sidebar/sidebar.scss';

const CardSX = {
    backgroundColor: 'rgba(223, 230, 233, 0.20)',
    borderRadius: 4
};

const Sidebar = () => {
    const [indicatorCategories, setIndicatorCategories] = useState([]);
    const [selectedIndicator, setSelectedIndicator] = useState('');
    useEffect(() => {
        getIndicatorCategories().then(categories => setIndicatorCategories(categories));
    }, []);
    return (
        <div className="main-sidebar-panel">
            <Card elevation={0} sx={CardSX}>
                <CardContent>
                    <Box>
                        <Stack spacing={2} columns={1}>
                            <Stack>
                                <FormControl variant="standard" size="small" fullWidth>
                                    {/*<Typography id="category-selector-label">Category</Typography>*/}
                                    <InputLabel>Select Category</InputLabel>
                                    <TextField
                                        select
                                        size="small"
                                        id="category-selector"
                                        value={selectedIndicator}
                                        onChange={indicator => setSelectedIndicator(indicator)}
                                        MenuProps={{
                                            transformOrigin: { vertical: 'top', horizontal: 'left' }
                                        }}
                                    >
                                        {indicatorCategories.map(category => <MenuItem key={category.id} value={category.dashboardId}>{category.name}</MenuItem>)}
                                    </TextField>
                                </FormControl>
                            </Stack>
                            <Stack>
                                <FormControl variant="standard" size="small" fullWidth>
                                    <Typography>State</Typography>
                                    <Select
                                        labelId="state-selector-label"
                                        id="state-selector"
                                        value="New York"
                                        onChange={() => {}}
                                        variant="outlined"
                                    >
                                        <MenuItem value="New York">New York</MenuItem>
                                        <MenuItem value="Florida">Florida</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
};

export default Sidebar;
