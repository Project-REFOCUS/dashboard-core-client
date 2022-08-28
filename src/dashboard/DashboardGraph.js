import * as d3 from 'd3';
import React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { Image, Stack } from 'react-bootstrap';
import EmptyDataImg from '../empty_data_img.png';

const data = [
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
];

const DashboardGraph = () => {
    const graphContainerElement = useRef();
    const maxSignificantDigits = useMemo(
        () => data.reduce((maxValue, d) => Math.max(maxValue, String(d.value).length), 0),
        [data]
    );
    const marginLeft = maxSignificantDigits * 5 + 20
    useEffect(() => {
        const dimensions = graphContainerElement.current.getBoundingClientRect();
        const svg = d3.select('#data-content-container')
            .append('svg')
            .attr('width', dimensions.width)
            .attr('height', dimensions.height);
        const xAxisScale = d3.scaleTime()
            .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
            .range([Math.max(marginLeft, 25), dimensions.width - 25]);

        const xAxis = d3.axisBottom(xAxisScale)
            .tickFormat(d3.timeFormat('%Y-%m-%d'))
            .ticks(10);

        svg.append('g')
            .attr('transform', 'translate(0, ' + (dimensions.height - 30) + ')')
            .call(xAxis);

        const yAxisScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => +d.value)])
            .range([dimensions.height - 30, 10]);

        svg.append('g')
            .attr('transform', 'translate(' + marginLeft + ', 0)')
            .call(d3.axisLeft(yAxisScale));

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'hotPink')
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x(d => xAxisScale(new Date(d.date)))
                .y(d => yAxisScale(d.value))
            );
    }, []);
    return !1 ? (
        <Stack id="data-content-container" className="d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center ellipse-style-1">
                <Image src={EmptyDataImg} alt="empty-data" className="m-auto d-block" />
            </div>
            <p className="mt-2 paragraph-style-1">Select a category to start</p>
        </Stack>
    ) : (
        <div id="data-content-container" ref={graphContainerElement} className="d-flex"></div>
    );
};

export default DashboardGraph;
