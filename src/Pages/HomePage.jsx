import React, { useEffect, useState } from "react";
import Tendencias from "../Components/Tendencias";
import { Link } from "react-router-dom";
import UltimosComentarios from "../Components/UltimosComentarios";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

function HomePage() {
  const [tendenciasArr, setTendenciasArr] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get("https://api.jikan.moe/v4/top/anime");
      setTendenciasArr(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);



  if(tendenciasArr === null){
    return <h3>... Cargando</h3>
  }

  return (
    <div id="homepage">
      <h2 id='title-carousel'>Top 25 anime</h2>
      <Carousel data-bs-theme="dark" id="carousel">
       {tendenciasArr.data.map((eachTendencia,index) => {
        return(
        <Carousel.Item key={index} >
        <Tendencias  eachTendencia={eachTendencia}/>
        </Carousel.Item>)
      })} 
      </Carousel>
      <UltimosComentarios />

      <Link to="/anime-list">  
        <Button variant="outline-info" size="lg" id="btn-ir-contenido"> Ir al contenido</Button  >  
      </Link>
    </div>
  );
}

export default HomePage;
