import PropTypes from "prop-types";

export default function Die(props) {
  // Define dieClass for die background color change
  const dieColor = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div>
      {/* <button>{(props.value, props.isHeld)}</button> */}
      <button onClick={props.hold} style={dieColor}>
        {props.value}
      </button>
    </div>
  );
}

Die.propTypes = {
  value: PropTypes.number.isRequired,
  isHeld: PropTypes.bool.isRequired,
  hold: PropTypes.func.isRequired,
};