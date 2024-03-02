import PropTypes from "prop-types";

export default function Die({ value, getItem, isHeld }) {
  return (
    <div
      className="die"
      onClick={getItem}
      style={{
        backgroundColor: isHeld && "rgb(222, 255, 174)",
      }}
    >
      <h6>{value}</h6>
    </div>
  );
}

Die.propTypes = {
  value: PropTypes.node,
  getItem: PropTypes.any,
  isHeld: PropTypes.node,
};
