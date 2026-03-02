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
            "kalender"
        ],
        activeIndex = 0,
        onSelect,
    }: navigationProps) {
    return (
        <div className="navigationCard">
            <h1 className="navigationTitle">{title}</h1>

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