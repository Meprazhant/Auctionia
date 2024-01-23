import React from 'react'

function Timeline() {
  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical p-5">
        <div className="flex p-5 justify-center items-center">
            <h2 className='
            text-3xl
            font-bold
            text-center
            '>
                How Does Auctionia Work?
            </h2>
        </div>
        <li>
  <div className="timeline-middle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
  </div>
  <div className="timeline-start md:text-end mb-10">
    <time className="font-mono italic">Step 1</time>
    <div className="text-lg font-black">User Registration and Product Listing</div>
    Users register on the auction app, log in, and add their products for auction. Product details, including description, images, and starting bid price, are provided by the user.
  </div>
  <hr/>
</li>
<li>
  <hr />
  <div className="timeline-middle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
  </div>
  <div className="timeline-end mb-10">
    <time className="font-mono italic">Step 2</time>
    <div className="text-lg font-black">Admin Review</div>
    Admins review the added products to ensure compliance with guidelines. Approved products proceed to the marketplace; otherwise, users receive feedback.
  </div>
  <hr />
</li>
<li>
  <hr />
  <div className="timeline-middle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
  </div>
  <div className="timeline-start md:text-end mb-10">
    <time className="font-mono italic">Step 3</time>
    <div className="text-lg font-black">Product Approval and Marketplace Display</div>
    Approved products are showcased in the marketplace, ensuring quality items are available for bidding by users.
  </div>
  <hr />
</li>
<li>
  <hr />
  <div className="timeline-middle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
  </div>
  <div className="timeline-end mb-10">
    <time className="font-mono italic">Step 4</time>
    <div className="text-lg font-black">Bidding Process</div>
    Interested users place bids on products, setting bid amounts higher than the current highest bid. Real-time updates keep users informed.
  </div>
  <hr />
</li>
<li>
  <hr />
  <div className="timeline-middle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
  </div>
  <div className="timeline-start md:text-end mb-10">
    <time className="font-mono italic">Step 5</time>
    <div className="text-lg font-black">Auction Completion and Winner Declaration</div>
    When the auction period ends, the highest bidder wins. The winner is notified, and details for payment and product collection are provided. The cycle repeats with new listings.
  </div>
</li>

  </ul>
  )
}

export default Timeline