function Paint(props){
const {color} = props;
const text = `hi i am ${color} car`;
return(
<h1>{text}</h1>
);
}
export default Paint;