import React from "react";

const ExpandedPhoto = (props) => {
return(
    <div className="expandedBackground">
         <div className="сontanerExpanded">
            <header className="expandedHeader">
                <img 
                src={props.img.avatar}
                className="expandedAutorIcon"
                />
            
                <h2 
                className="expandedAutorName"
                >
                    {props.img.name}
                </h2>
                                
                <button
                type="submit"
                className="expandedButtons expandedLike"
                >
                    &#127892;
                </button>
                <button
                type="submit"
                className="expandedButtons expandedAdd"
                >
                    &#43;
                </button>
                <button
                type="submit"
                className="expandedButtons expandedDownload"
                >
                    Download
                </button>
                <button
                type="submit"
                className="expandedButtons expandedCombo"
                >
                    &#5167;
                </button>
            </header>
            <img
            src={props.img.download.medium} 
            className="expandedPhoto"                           
            />        
            
        </div>
    </div>
)}

export default ExpandedPhoto;