import React from 'react';
import '../assets/loader.css';

export default function () {
  return (
    <div className="loader">
      <div className="circle-spinner"></div>
      <div>Fetching Chats </div>
    </div>
  );
}
