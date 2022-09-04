import * as d3 from 'd3';
import React from 'react';
import { useEffect, useMemo, useRef } from 'react';

const SPACE_PER_CHARACTER = 5;
const ADDITIONAL_PADDING = 20;

const DashboardLineGraph = ({ xAxisData, yAxisData }) => {
    const graphContainerElement = useRef();
    const xAxisMaxSignificantDigits = useMemo(
        () => xAxisData.reduce((maxValue, d) => Math.max(maxValue, String(d.value).length), 0),
        [xAxisData]
    );
    const yAxisMaxSignificantDigits = useMemo(
        () => yAxisData.reduce((maxValue, d) => Math.max(maxValue, String(d.value).length), 0),
        [yAxisData]
    );
    const marginLeft = xAxisMaxSignificantDigits * SPACE_PER_CHARACTER + ADDITIONAL_PADDING;
    const offsetRight = yAxisMaxSignificantDigits * SPACE_PER_CHARACTER + ADDITIONAL_PADDING;

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
    }, [xAxisData, yAxisData]);
    return <div id="data-content-container" ref={graphContainerElement} className="d-flex max-height"></div>;
};

export default DashboardLineGraph;
