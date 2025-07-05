import { Box, styled, Typography, Link } from '@mui/material';
// import { GitHub, Instagram, Email } from '@mui/icons-material';
import imageURL from '../../images/VoiceCanvas.jpg'; // Import your image

const Banner = styled(Box)`
    background-image: url(${imageURL}); // Use the imported image URL here
    width: 80%;
    height: 40vh;
    background-position: center right 170px;
    background-size: fit;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    text-align: center;
`;

const Text = styled(Typography)`
    color: green;
`;

const SocialLink = styled(Link)`
    color: #878787;
    margin: 0 10px;
    transition: color 0.3s ease;
    &:hover {
        color: #333;
    }
`;
const Footer = styled(Box)`
    background-color: #333;
    padding: 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
`;

const CopyrightText = styled(Typography)`
    color: #FB641B;
`;


const About = () => {
    return (
        <>
            <Banner>
                <Typography variant="h3"></Typography>
            </Banner>
            <Wrapper>
                <Typography variant="h3">Welcome to "The Voice Canvas"</Typography>
                <Text variant="h5">At <strong>The Voice Canvas</strong>, we believe in the power of every individual's voice. Our platform is a vibrant ecosphere where diverse voices resonate, creating a rich tapestry of perspectives and ideas.</Text>
                <Text variant="h5">
                    Whether you're a seasoned writer or just starting out, <strong>The Voice Canvas</strong> welcomes you to share your thoughts, stories, and experiences with our global community. Join us in celebrating the beauty of expression and the richness of human experience.<br />
                </Text>
            </Wrapper>
            <Footer>
                <Typography variant="h4" style={{ color: '#FB641B' }}>
                <CopyrightText>
                        &copy; The Voice Canvas
                    </CopyrightText>
                </Typography>
            </Footer>
        </>
    );
}

export default About;
