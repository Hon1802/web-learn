import { faker } from '@faker-js/faker';
import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { makeStyles } from "@material-ui/core/styles";

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

// Component SimpleCard giả lập
const SimpleCard:React.FC<SimpleCardProps> = ({ index, style, data }) => (
   <Box sx={{ ...style, padding: 1, border: '1px solid #ccc', marginBottom: '10px' }}>
      <img src={data?.img} width='100%' alt='img' height='150px'/>
      {data.text}
   </Box>
 );
 
 const useStyles = makeStyles({
   container: {
     position: "relative"
   }
 });

 const ListContainer:React.FC<any> = props => {
   const classes = useStyles();
   return <Container style={{width:'100%'}} className={classes.container} {...props} />;
 };
 function getRandomElement<T>(arr: T[]): T {
   const randomIndex = Math.floor(Math.random() * arr.length);
   return arr[randomIndex];
}
const NewPage: React.FC = () => {
   const { t } = useTranslation();
   const [data, setData] = React.useState<dataSimple[]>([]);

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
              text: faker.lorem.sentence(),
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
                  sm: '4fr 1fr', 
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
                  paddingLeft:'20px'
               }}
            >
               <AutoSizer>
                  {({ height, width }: { height: number; width: number }) => (
                  <InfiniteLoader
                     isItemLoaded={isItemLoaded}
                     itemCount={data.length}
                     loadMoreItems={loadMoreItems}
                  >
                     {({ onItemsRendered, ref }) => (
                        <List
                        className="List"
                        height={height}
                        width='300px'
                        itemCount={data.length}
                        itemSize={230}
                        itemData={data}
                        innerElementType={ListContainer}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        >
                        {({ index, style }) => (
                           <Box onClick={()=>onClickBox(data[index])}>
                              <SimpleCard index={index} style={style} data={data[index]} />
                           </Box>
                        )}
                        </List>
                     )}
                  </InfiniteLoader>
                  )}
               </AutoSizer>
            </Box>
         </Box>
      </Container>
   );
};

export default NewPage;
