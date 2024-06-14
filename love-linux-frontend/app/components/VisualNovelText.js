// components/VisualNovelText.js
const VisualNovelText = ({ options, buttonCallback }) => {
  return (
    <div className="visual-novel-text">
      
      {options.map((option, index) => (
        <button className="visual-novel-button" key={index}
          onClick={(e) => buttonCallback(e.target.innerText)}
        >{option}</button>
      ))}
      
    </div>
  );
};
  
export default VisualNovelText;
  