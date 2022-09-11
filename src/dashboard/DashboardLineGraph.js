import * as d3 from 'd3';
import React from 'react';
import { useEffect, useMemo, useRef } from 'react';

const SPACE_PER_CHARACTER = 5;
const ADDITIONAL_PADDING = 20;
const BOTTOM_PADDING = 30;

const DashboardLineGraph = ({ leftAxis, rightAxis }) => {
    const graphContainerElement = useRef();
    const leftAxisMaxSignificantDigits = useMemo(
        () => leftAxis.data?.reduce((maxValue, d) => Math.max(maxValue, String(d.value).length), 0),
        [leftAxis.data]
    );
    const rightAxisMaxSignificantDigits = useMemo(
        () => rightAxis.data ? rightAxis.data.reduce((maxValue, d) => Math.max(maxValue, String(d.value).length), 0) : 0,
        [rightAxis.data]
    );
    const marginLeft = leftAxisMaxSignificantDigits * SPACE_PER_CHARACTER + ADDITIONAL_PADDING;
    const offsetRight = rightAxisMaxSignificantDigits * SPACE_PER_CHARACTER + ADDITIONAL_PADDING;

    useEffect(() => {
        const dimensions = graphContainerElement.current.getBoundingClientRect();
        const svg = d3.select('#data-content-container')
            .append('svg')
            .attr('width', dimensions.width)
            .attr('height', dimensions.height);

        const bottomAxisTimeScale = d3.scaleTime()
            .domain(leftAxis.data ? [new Date(leftAxis.data[0].date), new Date(leftAxis.data.slice(-1)[0].date)] : [])
            .range([Math.max(marginLeft, 25), dimensions.width - offsetRight]);

        const bottomAxis = d3.axisBottom(bottomAxisTimeScale)
            .tickFormat(d3.timeFormat('%Y-%m-%d'))
            .ticks(10);

        svg.append('g')
            .attr('transform', 'translate(0, ' + (dimensions.height - BOTTOM_PADDING) + ')')
            .call(bottomAxis);

        const leftAxisScale = d3.scaleLinear()
            .domain([0, d3.max(leftAxis.data || [], d => +d.value)])
            .range([dimensions.height - BOTTOM_PADDING, 10]);

        svg.append('g')
            .attr('transform', 'translate(' + marginLeft + ', 0)')
            .call(d3.axisLeft(leftAxisScale));

        const rightAxisScale = d3.scaleLinear()
            .domain([0, d3.max(rightAxis.data || [], d => +d.value)])
            .range([dimensions.height - BOTTOM_PADDING, 10]);

        svg.append('g')
            .attr('transform', 'translate(' + (dimensions.width - offsetRight) + ', 0)')
            .call(d3.axisRight(rightAxisScale));

        svg.append('path')
            .datum(leftAxis.data || [])
            .attr('fill', 'none')
            .attr('class', leftAxis.query.color)
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x(d => bottomAxisTimeScale(new Date(d.date)))
                .y(d => leftAxisScale(d.value))
            );

        svg.append('path')
            .datum(rightAxis.data || [])
            .attr('fill', 'none')
            .attr('class', rightAxis.query ? rightAxis.query.color : '')
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x(d => bottomAxisTimeScale(new Date(d.date)))
                .y(d => rightAxisScale(d.value))
            );
    }, [leftAxis.data, rightAxis.data]);
    return <div id="data-content-container" ref={graphContainerElement} className="d-flex max-height"></div>;
};

export default DashboardLineGraph;
