import { Typography, useTheme } from "@mui/material";
import FlexContent from "components/FlexContent";
import WidgetWrapper from "components/widgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            
            {/* AD HEADLINES */}
            <FlexContent>
                <Typography color={dark} variant="h5">
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Ad</Typography>
            </FlexContent>

            {/* AD IMAGE */}
            <img 
                width="100%"
                height="auto"
                alt="advert"
                src="http://localhost:3001/assets/advert.png"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />

            {/* AD CONTENT */}
            <FlexContent>
                <Typography color={main}>Difficulties winning? Join Now!</Typography>
                <Typography color={medium}>www.example.com</Typography>
            </FlexContent>
            <Typography color={medium} m="0.5rem 0">
                Your road to easy wins starts here
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget;