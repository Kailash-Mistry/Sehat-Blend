import { React, useState } from 'react'
import { data } from './HospitalData'; 
import CallLogo from '../assets/call.png';
import { Navbar } from './Navbar';
import { Link } from "react-router-dom";

function Card({ id, title, open, close }) {
  return (
    <Link to="/home" className="card bg-slate-300 w-88 min-w-56 h-144 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-[1px] hover:cursor-pointer" key={id}>
      <div className="image p-2 w-full h-auto rounded-md overflow-hidden">
        <img className="object-cover rounded-xl" src="https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=600" alt={title} />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-black">{title}</h2>
        <div className="mt-5">
          <div className="text-slate-700 font-semibold">Opens: {open}</div>
          <div className="text-slate-700 font-semibold">Closes: {close}</div>
          <div className="text-slate-700 mt-5 font-semibold flex h-8">
            <img src={CallLogo} className="h-5 mr-3" alt="Call logo" />
            Contact No: <u className="ml-2">9876543244</u>
          </div>
        </div>
      </div>
    </Link>
  );
}


export function CardList({ searchQuery }) {
    

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    
    <div id="cards-container" className="outer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-24 items-start mx-10 h-auto min-h-[1000px]">
            {filteredData.map((item) => (
                <Card key={item.id} title={item.title} open={item.open} close={item.close} />
            ))}
    </div>
  );
}

export default CardList;
