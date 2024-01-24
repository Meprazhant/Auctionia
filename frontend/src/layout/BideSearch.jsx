import React from "react";

function BidSearch() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0000006a] backdrop-blur-sm justify-center items-center gap-5 p-5">
      <div className="flex sm:flex-row sm:justify-center justify-center flex-col p-2 sm:w-8/12 w-full bg-[#ffffff5a] rounded-md">
        <input
          type="text"
          className="
      sm:w-10/12
      w-full
      bg-transparent
      text-white
      outline-none
      rounded-xl
      placeholder-white
      text-xl
      p-2
      "
        />
        <button
          className="
      text-white
      rounded-md
      bg-[#0000002a]
      outline-none
      hover:bg-[#0000004a]
      cursor-pointer
      border-none
      placeholder-white
      text-xl
      p-2
     sm:w-2/12
     w-full
      "
        >
          Search
        </button>
      </div>
      <div className="flex gap-3 flex-col items-center">
        <h2 className="text-white font-bold md:text-3xl text-xl">Auctions Happening Around</h2>
        <p className="text-white md:w-1/2 w-full">
          The dedicated page for ongoing auctions, where users can explore and
          engage with the latest bidding opportunities on our platform.
        </p>
      </div>
    </div>
  );
}

export default BidSearch;
