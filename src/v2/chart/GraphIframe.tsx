import React, { useEffect, useRef, useState } from 'react'
import { GeographyEnum, GraphTypeEnum } from '../common/enum';
import AppStore from '../stores/AppStore';
import { Category, Geography } from '../common/types';
import { observer } from 'mobx-react';
import LoadingAnimation from '../components/LoadingAnimation';

// 338 (height) / 575.2 (width) = 0.5876216968011
// the iframe content height is calculated by our input width
// f(app width) = iframe content height
// f(575.2) = 338
// const aspectRatio = 0.5876216968011;
// adjusted to 0.57 to account for fullscreen event
const aspectRatio = 0.5717;

const iframeStyle = {
    border: 'none',
    width: '100%',
    transition: 'all 0.2s ease',
    // overflow: 'hidden'
}

interface Props {
    geographies: Geography[],
    targetType: GeographyEnum,
    graphType?: GraphTypeEnum,
    category: Category | null,
    handleGraphTypeOptions: (graphOptions : GraphTypeEnum[]) => void,
    fullscreen: boolean,
}

const GraphIframe = observer(({geographies, targetType, category, graphType=GraphTypeEnum.BAR, handleGraphTypeOptions, fullscreen}: Props) => {

    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ errorState, setErrorState ] = useState<boolean>(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);   

    useEffect(() => {
        setIsLoading(true);
        setErrorState(false);
        AppStore.getGraph(geographies, targetType, graphType).then(response => {
            console.log("Value of the graph url for category{"+ category?.name +"} is: "+ JSON.stringify(response));
            
            // Iframe has a race condition, the load handler needs to be attached before the src.
            // The symptom revealing this issue is the iframe will only trigger onload when mounted.
            // If the src changes the iframe will not trigger the load handler. This fixes that.
            const iframe = iframeRef.current;
            iframe?.setAttribute("src", response.url);

            handleGraphTypeOptions(response.graphOptions);
        }).catch(() => {
            setIsLoading(false);
            setErrorState(true);
        });
    }, [geographies, graphType, category]);

    const handleIframeLoad = () => {
        setIsLoading(false);
    }

    const resizeIframe = ( iframe : HTMLIFrameElement) => {
        const { contentDocument, contentWindow } = iframe;
        if (contentDocument) {
            const clientWidth = iframe.contentWindow?.document.scrollingElement?.clientWidth;
            iframe.style.height = `${clientWidth ? clientWidth * aspectRatio : 338}px`;
        }
    }

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            resizeIframe(iframe);
        }
    }, [fullscreen, isLoading]);
    
    return (
        <>
            {(isLoading || errorState) && <LoadingAnimation loading={isLoading} error={errorState}/>}
            <iframe
                className={ isLoading || errorState ? "vanish" : ""}
                ref={iframeRef}
                onLoad={handleIframeLoad}
                style={iframeStyle}
            ></iframe>
        </>

    )
})

export default GraphIframe