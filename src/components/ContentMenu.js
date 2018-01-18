import React from 'react'

import MenuItem from './MenuItem'

const ContentMenu = () => {
  const currentRoute = window.location.hash.replace('#', '')

  return (
    <nav className="content-menu">
      <ul className="content-menu__nav">
        <MenuItem
          label="Portfolio"
          active={currentRoute === '/home/portfolio'}
          route="/home/portfolio"
        />

        <MenuItem
          label="History"
          active={currentRoute === '/home/history'}
          route="/home/history"
        />

        <MenuItem
          label="Market"
          active={currentRoute === '/home/market'}
          route="/home/order"
        />

        <MenuItem
          label="Transactions"
          active={currentRoute === '/home/transactions'}
          route="/home/transactions"
        />
      </ul>
    </nav>
  )
}

export default ContentMenu
