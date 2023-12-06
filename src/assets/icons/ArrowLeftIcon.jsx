import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ArrowLeftIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}>
    <Path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12S0 18.623 0 12 5.377 0 12 0zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11S1 18.071 1 12 5.929 1 12 1zm3 5.753L8.56 12 15 17.263l-.678.737L7 12l7.335-6 .665.753z" />
  </Svg>
);
export default ArrowLeftIcon;
