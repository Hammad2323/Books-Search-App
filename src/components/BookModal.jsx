import React from "react";

export default function BookModal({ open, onClose, book, addToFavorites }) {
  if (!open || !book) return null;
  const info = book.volumeInfo;
  const downloadLink =
    book.accessInfo?.pdf?.downloadLink || book.accessInfo?.epub?.downloadLink;
  const previewLink = info.previewLink;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-[#C7F9CC] to-[#E8FCEE] dark:from-[#0B3D2E] dark:to-[#145A32] 
      max-w-2xl w-full rounded-3xl shadow-2xl p-6 relative font-[Lato] text-[#1B4332] dark:text-[#E8FCEE]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#2E8B57] dark:text-[#A7DCA4] hover:text-red-500 text-2xl font-bold"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={
              info.imageLinks?.thumbnail ||
              "https://via.placeholder.com/200x300?text=No+Cover"
            }
            alt={info.title}
            className="rounded-2xl w-48 h-72 object-cover mx-auto md:mx-0 shadow-lg"
          />

          <div className="flex-1">
            <h2 className="font-[Playfair_Display] text-3xl mb-2">
              {info.title}
            </h2>
            <p className="text-[#2E8B57] dark:text-[#CFE9D8] mb-2 font-semibold">
              {info.authors ? info.authors.join(", ") : "Unknown Author"}
            </p>
            <p className="text-sm opacity-90 mb-4 leading-relaxed">
              {info.description
                ? info.description.slice(0, 250) + "..."
                : "No description available."}
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              {previewLink && (
                <a
                  href={previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2E8B57] text-white px-5 py-2 rounded-xl hover:bg-[#1B4332] transition"
                >
                  Preview Book
                </a>
              )}

              {downloadLink ? (
                <a
                  href={downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#A7DCA4] text-[#1B4332] px-5 py-2 rounded-xl hover:bg-[#6BBF74] transition"
                >
                  Download Book
                </a>
              ) : (
                <p className="italic text-[#4B3E2B] dark:text-[#CFE9D8] mt-2">
                  Author does not allow downloading, only preview available.
                </p>
              )}

              <button
                onClick={() => addToFavorites(book)}
                className="bg-[#88D498] text-[#1B4332] px-5 py-2 rounded-xl hover:bg-[#6BBF74] transition"
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
