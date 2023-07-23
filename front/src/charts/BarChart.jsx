import React, { useState, useEffect } from 'react';
import Chart  from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import { Bar } from 'react-chartjs-2';
import { getParticipant } from  '../store/participantSlice';
import { getFormateur} from  '../store/formateurSlice';
import { getFormation } from  '../store/formationSlice';
import { useDispatch, useSelector } from 'react-redux';


Chart.register(CategoryScale);


const BarChart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParticipant());
    dispatch(getFormateur());
    dispatch(getFormation());
  }, [dispatch]);
   const formateurs = useSelector((state) => state.formateur.formateurs);
  const participants = useSelector((state) => state.participant.participants);
  const formations = useSelector((state) => state.formation.formations);

  var data = {
    labels: ["formateurs","participant","formations"],
    datasets: [{
      label: 'nombre',
      data: [formateurs.length,participants.length,formations.length],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Bar
        data={data}
        height={400}
        options={options}
      />
    </div>
  )
}

export default BarChart