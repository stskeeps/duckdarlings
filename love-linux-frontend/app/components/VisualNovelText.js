// components/VisualNovelText.js
const VisualNovelText = ({ text, options }) => {
  return (
    <div className="visual-novel-text">
      
      {options.map((option, index) => (
        <button className="visual-novel-button" key={index}>{option}</button>
      ))}
      
    </div>
  );
};
  
export default VisualNovelText;
  