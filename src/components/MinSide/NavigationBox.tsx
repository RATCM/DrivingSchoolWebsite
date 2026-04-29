import React from "react";
import "./NavigationBox.css";

export type NavigationItem = {
    id: string;
    label: string;
};

type navigationProps = {
    title?: string;
    items: NavigationItem[];
    activeId: string;
    onSelect: (id: string) => void;
};

function NavigationBox({
                           items,
                           activeId,
                           onSelect,
                       }: navigationProps) {
    return (
        <div className="navigationCard">
            <div className="navigationNav">
                {items.map((item) => (
                    <button
                        key={item.id}
                        className={`navigationBtn ${item.id === activeId ? "isActive" : ""}`}
                        onClick={() => onSelect(item.id)}
                        type="button"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default NavigationBox;