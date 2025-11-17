import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { cisControls } from "../../data/ciscontrols";

const paginationModel = { page: 0, pageSize: 5 };

export default function Cascade() {
  const columns = cisControls?.columns || [];
  const rows = cisControls?.rows || [];

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ 
          border: 0,
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center', // Centraliza verticalmente
            justifyContent: 'center', // Centraliza horizontalmente
          }
        }}
      />
    </Paper>
  );
}