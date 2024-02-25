import React, { useEffect, useState } from 'react'
import { GeographyEnum, GraphTypeEnum } from '../common/enum';
import AppStore from '../stores/AppStore';
import { Geography } from '../common/types';

interface Props {
    geographies: Geography[],
    targetType?: GeographyEnum,
    graphType?: GraphTypeEnum,
    className?: string  //pass through css prop
    handleGraphTypeOptions: (graphOptions : GraphTypeEnum[]) => void
}

function GraphIframe({geographies, targetType, className, graphType=GraphTypeEnum.BAR, handleGraphTypeOptions}: Props) {

    const [ url, setUrl ] = useState<string>("");

    useEffect(() => {
        AppStore.getGraph(geographies, targetType, graphType).then(response => {
            console.log("Value of the graph url is: "+ JSON.stringify(response));
            setUrl(response.url);
            handleGraphTypeOptions(response.graphOptions);  // i reinitializes the graphOptions list multiple times
        });
    }, [geographies, graphType]);
    
    return (
        <iframe className={className} src={url}/>
    )
}

export default GraphIframe