import { useState } from 'react';

export default function App() {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <div>
      {/* Scroll top: <b>{scrollTop}</b> */}
      <br />
      <br />
      <div
        style={{
          border: '1px solid black',
          width: '400px',
          height: '200px',
          overflow: 'auto',
        }}
        onScroll={handleScroll}
      >
        {[...Array(10)].map((_, i) => (
          <p key={i}>Content</p>
        ))}
      </div>
    </div>
  );
}
