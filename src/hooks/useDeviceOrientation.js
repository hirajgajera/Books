import {useWindowDimensions} from 'react-native';

const useDeviceOrientation = () => {
  const {width, height} = useWindowDimensions();
  const isPortrait = width < height;

  return {width, height, isPortrait};
};

export default useDeviceOrientation;
