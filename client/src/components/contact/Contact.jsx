import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    text-align: center;
`;

const Text = styled(Typography)`
    color: #878787;
`;

const ContactIconsWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

const ContactIcon = styled(Link)`
    color: #878787;
    margin: 0 10px;
    font-size: 30px;
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

const Contact = () => {
    return (
        <>
            <Box>
                <Banner />
                <Wrapper>
                    <Typography variant="h3">Getting in touch is easy!</Typography>    
                    <Text variant="h5">
                        Reach out to Us on
                        
                    </Text>
                    <ContactIconsWrapper>
                        <ContactIcon href="https://github.com/BS55Script/Blogging-website.git" target="_blank"><GitHub /></ContactIcon>
                        <ContactIcon href="https://www.instagram.com" target="_blank"><Instagram /></ContactIcon>
                        <ContactIcon href="mailto:thevoicecanvas123@gmail.com?Subject=This is a subject" target="_blank"><Email /></ContactIcon>
                    </ContactIconsWrapper>
                </Wrapper>
            </Box>
            <Footer>
                <Typography variant="h4">
                    <CopyrightText>
                        &copy; The Voice Canvas
                    </CopyrightText>
                </Typography>
            </Footer>
        </>
    );
}

export default Contact;
