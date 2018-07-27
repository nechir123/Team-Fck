/* @Flow */
import React from "react";
/**
 * HOC for all modals in this project. Only offers opening and closing and
 * content props. NOTE modalId must be unique!
 */
export const openModal = (modalId: string) => {
  if (document.getElementById(modalId))
    document.getElementById(modalId).style.display = "block";
};

export const closeModal = (modalId: string) => {
  if (document.getElementById(modalId))
    document.getElementById(modalId).style.display = "none";
};
export const Modal = ({
  content,
  modalId,
  maxWidth
}: {
  content: any,
  modalId: string,
  maxWidth: string
}) => {
  let style = {};
  if (maxWidth != undefined) {
    style = { maxWidth: maxWidth };
  }

  return (
    <div id={modalId} className="modal">
      <div style={style} className="modal-content">
        {content}
      </div>
    </div>
  );
};
