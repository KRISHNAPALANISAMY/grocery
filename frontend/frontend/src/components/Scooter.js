import {useState} from 'react';
function Scooter(){
    const [scooter,setScooter] = useState({
        color:"red",
        brand:"activa 6g"
    });
    function changeColor(){
        setScooter(scooter.color='blue');
    }
    return  <>
            <p>scooter color is {scooter.color}</p>
            <p>scooetr brand is {scooter.brand}</p>
            <button onClick={changeColor}>change color</button>
            </>
}
export default Scooter;