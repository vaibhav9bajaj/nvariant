
import React from 'react'

export function Navbar({ tab, setTab, user }: any) {
  return (
    <div className="nav">
      <div className="title">nvariant · explorer</div>
      <div className="tabs">
        <button className={"tab " + (tab==='browse'?'active':'')} onClick={() => setTab('browse')}>Browse</button>
        <button className={"tab " + (tab==='drift'?'active':'')} onClick={() => setTab('drift')}>Drift</button>
        <button className={"tab " + (tab==='lineage'?'active':'')} onClick={() => setTab('lineage')}>Lineage</button>
      </div>
      <div style={{flex:1}} />
      <div className="small">User: <b>{user.email}</b> · Roles: {user.roles.join(', ')}</div>
    </div>
  )
}
