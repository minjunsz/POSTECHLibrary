import { Box, Popover, PopoverContent, PopoverTrigger, Text, PopoverArrow, PopoverHeader, PopoverBody } from '@chakra-ui/core';
import React from 'react';
import { SeatCondition } from '../../generated/graphql';
import styles from './PlotPoints.module.css';

interface PlotPointsProps {
  coords: [number, number][];
  boxSize: string;
  boxColor: string;
  dotSize: string;
  dotColor: string[];
  hoverData?: Array<SeatCondition | undefined | null>;

}

export const PlotPoints: React.FC<PlotPointsProps> = (props) => {
  return (
    <Box w={props.boxSize} bg={props.boxColor} pos="relative" className={styles.square} mx="auto" >
      {props.coords.map(([xpos, ypos], idx) => {
        const dot = (
          <Box
            w={props.dotSize}
            borderRadius="50%"
            bg={props.dotColor[idx]}
            pos="absolute"
            bottom={(ypos * 100).toString() + "%"}
            left={(xpos * 100).toString() + "%"}
            className={styles.square}
            zIndex={0}
          ></Box>
        );

        if (!props.hoverData) { return dot; }

        let popover: JSX.Element;
        if (!props.hoverData[idx]) {
          popover = (
            <Text fontWeight="bold" p={1}>
              No Data Available
            </Text>
          );
        } else {
          popover = <>
            <PopoverHeader>
              <Text fontWeight="bold">
                Seat {props.hoverData[idx]?.seatId} Info.
              </Text>
            </PopoverHeader>
            <PopoverBody>
              <Text mt={1}>
                Seat Condition: {props.hoverData[idx]?.status}
              </Text>
              <Text>
                Seat Description: {props.hoverData[idx]?.description}
              </Text>
            </PopoverBody>
          </>
        }
        return (
          <Popover trigger="hover" >
            <PopoverTrigger>
              {dot}
            </PopoverTrigger>
            <PopoverContent zIndex={4}>
              <PopoverArrow></PopoverArrow>
              {popover}
            </PopoverContent>
          </Popover>
        );
      })}
    </Box>
  );
}