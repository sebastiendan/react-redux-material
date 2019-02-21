import * as React from 'react'

export interface IProps {
  children: any
}

function Main(props: IProps) {
  const header = document.getElementsByTagName('header')

  return (
    <main style={{ marginTop: header.length ? header[0].offsetHeight : 64 }}>
      {props.children}
    </main>
  )
}

export default Main
