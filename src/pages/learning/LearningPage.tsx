import { Box, Card, CardContent } from "@mui/material";

const LearningPage = () => {
    return (
        <Box height="100vh" display="flex">
            {/* Left Section - 2/3 */}
            <Box flex={4} bgcolor="lightblue" display="flex" flexDirection="column">
                {/* Top Section - 3/5 of Left Section with Video Card */}
                <Box flex={3} display="flex" justifyContent="center" alignItems="center">
                    <Card style={{ width: "100%", height: "100%" }}>
                        <CardContent style={{ padding: 0, height: "100%", marginRight: "10px" }}>
                            <video
                                src="video.mp4" // Replace with your video path or URL
                                controls
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </CardContent>
                    </Card>
                </Box>
                {/* Bottom Section - 2/5 of Left Section */}
                <Box flex={2} bgcolor="lightyellow" display="flex" justifyContent="center" alignItems="center">
                    Bottom of Left Section (2/5)
                </Box>
            </Box>

            {/* Right Section - 1/3 */}
            <Box flex={1} bgcolor="lightcoral" display="flex" justifyContent="center" alignItems="center">
                Right Section (1/3)
            </Box>
        </Box>
    );
};

export default LearningPage;
