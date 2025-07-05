import { styled, Box, Typography } from '@mui/material';
import backgroundImage from '../../images/blog-background.jpg';

const Image = styled(Box)`
    width: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(${backgroundImage});
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    text-aligned:center;
    font-size: 60px; 
    border-radius: 5px; /* Add border-radius for rounded corners */
    margin-bottom: 20px; /* Add margin bottom to create space between the heading and subheading */
    /* Add more styles to customize appearance */
    text-shadow: 2px 2px 4px rgba(5, 1, 5, 3); /* Add text shadow for better readability */
    font-weight: bold; /* Make text bold */
`;

const Banner = () => {
    return (
        <Image>
            <Heading  backgroundColor= " rgb(173, 216, 230)">The Voice Canvas</Heading>
        </Image>
    );
};

export default Banner;
