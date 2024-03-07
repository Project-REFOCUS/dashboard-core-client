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

    const [ url, setUrl ] = useState<string>("");
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);   

    // Todo: Check if category needs to be used as a trigger for this effect. Might be abe to remove the prop entirely
    useEffect(() => {
        setIsLoading(true);
        AppStore.getGraph(geographies, targetType, graphType).then(response => {
            console.log("Value of the graph url for category{"+ category?.name +"} is: "+ JSON.stringify(response));
            setUrl(response.url);
            handleGraphTypeOptions(response.graphOptions);
        });
    }, [geographies, graphType, category]);

    const handleIframeLoad = () => {
        setIsLoading(false);
    }

    const resizeIframe = ( iframe : HTMLIFrameElement) => {
        const { contentDocument, contentWindow } = iframe;
        if (contentDocument) {
            const clientWidth = iframe.contentWindow?.document.scrollingElement?.clientWidth;
            // const newHeight = `${iframe.contentWindow?.document.scrollingElement?.clientHeight}px`;
            // console.log("Document is: " + JSON.stringify(contentWindow?.document.body.scrollHeight));
            // console.log("Document found className: " + JSON.stringify(contentWindow?.document.body.getElementsByClassName("design-playground-resizable-container")));
            // console.log("Document found className: " + JSON.stringify(contentWindow?.document.body.querySelector(".design-playground-resizable-container")));
            // // console.log("Document found id: " + JSON.stringify(contentWindow?.document.body .getElementById("dashboardSurface")));
            console.log("Iframe Width: "+ contentDocument.documentElement.clientWidth + " or " + clientWidth);
            // console.log("Iframe Height: "+ contentDocument.documentElement.clientHeight + " or " + newHeight);
            // // iframe.style.width = clientWidth;
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
            { isLoading && <LoadingAnimation/> }
            <iframe
                className={ isLoading ? "vanish" : ""}
                ref={iframeRef}
                src={url}
                style={iframeStyle}
                onLoad={handleIframeLoad}
            ></iframe>
        </>

    )
})

export default GraphIframe