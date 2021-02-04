import React from 'react';
import {Box, Container, makeStyles} from "@material-ui/core";

/**
 * Fixed aspect ratio Page component.
 *
 * Thanks [jessepinho](https://github.com/jessepinho) for the inspiration in your
 * [blogpost](https://medium.com/bleeding-edge/enforcing-an-aspect-ratio-on-an-html-element-in-react-and-css-27a13241c3d4).
 *
 * @param {PageProps} props
 */
const Page = ({children, width, height, dpi = 300}: PageProps) => {
    const aspectRatio = Math.round(width / height * 1000) / 1000;
    const isPortrait = aspectRatio <= 1;
    const scale = .9;
    const unit = isPortrait ? 'vh' : 'vw';
    const PageCss: PageCss = {
        widthPercent: (isPortrait ? aspectRatio : 1) * 100 * scale + unit,
        heightPercent: (isPortrait ? 1 : 1 / aspectRatio) * 100 * scale + unit,
    }
    const classes = useStyles(PageCss);

    return (
        <Container className={classes.outerWrapper}>
            <div className={classes.innerWrapper}>
                <Box bgcolor="info.main" className={classes.page}>
                    {children}
                </Box>
            </div>
        </Container>
    );
};

const useStyles = makeStyles({
    outerWrapper: {
        position: 'relative',
        width: ((props: PageCss) => props.widthPercent),
        height: 0,
        paddingBottom: ((props: PageCss) => props.heightPercent),
    },
    innerWrapper: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    page: {
        width: '100%',
        height: '100%',
    }
});

interface PageProps {
    children?: any,
    width: number,
    height: number,
    dpi?: 150 | 300 | 600,
}

interface PageCss {
    widthPercent: string,
    heightPercent: string,
}

export default Page;
