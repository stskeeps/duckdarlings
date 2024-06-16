// components/BottomText.js
const BottomText = ({ text, color }) => {
  return (
    <div className="bottom-text" style={
      color={color}
    }>
      <div className="text-wrapper">
        {text}
      </div>      
    </div>
  );
};

export default BottomText;
