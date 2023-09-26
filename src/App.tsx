import { Grid } from 'gridjs'
import 'gridjs/dist/theme/mermaid.css'
import { useRef, useEffect } from 'preact/hooks'

function helloWorld() {
  const wrapperRef = useRef(null)

  const grid = new Grid({
    // search: {
    //   server: {
    //     url: (prev, keyword) => `${prev}?search=${keyword}`,
    //   },
    // },
    columns: ['Pokemon', 'URL', '1', '2', '3', '4', '1', '2', '3', '4'],
    pagination: {
      limit: 1270,
      server: {
        url: (prev, page, limit) => `${prev}?limit=${limit}&offset=${page * limit}`,
      },
    },
    server: {
      url: 'https://pokeapi.co/api/v2/pokemon',
      then: data =>
        data.results.map(pokemon => [
          pokemon.name,
          pokemon.url,
          pokemon.url,
          pokemon.url,
          pokemon.url,
          pokemon.url,
          pokemon.url,
          pokemon.url,
          pokemon.url,
          pokemon.url,
        ]),
      total: data => data.count,
    },
    sort: true,
    resizable: true,

    className: {
      td: 'my-custom-td-class',
      table: 'custom-table-classnameroot',
    },
  })

  useEffect(() => {
    grid.render(wrapperRef.current)
  })

  return <div ref={wrapperRef} />
}

export default helloWorld
