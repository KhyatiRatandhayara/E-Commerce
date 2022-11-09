import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
const columns = [
    {
     name: 'Title', selector: row => row.title, },
      { name: 'Year', selector: row => row.year, },
       { cell: (row) => <button id={row.ID} onClick={() => { alert() }}>Action</button>, ignoreRowClick: true, allowOverflow: true, button: true, },
];
// const clickHandler = () => {//     alert();//     // console.log(state.target.id);
// };
// const data = [{ id: 1, title: 'Beetlejuice', year: '1988', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', }, { id: 2, title: 'Ghostbusters', year: '1984', },

// ]

export const ListProduct = ({data}) =>  {
    return <DataTable columns={columns} data={data} pagination={true} />;
};

