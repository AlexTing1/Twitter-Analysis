import React from 'react';

function Start() {
  function demoOnClick() {
    console.log('test');
  }

  return (
    <div>
      <div>
        <button type="button" onClick={demoOnClick}> Demo </button>
      </div>
    </div>
  );
}

export default Start;
