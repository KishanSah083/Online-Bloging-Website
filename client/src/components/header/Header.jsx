import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, styled, Button, Select, MenuItem, Box, Typography, Menu, IconButton } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../constants/data'; // Assuming categories are exported from this file


const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
`;

const StyledNavLink = styled(NavLink)`
    padding: 0 10px;
    color: #1976d2;  /* Change default link color */
    text-decoration: none;

    &.active {
        color: #FF0000; /* Change color for active link */
    }
`;

const Footer = styled(Box)`
    background-color: #333;
    padding: 2px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
`;

const CopyrightText = styled(Typography)`
    color: #FB641B;
`;

const BloggersListMenu = styled(Menu)`
    max-height: 300px;  // Adjust the height as needed
    overflow-y: auto;
`;

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category') || '';
    const [bloggers, setBloggers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const fetchBloggers = async () => {
            try {
                const response = await fetch('/api/bloggers'); // Adjust the endpoint if necessary
                const data = await response.json();
                setBloggers(data);
            } catch (error) {
                console.error('Error fetching bloggers:', error);
            }
        };

        fetchBloggers();
    }, []);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        navigate(`/?category=${selectedCategory}`);
    }
    
    const logout = async () => navigate('/account');

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Component>
                <Container>
                    <div>
                        <StyledNavLink to='/' exact activeClassName="active">HOME</StyledNavLink>
                        <StyledNavLink to='/about' activeClassName="active">ABOUT</StyledNavLink>
                        <StyledNavLink to='/contact' activeClassName="active">CONTACT</StyledNavLink>
                    </div>
                    <div>
                        <Select
                            value={category}
                            onChange={handleCategoryChange}
                            displayEmpty
                            style={{ marginRight: '20px' }}
                        >
                            <MenuItem value="" style={{ color: '#1976d2' }}>
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
                       
                        <Button onClick={logout}>LOGOUT</Button>
                    </div>
                </Container>
            </Component>
           
            <Footer>
                <Typography variant="h4" style={{ color: '#FB641B' }}>
                    <CopyrightText>
                        &copy; The Voice Canvas
                    </CopyrightText>
                </Typography>
            </Footer>
        </>
    )
}

export default Header;
