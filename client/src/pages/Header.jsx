import React from 'react'
import { setTheme } from '../utils/theme.js';

function Header() {
  return (
    <div>
      <button onClick={() => setTheme("terminal")}>T</button>
      <button onClick={() => setTheme("blue")}>B</button>
      <button onClick={() => setTheme("light")}>L</button>
    </div>
  );
}

export default Header