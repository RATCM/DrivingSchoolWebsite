import React from "react";
import "./NavigationBox.css";

type navigationProps = {
    title?: string;
    items?: string[];
    activeIndex?: number;
    onSelect?: (index: number) => void;
};

function NavigationBox({
        title = "Min side",
        items = [
            "Skrivebord",
            "Book en køretime",
            "Kalender",
            "Indstillinger"
        ],
        activeIndex = 0,
        onSelect,
    }: navigationProps) {
    return (
        <div className="navigationCard">


            <div className="navigationNav">
                {items.map((text, idx) => (
                    <button
                        key={text + idx}
                        className={`navigationBtn ${idx === activeIndex ? "isActive" : ""}`}
                        onClick={() => onSelect?.(idx)}
                        type="button"
                    >
                        {text}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default NavigationBox;