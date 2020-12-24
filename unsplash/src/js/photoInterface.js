import React from "react";

const PhotoUserInterface = (props) => {
return(
    <div className="photoInterface">        
        <img 
        src={props.avatar}
        className="autorIcon"
        />
    
        <h2 
        className="autorName"
        >
            {props.name}
        </h2>
        <div 
        className="gradient"
        onClick = {()=>props.expandPhoto(props.ind)}
        ></div>

        <button
        type="submit"
        className="photoButtons buttonDownload"
        >
            &#129095;
        </button>
        {props.like?
        <button
        type="submit"        
        className="likedButton buttonLike"
        >
            &#127892;
        </button>:
        <button
        type="submit"        
        className="photoButtons buttonLike"
        onClick = {()=>props.likePhoto(props.ind)}
        >
            &#127892;
        </button>
        }        
        <button
        type="submit"
        className="photoButtons buttonAdd"
        >
            &#43;
        </button>

    </div>
)}

export default PhotoUserInterface;

    
            





