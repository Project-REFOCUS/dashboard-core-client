import * as d3 from 'd3';
import React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import DashboardGraphSpinner from './DashboardGraphSpinner';

const xAxisData = [
    {date: '2022-01-01T00:00', value: 5},
    {date: '2022-01-02T00:00', value: 7},
    {date: '2022-01-03T00:00', value: 10},
    {date: '2022-01-04T00:00', value: 15},
    {date: '2022-01-05T00:00', value: 25},
    {date: '2022-01-06T00:00', value: 40},
    {date: '2022-01-07T00:00', value: 60},
    {date: '2022-01-08T00:00', value: 85},
    {date: '2022-01-09T00:00', value: 115},
    {date: '2022-01-10T00:00', value: 50},
    {date: '2022-01-11T00:00', value: 70},
    {date: '2022-01-12T00:00', value: 90},
    {date: '2022-01-13T00:00', value: 35},
    {date: '2022-01-14T00:00', value: 55},
    {date: '2022-01-15T00:00', value: 77},
    {date: '2022-01-16T00:00', value: 130},
    {date: '2022-01-17T00:00', value: 150},
    {date: '2022-01-18T00:00', value: 165},
    {date: '2022-01-19T00:00', value: 180},
    {date: '2022-01-20T00:00', value: 200},
    {date: '2022-01-21T00:00', value: 220},
    {date: '2022-01-22T00:00', value: 240},
    {date: '2022-01-23T00:00', value: 300},
    {date: '2022-01-24T00:00', value: 350},
    {date: '2022-01-25T00:00', value: 410}
];

const yAxisData = [
    {date: '2022-01-01T00:00', value: 10},
    {date: '2022-01-02T00:00', value: 50},
    {date: '2022-01-03T00:00', value: 70},
    {date: '2022-01-04T00:00', value: 120},
    {date: '2022-01-05T00:00', value: 150},
    {date: '2022-01-06T00:00', value: 180},
    {date: '2022-01-07T00:00', value: 210},
    {date: '2022-01-08T00:00', value: 170},
    {date: '2022-01-09T00:00', value: 230},
    {date: '2022-01-10T00:00', value: 250},
    {date: '2022-01-11T00:00', value: 150},
    {date: '2022-01-12T00:00', value: 180},
    {date: '2022-01-13T00:00', value: 330},
    {date: '2022-01-14T00:00', value: 431},
    {date: '2022-01-15T00:00', value: 270},
    {date: '2022-01-16T00:00', value: 210},
    {date: '2022-01-17T00:00', value: 140},
    {date: '2022-01-18T00:00', value: 180},
    {date: '2022-01-19T00:00', value: 150},
    {date: '2022-01-20T00:00', value: 110},
    {date: '2022-01-21T00:00', value: 140},
    {date: '2022-01-22T00:00', value: 200},
    {date: '2022-01-23T00:00', value: 210},
    {date: '2022-01-24T00:00', value: 170},
    {date: '2022-01-25T00:00', value: 100}
];

const DashboardLineGraph = ({ leftAxisData, isLoading }) => {
    const [graphDimensions, setGraphDimensions] = useState(null);
    const graphContainerElement = useRef();
    const xAxisMaxSignificantDigits = useMemo(
        () => xAxisData.reduce((maxValue, d) => Math.max(maxValue, String(d.value).length), 0),
        [xAxisData]
    );
    const yAxisMaxSignificantDigits = useMemo(
        () => yAxisData.reduce((maxValue, d) => Math.max(maxValue, String(d.value).length), 0),
        [yAxisData]
    );
    const marginLeft = xAxisMaxSignificantDigits * 5 + 20;
    const offsetRight = yAxisMaxSignificantDigits * 5 + 20;

    useEffect(() => {
        const dimensions = graphContainerElement.current.getBoundingClientRect();
        const svg = d3.select('#data-content-container')
            .append('svg')
            .attr('width', dimensions.width)
            .attr('height', dimensions.height);

        const bottomAxisTimeScale = d3.scaleTime()
            .domain([new Date(xAxisData[0].date), new Date(xAxisData.slice(-1)[0].date)])
            .range([Math.max(marginLeft, 25), dimensions.width - offsetRight]);

        const bottomAxis = d3.axisBottom(bottomAxisTimeScale)
            .tickFormat(d3.timeFormat('%Y-%m-%d'))
            .ticks(10);

        svg.append('g')
            .attr('transform', 'translate(0, ' + (dimensions.height - 30) + ')')
            .call(bottomAxis);

        const xAxisScale = d3.scaleLinear()
            .domain([0, d3.max(xAxisData, d => +d.value)])
            .range([dimensions.height - 30, 10]);

        svg.append('g')
            .attr('transform', 'translate(' + marginLeft + ', 0)')
            .call(d3.axisLeft(xAxisScale));

        const yAxisScale = d3.scaleLinear()
            .domain([0, d3.max(yAxisData, d => +d.value)])
            .range([dimensions.height - 30, 10]);

        svg.append('g')
            .attr('transform', 'translate(' + (dimensions.width - offsetRight) + ', 0)')
            .call(d3.axisRight(yAxisScale));

        svg.append('path')
            .datum(xAxisData)
            .attr('fill', 'none')
            .attr('stroke', 'hotPink')
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x(d => bottomAxisTimeScale(new Date(d.date)))
                .y(d => xAxisScale(d.value))
            );

        svg.append('path')
            .datum(yAxisData)
            .attr('fill', 'none')
            .attr('stroke', 'purple')
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x(d => bottomAxisTimeScale(new Date(d.date)))
                .y(d => yAxisScale(d.value))
            );
        setGraphDimensions(dimensions);
    }, []);

    return (
        <div id="data-content-container" ref={graphContainerElement} className="d-flex max-height">
            {graphDimensions && isLoading && <DashboardGraphSpinner dimensions={graphDimensions} yOffset={-30} xOffset={0} />}
        </div>
    );
};

export default DashboardLineGraph;
