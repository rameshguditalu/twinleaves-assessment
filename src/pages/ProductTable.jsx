import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Select, MenuItem, TextField, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [page, search, category, sort]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?page=${page}`);
      let filteredData = response.data;

      if (search) {
        filteredData = filteredData.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (category) {
        filteredData = filteredData.filter((product) => product.category === category);
      }
      if (sort === 'asc') {
        filteredData.sort((a, b) => a.price - b.price);
      } else if (sort === 'desc') {
        filteredData.sort((a, b) => b.price - a.price);
      }

      setProducts(filteredData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => <img src={params.value} alt="product" width="50" />,
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'price', headerName: 'Price', width: 100 },
    {
      field: 'action',
      headerName: 'Details',
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => navigate(`/details/${params.id}`)} variant="contained">
          View
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <TextField
        label="Search Product"
        variant="outlined"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Fashion">Fashion</MenuItem>
      </Select>
      <Select value={sort} onChange={(e) => setSort(e.target.value)}>
        <MenuItem value="">Sort By Price</MenuItem>
        <MenuItem value="asc">Low to High</MenuItem>
        <MenuItem value="desc">High to Low</MenuItem>
      </Select>

      {loading ? <CircularProgress /> : (
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          onPageChange={(newPage) => setPage(newPage + 1)}
        />
      )}
    </Box>
  );
};

export default ProductTable;
