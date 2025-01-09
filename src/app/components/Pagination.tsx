"use client";

export default function Pagination({ currentPage, onPageChange, totalItems, itemsPerPage }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    return (
      <div className="pagination">
        <button onClick={() => onPageChange(Math.max(1, currentPage - 1))}>Précédent</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>Suivant</button>
      </div>
    );
}
  