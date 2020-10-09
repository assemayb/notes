import React from 'react'

function DropItem({ item }) {
    return (
        <div className="drop-target">
            <h4>Drag Items here {item === "note"? "to remove": "to mark as done"}</h4>
        </div>
    )
}
export default DropItem;
