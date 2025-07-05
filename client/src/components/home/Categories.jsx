import { Button, Table, TableHead, TableRow, TableCell, styled, Select, MenuItem } from '@mui/material';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

import { categories } from '../../constants/data';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
    
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: red;
    color: #fff;
    text-decoration: none;
`;
    
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const navigate = useNavigate();

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        navigate(`/?category=${selectedCategory}`);
    }

    return (
        <>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>
    {/* we moved this code to header sect */}
{/*             
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Select
                                value={category || ''}
                                onChange={handleCategoryChange}
                                displayEmpty
                                fullWidth
                            >
                                <MenuItem value="">
                                    All Categories
                                </MenuItem>
                                {
                                    categories.map(category => (
                                        <MenuItem key={category.id} value={category.type}>
                                            {category.type}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </TableCell>
                    </TableRow>
                </TableHead>
            </StyledTable> */}
        </>
    )
}

export default Categories;
