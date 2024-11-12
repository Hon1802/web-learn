import { faker } from '@faker-js/faker';
import { AppBar, Box, Container, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@material-ui/core/styles";

import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
interface SimpleCardProps {
   index: number;
   style: React.CSSProperties;
   data: dataSimple; 
 }

interface dataSimple {
   id: string,
   text: string,
   img: string,
   url: string
}


interface TabPanelProps {
   children?: React.ReactNode;
   dir?: string;
   index: number;
   value: number;
 }
 
 function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;
 
   return (
     <div
       role="tabpanel"
       hidden={value !== index}
       id={`full-width-tabpanel-${index}`}
       aria-labelledby={`full-width-tab-${index}`}
       {...other}
     >
       {value === index && (
         <Box sx={{ p: 3 }}>
           <Typography>{children}</Typography>
         </Box>
       )}
     </div>
   );
 }
 
 function a11yProps(index: number) {
   return {
     id: `full-width-tab-${index}`,
     'aria-controls': `full-width-tabpanel-${index}`,
   };
 }

const SimpleCard: React.FC<SimpleCardProps> = ({ index, style, data }) => {
   // Kiểm tra nếu dữ liệu không hợp lệ thì không render SimpleCard
   if (!data || !data.text || !data.img) {
     return null; // Trả về null nếu không có dữ liệu hợp lệ
   }
 
   return (
     <Box sx={{ ...style, padding: 1, border: '1px solid #ccc', marginBottom: '10px' }}>
       <img src={data.img} width="100%" alt="img" height="150px" />
       {data.text}
     </Box>
   );
 };


 function getRandomElement<T>(arr: T[]): T {
   const randomIndex = Math.floor(Math.random() * arr.length);
   return arr[randomIndex];
}
const NewPage: React.FC = () => {
   const { t } = useTranslation();
   const [data, setData] = React.useState<dataSimple[]>([]);
   const theme = useTheme();
   const [value, setValue] = React.useState(0);
 
   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
     setValue(newValue);
   };
   const [linkPlay, setLinkPlay] = React.useState<string>('https://www.youtube.com/embed/W3skwsfBKoI?si=4xs1YUV8RpTtntH8');

   const stringsImg = ["https://img.freepik.com/free-vector/hand-drawn-english-school-background_23-2149482186.jpg?semt=ais_hybrid", 
      "https://c8.alamy.com/comp/FJPEYM/learning-concept-learn-english-on-wall-background-FJPEYM.jpg", 
      "https://static1.bigstockphoto.com/6/9/2/large1500/296060860.jpg"];
   
   const stringVideo = [
      "https://www.youtube.com/embed/W3skwsfBKoI?si=4xs1YUV8RpTtntH8", 
      "https://www.youtube.com/embed/Njj_bCrIvk8?si=5sLdYxyNOm9JMbu4", 
      "https://www.youtube.com/embed/ach22N49DjE?si=_AoFSiya2d5PxdpT"];
   // Load dữ liệu khi component mount
   useEffect(() => {
      loadMoreItems(1,4);
      const newData = Array.from({ length: 500 }).map(() => ({
         id: 'id_unit',
         text: faker.lorem.sentence(),
         img: getRandomElement(stringsImg),
         url: getRandomElement(stringVideo),
       }));
       setData(newData);
   }, []);
 
   const isItemLoaded = (index: number) => index < data.length && data[index] !== null;
   
   const loadMoreItems = (startIndex: number, stopIndex: number) => {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          const newData = [...data];
          for (let idx = startIndex; idx < stopIndex; idx++) {
            newData[idx] = {
              id: 'id_unit',
              text: faker.lorem.sentence() || 'topic',
              img: getRandomElement(stringsImg),
              url: getRandomElement(stringVideo),
            };
          }
          setData(newData);
          resolve();
        }, 2000);
      });
    };
   


   const onClickBox =(item: dataSimple)=>{
      setLinkPlay(item?.url)
   }
   return (
      <Container>
         {/* Page Title */}
         <Box
            sx={{
               display: "grid",
               gridTemplateColumns: {
                  xs: '1fr', 
                  sm: '3fr 1fr', 
                },
               padding: "0px 10px",

            }}
         >
            <Box
               sx={{
                  position: "relative",
                  paddingBottom: "56.25%", // Tỷ lệ 16:9
                  height: 0,
                  overflow: "hidden",
                  maxWidth: "100%", // Chiều rộng 100%
               }}
            >
               <Box
                  component="iframe"
                  sx={{
                     position: "absolute",
                     top: 0,
                     left: 0,
                     width: "100%",
                     height: "100%",
                  }}
                  src={linkPlay}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
               />
            </Box>
            <Box
               sx={{
                  width: "100%",
                  paddingLeft:'20px',
                  height:'65vh',
                  maxHeight: '65vh',
                  overflow: 'hidden', /* Ẩn thanh cuộn mặc định */
                  '&:hover': {
                     overflow: 'scroll', /* Hiển thị thanh cuộn khi hover */
                  },
                  transition: 'all 0.3s ease', /* Thêm hiệu ứng chuyển tiếp */
                  
               }}
            >
               <SimpleTreeView>
                  <TreeItem itemId="grid" label="Data Grid">
                   {data.map((item, index) => (
                        <TreeItem itemId={`grid-item-1-${index}`} key={`grid-item-${index}`} label={item.text}>
                           <Box onClick={() => onClickBox(item)}>
                              <SimpleCard index={index} style={{}} data={item} />
                           </Box>
                        </TreeItem>
                     ))}
                  </TreeItem>
                  <TreeItem itemId="pickers" label="Date and Time Pickers">
                     {data.map((item, index) => (
                        <TreeItem itemId={`grid-item-2-${index}`} key={`grid-item-${index}`} label={item.text}>
                           <Box onClick={() => onClickBox(item)}>
                              <SimpleCard index={index} style={{}} data={item} />
                           </Box>
                        </TreeItem>
                     ))}
                  </TreeItem>
                  <TreeItem itemId="charts" label="Charts">
                     {data.map((item, index) => (
                        <TreeItem itemId={`grid-item-3-${index}`} key={`grid-item-${index}`} label={item.text}>
                           <Box onClick={() => onClickBox(item)}>
                              <SimpleCard index={index} style={{}} data={item} />
                           </Box>
                        </TreeItem>
                     ))}
                  </TreeItem>
                  <TreeItem itemId="tree-view" label="Tree View">
                     {data.map((item, index) => (
                        <TreeItem itemId={`grid-item-4-${index}`} key={`grid-item-${index}`} label={item?.text }>
                           <Box onClick={() => onClickBox(item)}>
                              <SimpleCard index={index} style={{}} data={item} />
                           </Box>
                        </TreeItem>
                     ))}
                  </TreeItem>
                  </SimpleTreeView>
            </Box>
         </Box>
         <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
            <AppBar position="static">
            <Tabs
               value={value}
               onChange={handleChange}
               indicatorColor="secondary"
               textColor="inherit"
               variant="fullWidth"
               aria-label="full width tabs example"
            >
               <Tab label="Item One" {...a11yProps(0)} />
               <Tab label="Item Two" {...a11yProps(1)} />
               <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
               custom here 
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
               Item Two
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
               Item Three
            </TabPanel>
         </Box>
      </Container>
   );
};

export default NewPage;
