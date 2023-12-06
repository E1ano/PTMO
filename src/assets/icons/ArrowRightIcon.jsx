import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ArrowRightIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}>
    <Path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12S0 18.623 0 12 5.377 0 12 0zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11S1 18.071 1 12 5.929 1 12 1zM9 6.753 15.44 12 9 17.263l.678.737L17 12 9.665 6 9 6.753z" />
  </Svg>
);
export default ArrowRightIcon;
