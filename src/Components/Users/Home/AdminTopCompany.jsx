import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
import { FaExternalLinkAlt } from "react-icons/fa";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function AdminTopCompany() {
    const options = {
        animationEnabled: true,
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name} {y}",
            yValueFormatString: "#,###0.0'⭐'",
            dataPoints: [
                { name: "Intel", y: 3.7 },
                { name: "Google", y: 4.2 },
                { name: "Microsoft", y: 4.8 },
                { name: "Meta", y: 4.3 },
            ]
        }],
    }

    return (

        <div className='w-full'>
            <h4 className='text-2xl font-bold text-center'>Top Rated Company</h4>
            <CanvasJSChart options={options} />
            <div className='flex justify-center mb-10'>
                <button className='bg-black mt-5 rounded px-3 py-1 text-white text-sm flex justify-center items-center'>View all<FaExternalLinkAlt className='ml-2' />
                </button>
            </div>
        </div>

    )
}
